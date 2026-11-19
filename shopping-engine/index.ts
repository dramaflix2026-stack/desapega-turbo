console.log("dt_motor_version","github-engine-20261119-v1");
const queries=["Samsung Galaxy A56 256GB","Motorola Moto G86 256GB","Apple iPhone 16 128GB","Samsung Galaxy S25 FE 256GB","Xiaomi Redmi Note 14 256GB","Sony PlayStation 5 Slim Digital","Microsoft Xbox Series S 512GB","Nintendo Switch OLED","Samsung Smart TV 50 QLED 4K","LG Smart TV 55 OLED 4K","Mondial Air Fryer AFN-40 4L","Philips Walita Air Fryer 4.1L","Electrolux Aspirador de Pó STK15","Britânia Cafeteira CP15 15 Xícaras","Consul Geladeira CRM39 340L","JBL Tune 520BT","Samsung Galaxy Buds FE","Logitech Mouse MX Master 3S","Acer Aspire 5 i5 8GB 512GB","Apple MacBook Air M3 13 256GB"];
const ok=()=>Boolean(Bun.env.DATAFORSEO_LOGIN&&Bun.env.DATAFORSEO_PASSWORD);
const dbok=()=>Boolean(Bun.env.RADAR_SUPABASE_URL&&Bun.env.RADAR_SUPABASE_SERVICE_KEY);
const dailyEnabled=()=>Bun.env.RADAR_DAILY_ENABLED==="true"&&ok()&&dbok();
const dayBR=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"America/Sao_Paulo",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
const monthStart=()=>dayBR().slice(0,7)+"-01";
const maxMonthlyTasks=()=>Math.min(600,Math.max(20,Number(Bun.env.RADAR_MONTHLY_TASK_CAP)||600));
const safeJson=(x,s=200)=>Response.json(x,{status:s,headers:{"Cache-Control":"no-store","Access-Control-Allow-Origin":"https://desapega-turbo-app-production.up.railway.app"}});
const authorized=r=>Boolean(Bun.env.RADAR_ADMIN_TOKEN?.length>=24&&r.headers.get("Authorization")==="Bearer "+Bun.env.RADAR_ADMIN_TOKEN);
async function provider(method,path,body){if(!ok())throw Error("provider_not_configured");const auth=btoa(Bun.env.DATAFORSEO_LOGIN+":"+Bun.env.DATAFORSEO_PASSWORD);const r=await fetch("https://api.dataforseo.com/v3/merchant/google/products/"+path,{method,headers:{"Authorization":"Basic "+auth,"Content-Type":"application/json"},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(25000)});const d=await r.json();if(!r.ok||d.status_code!==20000)throw Error("provider_error:"+String(d.status_message||r.status));return d}
async function supa(method,table,body,query=""){if(!dbok())throw Error("database_not_configured");const u=Bun.env.RADAR_SUPABASE_URL.replace(/\/$/,"")+"/rest/v1/"+table+query;const k=Bun.env.RADAR_SUPABASE_SERVICE_KEY;const r=await fetch(u,{method,headers:{"apikey":k,"Content-Type":"application/json","Prefer":"return=representation"},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(15000)});const d=await r.json().catch(()=>null);if(!r.ok)throw Error("database_error:"+r.status+":"+String(d?.code||d?.error_code||"no_code").slice(0,50)+":"+String(d?.message||d?.msg||d?.error||"no_message").slice(0,100));return d}
async function collect(){
 if(!ok()||!dbok())return safeJson({error:"credentials_required",charged:false},503);
 const today=dayBR();
 const previous=await supa("GET","dt_radar_scheduler_runs",undefined,"?select=run_day,state&run_day=eq."+today);
 if(previous.length)return safeJson({error:"already_scheduled_today",state:previous[0].state,charged:false},409);
 const monthJobs=await supa("GET","dt_radar_collection_jobs",undefined,"?select=id&collection_day=gte."+monthStart()+"&limit=601");
 if(monthJobs.length+20>maxMonthlyTasks())return safeJson({error:"monthly_task_budget_reached",count:monthJobs.length,limit:maxMonthlyTasks(),charged:false},429);
 const products=await supa("GET","dt_radar_products",undefined,"?select=id,search_query&enabled=eq.true&order=created_at.asc&limit=20");
 if(products.length!==20)return safeJson({error:"expected_exactly_20_products",actual:products.length,charged:false},409);
 await supa("POST","dt_radar_scheduler_runs",[{run_day:today,state:"started",task_count:0}]);
 try{
  const tasks=products.map(p=>({keyword:p.search_query,language_code:"pt",location_name:"Brazil",priority:1,depth:20,tag:p.id}));
  const data=await provider("POST","task_post",tasks);
  const queued=[];
  for(const task of data.tasks||[]){
   const product=products.find(x=>x.id===task.data?.tag);
   if(!product)continue;
   const valid=task.status_code===20100||task.status_code===20000;
   const row={product_id:product.id,collection_day:today,provider_task_id:valid?task.id:null,state:valid?"queued":"failed",priority:1,requested_at:new Date().toISOString(),error_message:valid?null:String(task.status_message||"Rejected").slice(0,180)};
   await supa("POST","dt_radar_collection_jobs",[row]);
   queued.push({product:product.search_query,status:row.state});
  }
  await supa("PATCH","dt_radar_scheduler_runs",{state:"completed",task_count:queued.length,finished_at:new Date().toISOString()},"?run_day=eq."+today);
  return safeJson({registered:queued.length,day:today,monthlyLimit:maxMonthlyTasks(),queries:queued});
 }catch(e){
  await supa("PATCH","dt_radar_scheduler_runs",{state:"failed",error_message:String(e.message||e).slice(0,200),finished_at:new Date().toISOString()},"?run_day=eq."+today).catch(()=>{});
  throw e
 }
}
const norm=x=>String(x||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim().split(" ").filter(Boolean);
function matchStatus(q,t){const wanted=norm(q),got=norm(t),codes=wanted.filter(x=>/\d/.test(x));return codes.some(x=>!got.includes(x))?"mismatch":"review_required"}
async function synchronize(){if(!ok()||!dbok())return safeJson({error:"credentials_required"},503);
const jobs=await supa("GET","dt_radar_collection_jobs",undefined,"?select=id,product_id,provider_task_id&state=eq.queued&limit=25");
const products=await supa("GET","dt_radar_products",undefined,"?select=id,search_query");const report=[];
for(const job of jobs||[]){const p=products.find(x=>x.id===job.product_id);if(!p||!job.provider_task_id)continue;
const raw=await provider("GET","task_get/advanced/"+encodeURIComponent(job.provider_task_id));
const result=raw.tasks?.[0]?.result?.[0];if(!result){report.push({product:p.search_query,state:"pending"});continue}
const gathered=(result.items||[]).flatMap(x=>Array.isArray(x.items)?x.items:[x]);
const observed=new Date().toISOString();
const rows=gathered.filter(x=>x.title&&Number(x.price)>0&&x.currency==="BRL").slice(0,60).map(x=>({product_id:p.id,collection_job_id:job.id,source_product_id:String(x.product_id||x.data_docid||"").slice(0,150)||null,observed_title:String(x.title).slice(0,400),merchant:String(x.seller||x.domain||"Google Shopping").slice(0,200),product_url:typeof x.shopping_url==="string"&&x.shopping_url.startsWith("https://")?x.shopping_url:null,price:Number(x.price),currency:"BRL",match_status:matchStatus(p.search_query,x.title),observed_at:observed}));
if(rows.length)await supa("POST","dt_radar_price_observations",rows);
await supa("PATCH","dt_radar_collection_jobs",{state:"completed",finished_at:observed},"?id=eq."+job.id);
report.push({product:p.search_query,state:"completed",captured:rows.length,needsReview:rows.filter(x=>x.match_status==="review_required").length})}
return safeJson({results:report})}

let busy=false;
async function dailyTick(){
 if(busy||!dailyEnabled())return;
 const hour=Number(new Intl.DateTimeFormat("en-GB",{timeZone:"America/Sao_Paulo",hour:"2-digit",hourCycle:"h23"}).format(new Date()));
 if(hour<9)return;
 busy=true;
 try{
  const result=await collect();if(result.status===200)console.log("radar_daily_collection_queued");
  const summary=await synchronize();if(summary.status===200)console.log("radar_pending_jobs_checked");
 }catch(e){console.error("radar_daily_tick_failure",String(e?.message||e).slice(0,150))}
 finally{busy=false}
}
setInterval(()=>{dailyTick().catch(()=>{})},60*60*1000);

async function authSmoke(){
 if(Bun.env.RADAR_AUTH_SMOKE_TEST!=="true")return;
 const summary={provider:false,database:false,providerCode:null,balance:null,products:null};
 try{
  const auth=btoa(Bun.env.DATAFORSEO_LOGIN+":"+Bun.env.DATAFORSEO_PASSWORD);
  const r=await fetch("https://api.dataforseo.com/v3/appendix/user_data",{headers:{Authorization:"Basic "+auth},signal:AbortSignal.timeout(20000)});
  const v=await r.json().catch(()=>({}));
  summary.provider=r.ok&&v.status_code===20000;
  summary.providerCode=v.status_code||r.status;
  if(summary.provider)summary.balance=v.tasks?.[0]?.result?.[0]?.money?.balance??null;
 }catch(e){summary.providerCode="network_error"}
 try{
  const products=await supa("GET","dt_radar_products",undefined,"?select=id&enabled=eq.true&limit=25");
  summary.database=Array.isArray(products);summary.products=products.length;
 }catch(e){summary.databaseError=String(e.message||e).slice(0,80)}
 console.log("dt_radar_auth_smoke",JSON.stringify(summary));
}
setTimeout(()=>authSmoke().catch(()=>{}),4000);

async function oneShotPilot(){
 if(Bun.env.RADAR_ONE_SHOT_ENABLED!=="true")return;
 const productName="Mondial Air Fryer AFN-40 4L";
 let jobId=null;
 try{
  if(!ok()||!dbok())throw Error("credentials_not_configured");
  const products=await supa("GET","dt_radar_products",undefined,"?select=id,search_query&search_query=eq."+encodeURIComponent(productName));
  if(products.length!==1)throw Error("pilot_product_missing");
  const today=dayBR(),product=products[0];
  const existing=await supa("GET","dt_radar_collection_jobs",undefined,"?select=id,provider_task_id,state&product_id=eq."+product.id+"&collection_day=eq."+today);
  if(existing.length){console.log("dt_radar_one_shot",JSON.stringify({state:"already_registered",jobState:existing[0].state}));return}
  const balance=await fetch("https://api.dataforseo.com/v3/appendix/user_data",{headers:{Authorization:"Basic "+btoa(Bun.env.DATAFORSEO_LOGIN+":"+Bun.env.DATAFORSEO_PASSWORD)},signal:AbortSignal.timeout(15000)});
  const account=await balance.json();
  if(!balance.ok||account.status_code!==20000)throw Error("provider_account_validation_failed");
  const credit=Number(account.tasks?.[0]?.result?.[0]?.money?.balance);
  if(!Number.isFinite(credit)||credit<0.10)throw Error("insufficient_test_balance");
  const reserve=await supa("POST","dt_radar_collection_jobs",[{product_id:product.id,collection_day:today,state:"not_requested",priority:1,requested_at:new Date().toISOString()}]);
  jobId=reserve?.[0]?.id;
  if(!jobId)throw Error("could_not_reserve_job");
  const data=await provider("POST","task_post",[{keyword:productName,language_code:"pt",location_name:"Brazil",priority:1,depth:20,tag:product.id}]);
  const task=data.tasks?.[0];const accepted=task?.status_code===20100||task?.status_code===20000;
  await supa("PATCH","dt_radar_collection_jobs",{state:accepted?"queued":"failed",provider_task_id:accepted?task.id:null,error_message:accepted?null:String(task?.status_message||"task_rejected").slice(0,180)},"?id=eq."+jobId);
  console.log("dt_radar_one_shot",JSON.stringify({state:accepted?"queued":"failed",product:productName,taskId:accepted?task.id:null,charge:task?.cost??data.cost??null}));
 }catch(e){
  if(jobId)await supa("PATCH","dt_radar_collection_jobs",{state:"failed",error_message:String(e?.message||e).slice(0,120)},"?id=eq."+jobId).catch(()=>{});
  console.error("dt_radar_one_shot",JSON.stringify({state:"error",reason:String(e?.message||e).slice(0,120)}));
 }
}
setTimeout(()=>oneShotPilot().catch(()=>{}),7000);
setInterval(()=>{if(Bun.env.RADAR_SYNC_PENDING_ENABLED==="true")synchronize().then(async r=>{const d=await r.json();console.log("dt_radar_sync_tick",JSON.stringify(d).slice(0,900))}).catch(e=>console.error("dt_radar_sync_failure",String(e?.message||e).slice(0,120)))},15*60*1000);




const serperConfigured=()=>Boolean(Bun.env.SERPER_API_KEY&&dbok());
const serperEnabled=()=>serperConfigured()&&Bun.env.RADAR_SERPER_DAILY_ENABLED==="true";
const serperMonthlyCreditCap=()=>Math.min(1200,Math.max(40,Number(Bun.env.RADAR_SERPER_MONTHLY_CREDIT_CAP)||1200));
function parseBRL(v){
 const raw=String(v||"");
 const m=raw.match(/(?:R\$\s*)?(\d{1,3}(?:\.\d{3})*,\d{2})/);
 if(!m)return null;
 const n=Number(m[1].replace(/\./g,"").replace(",","."));
 return Number.isFinite(n)&&n>0&&n<100000000?n:null;
}
function classifySerper(query,title){
 const q=String(query).toLowerCase(),t=String(title).toLowerCase();
 if(/(?:kit|combo|conjunto|acompanh(?:a|ado)|\+|painel acabamento|peça|refil|resistência|controle remoto|cabo avulso|case para|capa para|usado|seminovo|recondicionado|reformado|com contrato|plano de operadora|trocafy|outlet recondicionado)/i.test(t))return "mismatch";
 const toWords=x=>x.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 const wanted=toWords(q),found=toWords(t);
 const tokens=wanted.split(/\s+/).filter(x=>x.length>=3);
 const normalized=x=>x.replace(/[^a-z0-9]/g,"");
 // Product model identifiers are mandatory; dimensions and refresh rates are not model codes.
 const modelTokens=tokens.filter(x=>/[a-z]/.test(x)&&/\d/.test(x)&&!/^\d+(?:hz|gb|tb|w|v|mah|mp|cm|mm)$/i.test(x)).map(normalized);
 if(modelTokens.some(code=>!normalized(found).includes(code)))return "mismatch";
 // An exact product model is stronger evidence than optional marketing descriptors.
 // Keep brand and accessory checks; never reject solely for missing generic adjectives.
 const exactModelMatch=modelTokens.length>0;
 const brand=tokens.find(x=>["acer","samsung","lg","mondial","philco","apple","motorola","xiaomi","asus","lenovo","dell","jbl","electrolux","brastemp","consul","aoc","msi","hp","epson","canon","intel","amd","logitech","philips","multilaser","positivo","lenoxx","arno","oster","britania"].includes(x));
 if(brand&&!found.includes(brand))return "mismatch";
 const variant=found.match(/\b(?:afn[- ]?40[- ]?[a-z]{2,3}|afn40[a-z]{2,3})\b/);
 if(variant&&/afn[- ]?40\b/.test(wanted))return "review_required";
 const meaningful=tokens.filter(x=>!/^\d+(?:hz|gb|tb|w|v|mah|mp|cm|mm)?$/i.test(x)&&!["monitor","gamer","smartphone","celular","notebook","de","com","polegadas"].includes(x));
 const coverage=meaningful.filter(x=>found.includes(x)).length/Math.max(1,meaningful.length);
 return exactModelMatch?"review_required":coverage<0.6?"mismatch":"review_required";
 return "review_required";
}


async function serperGet(q){
 if(!serperConfigured())throw Error("serper_credentials_not_configured");
 const r=await fetch("https://google.serper.dev/shopping",{method:"POST",headers:{"X-API-KEY":Bun.env.SERPER_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({q,gl:"br",hl:"pt-br",num:40,page:1}),signal:AbortSignal.timeout(35000)});
 const d=await r.json().catch(()=>null);
 if(!r.ok||!d||!Array.isArray(d.shopping))throw Error("serper_http_"+r.status);
 return d;
}
async function collectSerper(maxItems=1){
 if(!serperConfigured())return safeJson({error:"serper_credentials_required",charged:false},503);
 const max=Math.max(1,Math.min(20,Number(maxItems)||1)),today=dayBR();
 const [products,used]=await Promise.all([
  supa("GET","dt_radar_products",undefined,"?select=id,search_query&enabled=eq.true&order=created_at.asc&limit=20"),
  supa("GET","dt_radar_collection_jobs",undefined,"?select=id&collection_day=gte."+monthStart()+"&limit=601")
 ]);
 const remaining=Math.min(max,Math.floor((serperMonthlyCreditCap()-used.length*2)/2));
 if(remaining<=0)return safeJson({error:"monthly_credit_cap_reached",creditCap:serperMonthlyCreditCap(),charged:false},429);
 const report=[];
 for(const product of products){
  if(report.length>=remaining)break;
  const prev=await supa("GET","dt_radar_collection_jobs",undefined,"?select=id,state&product_id=eq."+product.id+"&collection_day=eq."+today);
  if(prev.length)continue;
  const reserved=await supa("POST","dt_radar_collection_jobs",[{product_id:product.id,collection_day:today,provider:"serper_google_shopping",state:"not_requested",priority:1,requested_at:new Date().toISOString()}]);
  const job=reserved?.[0];
  if(!job?.id)throw Error("serper_reservation_failed");
  try{
   const result=await serperGet(product.search_query);
   const observedAt=new Date().toISOString(),credits=Number(result.credits)||2;
   const offers=result.shopping.slice(0,40).map(x=>{
    const price=parseBRL(x.price);
    if(!price||!x.title)return null;
    const url=typeof x.link==="string"&&x.link.startsWith("https://")?x.link:null;
    return {product_id:product.id,collection_job_id:job.id,source:"serper_google_shopping",source_product_id:x.productId?String(x.productId).slice(0,150):null,observed_title:String(x.title).slice(0,400),merchant:String(x.source||"Google Shopping").slice(0,200),product_url:url,price,currency:"BRL",match_status:classifySerper(product.search_query,x.title),observed_at:observedAt};
   }).filter(Boolean);
   if(offers.length)await supa("POST","dt_radar_price_observations",offers);
   await supa("PATCH","dt_radar_collection_jobs",{state:"completed",finished_at:new Date().toISOString(),error_message:null},"?id=eq."+job.id);
   report.push({product:product.search_query,state:"completed",offers:offers.length,review:offers.filter(x=>x.match_status==="review_required").length,rejected:offers.filter(x=>x.match_status==="mismatch").length,credits});
   console.log("radar_serper_collection",JSON.stringify(report.at(-1)));
  }catch(err){
   await supa("PATCH","dt_radar_collection_jobs",{state:"failed",finished_at:new Date().toISOString(),error_message:String(err?.message||err).slice(0,160)},"?id=eq."+job.id).catch(()=>{});
   report.push({product:product.search_query,state:"failed",error:String(err?.message||err).slice(0,90)});
   break;
  }
 }
 return safeJson({processed:report.length,results:report,creditCap:serperMonthlyCreditCap()});
}
let serperBusy=false;
async function serperDailyTick(){
 if(serperBusy||!serperEnabled())return;
 const hour=Number(new Intl.DateTimeFormat("en-GB",{timeZone:"America/Sao_Paulo",hour:"2-digit",hourCycle:"h23"}).format(new Date()));
 if(hour<9)return;
 serperBusy=true;
 try{const response=await collectSerper(20);const payload=await response.json();console.log("radar_serper_daily",JSON.stringify({status:response.status,processed:payload.processed||0,error:payload.error||null}))}
 catch(e){console.error("radar_serper_daily_error",String(e?.message||e).slice(0,120))}
 finally{serperBusy=false}
}
setInterval(()=>serperDailyTick().catch(()=>{}),60*60*1000);
setTimeout(async()=>{if(Bun.env.RADAR_SERPER_PILOT_ONCE!=="true")return;
try{const r=await collectSerper(1);const payload=await r.json();console.log("dt_serper_pilot_result",JSON.stringify({status:r.status,payload}).slice(0,1400))}
catch(e){console.error("dt_serper_pilot_result",JSON.stringify({error:String(e?.message||e).slice(0,150)}))}
},5500);




const marketPilotProductQuery="Samsung Galaxy A56 256GB";
async function pilotMarketplaceOrganic(){
 if(Bun.env.RADAR_ML_LINK_PILOT_ONCE!=="true")return;
 if(!serperConfigured())return console.log("dt_ml_pilot",JSON.stringify({error:"serper_not_configured"}));
 try{
  const prod=await supa("GET","dt_radar_products",undefined,"?select=id,search_query&search_query=eq.Samsung%20Galaxy%20A56%20256GB&limit=1");
  if(!prod.length)return console.log("dt_ml_pilot",JSON.stringify({error:"product_not_found"}));
  const prior=await supa("GET","dt_radar_marketplace_listings",undefined,"?select=id&product_id=eq."+prod[0].id+"&limit=1");
  if(prior.length)return console.log("dt_ml_pilot",JSON.stringify({skipped:"results_already_exist"}));
  const query='Samsung Galaxy A56 256GB Mercado Livre anúncios';
  const response=await fetch("https://google.serper.dev/search",{method:"POST",headers:{"X-API-KEY":Bun.env.SERPER_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({q:query,gl:"br",hl:"pt-br",num:20}),signal:AbortSignal.timeout(25000)});
  const data=await response.json().catch(()=>null);
  if(!response.ok||!Array.isArray(data?.organic))throw Error("serper_search_http_"+response.status+":"+JSON.stringify({message:data?.message,error:data?.error,details:data?.details}).slice(0,250));
  const candidates=data.organic.filter(x=>{
   const url=String(x.link||"");
   let host;try{host=new URL(url).hostname}catch{return false}
   if(!/(^|\.)mercadolivre\.com\.br$/.test(host))return false;
   if(!/\/MLB-\d{7,15}(?:[/?#-]|$)/i.test(url))return false;
   const normalized=String(x.title||"").toLowerCase().replace(/\s+/g," ");
   if(!/(?:galaxy\s*a56|samsung\s*a56)/.test(normalized))return false;
   if(!/256\s*gb|256gb/i.test(normalized))return false;
   if(/(?:usado|recondicionado|seminovo|kit|combo|a36|a55|capa|pelicula)/i.test(normalized))return false;
   return true
  });
  const seen=new Set();
  const rows=[];
  for(const x of candidates){
   const url=new URL(x.link);url.search="";url.hash="";
   const id=url.pathname.match(/\/(MLB-\d{7,15})(?:[/-]|$)/i)?.[1]?.toUpperCase();
   if(!id||seen.has(id))continue;seen.add(id);
   rows.push({product_id:prod[0].id,marketplace:"Mercado Livre",listing_id:id,title:String(x.title).slice(0,350),product_url:url.href,price:null,source:"serper_organic_link_search",match_status:"review_required"});
   if(rows.length>=10)break
  }
  if(rows.length)await supa("POST","dt_radar_marketplace_listings",rows);
  console.log("dt_ml_pilot",JSON.stringify({state:"completed",organic:data.organic.length,accepted:rows.length,credits:data.credits??null,listingIds:rows.map(r=>r.listing_id)}));
 }catch(e){console.error("dt_ml_pilot",JSON.stringify({error:String(e?.message||e).slice(0,150)}))}
}
setTimeout(()=>pilotMarketplaceOrganic().catch(()=>{}),9000);


async function probeMercadoLivrePublic(){
 if(Bun.env.RADAR_ML_API_PROBE_ONCE!=="true")return;
 const tests=[
  ["public_search","https://api.mercadolibre.com/sites/MLB/search?q=Samsung%20Galaxy%20A56%20256GB&limit=3"],
  ["catalog_product","https://api.mercadolibre.com/products/MLB47114363"],
  ["catalog_item","https://api.mercadolibre.com/items/MLB47114363"]
 ];
 for(const [name,url] of tests){
  try{
   const r=await fetch(url,{headers:{Accept:"application/json"},signal:AbortSignal.timeout(8500)});
   const d=await r.json().catch(()=>null);
   console.log("dt_meli_api_probe",JSON.stringify({name,status:r.status,results:Array.isArray(d?.results)?d.results.length:null,code:String(d?.error||d?.code||"").slice(0,70),message:String(d?.message||"").slice(0,90)}))
  }catch(e){console.log("dt_meli_api_probe",JSON.stringify({name,error:String(e?.message||e).slice(0,90)}))}
 }
}
setTimeout(()=>probeMercadoLivrePublic().catch(()=>{}),5000);


const mlReady=()=>Boolean(Bun.env.MELI_ACCESS_TOKEN&&dbok());
function mlListingIsCompatible(query,item){
 if(item?.condition!=="new"||!item?.id||!item?.permalink||!Number.isFinite(Number(item.price)))return false;
 const title=String(item.title||"");
 if(/(?:recondicionado|seminovo|usado|kit|combo|capa|pelicula|case|caixa aberta|open box)/i.test(title))return false;
 return classifySerper(query,title)!=="mismatch";
}
async function mlCollectOfficial(){
 const accessToken=await meliActiveAccessToken().catch(()=>null);
 if(!accessToken)return safeJson({error:"mercadolivre_oauth_token_required",charged:false},503);
 const product=(await supa("GET","dt_radar_products",undefined,"?select=id,search_query&search_query=eq.Samsung%20Galaxy%20A56%20256GB&limit=1"))[0];
 if(!product)return safeJson({error:"pilot_product_not_found"},404);
 const recent=await supa("GET","dt_radar_marketplace_listings",undefined,"?select=id,observed_at&product_id=eq."+product.id+"&source=eq.mercadolivre_api&observed_at=gte."+new Date(Date.now()-12*3600000).toISOString()+"&limit=1");
 if(recent.length)return safeJson({error:"manual_cooldown_12h",charged:false},429);
 const u=new URL("https://api.mercadolibre.com/sites/MLB/search");
 u.searchParams.set("q",product.search_query);
 u.searchParams.set("limit","50");
 const r=await fetch(u,{headers:{Authorization:"Bearer "+accessToken,Accept:"application/json"},signal:AbortSignal.timeout(18000)});
 const d=await r.json().catch(()=>null);
 if(!r.ok||!Array.isArray(d?.results)){
  console.log("dt_meli_collect",JSON.stringify({status:r.status,error:String(d?.error||d?.message||"unavailable").slice(0,100)}));
  return safeJson({error:"mercadolivre_api_unavailable",providerHttpStatus:r.status,charged:false},502)
 }
 const eligible=d.results.filter(x=>mlListingIsCompatible(product.search_query,x));
 const usedSeller=new Set(),usedId=new Set(),rows=[];
 for(const item of eligible.sort((a,b)=>a.price-b.price)){
  const seller=String(item.seller?.id||"");
  const id=String(item.id||"").toUpperCase();
  if(!/^MLB\d{7,15}$/.test(id)||!seller||usedSeller.has(seller)||usedId.has(id))continue;
  let direct;try{direct=new URL(item.permalink);if(!/(^|\.)mercadolivre\.com\.br$/.test(direct.hostname)||direct.protocol!=="https:")continue}catch{continue}
  usedSeller.add(seller);usedId.add(id);
  rows.push({product_id:product.id,marketplace:"Mercado Livre",listing_id:id,title:String(item.title).slice(0,350),product_url:direct.href,seller_name:seller,price:Number(item.price),currency:"BRL",source:"mercadolivre_api",match_status:"review_required",page_check_status:"verified",page_checked_at:new Date().toISOString(),page_price:Number(item.price),page_currency:"BRL",page_price_source:"mercadolivre_api"});
  if(rows.length>=8)break;
 }
 const prior=await supa("GET","dt_radar_marketplace_listings",undefined,"?select=listing_id&product_id=eq."+product.id+"&limit=200");
 const existing=new Set(prior.map(x=>x.listing_id));
 const fresh=rows.filter(x=>!existing.has(x.listing_id));
 if(fresh.length)await supa("POST","dt_radar_marketplace_listings",fresh);
 publicPriceCache.value=null;
 console.log("dt_meli_collect",JSON.stringify({status:"completed",apiResults:d.results.length,eligible:eligible.length,uniqueSellers:rows.length,saved:fresh.length}));
 return safeJson({provider:"mercadolivre_api",pilotQuery:product.search_query,apiResults:d.results.length,compatible:eligible.length,uniqueSellers:rows.length,saved:fresh.length,source:"official",status:"review_required"});
}


async function probeUniversalLinkLocator(){
 if(Bun.env.RADAR_UNIVERSAL_LINK_PILOT_ONCE!=="true"||!serperConfigured())return;
 const searches=[
  "Samsung Galaxy A56 5G 256GB 12GB RAM Preto Mercado Livre comprar",
  "Samsung Galaxy A56 5G 256GB 8GB RAM Uau Caixa comprar"
 ];
 for(const q of searches){
  try{
   const r=await fetch("https://google.serper.dev/search",{method:"POST",headers:{"X-API-KEY":Bun.env.SERPER_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({q,gl:"br",hl:"pt-br",num:12}),signal:AbortSignal.timeout(24000)});
   const d=await r.json().catch(()=>null);
   const items=Array.isArray(d?.organic)?d.organic.slice(0,12).map((x,i)=>({position:i+1,title:String(x.title||"").slice(0,125),url:String(x.link||"").slice(0,300)})):[];
   console.log("dt_universal_locator_probe",JSON.stringify({q,status:r.status,credits:d?.credits??null,message:String(d?.message||"").slice(0,120),items}).slice(0,5500))
  }catch(e){console.error("dt_universal_locator_probe",String(e?.message||e).slice(0,160))}
 }
}
setTimeout(()=>probeUniversalLinkLocator().catch(()=>{}),6000);


const organicShopMerchants={
 Amazon:{title:"Amazon",search:"Amazon Brasil",host:/^(?:[a-z0-9-]+\.)?amazon\.com\.br$/i},
 "Uau CAIXA":{title:"Uau CAIXA",search:"Uau Caixa Rosa",host:/^(?:[a-z0-9-]+\.)?uaucaixa\.com\.br$/i}
};
function organicLinkTitleMatches(query,title){
 const q=String(query||"").toLowerCase(),t=String(title||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 if(!/galaxy\s*a56/.test(t)||!/256\s*gb|256gb/.test(t)||!/8\s*gb(?:\s*ram)?|8gb(?:\s*ram)?|ram\s*8/.test(t))return false;
 if(/(?:usado|seminovo|recondicionado|reformado|kit|combo|capa|pelicula|capinha|soundbar|galaxy\s*buds|galaxy\s*fit|caixa\s*aberta|open\s*box|brinde|acompanhado)/i.test(t))return false;
 return /galaxy\s*a56/.test(q)&&/256/.test(q)
}
function organicDirectListing(urlString,merchant){
 try{
  const u=new URL(urlString);
  if(u.protocol!=="https:"||!organicShopMerchants[merchant].host.test(u.hostname))return null;
  u.hash="";
  if(merchant==="Amazon"){
   const m=u.pathname.match(/(?:\/dp\/|\/gp\/product\/)(B0[A-Z0-9]{8})\b/i);
   if(!m)return null;
   u.search="";
   return {url:u.href,listingId:m[1].toUpperCase()}
  }
  if(merchant==="Uau CAIXA"){
   if(!/^\/(?:extra|casasbahia|satelitalsamsung)\//i.test(u.pathname))return null;
   const code=decodeURIComponent(u.pathname).match(/\/([A-Z0-9-]{5,40})\/?$/i)?.[1];
   if(!code)return null;
   u.search="";
   return {url:u.href,listingId:code}
  }
 }catch{}
 return null
}
async function locateProductWithSerper(productId,merchant){
 if(!serperConfigured())return safeJson({error:"serper_not_configured"},503);
 const conf=organicShopMerchants[merchant];
 if(!conf)return safeJson({error:"merchant_not_supported"},400);
 const product=(await supa("GET","dt_radar_products",undefined,"?select=id,search_query&enabled=eq.true&id=eq."+encodeURIComponent(productId)+"&limit=1"))[0];
 if(!product)return safeJson({error:"catalog_product_not_found"},404);
 // This pilot only supports the exact A56 configuration. Other catalog models
 // need a dedicated identifier/variant parser before any SERP is charged.
 if(product.search_query!=="Samsung Galaxy A56 256GB")return safeJson({error:"pilot_only_for_samsung_a56"},422);
 const day=dayBR(),month=monthStart();
 const [existing,daily,monthly]=await Promise.all([
  supa("GET","dt_radar_locator_runs",undefined,"?select=id,state,found_count&product_id=eq."+product.id+"&merchant=eq."+encodeURIComponent(merchant)+"&run_day=eq."+day+"&limit=1"),
  supa("GET","dt_radar_locator_runs",undefined,"?select=id&run_day=eq."+day+"&limit=3"),
  supa("GET","dt_radar_locator_runs",undefined,"?select=id&run_day=gte."+month+"&limit=61")
 ]);
 if(existing.length)return safeJson({provider:"serper_organic",cached:true,merchant,runState:existing[0].state,found:existing[0].found_count,charged:false});
 if(daily.length>=2||monthly.length>=60)return safeJson({error:"locator_credit_cap_reached",dailyCap:2,monthlyCap:60,charged:false},429);
 const reserved=await supa("POST","dt_radar_locator_runs",[{product_id:product.id,merchant,run_day:day,state:"reserved",credits:1}]);
 const run=reserved[0];
 if(!run?.id)throw Error("locator_reservation_failed");
 try{
  const query=product.search_query+" 8GB RAM "+conf.search+" comprar";
  const r=await fetch("https://google.serper.dev/search",{method:"POST",headers:{"X-API-KEY":Bun.env.SERPER_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({q:query,gl:"br",hl:"pt-br",num:12}),signal:AbortSignal.timeout(26000)});
  const d=await r.json().catch(()=>null);
  if(!r.ok||!Array.isArray(d?.organic))throw Error("serper_http_"+r.status+":"+String(d?.message||"").slice(0,90));
  const candidates=[],ids=new Set();
  for(const item of d.organic){
   if(!organicLinkTitleMatches(product.search_query,item.title))continue;
   const parsed=organicDirectListing(item.link,merchant);
   if(!parsed||ids.has(parsed.listingId))continue;
   ids.add(parsed.listingId);
   candidates.push({product_id:product.id,marketplace:merchant,listing_id:parsed.listingId,title:String(item.title).slice(0,350),product_url:parsed.url,seller_name:null,price:null,currency:"BRL",source:"serper_organic_direct_candidate",match_status:"review_required"});
   if(candidates.length>=1)break;
  }
  const saved=(await supa("GET","dt_radar_marketplace_listings",undefined,"?select=product_url&product_id=eq."+product.id+"&limit=100")).map(x=>x.product_url);
  const rows=candidates.filter(x=>!saved.includes(x.product_url));
  if(rows.length)await supa("POST","dt_radar_marketplace_listings",rows);
  await supa("PATCH","dt_radar_locator_runs",{state:"completed",found_count:candidates.length,credits:Number(d.credits)||1,finished_at:new Date().toISOString()},"?id=eq."+run.id);
  publicPriceCache.value=null;
  console.log("dt_universal_locator_save",JSON.stringify({merchant,state:"completed",organic:d.organic.length,accepted:candidates.length,newLinks:rows.length,credits:d.credits??1,paths:candidates.map(x=>x.listing_id)}));
  return safeJson({provider:"serper_organic",merchant,organicResults:d.organic.length,accepted:candidates.length,saved:rows.length,credits:Number(d.credits)||1,priceVerified:false});
 }catch(e){
  await supa("PATCH","dt_radar_locator_runs",{state:"failed",error_message:String(e?.message||e).slice(0,150),finished_at:new Date().toISOString()},"?id=eq."+run.id).catch(()=>{});
  console.error("dt_universal_locator_save",JSON.stringify({merchant,state:"failed",reason:String(e?.message||e).slice(0,150)}));
  return safeJson({error:"locator_unavailable",merchant,details:String(e?.message||e).slice(0,90)},503)
 }
}
async function pilotSaveUniversalLinks(){
 if(Bun.env.RADAR_UNIVERSAL_LINK_SAVE_ONCE!=="true")return;
 try{
  const p=(await supa("GET","dt_radar_products",undefined,"?select=id&search_query=eq.Samsung%20Galaxy%20A56%20256GB&limit=1"))[0];
  if(!p)return;
  for(const merchant of ["Amazon","Uau CAIXA"]){
   const r=await locateProductWithSerper(p.id,merchant);
   console.log("dt_universal_locator_pilot_result",JSON.stringify({merchant,http:r.status,result:await r.json()}).slice(0,700))
  }
 }catch(e){console.error("dt_universal_locator_pilot_result",String(e?.message||e).slice(0,170))}
}
setTimeout(()=>pilotSaveUniversalLinks().catch(()=>{}),9500);

function safeMerchantLink(v){
 try{
  const u=new URL(String(v||""));
  if(u.protocol!=="https:")return null;
  const host=u.hostname.toLowerCase();
  if(/(^|\.)(google\.[a-z.]+|googleusercontent\.com|gstatic\.com|youtube\.com)$/.test(host))return null;
  return u.href
 }catch{return null}
}

function merchantPageSafeURL(input){
 try{
  const u=new URL(String(input||""));
  if(u.protocol!=="https:"||u.username||u.password||u.port||u.searchParams.has("callback"))return null;
  if(!["www.amazon.com.br","amazon.com.br","uaucaixa.com.br","www.uaucaixa.com.br"].includes(u.hostname.toLowerCase()))return null;
  return u
 }catch{return null}
}
function merchantMeta(html,key){
 const tags=html.match(/<meta\b[^>]*>/gi)||[];
 for(const tag of tags.slice(0,180)){
  const attrs={};for(const m of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g))attrs[m[1].toLowerCase()]=m[2]??m[3]??m[4];
  if([attrs.property,attrs.name,attrs.itemprop].includes(key))return attrs.content||""
 }
 return ""
}
function merchantPriceNumber(v){
 if(typeof v==="number")return Number.isFinite(v)&&v>=10&&v<1000000?Math.round(v*100)/100:null;
 const text=String(v??"").replace(/R\$\s*/,"").replace(/\s/g,"");
 if(!/^\d{1,7}(?:[,.]\d{1,2})?$|^\d{1,3}(?:\.\d{3})+,\d{2}$/.test(text))return null;
 const canonical=text.includes(",")?text.replace(/\./g,"").replace(",","."):text;
 const n=Number(canonical);return Number.isFinite(n)&&n>=10&&n<1000000?Math.round(n*100)/100:null
}
function merchantTitleMatches(pageTitle,listingTitle){
 const t=String(pageTitle||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ");
 const l=String(listingTitle||"").toLowerCase();
 if(!/samsung/.test(t)||!/galaxy\s*a56/.test(t)||!/256\s*gb|256gb/.test(t))return false;
 if(/(?:usado|seminovo|recondicionado|reformado|combo|kit|capinha|pelicula|caixa\s*aberta|open\s*box|galaxy\s*buds|galaxy\s*fit)/i.test(t))return false;
 const expected=l.match(/(?:8|12)\s*gb\s*ram|ram\s*(?:8|12)\s*gb/i)?.[0].match(/\d+/)?.[0];
 if(expected){
  const found=t.match(/(?:8|12)\s*gb\s*ram|ram\s*(?:8|12)\s*gb/i)?.[0].match(/\d+/)?.[0];
  if(!found||found!==expected)return false;
 }
 return true
}
function merchantSchemaOffers(html,listingTitle){
 const scripts=[...html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].slice(0,35);
 const offers=[];
 const scan=(node,depth=0)=>{
  if(!node||typeof node!=="object"||depth>8)return;
  if(Array.isArray(node)){for(const x of node.slice(0,60))scan(x,depth+1);return}
  const type=Array.isArray(node["@type"])?node["@type"].join(" "):String(node["@type"]||"");
  if(/\bProduct\b/i.test(type)){
   const name=String(node.name||"");
   if(merchantTitleMatches(name,listingTitle)){
    for(const o of [node.offers].flat().filter(Boolean)){
     const v=merchantPriceNumber(o.price??o.lowPrice);
     const currency=String(o.priceCurrency||o.priceSpecification?.priceCurrency||"BRL").toUpperCase();
     if(v&&currency==="BRL"&&(!o.availability||!/outofstock|soldout|discontinued/i.test(String(o.availability))))offers.push({name,price:v,method:"structured_data",currency:"BRL"})
    }
   }
  }
  for(const k of ["@graph","mainEntity","itemListElement","product","subjectOf"])if(node[k])scan(node[k],depth+1)
 };
 for(const m of scripts){try{scan(JSON.parse(m[1].trim()),0)}catch{}}
 return offers
}

function amazonCurrentPriceFromHTML(html,listingTitle,pageTitle){
 if(!merchantTitleMatches(pageTitle,listingTitle))return null;
 const values=[];
 // Only accept the visible price-to-pay component, never a nearby crossed-out/list/instalment price.
 const nodes=html.matchAll(/<span\b[^>]*class\s*=\s*["'][^"']*\bpriceToPay\b[^"']*["'][^>]*>/gi);
 for(const node of nodes){
  const sample=html.slice(node.index+node[0].length,node.index+node[0].length+1100);
  // The first offscreen price in the priceToPay span is Amazon's accessible payable price.
  const found=sample.match(/<span\b[^>]*class\s*=\s*["'][^"']*\ba-offscreen\b[^"']*["'][^>]*>\s*(R\$\s*[\d.\s]+,\d{2})\s*<\/span>/i);
  if(!found)continue;
  const price=parseBRL(found[1]);
  if(price&&price>=200&&price<=20000)values.push(price)
 }
 const distinct=[...new Set(values)];
 return distinct.length===1?{price:distinct[0],name:pageTitle,method:"amazon_price_to_pay",currency:"BRL",candidates:values.length}:null
}

async function fetchMerchantHTML(url){
 let safe=merchantPageSafeURL(url);if(!safe)throw Error("merchant_url_not_allowlisted");
 for(let redirect=0;redirect<3;redirect++){
  const res=await fetch(safe.href,{method:"GET",redirect:"manual",signal:AbortSignal.timeout(15000),headers:{"Accept":"text/html,application/xhtml+xml","User-Agent":"Mozilla/5.0 (compatible; RadarTurboPriceVerifier/1.0)"}});
  if(res.status>=300&&res.status<400){
   const location=res.headers.get("location");const next=location?merchantPageSafeURL(new URL(location,safe).href):null;
   if(!next)throw Error("redirect_not_allowlisted");safe=next;continue
  }
  if(res.status===403||res.status===429||res.status===503)throw Error("merchant_access_blocked_"+res.status);
  if(!res.ok)throw Error("merchant_http_"+res.status);
  if(!String(res.headers.get("content-type")||"").toLowerCase().includes("text/html"))throw Error("merchant_not_html");
  // Stream a bounded preview of a large catalog page; never load unlimited HTML.
  const reader=res.body?.getReader();if(!reader)throw Error("merchant_missing_body");
  const chunks=[];let total=0;
  while(true){
   const {done,value}=await reader.read();if(done)break;
   total+=value.byteLength;
   if(total>3200000){await reader.cancel();break}
   chunks.push(value)
  }
  const bytes=new Uint8Array(total);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength}
  return {html:new TextDecoder().decode(bytes),url:safe.href,size:total}
 }
 throw Error("merchant_excessive_redirect")
}
async function inspectSavedMerchantPages(){
 if(!dbok())return;
 const list=await supa("GET","dt_radar_marketplace_listings",undefined,"?select=id,product_url,title,marketplace&page_check_status=eq.not_checked&source=eq.serper_organic_direct_candidate&order=created_at.asc&limit=2");
 for(const item of list){
  let state="unavailable",pageTitle=null,price=null,method=null,note=null;
  try{
   const page=await fetchMerchantHTML(item.product_url);
   const metas=[merchantMeta(page.html,"og:title"),merchantMeta(page.html,"twitter:title")];
   const titleTag=page.html.match(/<title[^>]*>([^<]{5,350})<\/title>/i)?.[1]||"";
   pageTitle=metas.find(Boolean)||titleTag;
   const offers=merchantSchemaOffers(page.html,item.title);
   if(item.marketplace==="Amazon"&&offers.length===0){
    const amazon=amazonCurrentPriceFromHTML(page.html,item.title,pageTitle);
    if(amazon)offers.push(amazon)
   }
   if(offers.length===1){
    price=offers[0].price;pageTitle=offers[0].name;method=offers[0].method;state="verified";
   }else if(offers.length>1){
    const unique=new Set(offers.map(o=>o.price));
    if(unique.size===1){price=offers[0].price;pageTitle=offers[0].name;method=offers[0].method;state="verified"}
    else{state="price_unavailable";note="multiple_conflicting_offer_prices"}
   }else if(pageTitle&&/(samsung|galaxy|smartphone)/i.test(pageTitle)&&!merchantTitleMatches(pageTitle,item.title)){state="variant_mismatch";note="merchant_product_title_mismatch"}
   else{state="price_unavailable";note="no_exact_product_price_in_structured_data"}
   console.log("dt_merchant_page_probe",JSON.stringify({merchant:item.marketplace,state,size:page.size,foundPriceCandidates:offers.length,priceFound:price!==null,source:method}))
  }catch(e){
   note=String(e?.message||e).slice(0,120);
   state=/blocked_/.test(note)?"blocked":"unavailable";
   console.log("dt_merchant_page_probe",JSON.stringify({merchant:item.marketplace,state,note}))
  }
  await supa("PATCH","dt_radar_marketplace_listings",{page_check_status:state,page_checked_at:new Date().toISOString(),page_observed_title:pageTitle?.slice(0,350)||null,page_price:price,page_currency:price!==null?"BRL":null,page_price_source:method,page_check_note:note},"?id=eq."+item.id);
 }
 publicPriceCache.value=null;
}
setTimeout(()=>{if(Bun.env.RADAR_MERCHANT_PAGE_CHECK_ONCE==="true")inspectSavedMerchantPages().catch(e=>console.error("dt_merchant_page_probe",String(e?.message||e).slice(0,150)))},6000);


async function diagnoseMerchantPagePrice(){
 if(Bun.env.RADAR_AMAZON_PRICE_DIAG_ONCE!=="true")return;
 try{
  const rows=await supa("GET","dt_radar_marketplace_listings",undefined,"?select=product_url,title,marketplace&marketplace=eq.Amazon&limit=1");
  if(!rows.length)return;
  const {html}=await fetchMerchantHTML(rows[0].product_url);
  const marker=html.indexOf("priceToPay");
  const blocks=["corePriceDisplay_desktop_feature_div","corePrice_feature_div","priceToPay","a-offscreen","priceblock_ourprice","product:price:amount","og:price:amount"].map(x=>({name:x,count:html.split(x).length-1}));
  let samples=[];
  if(marker>=0){
   const chunk=html.slice(Math.max(0,marker-500),marker+5000);
   samples=[...chunk.matchAll(/R\$\s*[\d.,\s]{3,20}/g)].slice(0,7).map(x=>x[0].trim());
  }
  const meta=["product:price:amount","og:price:amount","product:price:currency"].map(x=>({name:x,has:!!merchantMeta(html,x)}));
  console.log("dt_amazon_price_diag",JSON.stringify({size:html.length,blocks,meta,samples,productTitleMatches:merchantTitleMatches(merchantMeta(html,"og:title"),rows[0].title)}));
 }catch(e){console.error("dt_amazon_price_diag",String(e?.message||e).slice(0,160))}
}
setTimeout(()=>diagnoseMerchantPagePrice().catch(()=>{}),7800);


function validateUniversalQuery(raw){
 if(typeof raw!=="string")return null;
 const q=raw.normalize("NFKC").replace(/\s+/g," ").trim();
 if(q.length<3||q.length>140||/[<>{}[\]\\]/.test(q)||/https?:\/\/|www\./i.test(q))return null;
 if(!/[\p{L}\p{N}]/u.test(q))return null;
 return {q,key:q.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim().slice(0,125)}
}

function directLocatorKey(store,title){
 return (store+" "+String(title||"")).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim().slice(0,180)
}
const verifiedMerchantOfferPages={
 // Exact Serper Shopping product ID -> independently checked merchant product URL.
 // Only same item and variant are allowed. Merchant prices can change.
 "443314646027822037":{merchant:"Horizon Play",variant:"Rosa",url:"https://www.horizonplay.com.br/produto/smartphone-samsung-galaxy-a56-5g-256gb-12gb-ram-rosa-244311"},
 "6822306136806371182":{merchant:"Horizon Play",variant:"Verde Oliva",url:"https://www.horizonplay.com.br/produto/smartphone-samsung-galaxy-a56-5g-256gb-12gb-ram-verde-oliva-244316"},
 "12614958663453282684":{merchant:"Horizon Play",variant:"Cinza",url:"https://www.horizonplay.com.br/produto/smartphone-samsung-galaxy-a56-5g-256gb-12gb-ram-cinza-244317"}
};
function verifiedMerchantOfferPage(offer){
 const known=verifiedMerchantOfferPages[String(offer?.productId||"")];
 if(!known||String(offer.merchant||"").trim().toLowerCase()!==known.merchant.toLowerCase())return null;
 const title=String(offer.title||"");
 if(!/galaxy\s*a56/i.test(title)||!/256\s*gb/i.test(title)||!/12\s*gb\s*ram|ram\s*12\s*gb/i.test(title))return null;
 const name=title.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 const expected=known.variant.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 if(!name.includes(expected))return null;
 return known.url;
}
async function enrichOffersFromTrustedLinks(offers){
 if(!Array.isArray(offers)||!offers.length)return Array.isArray(offers)?offers:[];
 offers=offers.map(o=>{const url=verifiedMerchantOfferPage(o);return url?{...o,url,linkFrom:'merchant_exact_product',linkPriceVerified:false}:o});
 const candidates=offers.filter(o=>!safeMerchantLink(o.url)&&directLocatorStore(o.merchant));
 if(!candidates.length)return offers;
 // Cached, merchant-specific organic product URLs; no paid Serper request here.
 const rows=await supa("GET","dt_radar_direct_link_cache",undefined,
  "?select=cache_key,merchant,listing_title,link_url,result_title,match_level,checked_at&state=eq.ready&cache_until=gt."+encodeURIComponent(new Date().toISOString())+"&limit=200");
 const byKey=new Map(rows.map(r=>[r.cache_key,r]));
 return offers.map(o=>{
  if(safeMerchantLink(o.url))return o;
  const store=directLocatorStore(o.merchant);
  if(!store)return o;
  const candidate=byKey.get(directLocatorKey(store,o.title));
  if(!candidate||candidate.match_level!=="same_variant")return o;
  const direct=directLocatorURL(candidate.link_url,store);
  if(!direct||(directLocatorVersion(o.title,candidate.result_title)||dtGenericProductMatch(o.title,candidate.result_title))!=="same_variant")return o;
  return {...o,url:direct,linkFrom:"matched_product_page",linkCheckedAt:candidate.checked_at,
   linkPriceVerified:false,linkVariantTitle:candidate.result_title};
 })
}

async function validateMerchantLinkEnrichment(){
 if(Bun.env.RADAR_LINK_ENRICH_CHECK_ONCE!=="true")return;
 try{
  const rows=await supa("GET","dt_radar_adhoc_cache",undefined,"?select=offers&query_key=eq.samsung%20galaxy%20a56%20256gb&limit=1");
  const input=Array.isArray(rows[0]?.offers)?rows[0].offers:[];
  const processed=await enrichOffersFromTrustedLinks(input);
  console.log("dt_verified_offers_enriched",JSON.stringify({input:input.length,output:processed.length,withDirectLinks:processed.filter(x=>!!safeMerchantLink(x.url)).length,verifiedHorizon:processed.filter(x=>x.linkFrom==="merchant_exact_product").map(x=>({id:x.productId,color:x.title.match(/rosa|verde oliva|cinza/i)?.[0]||"unknown",price:x.price,validHost:new URL(x.url).hostname==="www.horizonplay.com.br"}))}));
 }catch(e){console.log("dt_verified_offers_enriched",JSON.stringify({error:String(e?.message||e).slice(0,90)}))}
}
setTimeout(()=>validateMerchantLinkEnrichment().catch(()=>{}),8000);
const radarMerchantStores={
 ml:{label:"Mercado Livre",query:"Mercado Livre",store:/mercado\s*livre|mercadolivre/i},
 shopee:{label:"Shopee",query:"Shopee",store:/shopee/i},
 amazon:{label:"Amazon",query:"Amazon Brasil",store:/amazon/i},
 magalu:{label:"Magalu",query:"Magazine Luiza",store:/magalu|magazine\s*luiza/i}
};
async function universalMerchantSearch(q,storeId){
 const conf=radarMerchantStores[String(storeId||"")];
 const v=validateUniversalQuery(q);
 if(!conf||!v||v.key.length<3)return safeJson({error:"invalid_query_or_store"},400);
 const query=v.q+" "+conf.query;
 const cacheKey=(v.key+" "+storeId).slice(0,125);
 const booking=await supa("POST","rpc/dt_radar_reserve_adhoc_search",{p_key:cacheKey,p_query:query});
 if(!booking||typeof booking.action!=="string")throw Error("merchant_cache_failed");
 if(booking.action==="cached"){
  const all=Array.isArray(booking.offers)?booking.offers:[];
  const matches=all.filter(x=>conf.store.test(String(x.merchant||"")));
  return safeJson({status:"ready",store:conf.label,cached:true,offers:await enrichOffersFromTrustedLinks(matches),checkedAt:booking.checkedAt,rawCount:booking.rawCount,credits:0})
 }
 if(booking.action!=="reserved"){
  const status=["daily_limit","monthly_limit"].includes(booking.action)?429:booking.action==="invalid"?400:202;
  return safeJson({status:booking.action,store:conf.label,cached:false,charged:false},status);
 }
 const runId=booking.runId,at=new Date().toISOString();
 try{
  const result=await serperGet(query);
  const offers=[];
  for(const x of result.shopping.slice(0,40)){
   if(!conf.store.test(String(x.source||"")))continue;
   const price=parseBRL(x.price),title=String(x.title||"");
   if(!price||classifySerper(v.q,title)==="mismatch"||/usado|recondicionado|seminovo|capa|pelicula|kit|combo/i.test(title))continue;
   const direct=safeMerchantLink(x.link);
   let url=null;
   if(direct){
    try{
     const host=new URL(direct).hostname.toLowerCase();
     const allow={ml:/(^|\.)mercadolivre\.com\.br$/,shopee:/(^|\.)shopee\.com\.br$/,amazon:/(^|\.)amazon\.com\.br$/,magalu:/(^|\.)magazineluiza\.com\.br$/};
     if(allow[storeId].test(host))url=direct;
    }catch{}
   }
   offers.push({title:title.slice(0,280),merchant:conf.label,price,date:at,currency:"BRL",url,
    status:"review_required",source:"Serper / Google Shopping",productId:x.productId?String(x.productId).slice(0,100):null});
  }
  const unique=[...new Map(offers.map(x=>[String(x.productId||x.title)+"|"+x.price,x])).values()].slice(0,16);
  const credits=Math.max(1,Number(result.credits)||2);
  await supa("PATCH","dt_radar_adhoc_cache",{state:"ready",offers:unique,raw_count:result.shopping.length,rejected_count:result.shopping.length-unique.length,cache_until:new Date(Date.now()+86400000).toISOString(),updated_at:at,error_code:null},"?query_key=eq."+encodeURIComponent(cacheKey)+"&current_run_id=eq."+runId);
  await supa("PATCH","dt_radar_adhoc_runs",{state:"completed",credits_actual:credits,returned_offers:unique.length,finished_at:at},"?id=eq."+runId).catch(()=>{});
  console.log("dt_merchant_store_search",JSON.stringify({store:storeId,raw:result.shopping.length,matching:unique.length,credits}));
  return safeJson({status:"ready",store:conf.label,cached:false,checkedAt:at,offers:await enrichOffersFromTrustedLinks(unique),credits});
 }catch(err){
  const message=String(err?.message||"provider_error").slice(0,85);
  await Promise.all([
   supa("PATCH","dt_radar_adhoc_cache",{state:"failed",error_code:message,updated_at:at,cache_until:new Date(Date.now()+7*60000).toISOString()},"?query_key=eq."+encodeURIComponent(cacheKey)+"&current_run_id=eq."+runId).catch(()=>{}),
   supa("PATCH","dt_radar_adhoc_runs",{state:"failed",error_code:message,finished_at:at},"?id=eq."+runId).catch(()=>{})
  ]);
  return safeJson({error:"merchant_search_unavailable",store:conf.label},503);
 }
}
setTimeout(async()=>{if(Bun.env.RADAR_STORE_SEARCH_PILOT_ONCE!=="true")return;for(const store of ["ml","shopee","amazon","magalu"]){try{const response=await universalMerchantSearch("Samsung Galaxy A56 256GB",store);const result=await response.json();console.log("dt_store_search_pilot",JSON.stringify({http:response.status,store,ready:result.status,offers:result.offers?.length||0,withDirectUrl:result.offers?.filter(x=>!!safeMerchantLink(x.url)).length||0,cached:result.cached||false,error:result.error||null}));}catch(e){console.log("dt_store_search_pilot",JSON.stringify({store,error:String(e?.message||e).slice(0,85)}))}}},9000);
async function universalProductSearch(q){
 if(!serperConfigured())return safeJson({error:"search_unavailable"},503);
 const v=validateUniversalQuery(q);
 if(!v||v.key.length<3)return safeJson({error:"invalid_query"},400);
 const reserved=await supa("POST","rpc/dt_radar_reserve_adhoc_search",{p_key:v.key,p_query:v.q});
 if(!reserved||typeof reserved.action!=="string")throw Error("adhoc_reservation_invalid");
 if(reserved.action==="cached"){
  const rawOffers=Array.isArray(reserved.offers)?reserved.offers:[];
  const enriched=await enrichOffersFromTrustedLinks(rawOffers);
  console.log("dt_adhoc_cached_links",JSON.stringify({queryKey:v.key,offers:enriched.length,merchantLinks:enriched.filter(x=>x.linkFrom==="matched_product_page").length}));
  return safeJson({query:v.q,cached:true,checkedAt:reserved.checkedAt,rawCount:reserved.rawCount,rejected:reserved.rejected,offers:enriched,source:"serper_google_shopping",status:"ready"})
 }
 if(reserved.action!=="reserved"){
  const code=reserved.action==="invalid"?400:["daily_limit","monthly_limit"].includes(reserved.action)?429:202;
  return safeJson({status:reserved.action,cached:false,charged:false,retrySeconds:reserved.retrySeconds||null},code)
 }
 const runId=reserved.runId;
 try{
  // Keep the requested model, brand and variant checks; avoid forcing shopping search to match every descriptive word.
  const normalizedQuery=v.q.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  const modelIds=[...normalizedQuery.matchAll(/\b[a-z]{1,8}[- ]?\d{2,5}[a-z0-9-]*\b/g)].map(x=>x[0]).filter(x=>!/^(?:wifi|usb|hdmi|full|led|ips|ram)/.test(x));
  const brandTokens=normalizedQuery.split(/[^a-z0-9]+/).filter(x=>["samsung","acer","lg","mondial","philco","apple","motorola","xiaomi","asus","lenovo","dell","jbl","electrolux","brastemp","consul"].includes(x));
  const shoppingQuery=modelIds.length&&brandTokens.length?(brandTokens[0]+" "+modelIds[0]):v.q;
  const result=await serperGet(shoppingQuery);
  const observedAt=new Date().toISOString(),rawItems=result.shopping.slice(0,40),visible=[],diagnostics=[];
  for(const x of rawItems){
   if(!x||!x.title){diagnostics.push({title:"",merchant:String(x?.source||""),reason:"missing_title"});continue;}
   const price=parseBRL(x.price);
   if(!price){diagnostics.push({title:String(x.title).slice(0,200),merchant:String(x.source||""),reason:"invalid_price"});continue;}
   const verdict=classifySerper(v.q,String(x.title));
   if(verdict==="mismatch"){diagnostics.push({title:String(x.title).slice(0,200),merchant:String(x.source||""),reason:"product_mismatch",price,hasDirectLink:!!safeMerchantLink(x.link)});continue;}
   const merchant=String(x.source||"Loja").trim().slice(0,110);
   // This Brazilian price radar does not compare foreign eBay listings or peer-to-peer used goods.
   if(/\bebay\b|enjoei/i.test(merchant)||/[\u3040-\u30ff\u3400-\u9fff]/u.test(String(x.title))){diagnostics.push({title:String(x.title).slice(0,200),merchant,reason:"excluded_marketplace",price});continue;}
   const candidate={
    title:String(x.title).slice(0,280),merchant,price,
    date:observedAt,currency:"BRL",url:directLocatorURL(x.link,directLocatorStore(merchant)),
    linkFrom:directLocatorURL(x.link,directLocatorStore(merchant))?"merchant_exact_product":null,
    status:"review_required",source:"Serper / Google Shopping",
    productId:x.productId?String(x.productId).slice(0,100):null
   };
   visible.push(candidate)
  }
  const filtered=visible.sort((a,b)=>Number(Boolean(b.url))-Number(Boolean(a.url))||a.price-b.price).slice(0,30);
  const rejected=rawItems.length-visible.length;
  const credits=Number(result.credits)||2;
  await supa("PATCH","dt_radar_adhoc_cache",
   {state:"ready",offers:filtered,rejection_diagnostics:diagnostics,raw_count:rawItems.length,rejected_count:rejected,cache_until:new Date(Date.now()+24*60*60*1000).toISOString(),updated_at:observedAt,error_code:null},
   "?query_key=eq."+encodeURIComponent(v.key)+"&current_run_id=eq."+runId);
  await supa("PATCH","dt_radar_adhoc_runs",
   {state:"completed",credits_actual:credits,returned_offers:filtered.length,finished_at:observedAt},
   "?id=eq."+runId).catch(()=>{});
  console.log("dt_adhoc_search",JSON.stringify({queryKey:v.key,shoppingQuery,raw:rawItems.length,accepted:filtered.length,rejected,credits}));
  return safeJson({query:v.q,cached:false,checkedAt:observedAt,rawCount:rawItems.length,rejected,offers:await enrichOffersFromTrustedLinks(filtered),source:"serper_google_shopping",status:"ready"})
 }catch(e){
  const msg=String(e?.message||"search_error").slice(0,85);
  await Promise.all([
   supa("PATCH","dt_radar_adhoc_cache",{state:"failed",error_code:msg,updated_at:new Date().toISOString(),cache_until:new Date(Date.now()+7*60000).toISOString()},"?query_key=eq."+encodeURIComponent(v.key)+"&current_run_id=eq."+runId).catch(()=>{}),
   supa("PATCH","dt_radar_adhoc_runs",{state:"failed",error_code:msg,finished_at:new Date().toISOString()},"?id=eq."+runId).catch(()=>{})
  ]);
  console.error("dt_adhoc_search_error",JSON.stringify({queryKey:v.key,error:msg}));
  return safeJson({error:"search_provider_unavailable",charged:false},503)
 }
}


function genericMerchantStore(merchant){const slug=String(merchant||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,55);return slug.length>=3?"generic-"+slug:null}
function genericMerchantHostMatches(url,store){try{const u=new URL(String(url||""));if(u.protocol!=="https:"||u.username||u.password||u.port)return false;const host=u.hostname.toLowerCase();if(/(^|\.)(google|gstatic|googleusercontent|youtube|facebook|instagram|bing|yahoo)\./i.test(host))return false;const tokens=String(store||"").replace(/^generic-/,"").split("-").filter(x=>x.length>=4);return tokens.length>0&&tokens.some(token=>host.replace(/[^a-z0-9]/g,"").includes(token))}catch{return false}}
function directLocatorStore(merchant){
 const m=String(merchant||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 if(/^amazon(?:\.com\.br)?(?:\s*-\s*(?:retail|seller))?$/i.test(m.trim()))return "amazon";
 if(/^americanas(?:\.com)?(?:\.br)?$/i.test(m.trim()))return "americanas";
 if(/^le\s*biscuit(?:\.com\.br)?$/i.test(m.trim()))return "lebiscuit";
 if(/^(?:magalu|magazine\s*luiza)(?:\.com\.br)?$/i.test(m.trim()))return "magalu";
 if(/^(?:mercado\s*livre|mercadolivre)(?:\.com\.br)?$/i.test(m.trim()))return "mercadolivre";
 if(/^shopee(?:\s*brasil|\.com\.br)?$/i.test(m.trim()))return "shopee";
 if(/ka\s*bum|kabum/i.test(m))return "kabum";
 if(/terabyte/i.test(m))return "terabyte";
 if(/^pichau(?:\.com\.br)?$/i.test(m.trim()))return "pichau";
 return genericMerchantStore(merchant)
}
function directLocatorURL(v,store){
 try{
  const u=new URL(String(v||""));
  if(u.protocol!=="https:"||u.username||u.password||u.port)return null;
  u.hash="";u.search="";
  if(store==="pichau"&&/^(www\.)?pichau\.com\.br$/i.test(u.hostname)&&/^\/[a-z0-9][a-z0-9-]{12,180}\/?$/i.test(u.pathname)&&!/^\/(?:busca|search|categoria|departamento|marcas|ofertas|promocoes|carrinho|login|produto)\b/i.test(u.pathname))return u.href;
  if(store==="kabum"&&/^(www\.)?kabum\.com\.br$/i.test(u.hostname)&&/^\/produto\/\d{4,15}(?:\/|$)/i.test(u.pathname))return u.href;
  if(store==="terabyte"&&/^(www\.)?terabyteshop\.com\.br$/i.test(u.hostname)&&/^\/produto\/\d{4,15}(?:\/|$)/i.test(u.pathname))return u.href;
  if(store==="amazon"){
   if(!/^(www\.)?amazon\.com\.br$/i.test(u.hostname))return null;
   const asin=u.pathname.match(/(?:\/dp\/|\/gp\/product\/)(B0[A-Z0-9]{8})(?:[/?]|$)/i)?.[1];
   return asin?"https://www.amazon.com.br/dp/"+asin.toUpperCase():null;
  }
  if(store==="americanas"){
   if(!/^(www\.)?americanas\.com\.br$/i.test(u.hostname))return null;
   if(!/^\/[a-z0-9][a-z0-9\-_%]+\/p\/?$/i.test(u.pathname) && !/^\/produto\/\d{6,15}\/?$/i.test(u.pathname))return null;
   return u.href;
  }
  if(store==="lebiscuit"){
   if(!/^(www\.)?lebiscuit\.com\.br$/i.test(u.hostname))return null;
   if(!/^\/[a-z0-9][a-z0-9-]{8,150}\/p\/?$/i.test(u.pathname))return null;
   return u.href;
  }
  if(store==="magalu"&&/^(www\.)?magazineluiza\.com\.br$/i.test(u.hostname)&&/^\/[^/]+\/p\/[a-z0-9]{5,20}(?:\/[^/?#]+){0,2}\/?$/i.test(u.pathname))return u.href;
  if(store==="mercadolivre"&&/^(?:www\.|produto\.)?mercadolivre\.com\.br$/i.test(u.hostname)&&/(?:\/MLB-?\d{7,15}(?:[\/-]|$)|\/p\/MLB\d{7,15}\/?$)/i.test(u.pathname))return u.href;
  if(store==="shopee"&&/^(www\.)?shopee\.com\.br$/i.test(u.hostname)&&/(?:\/product\/\d{4,20}\/\d{4,20}|-i\.\d{4,20}\.\d{4,20})(?:\/|$)/i.test(u.pathname))return u.href;
  if(String(store||'').startsWith('generic-')&&genericMerchantHostMatches(u.href,store)&&u.pathname.length>3&&!/^\/(?:search|busca|categoria|departamento|ofertas|promocoes|carrinho|login)(?:\/|$)/i.test(u.pathname))return u.href;
 }catch{}
 return null
}
function directLocatorVersion(itemTitle,candidateTitle){
 const base=String(itemTitle||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 const found=String(candidateTitle||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 if(!/\bafn[-\s]?40\b/i.test(base)){
  // Match model codes independently of network suffixes (5G), memory (256GB) and RAM (12GB).
  const ids=s=>[...s.matchAll(/\b([a-z]{1,6})[-\s]?(\d{2,5})(?:[-\s]?([a-z]{1,4}))?\b/gi)]
   .map(x=>({family:(x[1]+x[2]).toUpperCase(),suffix:(x[3]||"").toUpperCase()}))
   .filter(x=>!["GB","RAM","WIFI","LTE"].includes(x.suffix))
   .map(x=>x.family);
  const wanted=ids(base),actual=ids(found);
  if(!wanted.length||!wanted.some(x=>actual.includes(x)))return null;
  const brands=["samsung","apple","motorola","xiaomi","mondial","philco","electrolux","brastemp","consul","lg","acer","asus","lenovo","dell"];
  if(brands.some(x=>base.includes(x)&&!found.includes(x)))return null;
  const storage=s=>s.match(/\b(64|128|256|512|1024)\s*gb\b/i)?.[1]||null;
  if(storage(base)&&storage(found)&&storage(base)!==storage(found))return null;
  const ram=s=>s.match(/\b(?:ram\s*(?:de\s*)?(\d{1,2})\s*gb|(\d{1,2})\s*gb\s*(?:de\s*)?ram)\b/i)?.slice(1).find(Boolean)||null;
  if(ram(base)&&ram(found)&&ram(base)!==ram(found))return null;
  if(ram(base)&&!ram(found))return "same_family";
  if(storage(base)&&!storage(found))return "same_family";
  const voltage=s=>s.match(/\b(110|127|220)\s*v\b/i)?.[1]||null;
  if(voltage(base)&&voltage(found)&&voltage(base)!==voltage(found))return null;
  if(/(?:usad[ao]|seminov[ao]|recondicionad[ao]|acessorio|peca|review|capinha|pelicula|carregador)/i.test(found))return null;
  const color=s=>{
   const n=s.normalize("NFD").replace(/[\u0300-\u036f]/g,"");
   return n.match(/\b(?:preto|black|grafite|graphite|cinza|gray|grey|rosa|pink|verde|green|azul|blue|branco|white|prata|silver|dourado|gold|violeta|purple|roxo)\b/i)?.[0]?.toLowerCase()||null
  };
  const group=x=>({"black":"preto","grafite":"grafite","graphite":"grafite","gray":"cinza","grey":"cinza","pink":"rosa","green":"verde","blue":"azul","white":"branco","silver":"prata","gold":"dourado","purple":"roxo","violeta":"roxo"}[x]||x);
  const sourceColor=color(base),foundColor=color(found);
  if(sourceColor&&foundColor&&group(sourceColor)!==group(foundColor))return null;
  if(sourceColor&&!foundColor)return "same_family";

  return "same_variant";
 }
 if(!/\bafn[-\s]?40\b/i.test(found))return null;
 if(!/mondial/i.test(base)||!/(mondial|fritadeira|air\s*fryer)/i.test(found))return null;
 if(/(?:usad[ao]|seminov[ao]|recondicionad[ao]|kit|combo|caixa aberta|painel|cesto avulso|grelha|resistencia|refil|pe[çc]a|forno|acessorio|capa|review)/i.test(found))return null;
 const sub=s=>s.match(/\bafn[-\s]?40[-\s]?([a-z]{2,4})(?:\b|$)/i)?.[1]?.toUpperCase()||null;
 const expected=sub(base),actual=sub(found);
 if(expected&&actual&&expected!==actual)return null;
 const voltage=s=>s.match(/\b(110|127|220)\s*v\b/i)?.[1]||null;
 const v1=voltage(base),v2=voltage(found);
 if(v1&&v2&&v1!==v2&&!(["110","127"].includes(v1)&&["110","127"].includes(v2)))return null;
 return expected&&expected===actual&&(!v1||!v2||v1===v2)?"same_variant":"same_family"
}
function dtGenericProductMatch(base,found){
 const norm=x=>String(x||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
 const a=norm(base),b=norm(found);if(!a||!b)return null;
 if(/\b(usado|seminovo|recondicionado|refil|capa|capinha|pelicula|suporte|adaptador|peca|compativel)\b/.test(b)&&!/\b(usado|seminovo|recondicionado|refil|capa|capinha|pelicula|suporte|adaptador|peca|compativel)\b/.test(a))return null;
 const tokens=a.split(" ").filter(x=>x.length>=3&&!/^(monitor|gamer|produto|novo|para|com|preto|branco|full|hd|led|ips)$/.test(x));
 if(tokens.length<3)return null;
 const bTokens=new Set(b.split(" "));
 const codes=tokens.filter(x=>/[a-z]/.test(x)&&/\d/.test(x));
 if(codes.some(x=>!b.replace(/\s/g,"").includes(x)))return null;
 const units=a.match(/\b\d+(?:gb|tb|hz|pol|polegadas|w)\b/g)||[];
 if(units.some(x=>!b.replace(/\s/g,"").includes(x)))return null;
 const overlap=tokens.filter(x=>bTokens.has(x)).length;
 return overlap/tokens.length>=0.8?"same_variant":null;
}
async function findMerchantPageForOffer(title,merchant){
 if(!serperConfigured())return safeJson({error:"provider_unavailable"},503);
 const store=directLocatorStore(merchant),sourceTitle=String(title||"").normalize("NFKC").replace(/\s+/g," ").trim();
 if(!store||sourceTitle.length<12||sourceTitle.length>280||/[<>{}[\]\\]/.test(sourceTitle))return safeJson({error:"not_supported"},422);
 // Category-agnostic: require descriptive title, not a smartphone-style model code.
 if(sourceTitle.split(/\s+/).length<3)return safeJson({error:"insufficient_product_identity"},422);
 const key=directLocatorKey(store,sourceTitle);
 const booking=await supa("POST","rpc/dt_radar_reserve_direct_link",{p_key:key,p_merchant:merchant,p_title:sourceTitle});
 if(booking.action==="cached"){
  const level=booking.link&&booking.resultTitle&&directLocatorURL(booking.link,store)?(directLocatorVersion(sourceTitle,booking.resultTitle)||dtGenericProductMatch(sourceTitle,booking.resultTitle)):null;
  const status=booking.status==="ready"&&!level?"missing":booking.status;
  return safeJson({status,cached:true,charged:false,merchant,resultTitle:booking.resultTitle||null,url:level?booking.link:null,matchLevel:level,checkedAt:booking.checkedAt||null});
 }
 if(booking.action!=="reserved")return safeJson({status:booking.action,charged:false},booking.action==="invalid"?400:["daily_limit","monthly_limit"].includes(booking.action)?429:202);
 const runId=booking.runId;
 try{
  const labels={amazon:"Amazon Brasil",lebiscuit:"Le Biscuit",americanas:"Americanas",magalu:"Magazine Luiza",mercadolivre:"Mercado Livre",shopee:"Shopee Brasil",kabum:"KaBuM!",terabyte:"TerabyteShop",pichau:"Pichau"};
  const model=sourceTitle.match(/\b(?:Galaxy\s*)?[A-Z]{1,5}[-\s]?\d{2,5}\b/i)?.[0]||sourceTitle;
  const storage=sourceTitle.match(/\b(?:64|128|256|512|1024)\s*GB\b/i)?.[0]||"";
  const ram=sourceTitle.match(/\b(\d{1,2})\s*GB\s*RAM\b|\bRAM\s*(\d{1,2})\s*GB\b/i)?.[0]||"";
  const brand=sourceTitle.match(/\b(?:Samsung|Apple|Motorola|Xiaomi|Mondial|Philco|LG|Electrolux|Lenovo|Dell|Acer|Asus)\b/i)?.[0]||"";
  // Constrain organic discovery to the seller's product pages instead of broad comparison results.
  const domains={amazon:"amazon.com.br",magalu:"magazineluiza.com.br",mercadolivre:"mercadolivre.com.br",shopee:"shopee.com.br",kabum:"kabum.com.br",americanas:"americanas.com.br",lebiscuit:"lebiscuit.com.br",terabyte:"terabyteshop.com.br",pichau:"pichau.com.br"};
  const domain=domains[store]||null;
  // Search for the exact product identity rather than copying marketing copy into Google.
  const color=sourceTitle.match(/\b(?:preto|black|grafite|graphite|cinza|gray|grey|rosa|pink|verde|green|azul|blue|branco|white|prata|silver|dourado|gold|violeta|purple|roxo)\b/i)?.[0]||"";
  const identity=[brand,model,storage,ram,color].filter(Boolean).join(" ").replace(/\s+/g," ").trim();
  const searchTerms=identity.length>=12&&model!==sourceTitle?identity:sourceTitle.slice(0,110);
  const query=[searchTerms,domain?"site:"+domain:(labels[store]||String(merchant||"").slice(0,80))].filter(Boolean).join(" ");
  const r=await fetch("https://google.serper.dev/search",{method:"POST",
   headers:{"X-API-KEY":Bun.env.SERPER_API_KEY,"Content-Type":"application/json"},
   body:JSON.stringify({q:query,gl:"br",hl:"pt-br",num:15}),signal:AbortSignal.timeout(24000)});
  const d=await r.json().catch(()=>null);
  if(!r.ok||!Array.isArray(d?.organic))throw Error("serper_organic_"+r.status);
  const options=[];
  for(const item of d.organic){
   const url=directLocatorURL(item.link,store);
   const level=directLocatorVersion(sourceTitle,item.title)||dtGenericProductMatch(sourceTitle,item.title);
   if(url&&level)options.push({url,resultTitle:String(item.title).slice(0,280),matchLevel:level,position:Number(item.position)||99})
  }
  options.sort((a,b)=>(a.matchLevel==="same_variant"?0:1)-(b.matchLevel==="same_variant"?0:1)||a.position-b.position);
  const chosen=options[0]||null;
  const now=new Date().toISOString();
  const credits=Math.min(5,Math.max(1,Number(d.credits)||1));
  await supa("PATCH","dt_radar_direct_link_cache",{
   state:chosen?"ready":"missing",link_url:chosen?.url||null,result_title:chosen?.resultTitle||null,
   match_level:chosen?.matchLevel||null,checked_at:now,
   cache_until:new Date(Date.now()+(chosen?7*86400000:20*60000)).toISOString(),failure_reason:null
  },"?cache_key=eq."+encodeURIComponent(key)+"&run_id=eq."+runId);
  await supa("PATCH","dt_radar_direct_link_runs",{state:"completed",credits_actual:credits,finished_at:now},
   "?id=eq."+runId).catch(()=>{});
  console.log("dt_direct_link_search",JSON.stringify({store,found:!!chosen,level:chosen?.matchLevel||null,organic:d.organic.length,credits}));
  return safeJson({status:chosen?"ready":"missing",cached:false,merchant,resultTitle:chosen?.resultTitle||null,
   url:chosen?.url||null,matchLevel:chosen?.matchLevel||null,checkedAt:now,credits})
 }catch(e){
  const code=String(e?.message||"link_locator_error").slice(0,100);
  await Promise.all([
   supa("PATCH","dt_radar_direct_link_cache",{state:"failed",checked_at:new Date().toISOString(),cache_until:new Date(Date.now()+30*60000).toISOString(),failure_reason:code},"?cache_key=eq."+encodeURIComponent(key)+"&run_id=eq."+runId).catch(()=>{}),
   supa("PATCH","dt_radar_direct_link_runs",{state:"failed",error_code:code,finished_at:new Date().toISOString()},"?id=eq."+runId).catch(()=>{})
  ]);
  console.error("dt_direct_link_error",JSON.stringify({store,error:code}));
  return safeJson({error:"merchant_locator_unavailable"},503)
 }
}





const amazonAutoPriceState={inflight:new Set(),lastAttempt:new Map()};
async function verifyAmazonCatalogPrice(item){
 const id=String(item.id||"");
 if(!id||amazonAutoPriceState.inflight.has(id))return;
 const previous=amazonAutoPriceState.lastAttempt.get(id)||0;
 if(Date.now()-previous<6*3600000)return;
 if(item.page_check_status==="verified"&&item.page_checked_at&&Date.now()-Date.parse(item.page_checked_at)<24*3600000)return;
 amazonAutoPriceState.lastAttempt.set(id,Date.now());
 amazonAutoPriceState.inflight.add(id);
 try{
  const page=await fetchMerchantHTML(item.product_url);
  const title=merchantMeta(page.html,"og:title")||merchantMeta(page.html,"twitter:title")||page.html.match(/<title[^>]*>([^<]{5,350})<\/title>/i)?.[1]||"";
  if(!merchantTitleMatches(title,item.title))throw Error("product_variant_not_verified");
  const offers=merchantSchemaOffers(page.html,item.title);
  if(!offers.length){const extra=amazonCurrentPriceFromHTML(page.html,item.title,title);if(extra)offers.push(extra)}
  const prices=[...new Set(offers.map(o=>o.price))];
  if(prices.length!==1||!Number.isFinite(prices[0]))throw Error("price_ambiguous_or_unavailable");
  await supa("PATCH","dt_radar_marketplace_listings",{page_check_status:"verified",page_checked_at:new Date().toISOString(),page_price:prices[0],page_currency:"BRL",page_price_source:offers[0].method,page_observed_title:title.slice(0,350),page_check_note:null},"?id=eq."+id+"&marketplace=eq.Amazon");
  console.log("dt_amazon_auto_price",JSON.stringify({state:"verified",listingId:item.listing_id,method:offers[0].method}));
 }catch(e){
  const reason=String(e?.message||"unavailable").slice(0,75);
  await supa("PATCH","dt_radar_marketplace_listings",{page_check_status:"price_unavailable",page_checked_at:new Date().toISOString(),page_price:null,page_currency:null,page_price_source:null,page_check_note:reason},"?id=eq."+id+"&marketplace=eq.Amazon").catch(()=>{});
  console.log("dt_amazon_auto_price",JSON.stringify({state:"unconfirmed",reason}));
 }finally{publicPriceCache.value=null;amazonAutoPriceState.inflight.delete(id)}
}
async function scheduleAmazonAutoPrice(){
 if(!dbok())return;
 const items=await supa("GET","dt_radar_marketplace_listings",undefined,"?select=id,listing_id,title,product_url,page_checked_at,page_check_status&marketplace=eq.Amazon&match_status=in.(verified,review_required)&order=observed_at.desc&limit=3");
 for(const item of items){
  if(item.page_check_status==="verified"&&item.page_checked_at&&Date.now()-Date.parse(item.page_checked_at)<86400000)continue;
  await verifyAmazonCatalogPrice(item);
 }
}

// One existing saved Amazon listing is verified on startup; no Serper credits or daily scheduler are used.
setTimeout(()=>scheduleAmazonAutoPrice().catch(e=>console.error("dt_amazon_auto_price_startup",String(e?.message||e).slice(0,100))),6500);
const publicPriceCache={value:null,until:0};
async function readPublicPrices(){
 if(!dbok())return safeJson({error:"database_unavailable"},503);
 if(publicPriceCache.value&&Date.now()<publicPriceCache.until)return safeJson(publicPriceCache.value);
 const [products,observations,marketplaceListings]=await Promise.all([
  supa("GET","dt_radar_products",undefined,"?select=id,search_query,category,brand,model&enabled=eq.true&order=search_query.asc&limit=20"),
  supa("GET","dt_radar_price_observations",undefined,"?select=product_id,observed_title,merchant,product_url,merchant_link_checked_at,merchant_price_confirmed,price,currency,match_status,observed_at,source&source=eq.serper_google_shopping&order=observed_at.desc&limit=1000"),
  supa("GET","dt_radar_marketplace_listings",undefined,"?select=product_id,listing_id,title,product_url,seller_name,price,marketplace,match_status,observed_at,page_check_status,page_checked_at,page_price,page_currency,page_price_source&match_status=in.(verified,review_required)&order=observed_at.desc&limit=200")
 ]);
 const payload={source:"serper_google_shopping",generatedAt:new Date().toISOString(),notice:"Preços observados, não necessariamente atuais. Ofertas em análise ainda não verificadas.",products:products.map(p=>{
  const matches=observations.filter(x=>x.product_id===p.id);
  const approved=matches.filter(x=>x.match_status==="verified");
  const review=matches.filter(x=>x.match_status==="review_required");
  const offers=[...approved,...review].slice(0,25).map(x=>({title:String(x.observed_title).slice(0,250),merchant:String(x.merchant||"Loja").slice(0,100),price:Number(x.price),currency:"BRL",date:x.observed_at,source:"Serper / Google Shopping",url:safeMerchantLink(x.product_url),linkCheckedAt:x.merchant_link_checked_at||null,merchantPriceConfirmed:x.merchant_price_confirmed===true,status:x.match_status}));
  const dates=[...new Set(approved.map(x=>x.observed_at.slice(0,10)))];
  return {query:p.search_query,category:p.category,verified:approved.length,review:review.length,rejected:matches.filter(x=>x.match_status==="mismatch").length,offers,marketplaceListings:marketplaceListings.filter(x=>x.product_id===p.id).slice(0,16).map(x=>({listingId:x.listing_id,title:x.title,merchant:x.marketplace,seller:x.seller_name||null,url:x.product_url,price:x.price===null?null:Number(x.price),pagePrice:x.page_price===null?null:Number(x.page_price),pagePriceStatus:x.page_check_status||"not_checked",pagePriceCheckedAt:x.page_checked_at||null,pagePriceSource:x.page_price_source||null,status:x.match_status,date:x.observed_at})),historyAvailable:dates.length>=2}
 })};
 publicPriceCache.value=payload;publicPriceCache.until=Date.now()+60000;
 return safeJson(payload);
}


async function meliSafeApiSmoke(){
 if(Bun.env.RADAR_ML_AUTH_CHECK_ONCE!=="true")return;
 const result={provider:"mercadolivre",connected:false,identityStatus:null,searchStatus:null,searchCount:0,firstOfferHasPrice:false,firstOfferHasLink:false};
 try{
  const token=await meliActiveAccessToken();
  if(!token){console.log("dt_meli_safe_smoke",JSON.stringify({...result,error:"no_access_token"}));return}
  const me=await fetch("https://api.mercadolibre.com/users/me",{headers:{"authorization":"Bearer "+token,accept:"application/json"},signal:AbortSignal.timeout(15000)});
  result.identityStatus=me.status;
  result.connected=me.ok;
  const url=new URL("https://api.mercadolibre.com/sites/MLB/search");
  url.searchParams.set("q","Samsung Galaxy A56 256GB");url.searchParams.set("limit","3");
  const response=await fetch(url,{headers:{"authorization":"Bearer "+token,accept:"application/json"},signal:AbortSignal.timeout(15000)});
  result.searchStatus=response.status;
  const data=await response.json().catch(()=>null);
  const offers=Array.isArray(data?.results)?data.results:[];
  result.searchCount=offers.length;
  result.firstOfferHasPrice=offers.some(x=>Number(x?.price)>0);
  result.firstOfferHasLink=offers.some(x=>typeof x?.permalink==="string"&&x.permalink.startsWith("https://"));
  result.errorCode=String(data?.error||"").slice(0,80)||null;
  console.log("dt_meli_safe_smoke",JSON.stringify(result))
 }catch(err){console.log("dt_meli_safe_smoke",JSON.stringify({...result,error:String(err?.message||err).slice(0,90)}))}
}
setTimeout(()=>meliSafeApiSmoke().catch(()=>{}),8000);

async function meliEndpointAccessDiagnostic(){
 if(Bun.env.RADAR_ML_ENDPOINT_CHECK_ONCE!=="true")return;
 const report=[];
 try{
  const token=await meliActiveAccessToken();
  if(!token)throw Error("no_authorized_token");
  const tests=[
   ["bulk_items","https://api.mercadolibre.com/items/bulk?ids=MLB4984343275,MLB8005358950&attributes=id,title,price,permalink,status"],
   ["bulk_items_single","https://api.mercadolibre.com/items/bulk?ids=MLB5476838217"]
  ];
  for(const [name,url] of tests){
   try{
    const r=await fetch(url,{headers:{"authorization":"Bearer "+token,accept:"application/json"},signal:AbortSignal.timeout(10000)});
    const json=await r.json().catch(()=>null);
    const results=Array.isArray(json)?json:(Array.isArray(json?.results)?json.results:[]);
    report.push({name,http:r.status,error:String(json?.error||"").slice(0,60),
      message:String(json?.message||"").slice(0,75),
      count:results.length,
      products:results.slice(0,3).map(x=>({code:x.code||null,fields:Object.keys(x?.body||x||{}).slice(0,20),itemId:x.body?.id||x.item_id||x.id||null,price:Number(x.body?.price||x.price)||null,permalink:typeof(x.body?.permalink||x.permalink)==="string",status:x.body?.status||x.status||null})),
      productStatus:json?.status||null,productName:String(json?.name||"").slice(0,120),
      buyBoxItem:json?.buy_box_winner?.item_id||null,buyBoxPrice:json?.buy_box_winner_price_range||null,
      hasPermalink:typeof json?.permalink==="string",hasPrice:Number(json?.price)>0});
   }catch(e){report.push({name,error:String(e?.message||e).slice(0,65)})}
  }
  console.log("dt_meli_endpoint_diagnostic",JSON.stringify(report));
 }catch(e){console.log("dt_meli_endpoint_diagnostic",JSON.stringify({error:String(e?.message||e).slice(0,100)}))}
}
setTimeout(()=>meliEndpointAccessDiagnostic().catch(()=>{}),7000);

async function mlDirectUrlProbe(){
 if(Bun.env.RADAR_ML_URL_CHECK_ONCE!=="true")return;
 const ids=["MLB4984343275","MLB5476838217","MLB8005358950"];
 for(const id of ids){
  const urls=["https://produto.mercadolivre.com.br/"+id.replace("MLB","MLB-"),"https://www.mercadolivre.com.br/p/"+id];
  for(const candidate of urls){
   try{
    const r=await fetch(candidate,{method:"GET",redirect:"follow",headers:{"user-agent":"Mozilla/5.0 (compatible; RadarPriceCheck/1.0)","accept":"text/html"},signal:AbortSignal.timeout(9500)});
    const final=new URL(r.url);
    const contentType=String(r.headers.get("content-type")||"");
    // Only inspect a bounded prefix, do not store full external page content.
    const html=contentType.includes("text/html")?String(await r.text()).slice(0,100000):"";
    const title=(html.match(/<title[^>]*>([^<]{5,240})<\/title>/i)?.[1]||"").replace(/\s+/g," ").slice(0,115);
    const expectedDomain=/(^|\.)mercadolivre\.com\.br$/.test(final.hostname);
    const identifierPresent=final.pathname.toUpperCase().replace(/[^A-Z0-9]/g,"").includes(id);
    const pageAvailable=expectedDomain&&r.status===200&&identifierPresent&&!/indispon.vel|n.o encontramos|p.gina n.o existe|produto n.o encontrado/i.test(title);
    console.log("dt_ml_url_probe",JSON.stringify({id,source:new URL(candidate).hostname,status:r.status,finalHost:final.hostname,idInPath:identifierPresent,valid:pageAvailable,title}));
    if(pageAvailable)break;
   }catch(e){console.log("dt_ml_url_probe",JSON.stringify({id,error:String(e?.message||e).slice(0,60)}))}
  }
 }
}
setTimeout(()=>mlDirectUrlProbe().catch(()=>{}),6500);

const mlCatalogPriceFamilies=[
 {id:"MLB50911064",variant:"8 GB RAM / Preto"},
 {id:"MLB53429874",variant:"8 GB RAM / Rosa"},
 {id:"MLB66620255",variant:"12 GB RAM / Cinza-claro"}
];
let mlCatalogDailyBusy=false;
async function mlCatalogHistoryCollection(){
 if(mlCatalogDailyBusy||!dbok())return {state:"busy_or_database_unavailable"};
 const nowBR=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Sao_Paulo",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
 const existing=await supa("GET","dt_radar_price_history",undefined,"?select=id&source=eq.mercadolivre_catalog_items&observed_day=eq."+nowBR+"&limit=1");
 if(existing.length)return {state:"already_collected_today",date:nowBR};
 mlCatalogDailyBusy=true;
 try{
  const token=await meliActiveAccessToken();
  if(!token)return {state:"oauth_not_connected"};
  const p=await supa("GET","dt_radar_products",undefined,"?select=id,search_query&search_query=eq."+encodeURIComponent("Samsung Galaxy A56 256GB")+"&limit=1");
  if(p.length!==1)return {state:"product_missing"};
  const observedAt=new Date().toISOString();let count=0,errors=[];
  for(const catalog of mlCatalogPriceFamilies){
   try{
    const url="https://api.mercadolibre.com/products/"+catalog.id+"/items?limit=20";
    const r=await fetch(url,{headers:{"authorization":"Bearer "+token,accept:"application/json"},signal:AbortSignal.timeout(10000)});
    if(!r.ok){errors.push({id:catalog.id,status:r.status});continue}
    const result=await r.json().catch(()=>({}));
    for(const item of Array.isArray(result.results)?result.results:[]){
     const id=String(item?.item_id||"").toUpperCase();
     const price=Number(item?.price);
     if(!/^MLB\d{7,15}$/.test(id)||!Number.isFinite(price)||price<=0||price>100000)continue;
     if(item.condition&&item.condition!=="new")continue;
     if(item.currency_id&&item.currency_id!=="BRL")continue;
     const previously=await supa("GET","dt_radar_price_history",undefined,"?select=id&source=eq.mercadolivre_catalog_items&source_listing_id=eq."+id+"&observed_day=eq."+nowBR+"&limit=1");
     if(previously.length)continue;
     await supa("POST","dt_radar_price_history",[{source:"mercadolivre_catalog_items",source_listing_id:id,catalog_product_id:catalog.id,product_id:p[0].id,title:p[0].search_query,merchant:"Mercado Livre",variant:catalog.variant,price,currency:"BRL",offer_url:null,link_verified:false,observed_at:observedAt,observed_day:nowBR}]);
     count++;
    }
   }catch(e){errors.push({id:catalog.id,error:String(e?.message||e).slice(0,85)})}
  }
  console.log("dt_ml_catalog_history",JSON.stringify({collected:count,day:nowBR,errors}));
  return {state:"completed",saved:count,day:nowBR,errors};
 }finally{mlCatalogDailyBusy=false}
}
async function mlCatalogHistoryDailyTick(){
 if(Bun.env.RADAR_ML_HISTORY_DAILY_ENABLED!=="true")return;
 const hour=Number(new Intl.DateTimeFormat("en-US",{timeZone:"America/Sao_Paulo",hour:"2-digit",hourCycle:"h23"}).format(new Date()));
 if(hour<10||hour>18)return;
 await mlCatalogHistoryCollection();
}
setTimeout(()=>mlCatalogHistoryDailyTick().catch(e=>console.error("dt_ml_catalog_history_tick",String(e?.message||e).slice(0,80))),12000);
setInterval(()=>mlCatalogHistoryDailyTick().catch(e=>console.error("dt_ml_catalog_history_tick",String(e?.message||e).slice(0,80))),3600000);

const meliOAuthReady=()=>Boolean(Bun.env.MELI_CLIENT_ID&&Bun.env.MELI_CLIENT_SECRET&&Bun.env.MELI_REDIRECT_URI&&/^[a-f0-9]{64}$/i.test(Bun.env.MELI_TOKEN_ENCRYPTION_KEY||"")&&dbok());
const meliHtmlHeaders={"content-type":"text/html; charset=utf-8","cache-control":"no-store, private","referrer-policy":"no-referrer","x-content-type-options":"nosniff","content-security-policy":"default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'","x-frame-options":"DENY"};
const meliPage=(heading,message,status=200,cookie=null)=>{
 const escape=x=>String(x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const body='<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Mercado Livre · Radar</title><style>body{font-family:system-ui,sans-serif;background:#f7f9f5;color:#233c2d;max-width:620px;margin:9vh auto;padding:20px}main{border:1px solid #dce7d6;border-radius:18px;padding:30px;background:white}h1{font-size:23px}p{line-height:1.6}input,button{font-size:16px;padding:13px;border-radius:10px}input{width:100%;border:1px solid #cbd6c4;box-sizing:border-box}button{background:#d5fb81;border:0;font-weight:700;margin-top:13px;cursor:pointer}</style></head><body><main><h1>'+escape(heading)+'</h1><p>'+escape(message)+'</p></main></body></html>';
 return new Response(body,{status,headers:{...meliHtmlHeaders,...(cookie?{"set-cookie":cookie}:{})}});
};
const meliStateHash=async input=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(input)))).map(x=>x.toString(16).padStart(2,"0")).join("");
const meliSecureEqual=(a,b)=>{
 const aa=new TextEncoder().encode(String(a||"")),bb=new TextEncoder().encode(String(b||""));
 let mismatch=aa.length^bb.length;for(let i=0;i<Math.max(aa.length,bb.length);i++)mismatch|=(aa[i]||0)^(bb[i]||0);
 return mismatch===0;
};
async function meliCipherKey(){
 const hex=Bun.env.MELI_TOKEN_ENCRYPTION_KEY||"";
 if(!/^[a-f0-9]{64}$/i.test(hex))throw Error("encryption_not_configured");
 const key=Uint8Array.from(hex.match(/.{2}/g).map(x=>parseInt(x,16)));
 return crypto.subtle.importKey("raw",key,{name:"AES-GCM"},false,["encrypt","decrypt"]);
}
async function meliEncrypt(token){
 const iv=crypto.getRandomValues(new Uint8Array(12));
 const cipher=await crypto.subtle.encrypt({name:"AES-GCM",iv},await meliCipherKey(),new TextEncoder().encode(token));
 return Buffer.concat([Buffer.from(iv),Buffer.from(cipher)]).toString("base64");
}
async function meliDecrypt(cipherText){
 const bytes=Buffer.from(cipherText,"base64");
 if(bytes.length<29)throw Error("invalid_ciphertext");
 const plain=await crypto.subtle.decrypt({name:"AES-GCM",iv:bytes.subarray(0,12)},await meliCipherKey(),bytes.subarray(12));
 return new TextDecoder().decode(plain);
}
async function meliStoredCredentials(){
 const rows=await supa("GET","dt_meli_oauth_credentials",undefined,"?select=user_id,app_client_id,access_token_encrypted,refresh_token_encrypted,expires_at&app_client_id=eq."+encodeURIComponent(Bun.env.MELI_CLIENT_ID||"")+"&order=updated_at.desc&limit=1");
 return rows[0]||null;
}
async function meliActiveAccessToken(){
 if(Bun.env.MELI_ACCESS_TOKEN)return Bun.env.MELI_ACCESS_TOKEN;
 const row=await meliStoredCredentials();
 if(!row)return null;
 if(Date.parse(row.expires_at)-Date.now()>5*60000)return meliDecrypt(row.access_token_encrypted);
 if(!row.refresh_token_encrypted)return null;
 // Rotated refresh tokens must be persisted before returning the new access token.
 const form=new URLSearchParams({grant_type:"refresh_token",client_id:Bun.env.MELI_CLIENT_ID,client_secret:Bun.env.MELI_CLIENT_SECRET,refresh_token:await meliDecrypt(row.refresh_token_encrypted)});
 const response=await fetch("https://api.mercadolibre.com/oauth/token",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded","accept":"application/json"},body:form,signal:AbortSignal.timeout(16000)});
 const data=await response.json().catch(()=>({}));
 if(!response.ok||!data.access_token||!data.refresh_token)throw Error("refresh_failed_"+response.status);
 await supa("PATCH","dt_meli_oauth_credentials",{access_token_encrypted:await meliEncrypt(data.access_token),refresh_token_encrypted:await meliEncrypt(data.refresh_token),expires_at:new Date(Date.now()+Math.min(21600,Math.max(300,Number(data.expires_in)||21600))*1000).toISOString(),updated_at:new Date().toISOString()},"?user_id=eq."+row.user_id);
 return data.access_token;
}
async function meliOAuthStart(req){
 if(!meliOAuthReady())return meliPage("Configuração incompleta","As credenciais ainda não estão preparadas.",503);
 const cookieValue=(req.headers.get("cookie")||"").split(";").map(v=>v.trim()).find(v=>v.startsWith("meli_setup_invite="))?.slice("meli_setup_invite=".length)||"";
 const invite=cookieValue;
 if(!/^[0-9a-f]{64}$/.test(invite))return meliPage("Acesso restrito","Use o link de conexão enviado ao administrador. Nenhuma senha é necessária.",403);
 const stateHash=await meliStateHash("invite:"+invite);
 const consumed=await supa("PATCH","dt_meli_oauth_states",{consumed_at:new Date().toISOString()},"?state_hash=eq."+stateHash+"&consumed_at=is.null&expires_at=gt."+encodeURIComponent(new Date().toISOString()));
 if(consumed.length!==1)return meliPage("Link expirado ou utilizado","Solicite um novo link de conexão de uso único.",403);
 const previously=await meliStoredCredentials();
 if(previously)return meliPage("Integração já conectada","O Mercado Livre já está autorizado no Radar. Seus clientes não precisam conectar contas.",200);
 const state=Array.from(crypto.getRandomValues(new Uint8Array(32))).map(x=>x.toString(16).padStart(2,"0")).join("");
 await supa("POST","dt_meli_oauth_states",[{state_hash:await meliStateHash(state),expires_at:new Date(Date.now()+10*60000).toISOString()}]);
 const uri=new URL("https://auth.mercadolivre.com.br/authorization");
 uri.searchParams.set("response_type","code");
 uri.searchParams.set("client_id",Bun.env.MELI_CLIENT_ID);
 uri.searchParams.set("redirect_uri",Bun.env.MELI_REDIRECT_URI);
 uri.searchParams.set("state",state);
 const html='<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Autorizar Mercado Livre</title><style>body{font-family:system-ui,sans-serif;background:#f7f9f5;color:#233c2d;max-width:620px;margin:9vh auto;padding:20px}main{background:white;border:1px solid #dce7d6;border-radius:18px;padding:30px}a{display:inline-block;background:#d5fb81;color:#233c2d;text-decoration:none;font-weight:750;padding:14px 20px;border-radius:10px}p{line-height:1.6}small{color:#66725d}</style></head><body><main><h1>Autorizar Mercado Livre</h1><p>O próximo passo é abrir o site oficial do Mercado Livre e confirmar sua autorização.</p><a href="'+uri.href.replace(/&/g,"&amp;")+'">Continuar no Mercado Livre ↗</a><p><small>Link temporário de uso único. Se expirar, será preciso gerar um novo convite.</small></p></main></body></html>';
 return new Response(html,{status:200,headers:{...meliHtmlHeaders,"set-cookie":"meli_oauth_state="+state+"; Path=/oauth/mercadolivre/callback; Max-Age=600; Secure; HttpOnly; SameSite=Lax",
 "content-security-policy":"default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"}});

}
async function meliOAuthCallback(req,url){
 if(req.method!=="GET")return meliPage("Método inválido","A autorização deve retornar por GET.",405);
 const clear="meli_oauth_state=; Path=/oauth/mercadolivre/callback; Max-Age=0; Secure; HttpOnly; SameSite=Lax";
 if(!url.searchParams.has("code")&&!url.searchParams.has("state")&&!url.searchParams.has("error"))return meliPage("Callback ativo","A URL de retorno do Radar está configurada.");
 const state=url.searchParams.get("state")||"";
 const cookies=req.headers.get("cookie")||"";
 const cookie=cookies.split(";").map(x=>x.trim()).find(x=>x.startsWith("meli_oauth_state="))?.slice(17)||"";
 if(!/^[a-f0-9]{64}$/.test(state)||!meliSecureEqual(state,cookie))return meliPage("Autorização recusada","Sessão inválida ou expirada. Inicie novamente pelo Radar.",403,clear);
 const hash=await meliStateHash(state);
 const consumed=await supa("PATCH","dt_meli_oauth_states",{consumed_at:new Date().toISOString()},"?state_hash=eq."+hash+"&consumed_at=is.null&expires_at=gt."+encodeURIComponent(new Date().toISOString()));
 if(consumed.length!==1)return meliPage("Autorização expirada","Este link já foi usado ou expirou. Inicie novamente.",403,clear);
 if(url.searchParams.has("error"))return meliPage("Autorização cancelada","O Mercado Livre não autorizou o acesso.",403,clear);
 const code=url.searchParams.get("code")||"";
 if(code.length<8||code.length>4096)return meliPage("Código inválido","O Mercado Livre não enviou um código válido.",400,clear);
 try{
  const form=new URLSearchParams({grant_type:"authorization_code",client_id:Bun.env.MELI_CLIENT_ID,client_secret:Bun.env.MELI_CLIENT_SECRET,code,redirect_uri:Bun.env.MELI_REDIRECT_URI});
  const response=await fetch("https://api.mercadolibre.com/oauth/token",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded","accept":"application/json"},body:form,signal:AbortSignal.timeout(18000)});
  const token=await response.json().catch(()=>({}));
  if(!response.ok||typeof token.access_token!=="string"||typeof token.refresh_token!=="string")return meliPage("Não foi possível conectar","O Mercado Livre rejeitou a troca de autorização. Verifique as permissões e o redirect.",502,clear);
  const me=await fetch("https://api.mercadolibre.com/users/me",{headers:{"authorization":"Bearer "+token.access_token,"accept":"application/json"},signal:AbortSignal.timeout(12000)});
  const identity=await me.json().catch(()=>({}));
  if(!me.ok||!Number.isSafeInteger(Number(identity.id))||Number(identity.id)<=0)return meliPage("Validação incompleta","Não foi possível verificar a identidade da conta.",502,clear);
  const userId=Number(identity.id);
  const linkedBefore=await meliStoredCredentials();
  if(linkedBefore&&Number(linkedBefore.user_id)!==userId)return meliPage("Conta diferente","O Radar já está conectado a outra conta do Mercado Livre. A substituição exige autorização administrativa.",403,clear);
  const row={user_id:userId,app_client_id:Bun.env.MELI_CLIENT_ID,access_token_encrypted:await meliEncrypt(token.access_token),refresh_token_encrypted:await meliEncrypt(token.refresh_token),token_type:String(token.token_type||"Bearer").slice(0,30),scope:String(token.scope||"").slice(0,500),expires_at:new Date(Date.now()+Math.min(21600,Math.max(300,Number(token.expires_in)||21600))*1000).toISOString(),updated_at:new Date().toISOString()};
  const existing=await supa("GET","dt_meli_oauth_credentials",undefined,"?select=user_id&user_id=eq."+userId+"&limit=1");
  if(existing.length)await supa("PATCH","dt_meli_oauth_credentials",row,"?user_id=eq."+userId);
  else await supa("POST","dt_meli_oauth_credentials",[row]);
  return meliPage("Mercado Livre conectado","A conta foi autorizada e os tokens foram armazenados com criptografia. A coleta automática permanece desligada até validarmos os preços.",200,clear);
 }catch(e){
  console.error("dt_meli_oauth_callback",String(e?.message||"exchange_failed").replace(/APP_USR-[^\s]+/g,"[redacted]").slice(0,80));
  return meliPage("Falha temporária","A integração não foi concluída. Inicie novamente a autorização.",503,clear)
 }
}


/* SerpApi Radar MVP: direct product pages only; never substitute Google Shopping URLs. */
const serpApiReady=()=>Boolean(Bun.env.SERPAPI_API_KEY);
const serpApiCache=new Map();
async function serpApiAuthDiagnostic(){
 const raw=String(Bun.env.SERPAPI_API_KEY||"");
 const trimmed=raw.trim();
 const shape={configured:raw.length>0,length:raw.length,hasOuterWhitespace:raw!==trimmed,
  hasQuoteWrapping:/^["']|["']$/.test(trimmed),hasApiKeyPrefix:/^api_key\s*=/i.test(trimmed),
  containsWhitespace:/\s/.test(trimmed),looksHex64:/^[a-f0-9]{64}$/i.test(trimmed)};
 if(!shape.configured)return safeJson({provider:"serpapi",status:"missing",shape},503);
 try{
  const endpoint=new URL("https://serpapi.com/account.json");
  endpoint.searchParams.set("api_key",raw);
  const response=await fetch(endpoint,{signal:AbortSignal.timeout(15000)});
  const data=await response.json().catch(()=>({}));
  return safeJson({provider:"serpapi",status:response.ok?"authenticated":"rejected",
   httpStatus:response.status,shape,
   providerError:response.ok?null:String(data.error||data.message||"authentication_rejected").slice(0,120),
   remainingSearches:response.ok?(data.total_searches_left??null):null},response.ok?200:502);
 }catch(error){
  return safeJson({provider:"serpapi",status:"network_error",shape,error:String(error.message||error).slice(0,90)},503);
 }
}
setTimeout(async()=>{
 try{
  const response=await serpApiAuthDiagnostic();
  const result=await response.json();
  console.log("dt_serpapi_auth_diagnostic",JSON.stringify(result));
 }catch(error){console.warn("dt_serpapi_auth_diagnostic",JSON.stringify({status:"failed",reason:String(error.message||error).slice(0,90)}))}
},6000);
async function serpApiRequest(params){
 const url=new URL("https://serpapi.com/search.json");
 for(const [key,value] of Object.entries(params))if(value!==undefined&&value!==null)url.searchParams.set(key,String(value));
 url.searchParams.set("api_key",Bun.env.SERPAPI_API_KEY);
 const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
 const data=await response.json().catch(()=>({}));
 if(!response.ok||data.error)throw Error("serpapi_"+response.status+":"+String(data.error||"request_failed").slice(0,90));
 return data;
}
function serpApiDirectLink(value,merchant){
 if(typeof value!=="string")return null;
 const store=directLocatorStore(merchant);
 const direct=directLocatorURL(value,store);
 if(direct&&safeMerchantLink(direct))return direct;
 // SerpApi often returns real store product URLs in formats not covered by
 // our narrow per-store regexes. Preserve these URLs, but never Google links,
 // search/category pages, homepage links or unrelated merchant domains.
 try{
  const u=new URL(value);
  if(u.protocol!=="https:"||u.username||u.password||u.port)return null;
  const host=u.hostname.toLowerCase();
  const knownHosts={
   shopee:["shopee.com.br"],mercadolivre:["mercadolivre.com.br"],
   amazon:["amazon.com.br"],magalu:["magazineluiza.com.br"],
   kabum:["kabum.com.br"],pichau:["pichau.com.br"],
   terabyte:["terabyteshop.com.br"],americanas:["americanas.com.br"],
   lebiscuit:["lebiscuit.com.br"]
  };
  const allowed=knownHosts[store];
  const hostMatches=allowed?allowed.some(d=>host===d||host.endsWith("."+d)):
   String(store||"").startsWith("generic-")&&genericMerchantHostMatches(u.href,store);
  if(!hostMatches||!safeMerchantLink(u.href))return null;
  if(u.pathname.length<5||new RegExp("^/(?:search|busca|s|catalogo|category|categoria|departamento|ofertas|promocoes|carrinho|login|loja|shop|seller|store|stores)(?:/|$)","i").test(u.pathname))return null;
  u.hash="";
  return u.href;
 }catch{return null}
}
function serpApiPrice(value){
 if(typeof value==="number")return Number.isFinite(value)&&value>0?value:null;
 return parseBRL(value)||null;
}
function serpApiOffer(item,query,observedAt,merchantOverride){
 const merchant=String(merchantOverride||item.source||item.name||item.merchant||item.seller||"Loja").trim();
 const title=String(item.title||item.product_title||query||"").trim();
 const price=serpApiPrice(item.extracted_price)||serpApiPrice(item.price)||serpApiPrice(item.base_price);
 if(!title||!price||classifySerper(query,title)==="mismatch"||/\busado\b|seminovo|recondicionado|pelicula|capa para/i.test(title))return null;
 const url=[item.link,item.direct_link,item.offer_link,item.url].map(link=>serpApiDirectLink(link,merchant)).find(Boolean);
 if(!url)return null;
 return {title:title.slice(0,280),merchant:merchant.slice(0,110),price,date:observedAt,currency:"BRL",url,
  linkFrom:"serpapi_direct_product",status:"review_required",source:"SerpApi / Google Shopping",
  productId:item.product_id?String(item.product_id).slice(0,100):null,
  image:item.thumbnail||item.image||null};
}
// Radar v3: isolated SerpApi-only pipeline. No Serper/legacy merchant discovery.
function radarNormalize(v){return String(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}
function radarMatches(query,title){
 const q=radarNormalize(query),t=radarNormalize(title);
 if(!q||!t)return false;
 if(/\b(?:capa|capinha|pelicula|carregador|usado|seminovo|recondicionado|reformado|peca|display|case|kit|combo)\b/.test(t))return false;
 const qw=q.split(" "),tw=t.split(" ");
 const model=qw.filter(w=>/[a-z]/.test(w)&&/[0-9]/.test(w)&&!/^(?:[0-9]+(?:gb|tb|mah|hz))$/.test(w));
 if(model.some(w=>!tw.includes(w)))return false;
 // Storage must match, even when the seller uses "256 GB" instead of "256GB".
 const capacity=(words)=>{const result=[];for(let i=0;i<words.length;i++){
  const compact=words[i].match(/^([0-9]+)(gb|tb)$/);
  if(compact)result.push(compact[1]+compact[2]);
  else if(/^[0-9]+$/.test(words[i])&&/^(?:gb|tb)$/.test(words[i+1]||""))result.push(words[i]+words[i+1]);
 }return result};
 const requested=capacity(qw),listed=capacity(tw);
 if(requested.length&&!requested.every(c=>listed.includes(c)))return false;
 // Explicit competing storage variants (128 GB vs 256 GB) are incompatible.
 if(requested.length&&listed.some(c=>!requested.includes(c))){
  const target=new Set(requested);
  const other=listed.filter(c=>!target.has(c));
  // Allow RAM capacities such as 8GB or 12GB alongside the requested storage.
  if(other.some(c=>parseInt(c,10)>=32||c.endsWith("tb")))return false;
 }
 const important=qw.filter(w=>w.length>=3&&!/^(com|para|the|and|celular|smartphone|novo)$/.test(w)&&!/^[0-9]+(?:gb|tb)$/.test(w));
 return important.length?important.filter(w=>tw.includes(w)).length/important.length>=0.75:requested.length>0;
}
function radarSellerUrl(value,merchant){
 if(typeof value!=="string")return null;
 try{
  const u=new URL(value);
  if(u.protocol!=="https:"||u.username||u.password||u.port)return null;
  const host=u.hostname.toLowerCase();
  if(!safeMerchantLink(u.href)||/^(?:www\\.)?google\\./.test(host))return null;
  const store=directLocatorStore(merchant);
  const domains={shopee:"shopee.com.br",mercadolivre:"mercadolivre.com.br",amazon:"amazon.com.br",
   magalu:"magazineluiza.com.br",kabum:"kabum.com.br",pichau:"pichau.com.br",
   terabyte:"terabyteshop.com.br",americanas:"americanas.com.br",lebiscuit:"lebiscuit.com.br"};
  const domain=domains[store];
  if(domain?!(host===domain||host.endsWith("."+domain)):
    !(String(store).startsWith("generic-")&&genericMerchantHostMatches(u.href,store)))return null;
  if(u.pathname.length<5||["/","/search","/busca","/catalogo","/category","/categoria","/ofertas","/loja","/shop"].some(p=>u.pathname===p||u.pathname.startsWith(p+"/")))return null;
  u.hash="";
  return u.href;
 }catch{return null}
}
function radarMakeOffer(seller,product,query,observedAt){
 const merchant=String(seller.name||seller.source||seller.merchant||seller.seller||product.source||"").trim();
 const title=String(seller.title||product.title||"").trim();
 const url=radarSellerUrl(seller.link||seller.direct_link||seller.offer_link||seller.url,merchant);
 const price=serpApiPrice(seller.extracted_price)||serpApiPrice(seller.price)||serpApiPrice(product.extracted_price);
 if(!merchant||!url||!price||!radarMatches(query,title))return null;
 return {title:title.slice(0,280),merchant:merchant.slice(0,110),price,date:observedAt,currency:"BRL",
  url,linkFrom:"serpapi_direct_product",status:"review_required",source:"SerpApi / Google Product",
  productId:product.product_id?String(product.product_id).slice(0,100):null,
  image:product.thumbnail||product.image||null};
}
async function serpApiProductSearch(query,storeId){
 if(!serpApiReady())return safeJson({error:"serpapi_not_configured"},503);
 const v=validateUniversalQuery(query);
 if(!v||v.key.length<3)return safeJson({error:"invalid_query"},400);
 const conf=storeId?radarMerchantStores[String(storeId)]:null;
 if(storeId&&!conf)return safeJson({error:"invalid_store"},400);
 const cacheKey="v5|"+v.key+"|"+(storeId||"all");
 const cached=serpApiCache.get(cacheKey);
 if(cached&&cached.expires>Date.now())return safeJson({...cached.data,cached:true});
 const observedAt=new Date().toISOString();
 try{
  const shopping=await serpApiRequest({engine:"google_shopping",q:v.q,gl:"br",hl:"pt",location:"Brazil",num:40});
  const raw=Array.isArray(shopping.shopping_results)?shopping.shopping_results:[];
  const matching=raw.filter(x=>radarMatches(v.q,x.title));
  const found=[];
  for(const product of matching){
   const offer=radarMakeOffer({...product,name:product.source},product,v.q,observedAt);
   if(offer)found.push(offer);
  }
  // Only fetch detail pages for matching products; avoid burning credits on unrelated listings.
  const detailCandidates=matching.filter(x=>x.serpapi_product_api).slice(0,6);
  let detailCalls=0,storeRows=0;
  for(const product of detailCandidates){
   try{
    const api=new URL(product.serpapi_product_api);
    if(api.hostname!=="serpapi.com"||api.searchParams.get("engine")!=="google_product")continue;
    const pageToken=api.searchParams.get("page_token");
    if(!pageToken)continue;
    detailCalls++;
    const details=await serpApiRequest({engine:"google_product",page_token:pageToken,gl:"br",hl:"pt"});
    const stores=Array.isArray(details.product_results?.stores)?details.product_results.stores:[];
    storeRows+=stores.length;
    for(const seller of stores){
     const offer=radarMakeOffer(seller,product,v.q,observedAt);
     if(offer)found.push(offer);
    }
   }catch(error){console.warn("dt_radar_v3_detail_error",String(error.message||error).slice(0,90))}
  }
  const offers=[...new Map(found.filter(x=>!conf||conf.store.test(x.merchant)).map(x=>[x.url,x])).values()]
   .sort((a,b)=>a.price-b.price).slice(0,30);
  const data={query:v.q,status:"ready",cached:false,checkedAt:observedAt,rawCount:raw.length,
   offers,source:"serpapi_google_shopping",directLinksOnly:true,store:conf?.label||null};
  serpApiCache.set(cacheKey,{expires:Date.now()+10*60*1000,data});
  if(serpApiCache.size>100)serpApiCache.delete(serpApiCache.keys().next().value);
  console.log("dt_radar_v3",JSON.stringify({query:v.key,raw:raw.length,matching:matching.length,
   detailCalls,storeRows,direct:offers.length,store:storeId||"all"}));
  return safeJson(data);
 }catch(error){
  console.error("dt_radar_v3_error",String(error.message||error).slice(0,110));
  return safeJson({error:"serpapi_search_unavailable",status:"failed"},503);
 }
}

Bun.serve({port:Number(Bun.env.PORT||3000),async fetch(req){const u=new URL(req.url);try{
if(u.pathname==="/health")return safeJson({ok:true,service:"desapega-google-poc"});
if(u.pathname==="/oauth/mercadolivre/callback")return meliOAuthCallback(req,u);
if(u.pathname==="/meli/connect"&&req.method==="GET"){
 const linked=await meliStoredCredentials().then(Boolean).catch(()=>false);
 if(linked)return meliPage("Mercado Livre conectado","A conexão do Radar já foi concluída. Nenhum cliente precisará informar senhas ou autorizar sua própria conta.");
 const oneTimeLink=u.searchParams.get("invite")||"";
 if(oneTimeLink){
  if(!/^[a-f0-9]{64}$/.test(oneTimeLink))return meliPage("Link inválido","O link de conexão não é válido.",403);
  const rows=await supa("GET","dt_meli_oauth_states",undefined,"?select=state_hash&state_hash=eq."+await meliStateHash("invite:"+oneTimeLink)+"&consumed_at=is.null&expires_at=gt."+encodeURIComponent(new Date().toISOString())+"&limit=1");
  if(rows.length!==1)return meliPage("Link expirado","Solicite um novo link de configuração.",403);
  return new Response(null,{status:303,headers:{"location":"/meli/connect","cache-control":"no-store","referrer-policy":"no-referrer","set-cookie":"meli_setup_invite="+oneTimeLink+"; Path=/meli/connect; Max-Age=7200; Secure; HttpOnly; SameSite=Lax"}});
 }
 const token=(req.headers.get("cookie")||"").split(";").map(x=>x.trim()).find(x=>x.startsWith("meli_setup_invite="))?.slice("meli_setup_invite=".length)||"";
 if(!/^[a-f0-9]{64}$/.test(token))return meliPage("Configuração restrita","Esta etapa é exclusiva do administrador e exige um link temporário. O Radar funciona sem login adicional para os clientes.",403);
 const rows=await supa("GET","dt_meli_oauth_states",undefined,"?select=state_hash&state_hash=eq."+await meliStateHash("invite:"+token)+"&consumed_at=is.null&expires_at=gt."+encodeURIComponent(new Date().toISOString())+"&limit=1");
 if(rows.length!==1)return meliPage("Link utilizado ou expirado","Solicite outro link temporário.",403);
 const page='<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Conectar Mercado Livre</title><style>body{font-family:system-ui,sans-serif;background:#f7f9f5;color:#233c2d;max-width:600px;margin:9vh auto;padding:22px}main{border:1px solid #dce7d6;border-radius:18px;padding:28px;background:white}h1{font-size:22px}button{font-size:16px;padding:14px 18px;border-radius:9px;background:#d5fb81;border:0;font-weight:700;cursor:pointer}</style></head><body><main><h1>Conectar Mercado Livre ao Radar</h1><p>Autorização inicial da conta administradora. Nenhuma senha adicional é necessária; os clientes não precisam passar por esta etapa.</p><form method="POST" action="/meli/connect"><button type="submit">Autorizar Mercado Livre</button></form></main></body></html>';
 return new Response(page,{status:200,headers:meliHtmlHeaders});
}
if(u.pathname==="/meli/connect"&&req.method==="POST")return meliOAuthStart(req);

if(u.pathname==="/public-price-history"&&req.method==="GET"){
 if(!dbok())return safeJson({error:"database_unavailable"},503);
 const rows=await supa("GET","dt_radar_price_history",undefined,
  "?select=source_listing_id,catalog_product_id,variant,price,currency,observed_day,link_verified,offer_url,merchant&source=eq.mercadolivre_catalog_items&order=observed_day.desc&limit=240");
 const grouped={};
 for(const x of rows){
  const key=x.source_listing_id;
  if(!grouped[key])grouped[key]={listingId:key,variant:x.variant,merchant:x.merchant,catalogId:x.catalog_product_id,history:[]};
  grouped[key].history.push({day:x.observed_day,price:Number(x.price),currency:x.currency,linkVerified:Boolean(x.link_verified),url:x.link_verified?x.offer_url:null});
 }
 return safeJson({source:"mercadolivre_catalog_items",pricesFrom:"official_catalog_offers",currentOfferLinksVerified:false,series:Object.values(grouped),samples:rows.length,historyReady:Object.values(grouped).some(x=>x.history.length>=2)});
}

if(u.pathname==="/public-prices"&&req.method==="GET"){await scheduleAmazonAutoPrice().catch(e=>console.error("dt_amazon_auto_price_schedule",String(e?.message||e).slice(0,90)));return await readPublicPrices();}
if(u.pathname==="/on-demand/link"&&req.method==="POST"){
  if(!Bun.env.RADAR_INTERNAL_SEARCH_TOKEN||req.headers.get("x-radar-internal-token")!==Bun.env.RADAR_INTERNAL_SEARCH_TOKEN)return safeJson({error:"restricted"},403);
  const data=await req.json().catch(()=>null);
  return findMerchantPageForOffer(data?.title,data?.merchant);
}
if(u.pathname==="/on-demand/store-offers"&&req.method==="POST"){
 if(!Bun.env.RADAR_INTERNAL_SEARCH_TOKEN||req.headers.get("x-radar-internal-token")!==Bun.env.RADAR_INTERNAL_SEARCH_TOKEN)return safeJson({error:"restricted"},403);
 if(Number(req.headers.get("content-length")||0)>3000)return safeJson({error:"request_too_large"},413);
 const input=await req.json().catch(()=>null);
 return serpApiProductSearch(input?.q,input?.store);
}
if(u.pathname==="/on-demand/search"&&req.method==="POST"){
  if(!Bun.env.RADAR_INTERNAL_SEARCH_TOKEN||req.headers.get("x-radar-internal-token")!==Bun.env.RADAR_INTERNAL_SEARCH_TOKEN)return safeJson({error:"restricted"},403);
  const body=await req.json().catch(()=>null);
  return serpApiProductSearch(body?.q);
}

if(u.pathname==="/meli/status"&&req.method==="GET"){const linked=await meliStoredCredentials().then(Boolean).catch(()=>false);return safeJson({provider:"mercadolivre_official_api",credentialsConfigured:meliOAuthReady(),accountLinked:linked,mode:"manual_only",apiAccessVerified:false,automaticEnabled:false});}
if(u.pathname==="/meli/oauth/setup"&&req.method==="GET")return safeJson({provider:"mercadolivre_oauth",appConfigured:Boolean(Bun.env.MELI_CLIENT_ID),redirectConfigured:Boolean(Bun.env.MELI_REDIRECT_URI),secretConfigured:Boolean(Bun.env.MELI_CLIENT_SECRET),callbackPublished:true,authorizationEnabled:meliOAuthReady(),tokenStorageEnabled:meliOAuthReady(),nextStep:meliOAuthReady()?"authorize_account_at_/meli/connect":"complete_configuration"});
if(u.pathname==="/serpapi/auth-diagnostic"&&req.method==="GET"){if(!authorized(req))return safeJson({error:"restricted"},403);return serpApiAuthDiagnostic();}
if(u.pathname==="/serpapi/status"&&req.method==="GET")return safeJson({provider:"serpapi_google_shopping",configured:serpApiReady(),directLinksOnly:true});
if(u.pathname==="/serper/status"&&req.method==="GET")return safeJson({provider:"serper_google_shopping",configured:serperConfigured(),dailyEnabled:serperEnabled(),creditCap:serperMonthlyCreditCap(),products:queries.length});
if(u.pathname==="/catalog"&&req.method==="GET")return safeJson({planned:queries.length,products:queries.map(query=>({query,status:"awaiting_real_collection"})),providerConfigured:ok(),databaseConfigured:dbok(),dailySchedulerEnabled:dailyEnabled(),maxMonthlyTasks:maxMonthlyTasks(),pricesFabricated:0});
if(!authorized(req))return safeJson({error:"restricted"},403);
if(u.pathname==="/links/locate"&&req.method==="POST")return locateProductWithSerper(String(u.searchParams.get("productId")||""),String(u.searchParams.get("merchant")||""));
if(u.pathname==="/meli/collect"&&req.method==="POST")return mlCollectOfficial();
if(u.pathname==="/serper/collect"&&req.method==="POST")return collectSerper(Number(u.searchParams.get("max")||1));
if(u.pathname==="/collect"&&req.method==="POST")return collect();
if(u.pathname==="/sync"&&req.method==="POST")return synchronize();
return safeJson({error:"not_found"},404)
}catch(e){return safeJson({error:String(e?.message||"server_error").slice(0,220)},503)}}});
setTimeout(async()=>{
 if(Bun.env.RADAR_ML_CARD_TEST_ONCE!=="true")return;
 try{
  const r=await fetch("http://127.0.0.1:"+String(Bun.env.PORT||3000)+"/on-demand/ml-offers",{
   method:"POST",headers:{"content-type":"application/json","x-radar-internal-token":Bun.env.RADAR_INTERNAL_SEARCH_TOKEN},
   body:JSON.stringify({q:"Samsung Galaxy A56 256GB"}),signal:AbortSignal.timeout(10000)});
  const x=await r.json();
  console.log("dt_ml_card_smoke",JSON.stringify({http:r.status,provider:x.provider,count:x.offers?.length||0,
   sample:(x.offers||[]).map(y=>({listingId:y.listingId,variant:y.variant,price:y.price,hasLink:!!y.url})).slice(0,6),
   error:x.error||null}));
 }catch(e){console.log("dt_ml_card_smoke",JSON.stringify({error:String(e?.message||e).slice(0,100)}))}
},8000);
