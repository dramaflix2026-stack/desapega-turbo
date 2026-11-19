let page=String.raw`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Radar Turbo — Desapega Turbo</title><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='17' fill='%23dbff86'/%3E%3Cpath d='M17 44L45 17M28 17h17v17' fill='none' stroke='%23233e2b' stroke-width='7' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"><style>
:root{font-family:Inter,"Segoe UI",Arial,sans-serif;color:#233c2d;background:#f7f9f5}*{box-sizing:border-box}body{margin:0}button,input,select,textarea{font:inherit}button{cursor:pointer}header{padding:18px clamp(18px,4vw,54px);display:flex;justify-content:space-between;align-items:center;background:#fff;border-bottom:1px solid #e0eadb;gap:15px}header strong{font-size:20px;letter-spacing:-.7px}header strong em{font-style:normal;color:#75a742}header small{color:#71806c}main{max-width:1200px;margin:auto;padding:30px 20px 85px}h1{font-size:clamp(31px,4vw,52px);line-height:1.1;letter-spacing:-1.5px;margin:9px 0 13px}h1 em{font-style:normal;color:#6e9f3d}.lead{color:#6d8169;line-height:1.7;max-width:750px}.eyebrow{color:#668944;letter-spacing:1.4px;font-weight:900;font-size:11px}nav{display:flex;gap:9px;flex-wrap:wrap;margin:25px 0}nav button{border:1px solid #d8e7d1;background:#fff;padding:12px 18px;border-radius:12px;font-weight:850;color:#486141}nav button.active,.cta{background:#dfff82!important;color:#263e20!important;border-color:#dfff82!important}.panel{display:none}.panel.active{display:block}.cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.card{background:#fff;border:1px solid #e0e9db;border-radius:18px;padding:23px;box-shadow:0 8px 26px #20352308}.card h2{margin:0 0 12px;font-size:21px}.card p{color:#687d62;line-height:1.6}label{display:block;font-weight:800;font-size:12px;margin:15px 0 7px}input,select,textarea{width:100%;border:1px solid #cbdcc5;border-radius:10px;padding:13px 14px;background:#fbfdf9;color:#203725;outline-color:#a1cb71}input:focus{border-color:#8aaa54}.btn{border:0;border-radius:11px;padding:13px 19px;background:#dfff82;font-weight:850;color:#263e20;min-height:44px}.muted{color:#687b65;font-size:12px}.results{display:flex;gap:9px;flex-wrap:wrap;margin-top:17px}.results a{padding:12px 15px;background:#f1f8e8;border:1px solid #d6e7c8;border-radius:11px;text-decoration:none;color:#38582f;font-size:12px;font-weight:850}.pill{display:inline-flex;padding:7px 11px;background:#eff8e5;border-radius:50px;font-size:11px;color:#567a3d;font-weight:850}.history{display:grid;gap:10px;margin:12px 0}.observation{display:flex;gap:12px;align-items:center;justify-content:space-between;background:#f4f9ef;padding:12px;border-radius:9px;font-size:13px}.chart{width:100%;max-height:260px;border:1px solid #e1ead9;background:#fbfdf9;border-radius:12px;padding:12px;margin:14px 0}.warn{font-size:12px;color:#72643b;padding:12px;background:#fbf7e8;border-radius:10px}.status{font-size:13px;font-weight:800;min-height:20px}.full{grid-column:1/-1}a.back{color:#547841;text-decoration:none;font-size:12px;font-weight:800}@media(max-width:750px){.cards{grid-template-columns:1fr}main{padding:22px 13px 60px}header{padding:14px}.card{padding:17px}nav button{flex:1 1 40%}}body.embedded header{display:none}body.embedded main{max-width:1150px;padding:16px 16px 65px}body.embedded h1{font-size:clamp(27px,3.6vw,44px)}body.embedded nav{margin:18px 0}
.results a.shop-logo{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:5px;width:68px;min-width:68px;min-height:68px;background:white;border:1px solid #dcebd4;box-shadow:0 3px 12px #102d1106;border-radius:15px;padding:9px;text-decoration:none;transition:transform .15s}.results a.shop-logo:hover{transform:translateY(-2px);background:#f4ffeb}.results a.shop-logo .shop-icon{width:40px;height:40px;display:grid;place-items:center;border-radius:12px;font-weight:950;font-size:19px;letter-spacing:-1px}.results a.shop-logo .shop-small{font-size:9px;line-height:1.2;text-align:center;font-weight:850;color:#4b6346}.results a.shop-logo:focus-visible{outline:3px solid #80a64e;outline-offset:2px}.google-pilot{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.google-pilot-item{display:flex;align-items:center;justify-content:space-between;background:#f3f8ee;border:1px solid #dcebd6;border-radius:11px;padding:12px;gap:12px}.google-pilot-item strong{font-size:12px}.google-pilot-item small{font-size:10px;color:#687b63;white-space:nowrap}@media(max-width:650px){.google-pilot{grid-template-columns:1fr}}.google-pilot-item{cursor:pointer;text-align:left;width:100%;font:inherit}.google-pilot-item.active{border:2px solid #97c552;background:#eaf9d7}.radar-offers{margin-top:18px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.radar-offer{padding:18px;background:#fff;border:1px solid #dbe7d7;border-radius:14px;display:flex;flex-direction:column;gap:9px}.radar-offer strong{font-size:14px;line-height:1.45}.radar-offer .price{font-size:24px;letter-spacing:-.6px;font-weight:900;color:#243e2c}.radar-offer .meta{font-size:11px;color:#647e61}.radar-offer .tag{font-size:10px;font-weight:850;color:#5b7039;background:#eff8df;align-self:flex-start;padding:6px 10px;border-radius:30px}.radar-offer a{font-size:12px;font-weight:850;text-decoration:none;color:#365f2a;background:#dfff82;padding:10px 12px;border-radius:9px;align-self:flex-start}.radar-offer .review{color:#8b672a;background:#fdf5de}.radar-empty{grid-column:1/-1;padding:16px;border:1px dashed #c8d9c2;border-radius:12px;color:#687a62;font-size:13px}@media(max-width:750px){.radar-offers{grid-template-columns:1fr}}.radar-group-heading{grid-column:1/-1;display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:15px 4px 4px;border-bottom:1px solid #d6e6cf;flex-wrap:wrap}.radar-group-heading strong{font-size:16px;color:#29432c}.radar-group-heading span{font-size:11px;color:#7c7864}.radar-variant{align-self:flex-start;font-size:11px;font-weight:800;border-radius:9px;padding:6px 9px;background:#edf4fa;color:#31536b}.radar-link-warning{font-size:10px;color:#8a754a;line-height:1.5}.radar-offer a{max-width:100%;overflow-wrap:anywhere}.radar-variant-group{grid-column:1/-1;border:1px solid #d7e6d2;border-radius:16px;background:#fff;overflow:hidden;margin:4px 0}.radar-variant-group[open]{padding-bottom:12px}.radar-variant-summary{list-style:none;padding:18px 20px;display:flex;align-items:center;gap:14px;cursor:pointer;flex-wrap:wrap;justify-content:space-between}.radar-variant-summary::-webkit-details-marker{display:none}.radar-variant-summary>div:first-child{display:grid;gap:6px;flex:1;min-width:145px}.radar-variant-summary>div:first-child strong{font-size:16px}.radar-variant-summary small{font-size:11px;color:#6b8164}.radar-summary-price{display:grid;gap:4px;text-align:right}.radar-summary-price strong{font-size:22px;color:#23412d}.radar-expand{color:#456533;font-size:11px;font-weight:800;white-space:nowrap}.radar-variant-group[open] .radar-expand{font-size:0}.radar-variant-group[open] .radar-expand:after{content:"Ocultar ofertas ▴";font-size:11px}.radar-group-grid{padding:8px 14px 14px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.radar-group-grid .radar-offer{min-width:0}.radar-offers>.radar-variant-group{min-width:0}@media(max-width:760px){.radar-group-grid{grid-template-columns:1fr}.radar-summary-price strong{font-size:19px}.radar-variant-summary{padding:15px}}.radar-direct-unavailable{display:grid;gap:5px;background:#f4f6f2;padding:10px 12px;border:1px dashed #d3dfcd;border-radius:9px}.radar-direct-unavailable span{color:#647164;font-weight:850;font-size:11px}.radar-direct-unavailable small{color:#7e857a;font-size:10px;line-height:1.45}.radar-price-confirmed{color:#346b38;font-size:10px;line-height:1.4}.radar-merchant-links{border-color:#c4dcb0;background:#f9fff4}.radar-merchant-links-status{font-size:11px;font-weight:750;color:#4f6e3a;background:#e2f5cd;padding:7px 10px;border-radius:12px}.radar-price-unconfirmed{font-size:15px;font-weight:850;color:#7a633b}.radar-merchant-links .radar-offer a{font-size:13px}@media(max-width:700px){.radar-merchant-links-status{width:100%;text-align:center}}.radar-unlinked-list{grid-column:1/-1;background:#f6f8f4;border:1px dashed #d4dfd1;border-radius:12px;padding:8px}.radar-unlinked-list>summary{font-size:12px;font-weight:800;color:#536a4e;padding:9px 11px;cursor:pointer}.radar-unlinked-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,245px),1fr));gap:12px;padding:9px}.radar-group-grid{grid-template-columns:repeat(auto-fit,minmax(min(100%,245px),1fr))}.radar-variant-group{min-width:0}.radar-offer{min-width:0;overflow-wrap:anywhere}.radar-locate-btn{border:1px solid #c1dc9b;background:#e6f9bb;color:#27512c;border-radius:9px;font-size:12px;font-weight:800;padding:10px 11px;cursor:pointer;width:100%;text-align:left}.radar-locate-btn:disabled{opacity:.7;cursor:wait}.radar-direct-unavailable a{font-size:12px;background:#dfff82;color:#254b24;padding:10px;border-radius:9px;text-decoration:none;font-weight:800;display:block}
.radar-mvp-heading{grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;padding:5px 2px 9px;border-bottom:1px solid #deead6}.radar-mvp-heading>strong{font-size:16px;color:#264330}.radar-mvp-heading small{font-size:11px;color:#687e65}
.radar-mvp-card{gap:9px!important;padding:17px!important;min-width:0}.radar-mvp-card>strong{font-size:14px;line-height:1.45}
.radar-mvp-store{font-size:12px;font-weight:850;color:#44693b}
.radar-mvp-tags{display:flex;gap:6px;flex-wrap:wrap}.radar-mvp-tags span{font-size:11px;font-weight:800;background:#eaf1f9;color:#34566d;border-radius:7px;padding:5px 7px}
.radar-mvp-price-missing{font-weight:850;color:#755d35;font-size:16px}
.radar-mvp-hint{font-size:11px;color:#7a856e;line-height:1.4}
.radar-mvp-no-link{font-size:11px;font-weight:750;color:#6e786a;padding-top:6px}
.radar-mvp-more{grid-column:1/-1;border:1px solid #c9dfb4;background:#f3fae9;color:#42653b;padding:13px;font-weight:800;font-size:13px;border-radius:12px}
@media(max-width:800px){.radar-mvp-heading{align-items:flex-start;flex-direction:column}}
</style></head><body><header><strong>↗ desapega<em>turbo</em> <span class="pill">RADAR</span></strong><span class="muted">Compare, acompanhe e economize</span></header><main>
<span class="eyebrow">COMPRE MELHOR • VENDA COM MAIS INTELIGÊNCIA</span><h1>Seu dinheiro merece <em>boas decisões.</em></h1><p class="lead">Pesquise preços em lojas conhecidas, registre valores realmente observados e acompanhe sua meta. Sem preços ou descontos inventados.</p>
<nav><button data-tab="ofertas" class="active">🔎 Radar de ofertas</button><button data-tab="historico">📈 Histórico de preços</button><button data-tab="alertas">🔔 Minhas metas</button><button data-tab="precificar">💰 Quanto cobrar?</button></nav>
<section id="ofertas" class="panel active"><div class="cards"><div class="card"><h2>Encontre o melhor preço</h2><p>Digite o modelo exato e consulte as ofertas nas lojas. Confira frete, vendedor e especificações antes de comprar.</p><label for="search">O que deseja comprar?</label><input id="search" placeholder="Ex.: Air Fryer Mondial AFN-40 4L"><button id="searchGo" type="button" class="btn" style="margin-top:15px" onclick="window.__dtRunOfferSearch&&window.__dtRunOfferSearch()">Pesquisar ofertas ↗</button><p class="muted" id="dtOfferSearchStatus" role="status" aria-live="polite"></p><div class="radar-offers" id="stores"></div></div><div class="card"><h2>É desconto de verdade?</h2><span class="pill">COMPARAÇÃO RESPONSÁVEL</span><p>O preço riscado da loja não prova, sozinho, que uma promoção é boa. Compare o modelo idêntico entre vendedores e acompanhe seus próprios registros ao longo do tempo.</p></div></div></section>
<section id="historico" class="panel"><div class="cards"><div class="card"><h2>Histórico automático</h2><p id="dtActiveHistoryProduct" class="muted" aria-live="polite">Pesquise um produto no Radar para ver seu histórico.</p><p>O Radar reúne preços reais observados nas buscas e guarda cada dia de coleta. O gráfico cresce automaticamente conforme surgem novas observações.</p><div id="dtAutoHistorySummary" class="history" role="status" aria-live="polite">Consultando observações salvas...</div><details id="dtManualHistory" style="margin-top:15px;border-top:1px solid #e1ead8;padding-top:14px"><summary style="cursor:pointer;font-weight:750;font-size:13px">Adicionar observação manual (opcional)</summary><div style="padding-top:12px"><label>Modelo exato</label><input id="histProduct" placeholder="Ex.: Mondial AFN-40 4L"><label>Preço observado (R$)</label><input id="histPrice" inputmode="decimal" placeholder="279,90"><label>Onde viu o preço?</label><select id="histShop"><option>Mercado Livre</option><option>Amazon</option><option>Magalu</option><option>Buscapé</option><option>Zoom</option><option>Outra loja</option></select><button class="btn" id="histSave" style="margin-top:15px">Registrar preço observado</button><label for="radarImport">Importar capturas da extensão (JSON)</label><input type="file" id="radarImport" accept=".json,application/json"><p class="muted">Somente arquivos exportados pela extensão Radar Turbo. Revise os preços capturados antes de usá-los.</p><p class="status" id="histStatus" role="status"></p></div></details></div><div class="card"><h2>Evolução de preços registrados</h2><p class="muted" id="dtAutoHistoryStatus">Carregando histórico automático...</p><label>Produto para visualizar</label><select id="histSelect"></select><svg class="chart" viewBox="0 0 520 250" role="img" aria-label="Histórico de preços registrados" id="priceChart"></svg><div class="history" id="histRows"></div><p class="muted">Menor preço observado em cada dia de coleta, considerando as variantes compatíveis. Não é um histórico completo do mercado nem uma garantia do preço atual.</p></div></div></section>
<section id="alertas" class="panel"><div class="cards"><div class="card"><h2>Minha meta de preço</h2><p>Registre quanto deseja pagar. O Radar compara sua meta com os novos preços que você adicionar no histórico.</p><label>Produto exato</label><input id="targetProduct" placeholder="Nome e modelo"><label>Quero pagar no máximo (R$)</label><input id="targetPrice" inputmode="decimal" placeholder="250,00"><button class="btn" id="targetSave" style="margin-top:15px">Salvar minha meta</button><p class="status" id="targetStatus" role="status"></p></div><div class="card"><h2>Metas acompanhadas</h2><div id="targetList" class="history"></div><p class="warn">Nesta versão, a verificação ocorre quando você registra ou consulta preços aqui. Alertas automáticos por WhatsApp ou e-mail exigem monitoramento periódico com uma fonte confiável de preços.</p></div></div></section>
<section id="google" class="panel"><div class="cards"><div class="card"><span class="eyebrow">MONITORAMENTO REAL</span><h2>Ofertas coletadas no Google Shopping</h2><p>Veja os preços observados pela Serper, com loja e horário de captura. Preços podem mudar na loja e ainda não incluem frete.</p><span class="pill" id="radarSerperState">Consultando histórico...</span><p class="muted" id="radarSerperUpdate"></p></div><div class="card"><h2>Como interpretar</h2><p><b>Em análise:</b> anúncio encontrado, mas ainda aguardando confirmação de variante e condição. <b>Verificada:</b> modelo conferido. Kits, peças e produtos incompatíveis ficam fora da lista.</p><p class="warn">Não exibimos descontos históricos até existir uma série confiável do mesmo produto em datas diferentes. A coleta automática dos 20 produtos ainda está desativada.</p></div><div class="card full"><div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><h2 style="margin:0">Catálogo de 20 produtos</h2><button class="btn" type="button" id="dtRadarRefresh">Atualizar ofertas</button></div><p id="dtRadarNotice" class="muted" role="status">Buscando dados salvos no Supabase...</p><div id="dtGooglePilot" class="google-pilot"></div><div id="dtRadarOffers" class="radar-offers"></div></div></div></section><section id="precificar" class="panel"><div class="cards"><div class="card"><h2>Orientação de preço para usados</h2><p>Tenha uma faixa inicial para decidir o anúncio. A ferramenta não substitui uma pesquisa de itens equivalentes vendidos.</p><label>Preço atual de um produto novo semelhante (R$)</label><input id="newPrice" inputmode="decimal" placeholder="Ex.: 250,00"><label>Conservação</label><select id="itemState"><option value="0.8">Muito bem conservado</option><option value="0.65">Bom estado</option><option value="0.45">Sinais visíveis de uso</option><option value="0.25">Com defeito / manutenção necessária</option></select><button id="calcUsed" class="btn" style="margin-top:15px">Calcular referência inicial</button><p class="status" id="usedResult" role="status"></p></div><div class="card"><h2>Compare com produtos similares</h2><p>Antes de publicar, pesquise anúncios usados da mesma marca e modelo. O valor indicado acima é apenas um ponto de partida baseado no preço informado, não uma cotação de mercado.</p><label>Nome exato do produto</label><input id="usedSearch" placeholder="Ex.: Cafeteira Britânia 15 xícaras"><div class="results"><button class="btn" id="usedGo">Buscar usados similares ↗</button></div></div></div></section>
</main><script>
const $=id=>document.getElementById(id),money=n=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(n),amount=x=>Number(String(x).replace(/\./g,'').replace(',','.')),read=key=>{try{return JSON.parse(localStorage.getItem('radar_'+key)||'[]')}catch{return []}},write=(k,v)=>{localStorage.setItem('radar_'+k,JSON.stringify(v))};
const dtActiveProductKey='radar_active_product';
let dtActiveProduct=(()=>{
 try{return String(sessionStorage.getItem(dtActiveProductKey)||'').trim().slice(0,140)}catch{return ''}
})();
function dtCurrentProduct(){return dtActiveProduct||$('search').value.trim()}
function dtSelectActiveProduct(value,{persist=true}={}){
 const product=String(value||'').trim().replace(/\s+/g,' ').slice(0,140);
 if(product.length<3)return;
 dtActiveProduct=product;
 if(persist){try{sessionStorage.setItem(dtActiveProductKey,product)}catch{}}
 $('histProduct').value=product;
 $('targetProduct').value=product;
 if($('search').value.trim()!==product)$('search').value=product;
 const label=$('dtActiveHistoryProduct');
 if(label)label.textContent='Produto selecionado: '+product;
}
function dtSyncActiveProductInputs(){
 const product=dtCurrentProduct();
 if(product.length>=3)dtSelectActiveProduct(product,{persist:false});
}

document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('nav button').forEach(n=>n.classList.toggle('active',n===b));document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active',p.id===b.dataset.tab));if(b.dataset.tab==='historico'){dtSyncActiveProductInputs();renderHistory()}if(b.dataset.tab==='alertas'){dtSyncActiveProductInputs();renderTargets()}if(b.dataset.tab==='google')dtRadarLoad()});
function dtOfferVariant(title,query){
 const t=String(title||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),q=String(query||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const tags=[];let compatible=true;
 const fryer=(v)=>v.match(/\bafn[-\s]?40(?:[-\s]?([a-z]{2,4}))?\b/i);
 if(fryer(q)){
  const found=fryer(t),wanted=fryer(q),suffix=found?.[1]||null,desired=wanted?.[1]||null;
  if(!found)compatible=false;
  if(desired&&suffix!==desired)compatible=false;
  tags.push('AFN-40'+(suffix?'-'+suffix.toUpperCase():''));
  const volt=t.match(/\b(110|127|220)\s*v\b/i),ask=q.match(/\b(110|127|220)\s*v\b/i);
  if(volt)tags.push(volt[1]+' V');
  if(ask&&(!volt||(volt[1]!==ask[1]&&!(['110','127'].includes(volt[1])&&['110','127'].includes(ask[1])))))compatible=false;
 }else if(/\b(?:galaxy|smartphone|celular|redmi|poco|moto\s*g\d+|notebook|laptop|iphone)\b/i.test(q)){
  const ram=t.match(/(?:^|[^\d])(\d{1,2})\s*gb\s*(?:de\s*)?ram\b|\bram\s*(?:de\s*)?(\d{1,2})\s*gb\b/i);
  const ask=q.match(/(?:^|[^\d])(\d{1,2})\s*gb\s*(?:de\s*)?ram\b|\bram\s*(?:de\s*)?(\d{1,2})\s*gb\b/i);
  const r=ram?.[1]||ram?.[2],requested=ask?.[1]||ask?.[2];
  if(requested&&r!==requested)compatible=false;
  const storage=t.match(/\b(64|128|256|512)\s*gb\b/i);
  const requestedStorage=q.match(/\b(64|128|256|512|1024)\s*gb\b/i);
  if(requestedStorage&&storage&&requestedStorage[1]!==storage[1])compatible=false;
  if(storage)tags.push(storage[1]+' GB');
  if(r)tags.push(r+' GB RAM');
  const color=t.match(/\b(verde oliva|verde|rosa|cinza|preto|branco|azul|prata|grafite|violeta|dourado)\b/i);
  if(color)tags.push(color[1].replace(/\b\w/g,x=>x.toUpperCase()));
 }
 return {key:tags.join(' • ')||'Oferta',tags,compatible};
}

async function dtLocateForOffer(button,container,offer){
 if(button.disabled)return;
 if(dtLinkQuotaState){container.textContent="Limite de buscas de links atingido.";return}
 button.disabled=true;button.textContent='Buscando link...';
 try{
  const endpoint=(location.pathname.startsWith('/radar')?'/radar':'/')+'?api=locate';
  const r=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},credentials:'same-origin',body:JSON.stringify({title:offer.title,merchant:offer.merchant}),cache:'no-store'});
  const d=await r.json().catch(()=>({}));
  if(r.status===429&&['daily_limit','monthly_limit'].includes(d.status)){
   dtLinkQuotaState=d.status;
   container.textContent="Limite de busca atingido. Não foi possível localizar o link.";button.textContent="Limite atingido";return;
  }
  if(r.ok&&d.status==='ready'&&d.matchLevel==='same_variant'&&d.url){
   const u=new URL(d.url),source=dtMerchantGroupName(offer.merchant),h=u.hostname,p=u.pathname;
   const valid=u.protocol==='https:'&&!u.username&&!u.password&&!u.port&&(
    (source==='market:amazon'&&/^(www\.)?amazon\.com\.br$/i.test(h)&&/\/dp\/[A-Z0-9]{10}$/i.test(p))||
    (source==='market:americanas'&&/^(www\.)?americanas\.com\.br$/i.test(h)&&/(?:\/p\/?$|\/produto\/\d+\/?$)/i.test(p))||
    (source==='market:magalu'&&/^(www\.)?magazineluiza\.com\.br$/i.test(h)&&/\/p\/[a-z0-9]{5,20}/i.test(p))||
    (source==='market:mercadolivre'&&/^(?:www\.|produto\.)?mercadolivre\.com\.br$/i.test(h)&&/\/MLB-?\d{7,15}(?:[\/-]|$)/i.test(p))||
    (source==='market:shopee'&&/^(www\.)?shopee\.com\.br$/i.test(h)&&/(?:\/product\/\d+\/\d+|-i\.\d+\.\d+)/i.test(p))||
    (source==='store:kabum'&&/^(www\.)?kabum\.com\.br$/i.test(h)&&/^\/produto\/\d{4,15}(?:\/|$)/i.test(p))||
    (source==='store:terabyte'&&/^(www\.)?terabyteshop\.com\.br$/i.test(h)&&/^\/produto\/\d{4,15}(?:\/|$)/i.test(p))||
    (source==='store:pichau'&&/^(www\.)?pichau\.com\.br$/i.test(h)&&/^\/[a-z0-9][a-z0-9-]{12,180}\/?$/i.test(p)&&!/^\/(?:busca|search|categoria|departamento|marcas|ofertas|promocoes|carrinho|login|produto)\b/i.test(p))||
    (source==='store:le biscuit'&&/^(www\.)?lebiscuit\.com\.br$/i.test(h)&&/\/p\/?$/.test(p))||
    (()=>{const slug=String(offer.merchant||'').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-');const tokens=slug.split('-').filter(x=>x.length>=4);const host=h.replace(/[^a-z0-9]/g,'');return tokens.length>0&&tokens.some(x=>host.includes(x))&&p.length>3&&!/^\\/(?:search|busca|categoria|departamento|ofertas|promocoes|carrinho|login)(?:\\/|$)/i.test(p)})()
   );
   if(!valid)throw Error('invalid_candidate');
   const link=document.createElement('a');link.href=u.href;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Ver produto na loja ↗';
   const note=document.createElement('small');note.className='radar-mvp-hint';note.textContent='Página compatível; confira o preço atualizado na loja.';
   container.replaceChildren(link,note);
  }else{
   const note=document.createElement('small');note.className='radar-mvp-no-link';
   note.textContent=['daily_limit','monthly_limit','rate_limit'].includes(d.status)?'Limite de localização atingido.':d.matchLevel==='same_family'?'Versão exata não confirmada.':d.status==='missing'?'Nenhuma página confiável encontrada.':'Link direto não confirmado.';
   container.replaceChildren(note);
  }
 }catch{
  const note=document.createElement('small');note.className='radar-mvp-no-link';note.textContent='Não foi possível validar o link agora.';
  container.replaceChildren(note);
 }
}
function dtOfferCard(offer,query){
 const card=document.createElement('article');card.className='radar-offer radar-mvp-card';
 const store=document.createElement('div');store.className='radar-mvp-store';store.textContent=offer.merchant||'Loja';
 const title=document.createElement('strong');title.textContent=offer.title;
 card.append(store,title);
 const tags=dtOfferVariant(offer.title,query).tags;
 if(offer.linkFrom==="matched_product_page"&&dtDirectUrl(offer)){
  const volts=new URL(offer.url).pathname.match(/(?:^|[-_\/])(110|127|220)v(?:[-_\/]|$)/i);
  if(volts&&!tags.some(t=>t===volts[1]+" V"))tags.push(volts[1]+" V (página da loja)")
 }
 if(tags.length){
  const wrap=document.createElement('div');wrap.className='radar-mvp-tags';
  for(const value of tags.slice(0,4)){const tag=document.createElement('span');tag.textContent=value;wrap.append(tag)}
  card.append(wrap)
 }
 const hasPrice=Number.isFinite(Number(offer.price))&&Number(offer.price)>0&&offer.price!==null;
 const price=document.createElement('div');price.className=hasPrice?'price':'radar-mvp-price-missing';
 price.textContent=hasPrice?money(Number(offer.price)):'Preço a conferir na loja';
 card.append(price);
 const detail=document.createElement('small');detail.className='radar-mvp-hint';
 detail.textContent=hasPrice?(offer.officialPrice===true?"Preço da API oficial do Mercado Livre • link em validação":offer.priceConfirmed===true?"Preço conferido na coleta • disponibilidade pode mudar":offer.linkFrom==="merchant_exact_product"?"Preço observado na Serper • página da variante localizada • confira valor na loja":"Preço observado no Google Shopping • confira valor na loja"):"Preço não confirmado";
 card.append(detail);
 const direct=dtDirectUrl(offer);
 if(direct){
  const link=document.createElement('a');link.href=direct;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Ver produto na loja ↗';card.append(link);
  if(offer.linkOnly){const note=document.createElement('small');note.className='radar-mvp-hint';note.textContent='A página encontrada não está vinculada ao preço de outra oferta.';card.append(note)}
 }else if(offer.officialPrice===true){
  const note=document.createElement("small");note.className="radar-mvp-no-link";note.textContent="Link do anúncio ainda não confirmado";card.append(note);
 }else{
  const merchant=dtMerchantGroupName(offer.merchant);
  if(['market:amazon','market:americanas','market:magalu','market:mercadolivre','market:shopee','store:le biscuit','store:pichau'].includes(merchant)&&!direct){
   const target=document.createElement('div'),button=document.createElement('button');button.type='button';button.className='radar-mvp-more';
   button.textContent='Buscar link da loja ↗';button.onclick=()=>dtLocateForOffer(button,target,offer);
   target.append(button);card.append(target);
  }else{
   const unavailable=document.createElement('small');unavailable.className='radar-mvp-no-link';unavailable.textContent='Preço e link ainda não confirmados juntos';card.append(unavailable)
  }
 }
 return card
}

function dtMerchantType(merchant){
 const m=String(merchant||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 return /(?:mercado\s*livre|mercadolivre|shopee|amazon|magalu|magazine\s*luiza|casas\s*bahia|americanas|aliexpress|temu|kabum|carrefour|pontofrio|ponto\s*frio|extra\.com)/i.test(m)?'marketplace':'store'
}
function dtMerchantKey(merchant){
 return String(merchant||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/\s+/g,' ')
}
function dtDirectUrl(offer){
 try{const u=new URL(offer.url||'');if(u.protocol==='https:'&&!/(^|\.)google\.[a-z.]+$/i.test(u.hostname)&&!/(^|\.)(googleusercontent\.com|gstatic\.com|youtube\.com)$/i.test(u.hostname))return u.href}catch{}
 return null
}
function dtMerchantGroupName(merchant){
 const name=dtMerchantKey(merchant);
 if(/amazon/.test(name))return 'market:amazon';
 if(/mercado\s*livre|mercadolivre/.test(name))return 'market:mercadolivre';
 if(/shopee/.test(name))return 'market:shopee';
 if(/magalu|magazine\s*luiza/.test(name))return 'market:magalu';
 if(/casas\s*bahia/.test(name))return 'market:casasbahia';
 if(/americanas/.test(name))return 'market:americanas';
 return 'store:'+name;
}
// Single product comparison, all merchants in one list. No per-merchant blocks or duplicate item cards.
const dtUnifiedOfferState=new WeakMap();
function dtUnifiedIdentity(x){
 const m=dtMerchantGroupName(x.merchant);
 const text=String(x.title||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 const storage=text.match(/\b(64|128|256|512|1024)\s*gb\b/)?.[1]||"";
 const ram=text.match(/\b(\d{1,2})\s*gb\s*ram\b|\bram\s*(\d{1,2})\s*gb\b/);
 const color=text.match(/\b(verde oliva|cinza claro|preto|rosa|cinza|verde|azul|branco|grafite|dourado|prata)\b/)?.[0]||"";
 const variant=[storage,ram?.[1]||ram?.[2]||"",color].join("|");
 // One visual row per merchant/variant/price. Do not merge different prices or variants.
 return [m,variant,Number(x.price).toFixed(2)].join("|");
}
const dtAutoLinkSession=new WeakMap();
let dtLinkQuotaState=null;
function dtOfferSourceKey(o){
 return [String(o.merchant||"").toLowerCase(),String(o.title||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()].join("|");
}
function dtAutoLinkSchedule(host,query){
 const state=dtUnifiedOfferState.get(host);
 if(!state||state.autoScheduled)return;
 state.autoScheduled=true;
 if(dtLinkQuotaState){state.linkQuota=dtLinkQuotaState;dtRenderUnifiedOffers(host,query);return;}
 const session={running:false,done:new Set(),attempted:0,finished:false};dtAutoLinkSession.set(host,session);
 const choices=state.offers.filter(o=>!o.officialPrice&&!dtDirectUrl(o)&&['market:mercadolivre','market:shopee','market:amazon','market:magalu'].includes(dtMerchantGroupName(o.merchant))&&dtOfferVariant(o.title,query).compatible);
 // Bound paid locator calls: max 2 attempts per search, one per merchant first.
 const used=new Set(),selected=[];
 for(const item of choices){
  const merchant=dtMerchantGroupName(item.merchant);
  if(used.has(merchant))continue;
  used.add(merchant);selected.push(item);
  if(selected.length>=2)break;
 }
 if(selected.length<2){
  for(const item of choices){
   if(selected.length>=2)break;
   if(!selected.includes(item))selected.push(item);
  }
 }
 (async()=>{
  for(const offer of selected){
   if(dtUnifiedOfferState.get(host)!==state)return;
   const key=dtOfferSourceKey(offer);if(session.done.has(key))continue;
   session.done.add(key);session.attempted++;
   try{
    const base=location.pathname.startsWith('/radar')?'/radar':'/';
    const response=await fetch(base+(base.includes('?')?'&':'?')+'api=locate',{
      method:'POST',headers:{'content-type':'application/json'},credentials:'same-origin',
      body:JSON.stringify({title:offer.title,merchant:offer.merchant}),signal:AbortSignal.timeout(39000)});
    const result=await response.json().catch(()=>({}));
    if(dtUnifiedOfferState.get(host)!==state)return;
    if(response.status===429&&['daily_limit','monthly_limit'].includes(result.status)){
     dtLinkQuotaState=result.status;state.linkQuota=result.status;
     dtRenderUnifiedOffers(host,query);break;
    }
    if(response.ok&&result.status==='ready'&&result.matchLevel==='same_variant'&&result.url){
     const u=new URL(result.url);
     const kind=dtMerchantGroupName(offer.merchant);
     const allowed={
      'market:mercadolivre':/(^|\.)mercadolivre\.com\.br$/,
      'market:shopee':/(^|\.)shopee\.com\.br$/,
      'market:amazon':/(^|\.)amazon\.com\.br$/,
      'market:magalu':/(^|\.)magazineluiza\.com\.br$/
     };
     if(u.protocol==='https:'&&allowed[kind]?.test(u.hostname)&&!u.username&&!u.password){
      offer.url=u.href;offer.linkFrom='matched_product_page';offer.linkVariantTitle=result.resultTitle||'';
      dtRenderUnifiedOffers(host,query);
     }
    }
   }catch{}
  }
  session.finished=true;
 })();
}
// Outbound searches are not evidence that this is the precise listing or price.
// Exact product pages found independently and cross-checked against a matching
// model/merchant/price. These are NOT a universal resolver; never infer other listings.
function dtKnownExactJBLProductLink(offer){
 const title=String(offer.title||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 const merchant=String(offer.merchant||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 const price=Number(offer.price);
 if(!/\bjbl\b/.test(title)||!/\btune\s*520\s*bt\b|\btune\s*520bt\b|\b520bt\b/.test(title)||!Number.isFinite(price))return null;
 const color=title.match(/\b(preto|branco|rosa|azul|violeta|roxo)\b/)?.[1]||"";
 if(/mercado\s*livre|mercadolivre/.test(merchant)&&Math.abs(price-244.90)<0.001&&(!color||color==="preto")){
  return "https://www.mercadolivre.com.br/fones-de-ouvido-sem-fio-bluetooth-jbl-tune-520bt-on-ear-cor-preta/p/MLB58844954";
 }
 if(/netshoes/.test(merchant)&&Math.abs(price-305.10)<0.001&&color==="branco"){
  return "https://www.netshoes.com.br/p/fone-de-ouvido-bluetooth-jbl-tune-520bt-branco-GKP-0012-014";
 }
 if(/zattini/.test(merchant)&&Math.abs(price-339)<0.001&&color==="branco"){
  return "https://www.zattini.com.br/p/fone-de-ouvido-bluetooth-jbl-tune-520bt-branco-GKP-0012-014";
 }
 if(/^(loja jbl|jbl oficial|jbl)$/.test(merchant)&&Math.abs(price-339)<0.001&&(!color||color==="preto")){
  return "https://www.jbl.com.br/TUNE520BT.html";
 }
 return null;
}
function dtMerchantSearchFallback(offer){
 const text=String(offer.title||"").replace(/\s+/g," ").trim().slice(0,150);
 if(text.length<4)return null;
 const merchant=dtMerchantGroupName(offer.merchant),q=encodeURIComponent(text);
 if(merchant==="market:mercadolivre")return "https://lista.mercadolivre.com.br/"+q;
 if(merchant==="market:shopee")return "https://shopee.com.br/search?keyword="+q;
 if(merchant==="market:amazon")return "https://www.amazon.com.br/s?k="+q;
 if(merchant==="market:magalu")return "https://www.magazineluiza.com.br/busca/"+q+"/";
 if(merchant==="market:americanas")return "https://www.americanas.com.br/busca/"+q;
 const name=String(offer.merchant||"").replace(/[<>"'\\]/g," ").trim().slice(0,65);
 return name?"https://www.google.com/search?q="+encodeURIComponent(name+" "+text+" comprar"):null;
}
function dtStrictProductMatch(title,query){
 const norm=v=>String(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
 const t=norm(title),q=norm(query);
 if(!t||!q)return false;
 if(/\b(capa|capinha|case|carteira|flip|capas|silicone|pelicula|protetor|peliculas|kit|combo|conjunto|compativel|carregador|cabo|adaptador|display|tela avulsa|tela display|aro incell|peca|refil|suporte|estojo|bateria avulsa)\b/.test(t))return false;
 if(/\b(gel slim|slim gel|com fone|com brinde|acessorio|acessorios|case anti impacto|headset incluido|fone incluso)\b/.test(t))return false;
 if(/\b(usado|seminovo|recondicionado|reformado|plano de operadora|contrato de operadora)\b/.test(t))return false;
 if(/\b(galaxy|iphone|smartphone|celular|redmi|poco|moto)\b/.test(q)){
  const model=q.match(/\b(?:galaxy\s*)?(a\d{2,3}|s\d{2,3}(?:\s*fe)?)\b/)?.[1];
  if(model){
   const m=model.replace(/\s+/g,"");
   if(!new RegExp("\\b"+m.replace(/([a-z])(\d)/,"$1\\s*$2")+"\\b").test(t))return false;
  }
  const iphone=q.match(/\biphone\s*(\d{1,2})(?:\s*(pro max|pro|plus))?\b/);
  if(iphone){
   const match=t.match(/\biphone\s*(\d{1,2})(?:\s*(pro max|pro|plus))?\b/);
   if(!match||match[1]!==iphone[1]||String(match[2]||"")!==String(iphone[2]||""))return false;
  }
  const gb=q.match(/\b(64|128|256|512|1024)\s*gb\b/)?.[1];
  const titleGb=t.match(/\b(64|128|256|512|1024)\s*gb\b/)?.[1];
  if(gb&&titleGb!==gb)return false;
  const requestRam=q.match(/\b(\d{1,2})\s*gb\s*ram\b|\bram\s*(\d{1,2})\s*gb\b/);
  if(requestRam){
   const actual=t.match(/\b(\d{1,2})\s*gb\s*ram\b|\bram\s*(\d{1,2})\s*gb\b/);
   if((requestRam[1]||requestRam[2])!==(actual?.[1]||actual?.[2]))return false;
  }
  if(!/\b(samsung|galaxy|smartphone|celular|iphone|redmi|poco|motorola|xiaomi|apple)\b/.test(t))return false;
  return true;
 }
 const code=q.split(" ").filter(x=>/[a-z]/.test(x)&&/\d/.test(x)&&x.length>=3&&!/^\d+(?:hz|gb|tb|w|v|mah|mp|cm|mm)$/i.test(x));
 if(code.some(x=>!t.replace(/\s+/g,"").includes(x.replace(/\s+/g,""))))return false;
 const brand=q.split(" ").find(x=>x.length>=3);
 return !brand||t.includes(brand);
}
function dtRenderUnifiedOffers(host,query){
 const state=dtUnifiedOfferState.get(host);if(!state)return;
 const all=state.offers.filter(o=>o&&o.title&&dtStrictProductMatch(o.title,query)&&dtOfferVariant(o.title,query).compatible&&Number(o.price)>0&&(!/uau\s*caixa/i.test(String(o.merchant||""))||o.priceConfirmed===true));
 all.sort((a,b)=>Number(Boolean(dtDirectUrl(b)))-Number(Boolean(dtDirectUrl(a)))||Number(a.price)-Number(b.price));
 const unique=new Map();
 for(const offer of all){
  const key=dtUnifiedIdentity(offer),prev=unique.get(key);
  if(!prev||(!dtDirectUrl(prev)&&dtDirectUrl(offer)))unique.set(key,offer);
 }
 const offers=[...unique.values()],linked=offers.filter(o=>Boolean(dtDirectUrl(o))),unlinked=offers.filter(o=>!dtDirectUrl(o));
 const makeRow=offer=>{
  const row=document.createElement("div");row.className="radar-unified-row";
  row.style.cssText="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px 14px;align-items:center;padding:13px 14px;border-bottom:1px solid #e7ede4";
  const left=document.createElement("div");left.style.cssText="min-width:0;display:flex;flex-direction:column;gap:4px";
  const store=document.createElement("strong");store.textContent=offer.merchant||"Loja";store.style.cssText="font-size:13px";
  const tags=dtOfferVariant(offer.title,query).tags;
  const description=document.createElement("span");description.style.cssText="font-size:12px;color:#587063;line-height:1.4;overflow-wrap:anywhere";
  description.textContent=tags.length?tags.join(" • "):String(offer.title||"").slice(0,105);
  const source=document.createElement("small");source.style.cssText="font-size:11px;color:#7a8a78";
  source.textContent=offer.linkFrom==="same_organic_search_result"?"Preço exibido na busca • confira o valor na loja":offer.linkFrom==="ml_catalog_item_filtered"?"Preço da API • link ao produto, vendedor a conferir":offer.officialPrice?"Preço registrado pela API do Mercado Livre":offer.priceConfirmed?"Preço verificado na página":offer.linkFrom==="independently_matched_product_page"?"Página do produto localizada • confira preço atualizado":offer.linkFrom==="matched_product_page"?"Página da variante localizada • preço observado":"Preço observado na Serper";
  left.append(store,description,source);
  const right=document.createElement("div");right.style.cssText="display:flex;flex-direction:column;align-items:flex-end;gap:5px";
  const amount=document.createElement("strong");amount.textContent=money(Number(offer.price));amount.style.cssText="font-size:18px;white-space:nowrap;color:#173b28";
  right.append(amount);
  const direct=dtDirectUrl(offer);
  if(direct){
   const link=document.createElement("a");link.href=direct;link.target="_blank";link.rel="noopener noreferrer";
   link.textContent=offer.linkFrom==="ml_catalog_item_filtered"?"Ver produto no ML ↗":"Ver na loja ↗";link.title=offer.linkFrom==="ml_catalog_item_filtered"?"Abre a página do produto com filtro pelo anúncio. Preço e vendedor devem ser conferidos.":"";link.style.cssText="background:#dbfa8e;color:#193421;padding:7px 10px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none";
   right.append(link);
  }else{
   const source=dtMerchantGroupName(offer.merchant);
   const supported=Boolean(String(offer.merchant||'').trim()&&String(offer.title||'').trim());
   if(supported){
    const target=document.createElement("div");
    const button=document.createElement("button");button.type="button";
    button.textContent="Localizar produto direto";
    button.title="Localiza uma pagina especifica do produto, nunca uma busca do Google.";
    button.style.cssText="padding:7px 10px;border:1px solid #c7d7b2;border-radius:8px;font-size:12px;color:#385c36;font-weight:700;background:#fff;cursor:pointer";
    button.onclick=()=>dtLocateForOffer(button,target,offer);
    target.append(button);right.append(target);
   }else{
    const unavailable=document.createElement("small");
    unavailable.textContent="Link direto indisponivel";
    unavailable.style.cssText="font-size:11px;color:#7e826f";
    right.append(unavailable);
   }
   const pending=document.createElement("small");pending.style.cssText="font-size:10px;color:#7e826f;text-align:right;max-width:175px";
   pending.textContent="Preço não vinculado ao anúncio";right.append(pending);
  }
  row.append(left,right);return row;
 };
 host.replaceChildren();
 const wrapper=document.createElement("section");wrapper.className="radar-unified-compare";
 wrapper.style.cssText="grid-column:1/-1;min-width:0;width:100%";
 const header=document.createElement("div");header.className="radar-mvp-heading";
 const title=document.createElement("strong");title.textContent="Comparação de ofertas";
 const subtitle=document.createElement("small");subtitle.textContent=offers.length+" preços • "+linked.length+" com link direto";
 header.append(title,subtitle);wrapper.append(header);
 if(offers.length){
  const list=document.createElement("div");list.className="radar-unified-rows";
  list.style.cssText="display:flex;flex-direction:column;border:1px solid #dce5d6;border-radius:14px;overflow:hidden;margin-top:12px";
  for(const offer of offers)list.append(makeRow(offer));
  wrapper.append(list);
 }else{
  const empty=document.createElement("p");empty.style.cssText="font-size:13px;color:#647260;padding:10px 2px";
  empty.textContent="Nenhuma oferta com preço disponível para esta pesquisa.";wrapper.append(empty);
 }
 if(unlinked.length){
  const note=document.createElement("small");note.style.cssText="display:block;color:#806f4d;line-height:1.5;margin-top:10px";
  note.textContent="Buscar na loja abre a pesquisa do produto, não o anúncio do preço mostrado. Ver na loja abre uma página de produto localizada.";
  wrapper.append(note);
 }
 const foot=document.createElement("small");foot.style.cssText="display:block;color:#66745f;margin-top:11px;line-height:1.5";
 foot.textContent="Preços observados podem mudar. No Mercado Livre, o link do catálogo pode mostrar outro vendedor ou valor: confira antes de comprar.";
 wrapper.append(foot);host.append(wrapper);
}

function dtRenderSimpleOffers(host,observations,listingPages,query){
 const state={offers:[],loading:false};dtUnifiedOfferState.set(host,state);
 for(const offer of observations||[]){
  if(!offer?.title||!Number(offer.price))continue;
  if(/uau\s*caixa/i.test(String(offer.merchant||""))&&offer.merchantPriceConfirmed!==true)continue;
  const curated=dtKnownExactJBLProductLink(offer);
  state.offers.push({...offer,url:dtDirectUrl(offer)||curated||null,linkFrom:curated?"independently_matched_product_page":offer.linkFrom,priceConfirmed:offer.merchantPriceConfirmed===true});
 }
 for(const page of listingPages||[]){
  const url=dtMerchantCandidateURL(page);
  if(!url||page.pagePriceStatus!=="verified"||!(Number(page.pagePrice)>0))continue;
  state.offers.push({title:page.title,merchant:page.merchant,price:Number(page.pagePrice),url,priceConfirmed:true,listingId:page.listingId});
 }
 dtRenderUnifiedOffers(host,query);
 // Automatic paid locator disabled: collect links from cached source responses, no silent paid queries.
}
async function dtLoadOrganicOffers(host,query){
 const state=dtUnifiedOfferState.get(host);if(!state)return;
 try{
  const base=location.pathname.startsWith("/radar")?"/radar":"/";
  const url=base+(base.includes("?")?"&":"?")+"api=organic-offers&q="+encodeURIComponent(query);
  const res=await fetch(url,{credentials:"same-origin",cache:"no-store"});
  const data=await res.json().catch(()=>({}));
  if(!res.ok||data.status!=="ready"||dtUnifiedOfferState.get(host)!==state)return;
  const offers=Array.isArray(data.offers)?data.offers.filter(o=>dtStrictProductMatch(o.title,query)&&Number(o.price)>0&&!!dtDirectUrl(o)):[];
  if(!offers.length)return;
  const already=new Set(state.offers.map(o=>dtDirectUrl(o)).filter(Boolean));
  for(const item of offers){const direct=dtDirectUrl(item);if(!already.has(direct)){state.offers.push(item);already.add(direct)}}
  dtRenderUnifiedOffers(host,query);
 }catch{}
}
async function dtLoadMoreStores(host,query){
 const state=dtUnifiedOfferState.get(host);if(!state)return;
 try{
  const base=location.pathname.startsWith("/radar")?"/radar":"/";
  const r=await fetch(base+(base.includes("?")?"&":"?")+"api=organic-stores&q="+encodeURIComponent(query),{credentials:"same-origin",cache:"no-store"});
  const data=await r.json().catch(()=>({}));
  if(!r.ok||data.status!=="ready"||dtUnifiedOfferState.get(host)!==state)return;
  const items=Array.isArray(data.offers)?data.offers.filter(x=>dtStrictProductMatch(x.title,query)&&Number(x.price)>0&&!!dtDirectUrl(x)):[];
  if(!items.length)return;
  const seen=new Set(state.offers.map(x=>dtDirectUrl(x)).filter(Boolean));
  for(const item of items){const link=dtDirectUrl(item);if(!seen.has(link)){state.offers.push(item);seen.add(link)}}
  dtRenderUnifiedOffers(host,query);
 }catch{}
}
async function dtLoadDataForSeoOffers(host,query){
 const key=String(query||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
 if(key!=="samsung galaxy a56 256gb")return;
 const state=dtUnifiedOfferState.get(host);
 if(!state)return;
 try{
  const base=location.pathname.startsWith("/radar")?"/radar":"/";
  const response=await fetch(base+(base.includes("?")?"&":"?")+"api=dfs-offers&q="+encodeURIComponent(query),{credentials:"same-origin",cache:"no-store"});
  const data=await response.json().catch(()=>({}));
  if(!response.ok||data.status!=="ready"||dtUnifiedOfferState.get(host)!==state)return;
  const incoming=Array.isArray(data.offers)?data.offers.filter(x=>dtStrictProductMatch(x.title,query)&&Number(x.price)>0&&!!dtDirectUrl(x)):[];
  if(!incoming.length)return;
  state.offers.push(...incoming);
  dtRenderUnifiedOffers(host,query);
 }catch{}
}
async function dtLoadOfficialML(host,query){
 const norm=String(query||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 if(!/\ba\s*56\b|\ba56\b/.test(norm)||!/\b256\s*gb\b|\b256gb\b/.test(norm))return;
 const state=dtUnifiedOfferState.get(host);if(!state)return;
 try{
  const base=location.pathname.startsWith("/radar")?"/radar":"/";
  const r=await fetch(base+(base.includes("?")?"&":"?")+"api=ml-offers&q="+encodeURIComponent(query),{credentials:"same-origin",cache:"no-store"});
  const payload=await r.json().catch(()=>({}));
  if(!r.ok||payload.status!=="ready")return;
  if(dtUnifiedOfferState.get(host)!==state)return;
  const official=Array.isArray(payload.offers)?payload.offers:[];
  state.offers.push(...official.map(x=>({...x,officialPrice:true,priceConfirmed:false})));
  dtRenderUnifiedOffers(host,query);
 }catch{}
}
function dtOfferGrouped(host,offers,query){dtRenderSimpleOffers(host,offers,[],query)}

function dtMerchantCandidateURL(entry){
 try{
  const u=new URL(entry.url||"");
  if(u.protocol!=="https:"||u.username||u.password||u.port)return null;
  const host=u.hostname.toLowerCase(),path=u.pathname;
  const merchant=String(entry.merchant||"").toLowerCase();
  if(merchant==="amazon"&&["amazon.com.br","www.amazon.com.br"].includes(host)&&/\/dp\/B0[A-Z0-9]{8}$/i.test(path))return u.href;
  if(merchant==="uau caixa"&&["uaucaixa.com.br","www.uaucaixa.com.br"].includes(host)&&/^\/(?:extra|casasbahia|satelitalsamsung)\/.+\/[A-Z0-9-]{5,40}$/i.test(path))return u.href;
  if(merchant==="mercado livre"&&["mercadolivre.com.br","www.mercadolivre.com.br","produto.mercadolivre.com.br"].includes(host)&&/^MLB-?\d{7,15}$/i.test(entry.listingId||"")&&/\/MLB-\d{7,15}(?:[\/-]|$)/i.test(path))return u.href;
 }catch{}
 return null
}

async function searchInternalOffers(){
 const q=$('search').value.trim(),host=$('stores'),status=$('dtOfferSearchStatus'),button=$('searchGo');
 host.replaceChildren();
 if(q.length<3||q.length>140){status.textContent='Digite o nome ou modelo do produto (3 a 140 caracteres).';return}
 dtSelectActiveProduct(q);
 button.disabled=true;status.textContent='Consultando ofertas da Serper (cache de 24h)...';
 const base=location.pathname.startsWith('/radar')?'/radar':'/';
 let liveError=null;
 try{
  // Prefer the product's own Serper Shopping listings. Never mix a link from another seller into a saved price.
  const endpoint=base+(base.includes('?')?'&':'?')+'api=search&q='+encodeURIComponent(q);
  const response=await fetch(endpoint,{credentials:'same-origin',cache:'no-store'});
  const result=await response.json().catch(()=>({}));
  if(response.ok&&result.status==='ready'&&Array.isArray(result.offers)&&result.offers.length){
   status.textContent='Resultados recebidos da Serper • '+(result.cached?'cache, sem nova consulta':'consulta registrada')+' • exibindo apenas produtos compatíveis.';
   dtOfferGrouped(host,result.offers,q);
   dtLoadOfficialML(host,q).catch(()=>{});
   dtLoadOrganicOffers(host,q).catch(()=>{});
   dtLoadMoreStores(host,q).catch(()=>{});
   dtLoadDataForSeoOffers(host,q).catch(()=>{});
   button.disabled=false;
   return;
  }
  liveError=result.status||result.error||'unavailable';
 }catch(e){liveError='connection_unavailable'}
 try{
  status.textContent='Mostrando o catálogo salvo enquanto a pesquisa atual não está disponível.';
  const catalog=base+(base.includes('?')?'&':'?')+'api=prices';
  const r=await fetch(catalog,{credentials:'same-origin',cache:'no-store'});
  if(!r.ok)throw Error('catalog_unavailable');
  const data=await r.json();
  if(!Array.isArray(data.products))throw Error('invalid_catalog');
  const clean=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const terms=clean(q).split(' ').filter(Boolean);
  const products=data.products.filter(p=>terms.every(t=>clean(p.query).includes(t)));
  const saved=products.flatMap(p=>(p.offers||[]).map(o=>({...o,product:p.query}))).filter(o=>o.status!=='mismatch');
  const pages=products.flatMap(p=>(p.marketplaceListings||[]).map(x=>({...x,product:p.query})));
  if(saved.length||pages.length){
   status.textContent='Catálogo anterior • preços observados podem ter mudado. '+(liveError==='daily_limit'?'Limite diário de busca atingido.':liveError==='monthly_limit'?'Limite mensal de busca atingido.':'');
   dtRenderSimpleOffers(host,saved,pages,q);
   dtLoadOfficialML(host,q).catch(()=>{});
   dtLoadOrganicOffers(host,q).catch(()=>{});
   dtLoadMoreStores(host,q).catch(()=>{});
   dtLoadDataForSeoOffers(host,q).catch(()=>{});
  }else{
   dtRenderSimpleOffers(host,[],[],q);
   dtLoadOfficialML(host,q).catch(()=>{});
   dtLoadOrganicOffers(host,q).catch(()=>{});
   dtLoadMoreStores(host,q).catch(()=>{});
   dtLoadDataForSeoOffers(host,q).catch(()=>{});
   status.textContent='Mostrando preços oficiais disponíveis. '+(liveError==='daily_limit'?'Limite diário atingido.':liveError==='monthly_limit'?'Limite mensal atingido.':'Tente novamente mais tarde.');
  }
 }catch{dtRenderSimpleOffers(host,[],[],q);dtLoadOfficialML(host,q).catch(()=>{});
   dtLoadOrganicOffers(host,q).catch(()=>{});
   dtLoadMoreStores(host,q).catch(()=>{});
   dtLoadDataForSeoOffers(host,q).catch(()=>{});status.textContent='Buscando preços oficiais disponíveis.'}
 finally{button.disabled=false}
}
window.__dtRunOfferSearch=()=>{const status=$('dtOfferSearchStatus'),button=$('searchGo');try{Promise.resolve(searchInternalOffers()).catch(e=>{status.textContent='Falha ao iniciar a pesquisa. Tente novamente.';button.disabled=false;console.error('radar_search_click',e)})}catch(e){status.textContent='Falha ao iniciar a pesquisa. Tente novamente.';button.disabled=false;console.error('radar_search_click',e)}};
$('searchGo').onclick=window.__dtRunOfferSearch;
$('search').onkeydown=e=>{if(e.key==='Enter')searchInternalOffers()};

$('histSave').onclick=()=>{const product=$('histProduct').value.trim(),price=amount($('histPrice').value);if(product.length<3||!Number.isFinite(price)||price<=0){$('histStatus').textContent='Informe modelo e preço válidos.';return}const all=read('history');all.push({id:crypto.randomUUID(),product,price,shop:$('histShop').value,date:new Date().toISOString()});write('history',all);$('histStatus').textContent='✓ Preço registrado neste navegador.';renderHistory();renderTargets()};
$('radarImport').onchange=async()=>{
 const file=$('radarImport').files?.[0];if(!file)return;
 try{
  if(file.size>2000000)throw Error('Arquivo maior que 2 MB.');
  const document=JSON.parse(await file.text());
  if(document.format!=='radar-turbo-captures-v1'||!Array.isArray(document.captures))throw Error('Formato não reconhecido.');
  const rows=read('history'),ids=new Set(rows.map(x=>x.id));let count=0;
  for(const entry of document.captures.slice(0,250)){
   const name=String(entry.product||'').trim().slice(0,160);
   const price=Number(entry.price);const shop=String(entry.shop||'Loja').slice(0,80);
   const date=new Date(entry.date);const url=String(entry.url||'');
   const id=String(entry.id||'').slice(0,100);
   if(!name||!Number.isFinite(price)||price<=0||price>100000000||!Number.isFinite(date.getTime())||date.getTime()>Date.now()+60000||!/^https:\/\//.test(url)||!id||ids.has(id))continue;
   rows.push({id,product:name,price,shop,date:date.toISOString(),url,source:'extensao'});ids.add(id);count++;
  }
  write('history',rows);renderHistory();renderTargets();
  $('histStatus').textContent='✓ '+count+' captura(s) importada(s). Valores registrados como observações, não histórico oficial.';
 }catch(e){$('histStatus').textContent='Não foi possível importar: '+e.message}
 finally{$('radarImport').value=''}
};
let dtAutoHistoryData=null,dtAutoHistoryPending="";
function renderHistory(){
 const all=read('history'),select=$('histSelect'),existing=select.value,active=dtCurrentProduct();
 select.replaceChildren();
 const unique=[...new Set(all.map(x=>x.product).filter(Boolean))];
 const names=active.length>=3?[active,...unique.filter(name=>name.toLowerCase()!==active.toLowerCase())]:unique;
 if(!names.length){const op=document.createElement('option');op.value='';op.textContent='Pesquise um produto no Radar';select.append(op)}
 else for(const name of names){const op=document.createElement('option');op.value=name;op.textContent=name;select.append(op)}
 if(active.length>=3)select.value=active;
 else if(names.includes(existing))select.value=existing;
 const selected=select.value;
 const label=$('dtActiveHistoryProduct');if(label)label.textContent=selected?'Produto selecionado: '+selected:'Pesquise um produto no Radar para acompanhar seu histórico.';
 if(!selected||selected.length<3){
  dtAutoHistoryData=null;dtAutoHistoryPending='';drawHistory();return;
 }
 if(dtAutoHistoryData?.query!==selected){
  dtAutoHistoryData=null;
  $('dtAutoHistoryStatus').textContent='Consultando preços coletados para '+selected+'...';
  $('dtAutoHistorySummary').textContent='Carregando observações automáticas...';
  drawHistory();
 }
 dtLoadAutoHistory(selected).catch(()=>{});
}
$('histSelect').onchange=()=>{
 const selected=$('histSelect').value;if(selected)dtSelectActiveProduct(selected);
 renderHistory();
};
async function dtLoadAutoHistory(query){
 if(dtAutoHistoryPending===query)return;
 if(dtAutoHistoryData?.query===query&&Date.now()-dtAutoHistoryData.loadedAt<45000){drawHistory();return}
 dtAutoHistoryPending=query;
 try{
  const base=location.pathname.startsWith('/radar')?'/radar':'/';
  const response=await fetch(base+(base.includes('?')?'&':'?')+'api=auto-history&q='+encodeURIComponent(query),{cache:'no-store',credentials:'same-origin',signal:AbortSignal.timeout(24000)});
  const payload=await response.json().catch(()=>({}));
  if(!response.ok||payload.status!=='ready')throw Error('history_unavailable');
  if($('histSelect').value!==query)return;
  dtAutoHistoryData={...payload,query,loadedAt:Date.now()};
  const daily=Array.isArray(payload.daily)?payload.daily:[];
  const summary=$('dtAutoHistorySummary');summary.replaceChildren();
  const latest=daily.at(-1);
  if(latest){
   const headline=document.createElement('strong');headline.style.cssText='display:block;font-size:22px;margin:8px 0 6px;color:#26422c';
   headline.textContent='A partir de '+money(Number(latest.lowest));
   const info=document.createElement('small');info.style.cssText='display:block;color:#657765;line-height:1.6';
   info.textContent=daily.length+' dia(s) com registros reais • última coleta '+new Date(latest.day+'T12:00:00').toLocaleDateString('pt-BR')+' • '+latest.stores+' loja(s) observada(s)';
   const prices=daily.flatMap(day=>[Number(day.lowest),Number(day.highest)]).filter(Number.isFinite),minimum=Math.min(...prices),maximum=Math.max(...prices);
   const range=document.createElement('small');range.style.cssText='display:block;margin-top:5px;color:#456644;line-height:1.6';
   range.textContent='Menor preço registrado: '+money(minimum)+' • Maior preço registrado: '+money(maximum);
   summary.append(headline,info,range);
  }else summary.textContent='Ainda não temos coletas registradas para este produto. O histórico começará quando o Radar encontrar preços reais.';
  $('dtAutoHistoryStatus').textContent=daily.length>1?'Evolução de '+daily.length+' dias com dados coletados':daily.length===1?'Primeiro dia de coleta disponível. A linha aparecerá quando houver observações em mais dias.':'Sem observações automáticas até o momento.';
  drawHistory();
 }catch(e){
  if($('histSelect').value===query){
   $('dtAutoHistoryStatus').textContent='Não foi possível carregar os preços registrados agora.';
   $('dtAutoHistorySummary').textContent='Histórico automático temporariamente indisponível.';
   drawHistory();
  }
 }finally{if(dtAutoHistoryPending===query)dtAutoHistoryPending=''}
}
function drawHistory(){
 const chart=$('priceChart'),rows=$('histRows');chart.replaceChildren();rows.replaceChildren();
 const ns='http://www.w3.org/2000/svg';
 function el(tag,attrs,value){
  const element=document.createElementNS(ns,tag);
  for(const [key,val] of Object.entries(attrs))element.setAttribute(key,String(val));
  if(value!==undefined)element.textContent=String(value);
  chart.append(element);return element
 }
 const chosen=$('histSelect').value,history=dtAutoHistoryData?.query===chosen?dtAutoHistoryData:null;
 const data=Array.isArray(history?.daily)?history.daily:[];
 if(!data.length){
  el('text',{x:260,y:125,'text-anchor':'middle',fill:'#73856f','font-size':14},dtAutoHistoryPending?'Carregando histórico real...':'Nenhum preço automático registrado');
  return
 }
 const values=data.map(item=>Number(item.lowest)),low=Math.min(...values),high=Math.max(...values);
 const pad=Math.max((high-low)*.22,high*.035,1),bottom=low-pad,top=high+pad,span=Math.max(top-bottom,1);
 const coords=data.map((item,i)=>[data.length===1?260:58+i*418/Math.max(1,data.length-1),203-(Number(item.lowest)-bottom)/span*150]);
 el('line',{x1:54,y1:216,x2:480,y2:216,stroke:'#c0d2b9','stroke-width':1});
 el('text',{x:10,y:25,fill:'#668066','font-size':12},money(high));
 el('text',{x:10,y:231,fill:'#668066','font-size':12},money(low));
 if(coords.length>1)el('polyline',{points:coords.map(p=>p.join(',')).join(' '),fill:'none',stroke:'#6b9c39','stroke-width':3,'stroke-linecap':'round','stroke-linejoin':'round'});
 const labelStep=Math.max(1,Math.ceil(data.length/5));
 coords.forEach((p,i)=>{
  const labeled=i===0||i===data.length-1||i%labelStep===0;
  el('circle',{cx:p[0],cy:p[1],r:labeled?5:3,fill:'#6b9c39'});
  if(labeled){
   el('text',{x:p[0],y:Math.max(31,p[1]-14),'text-anchor':'middle',fill:'#28472c','font-size':11},money(values[i]));
   el('text',{x:p[0],y:245,'text-anchor':'middle',fill:'#657765','font-size':11},new Date(data[i].day+'T12:00:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'}));
  }
 });
 const latest=Array.isArray(history.latest)?history.latest:[];
 if(latest.length){
  const head=document.createElement('strong');head.textContent='Preços reais mais recentes por loja';head.style.cssText='display:block;margin:10px 0 7px';rows.append(head);
  for(const item of latest.slice(0,12)){
   const row=document.createElement('div');row.className='observation';row.style.cssText='display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap';
   const left=document.createElement('span');left.textContent=item.merchant+' • '+new Date(item.observed_day+'T12:00:00').toLocaleDateString('pt-BR');
   const right=document.createElement('strong');right.textContent=money(Number(item.price));
   row.append(left,right);rows.append(row);
  }
 }
}
$('targetSave').onclick=()=>{const product=$('targetProduct').value.trim(),price=amount($('targetPrice').value);if(product.length<3||!Number.isFinite(price)||price<=0){$('targetStatus').textContent='Informe produto e meta válidos.';return}const list=read('targets').filter(x=>x.product!==product);list.push({product,price});write('targets',list);$('targetStatus').textContent='✓ Meta salva neste navegador.';renderTargets()};
function renderTargets(){const rows=$('targetList');rows.replaceChildren();const targets=read('targets'),history=read('history');if(!targets.length){rows.textContent='Você ainda não definiu metas.';return}for(const t of targets){const entries=history.filter(x=>x.product.toLowerCase()===t.product.toLowerCase());const last=entries.at(-1),hit=last&&last.price<=t.price;const row=document.createElement('div');row.className='observation';const label=document.createElement('span');label.textContent=t.product+' • meta '+money(t.price)+(last?' • último observado '+money(last.price):' • sem observações')+(hit?' ✓ Meta atingida':'');const del=document.createElement('button');del.textContent='Remover';del.className='btn';del.onclick=()=>{write('targets',read('targets').filter(x=>x.product!==t.product));renderTargets()};row.append(label,del);rows.append(row)}}
$('calcUsed').onclick=()=>{const p=amount($('newPrice').value),factor=Number($('itemState').value);$('usedResult').textContent=p>0&&Number.isFinite(p)?'Estimativa inicial: de '+money(p*factor*.85)+' a '+money(p*factor*1.15)+'. Não é preço de mercado verificado.':'Informe um preço válido.'};
$('usedGo').onclick=()=>{const q=$('usedSearch').value.trim();if(!q)return;window.open('https://lista.mercadolivre.com.br/'+encodeURIComponent(q+' usado'),'_blank','noopener,noreferrer')};
renderHistory();renderTargets();
if(window.parent!==window){const report=()=>window.parent.postMessage({type:'dt-radar-resize',height:Math.max(document.documentElement.scrollHeight,document.body.scrollHeight)},location.origin);new ResizeObserver(report).observe(document.body);window.addEventListener('load',report);report()}
let dtRadarDataset=null,dtRadarSelected=null;
const dtRadarEl=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=String(text);return n};
function dtRadarOfferCards(){
 const host=$('dtRadarOffers'),product=dtRadarDataset?.products?.find(x=>x.query===dtRadarSelected);
 host.replaceChildren();
 if(!product){host.append(dtRadarEl('p','radar-empty','Selecione um produto do catálogo.'));return}
 dtRenderSimpleOffers(host,product.offers||[],(product.marketplaceListings||[]).map(x=>({...x,product:product.query})),product.query);
}
function dtRadarDraw(){
 const host=$('dtGooglePilot');host.replaceChildren();const products=dtRadarDataset?.products||[];
 for(const p of products){
  const row=dtRadarEl('button','google-pilot-item'+(p.query===dtRadarSelected?' active':''));
  row.type='button';const label=dtRadarEl('strong','',p.query),right=dtRadarEl('small','',p.verified?p.verified+' verificadas':p.review?p.review+' em análise':'Sem ofertas compatíveis');
  row.append(label,right);row.onclick=()=>{dtRadarSelected=p.query;dtRadarDraw();dtRadarOfferCards()};host.append(row)
 }
 dtRadarOfferCards()
}
async function dtRadarLoad(){
 const status=$('dtRadarNotice'),btn=$('dtRadarRefresh');btn.disabled=true;status.textContent='Consultando observações do Supabase...';
 try{
  const base=location.pathname.startsWith('/radar')?'/radar?api=prices':'/?api=prices';
  const response=await fetch(base,{credentials:'same-origin',cache:'no-store'});
  if(!response.ok)throw Error('consulta indisponível (HTTP '+response.status+')');
  const data=await response.json();
  if(!Array.isArray(data.products))throw Error('Resposta incompleta');
  dtRadarDataset=data;
  if(!data.products.some(x=>x.query===dtRadarSelected))dtRadarSelected=data.products.find(x=>x.review||x.verified)?.query||data.products[0]?.query||null;
  const reviewed=data.products.reduce((n,p)=>n+(p.review||0),0),verified=data.products.reduce((n,p)=>n+(p.verified||0),0);
  $('radarSerperState').textContent=verified+' ofertas verificadas • '+reviewed+' em análise';
  $('radarSerperUpdate').textContent='Dados atualizados no servidor: '+new Date(data.generatedAt).toLocaleString('pt-BR');
  status.textContent='Preços observados na data informada; confirme o produto e o preço final na loja.';
  dtRadarDraw();
 }catch(e){status.textContent='Falha ao carregar ofertas: '+e.message;$('radarSerperState').textContent='Dados temporariamente indisponíveis'}
 finally{btn.disabled=false}
}
$('dtRadarRefresh').onclick=dtRadarLoad;

const params=new URLSearchParams(location.search);if(params.get('embedded')==='1')document.body.classList.add('embedded');const tab=params.get('tab'),item=params.get('item');if(item){$('usedSearch').value=item;dtSelectActiveProduct(item)}else if(dtActiveProduct){dtSelectActiveProduct(dtActiveProduct,{persist:false})}renderHistory();if(['precificar','ofertas','historico','alertas'].includes(tab||'')){const button=document.querySelector('nav button[data-tab="'+tab+'"]');if(button)button.click()}
window.__dtRadarBoot=true;
window.__dtRunOfferSearch=()=>{if(typeof window.__dtSearchOffers==='function')return window.__dtSearchOffers();const status=document.getElementById('dtOfferSearchStatus');if(status)status.textContent='O mecanismo de pesquisa não foi exposto pelo script principal. Verificando inicialização.';};
window.__dtSearchOffers=searchInternalOffers;
</script><script>
(function(){
 const byId=id=>document.getElementById(id);
 document.addEventListener('click',function(event){
  const tab=event.target.closest('nav button[data-tab]');
  if(tab){
   event.preventDefault();
   document.querySelectorAll('nav button[data-tab]').forEach(b=>b.classList.toggle('active',b===tab));
   document.querySelectorAll('.panel').forEach(panel=>panel.classList.toggle('active',panel.id===tab.dataset.tab));
   if(tab.dataset.tab==='historico'&&typeof dtSyncActiveProductInputs==='function')dtSyncActiveProductInputs();
   return;
  }
  const searchButton=event.target.closest('#searchGo');
  if(searchButton){
   event.preventDefault();event.stopImmediatePropagation();
   const input=byId('search'),host=byId('stores'),status=byId('dtOfferSearchStatus'),q=String(input?.value||'').trim();
   if(!host||!status||q.length<3){if(status)status.textContent='Digite pelo menos 3 caracteres para pesquisar.';return}
   searchButton.disabled=true;status.textContent='Consultando ofertas...';host.replaceChildren();
   (async()=>{
    try{
     const base=location.pathname.startsWith('/radar')?'/radar':'/';
     const response=await fetch(base+'?api=search&q='+encodeURIComponent(q),{credentials:'same-origin',cache:'no-store'});
     const data=await response.json();
     if(!response.ok||data.status!=='ready'||!Array.isArray(data.offers))throw Error(data.error||'Pesquisa indisponível');
     const normalized=v=>String(v||'').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase();
     const wanted=normalized(q);
     const wantedCapacity=wanted.match(/\\b(64|128|256|512|1024)\\s*(gb|tb)\\b/);
     const wantedModel=wanted.match(/\\b(?:a|s|m)\\s*([0-9]{2,3})\\b/);
     const validProduct=offer=>{
      const title=normalized(offer.title),merchant=normalized(offer.merchant);
      if(!title||!merchant||/(?:recondicionado|seminovo|usado|reformado|capinha|pelicula|fone|buds|combo|kit|acessorio)/i.test(title))return false;
      if(wantedModel&&!new RegExp('\\\\b'+wantedModel[0].replace(/\\s+/g,'\\\\s*')+'\\\\b','i').test(title))return false;
      const sizes=[...title.matchAll(/\\b(64|128|256|512|1024)\\s*(gb|tb)\\b/g)].map(m=>m[1]+m[2]);
      if(wantedCapacity&&!sizes.includes(wantedCapacity[1]+wantedCapacity[2]))return false;
      if(wantedCapacity&&sizes.some(v=>v!==wantedCapacity[1]+wantedCapacity[2]))return false;
      return true;
     };
     const directUrl=offer=>{
      try{
       const u=new URL(String(offer.url||'')),h=u.hostname.toLowerCase(),p=u.pathname.toLowerCase();
       if(u.protocol!=='https:'||u.username||u.password||u.port||p.length<5)return null;
       if(/(^|\\.)google\\.|(^|\\.)bing\\.|(^|\\.)gstatic\\./.test(h))return null;
       if(['/search','/busca','/categoria','/ofertas','/shopping','/shop','/loja'].some(x=>p===x||p.startsWith(x+'/')))return null;
       const m=normalized(offer.merchant);
       const domains=[['amazon','amazon.com.br'],['mercado livre','mercadolivre.com.br'],['mercadolivre','mercadolivre.com.br'],['shopee','shopee.com.br'],['magalu','magazineluiza.com.br'],['magazine luiza','magazineluiza.com.br'],['havan','havan.com.br'],['vivo','vivo.com.br'],['livelo','livelo.com.br']];
       const match=domains.find(x=>m.includes(x[0]));
       if(match&&!(h===match[1]||h.endsWith('.'+match[1])))return null;
       if(!match&&!m.split(/\\s+/).some(x=>x.length>=5&&h.includes(x.replace(/[^a-z0-9]/g,''))))return null;
       return u.href;
      }catch{return null}
     };
     const valid=data.offers.filter(o=>Number(o.price)>0&&validProduct(o)).map(o=>({offer:o,url:directUrl(o)})).filter(x=>x.url);
     const prices=valid.map(x=>Number(x.offer.price)).sort((a,b)=>a-b);
     const median=prices.length?prices[Math.floor(prices.length/2)]:0;
     const visible=valid.filter(x=>!(median>0&&prices.length>=4&&Number(x.offer.price)<median*0.45));
     for(const item of visible){
      const offer=item.offer,card=document.createElement('article');card.className='radar-offer';
      const name=document.createElement('strong');name.textContent=String(offer.merchant||'Loja');
      const title=document.createElement('p');title.textContent=String(offer.title||'Produto');
      const price=document.createElement('b');price.textContent=new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(offer.price));
      const action=document.createElement('div');action.style.marginTop='12px';
      const link=document.createElement('a');link.textContent='Ver página ↗';link.href=item.url;link.target='_blank';link.rel='noopener noreferrer';link.className='radar-mvp-more';
      action.append(link);card.append(name,title,price,action);host.append(card);
     }
     status.textContent=visible.length?visible.length+' ofertas compatíveis com link direto':'Nenhuma oferta compatível com link direto nesta pesquisa';
    }catch(error){status.textContent='Falha na pesquisa: '+String(error?.message||error)}
    finally{searchButton.disabled=false}
   })();
  }
 },true);
 window.addEventListener('error',function(event){
  const status=byId('dtOfferSearchStatus');
  if(status)status.textContent='Erro interno do Radar: '+String(event.message||'falha no JavaScript');
 });
})();
</script></body></html>`
page=page.replace(/\\u\{([0-9a-f]+)\}|\\u([0-9a-f]{4})/gi,(_,long,short)=>String.fromCodePoint(parseInt(long||short,16)));
const adhocRadarRate=new Map();
function radarRateLimit(req,scope='general'){
 const now=Date.now();
 const ip=String(req.headers.get('x-forwarded-for')||req.headers.get('x-real-ip')||'anonymous').split(',')[0].trim().slice(0,90);
 if(adhocRadarRate.size>1200)for(const [k,v] of adhocRadarRate){if(now-v.until>0)adhocRadarRate.delete(k)}
 const key=ip+':'+scope;
 const prev=adhocRadarRate.get(key);
 if(!prev||prev.until<=now){adhocRadarRate.set(key,{count:1,until:now+5*60000});return false}
 prev.count+=1;return prev.count>(scope==='locate'?45:15)
}

const dfsPilotQuery="Samsung Galaxy A56 256GB",dfsPilotKey="samsung galaxy a56 256gb";
async function dfsDatabase(method,table,body,query=""){
 const u=Bun.env.RADAR_SUPABASE_URL,k=Bun.env.RADAR_SUPABASE_SERVICE_KEY;
 if(!u||!k)throw Error("database_unconfigured");
 const r=await fetch(u.replace(/\/$/,"")+"/rest/v1/"+table+query,{
  method,headers:{apikey:k,"Content-Type":"application/json","Prefer":"return=representation"},
  body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(12000)});
 const v=await r.json().catch(()=>null);
 if(!r.ok)throw Error("dfs_database_error_"+r.status);
 return v;
}
const dfsAuth=()=>Bun.env.DATAFORSEO_LOGIN&&Bun.env.DATAFORSEO_PASSWORD
 ?"Basic "+btoa(Bun.env.DATAFORSEO_LOGIN+":"+Bun.env.DATAFORSEO_PASSWORD):null;
async function dfsRequest(method,path,body){
 const auth=dfsAuth();if(!auth)throw Error("dfs_credentials_unconfigured");
 const r=await fetch("https://api.dataforseo.com/v3/"+path,{method,
  headers:{Authorization:auth,"Content-Type":"application/json"},
  body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(28000)});
 const d=await r.json().catch(()=>null);
 if(!r.ok||!d||d.status_code!==20000)throw Error("dfs_provider_error_"+String(d?.status_code||r.status));
 return d;
}
function dfsPilotMatch(title){
 const t=String(title||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 return /\b(?:smartphone|samsung|galaxy)\b/.test(t)&&/\ba\s*56\b|\ba56\b/.test(t)&&/\b256\s*gb\b/.test(t)
 &&!/\b(capa|capinha|case|pelicula|display|tela|cabo|adaptador|carregador|compativel|kit|combo|com fone|gel slim|usado|seminovo|recondicionado)\b/.test(t);
}
function dfsPilotMerchantUrl(url,seller){
 try{
  const u=new URL(String(url||"")),host=u.hostname.toLowerCase(),name=String(seller||"").toLowerCase();
  if(u.protocol!=="https:"||u.username||u.password||u.port)return null;
  const list=[
   [/mercado\s*livre|mercadolivre/,/(^|\.)mercadolivre\.com\.br$/],
   [/amazon/,/(^|\.)amazon\.com\.br$/],
   [/shopee/,/(^|\.)shopee\.com\.br$/],
   [/magalu|magazine\s*luiza/,/(^|\.)magazineluiza\.com\.br$/],
   [/horizon\s*play/,/(^|\.)horizonplay\.com\.br$/],
   [/casas\s*bahia/,/(^|\.)casasbahia\.com\.br$/]
  ];
  const matched=list.find(([re])=>re.test(name));
  if(!matched||!matched[1].test(host)||u.pathname.length<14)return null;
  if(/^\/(?:search|busca|lista|categoria)(?:\/|$)/i.test(u.pathname))return null;
  return u.origin+u.pathname;
 }catch{return null}
}
async function dfsPilotRun(){
 if(Bun.env.RADAR_DFS_LINK_PILOT_ONCE!=="true")return;
 try{
  const jobs=await dfsDatabase("GET","dt_radar_dfs_offer_jobs",undefined,"?select=id,provider_task_id,state&query_key=eq."+dfsPilotKey+"&order=created_at.desc&limit=1");
  let job=jobs[0];
  if(!job){
   const account=await dfsRequest("GET","appendix/user_data");
   const balance=Number(account.tasks?.[0]?.result?.[0]?.money?.balance);
   if(!Number.isFinite(balance)||balance<0.05)throw Error("balance_below_pilot_guard");
   const inserted=await dfsDatabase("POST","dt_radar_dfs_offer_jobs",[{query_key:dfsPilotKey,query_text:dfsPilotQuery,state:"processing"}]);
   job=inserted[0];
   const data=await dfsRequest("POST","merchant/google/products/task_post",[{keyword:dfsPilotQuery,language_code:"pt",location_name:"Brazil",priority:1,depth:20,tag:"dt_link_pilot_20261117"}]);
   const task=data.tasks?.[0];
   if(!task?.id||![20100,20000].includes(Number(task.status_code)))throw Error("pilot_task_rejected");
   await dfsDatabase("PATCH","dt_radar_dfs_offer_jobs",{state:"queued",provider_task_id:String(task.id),total_cost:Number(task.cost)||0,updated_at:new Date().toISOString()},"?id=eq."+job.id);
   job={...job,provider_task_id:String(task.id),state:"queued"};
   console.log("dt_dfs_pilot",JSON.stringify({stage:"task_created",cost:Number(task.cost)||null}));
  }
  if(job.state==="ready"||!job.provider_task_id)return;
  for(let attempt=0;attempt<8;attempt++){
   if(attempt)await new Promise(resolve=>setTimeout(resolve,15000));
   const data=await dfsRequest("GET","merchant/google/products/task_get/advanced/"+encodeURIComponent(job.provider_task_id));
   const result=data.tasks?.[0]?.result?.[0];
   if(!Array.isArray(result?.items)){if(attempt===7)console.log("dt_dfs_pilot",JSON.stringify({stage:"pending_after_poll"}));continue}
   const rows=result.items.flatMap(x=>Array.isArray(x.items)?x.items:[x]).filter(Boolean);
   const matched=rows.filter(x=>x.currency==="BRL"&&Number(x.price)>0&&dfsPilotMatch(x.title)&&String(x.seller||x.domain||"").length>2).slice(0,20);
   let resolved=0;
   for(const x of matched){
    const merchant=String(x.seller||x.domain||"").slice(0,130);
    let url=dfsPilotMerchantUrl(x.url,merchant),aclk=String(x.shop_ad_aclk||"");
    if(!url&&/^[A-Za-z0-9_-]{16,250}$/.test(aclk)){
     try{
      const detail=await dfsRequest("GET","merchant/google/sellers/ad_url/"+encodeURIComponent(aclk));
      url=dfsPilotMerchantUrl(detail.tasks?.[0]?.result?.[0]?.ad_url,merchant);
     }catch{}
    }
    const row={provider_task_id:String(job.provider_task_id),query_key:dfsPilotKey,title:String(x.title).slice(0,250),
     merchant,price:Number(x.price),currency:"BRL",product_id:String(x.product_id||"").slice(0,120)||null,
     shop_ad_aclk:aclk.slice(0,250)||null,direct_url:url,
     link_status:url?"verified":"unavailable",checked_at:new Date().toISOString()};
    await dfsDatabase("POST","dt_radar_dfs_direct_offers",[row]).catch(()=>{});
    if(url)resolved++;
   }
   await dfsDatabase("PATCH","dt_radar_dfs_offer_jobs",{state:"ready",updated_at:new Date().toISOString()},"?id=eq."+job.id);
   console.log("dt_dfs_pilot",JSON.stringify({stage:"ready",total:rows.length,compatible:matched.length,direct:resolved}));
   return;
  }
 }catch(e){console.log("dt_dfs_pilot",JSON.stringify({stage:"error",reason:String(e?.message||e).slice(0,110)}))}
}
setTimeout(()=>dfsPilotRun().catch(()=>{}),9000);


setTimeout(async()=>{
 if(Bun.env.RADAR_ORGANIC_ONE_SHOT!=="true"||!Bun.env.SERPER_API_KEY)return;
 try{
  const response=await fetch("https://google.serper.dev/search",{method:"POST",headers:{"X-API-KEY":Bun.env.SERPER_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({q:"Samsung Galaxy A56 256GB comprar preço site:mercadolivre.com.br OR site:magazineluiza.com.br OR site:amazon.com.br",gl:"br",hl:"pt-br",num:10}),signal:AbortSignal.timeout(20000)});
  const data=await response.json().catch(()=>({}));
  const organic=Array.isArray(data.organic)?data.organic:[];
  console.log("dt_organic_url_pilot",JSON.stringify({http:response.status,rows:organic.slice(0,8).map(x=>({title:String(x.title||"").slice(0,105),link:String(x.link||"").slice(0,200),snippet:String(x.snippet||"").slice(0,180)})),error:data.message||null}));
 }catch(e){console.log("dt_organic_url_pilot",JSON.stringify({error:String(e?.message||e).slice(0,100)}))}
},9000);


const organicKey=v=>String(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
const organicDay=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"America/Sao_Paulo",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
function organicOfferMatch(title,query,snippet=""){
 const t=organicKey(title),q=organicKey(query),desc=organicKey(snippet);
 if(!t||!q||/\b(capa|capinha|case|carteira|silicone|pelicula|protetor|carregador|cabo|display|tela avulsa|adaptador|kit|combo|conjunto|compativel|refil|gel slim|suporte)\b/.test(t))return false;
 if(/\b(recondicionado|seminovo|usado|refurbished|renewed|reformado)\b/.test(t+" "+desc))return false;
 const phone=/\b(galaxy|iphone|smartphone|celular|redmi|poco|moto)\b/.test(q);
 if(phone){
  const mdl=q.match(/\b(a\d{2,3}|s\d{2,3})\b/)?.[1];
  if(mdl&&!new RegExp("\\b"+mdl.replace(/([a-z])(\d)/,"$1\\s*$2")+"\\b").test(t))return false;
  const gb=q.match(/\b(64|128|256|512|1024)\s*gb\b/)?.[1];
  if(gb&&t.match(/\b(64|128|256|512|1024)\s*gb\b/)?.[1]!==gb)return false;
  const askedRam=q.match(/\b(\d{1,2})\s*gb\s*ram\b|\bram\s*(\d{1,2})\s*gb\b/);
  if(askedRam){const listed=t.match(/\b(\d{1,2})\s*gb\s*ram\b|\bram\s*(\d{1,2})\s*gb\b/);if((askedRam[1]||askedRam[2])!==(listed?.[1]||listed?.[2]))return false}
  return /\b(samsung|galaxy|smartphone|celular|iphone|motorola|xiaomi|redmi|poco)\b/.test(t);
 }
 const words=q.split(" ").filter(w=>w.length>=3),codes=words.filter(w=>/[a-z]/.test(w)&&/\d/.test(w)&&!/^\d+(?:hz|gb|tb|w|v|mah|mp|cm|mm)$/.test(w));
 if(codes.some(w=>!t.replace(/\s+/g,"").includes(w.replace(/\s+/g,""))))return false;
 if(words[0]&&!t.includes(words[0]))return false;
 return words.filter(w=>t.includes(w)).length/Math.max(1,words.length)>=0.5;
}
function organicDirectCandidate(raw){
 try{
  const u=new URL(String(raw||""));
  if(u.protocol!=="https:"||u.username||u.password||u.port||u.hostname.length>110)return null;
  const host=u.hostname.toLowerCase(),path=u.pathname;
  const domains=[
   {regex:/(^|\.)mercadolivre\.com\.br$/,merchant:"Mercado Livre",path:/(?:\/p\/MLB\d{7,15}|\/MLB-\d{7,15})/i},
   {regex:/(^|\.)amazon\.com\.br$/,merchant:"Amazon",path:/(?:\/dp\/|\/gp\/product\/)B0[A-Z0-9]{8}/i},
   {regex:/(^|\.)magazineluiza\.com\.br$/,merchant:"Magalu",path:/\/p\/[a-z0-9]{5,20}/i},
   {regex:/(^|\.)shopee\.com\.br$/,merchant:"Shopee",path:/(?:\/product\/\d+\/\d+|-i\.\d+\.\d+)/i},
   {regex:/(^|\.)horizonplay\.com\.br$/,merchant:"Horizon Play",path:/\/produto\/[^/]{10,}/i},
   {regex:/(^|\.)netshoes\.com\.br$/,merchant:"Netshoes",path:/\/p\/[^/]{8,}/i},
   {regex:/(^|\.)zattini\.com\.br$/,merchant:"Zattini",path:/\/p\/[^/]{8,}/i},
   {regex:/(^|\.)jbl\.com\.br$/,merchant:"Loja JBL",path:/\/[A-Za-z0-9-]{5,}\.html/i},
   {regex:/(^|\.)casasbahia\.com\.br$/,merchant:"Casas Bahia",path:/\/[^/]+\/p\/[^/]+/i},
   {regex:/(^|\.)kabum\.com\.br$/,merchant:"KaBuM!",path:/\/produto\/\d{4,15}/i},
   {regex:/(^|\.)pichau\.com\.br$/,merchant:"Pichau",path:/\/[a-z0-9][a-z0-9-]{8,}/i},
   {regex:/(^|\.)terabyteshop\.com\.br$/,merchant:"TerabyteShop",path:/\/produto\/\d{4,15}/i},
   {regex:/(^|\.)americanas\.com\.br$/,merchant:"Americanas",path:/(?:\/produto\/\d+|\/p\/?$)/i}
  ];
  const match=domains.find(d=>d.regex.test(host)&&d.path.test(path));
  return match?{url:u.origin+path,merchant:match.merchant}:null;
 }catch{return null}
}
function organicPriceFromSameResult(title,snippet){
 const combined=String(snippet||"")+"\n"+String(title||"");
 const matches=[...combined.matchAll(/R\$\s*([\d.]+,\d{2})/gi)].map(x=>Number(x[1].replace(/\./g,"").replace(",","."))).filter(n=>Number.isFinite(n)&&n>20&&n<200000);
 return matches.length?matches[0]:null;
}
async function organicDb(method,table,body,query=""){
 const base=Bun.env.RADAR_SUPABASE_URL,key=Bun.env.RADAR_SUPABASE_SERVICE_KEY;
 if(!base||!key)throw Error("organic_storage_unconfigured");
 const res=await fetch(base.replace(/\/$/,"")+"/rest/v1/"+table+query,{
  method,headers:{"apikey":key,"Content-Type":"application/json","Prefer":method==="POST"?"return=representation":"return=representation"},
  body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(11000)});
 const data=await res.json().catch(()=>null);
 if(!res.ok)throw Error("organic_db_http_"+res.status+(data?.code?"_"+data.code:""));
 return data;
}
// Automatic history uses actual captured timestamps, never date of UI browsing.
// A separate private table preserves every observed day after search caches expire.
function historyCompatible(title,query){
 const norm=organicKey,titleN=norm(title),q=norm(query);
 if(!titleN||!q)return false;
 if(/\b(capa|capinha|case|pelicula|carteira|flip|silicone|protetor|carregador|cabo|kit|combo|compativel|refil|adaptador|suporte|gel slim|com fone|fone incluso|usado|seminovo|recondicionado)\b/.test(titleN))return false;
 if(/\b(galaxy|smartphone|celular|iphone|redmi|poco)\b/.test(q)){
  const m=q.match(/\b(?:galaxy\s*)?(a\d{2,3}|s\d{2,3}(?:\s*fe)?)\b/)?.[1];
  if(m&&!new RegExp("\\b"+m.replace(/\s+/g,"").replace(/([a-z])(\d)/,"$1\\s*$2")+"\\b").test(titleN))return false;
  const storage=q.match(/\b(64|128|256|512|1024)\s*gb\b/)?.[1];
  if(storage&&titleN.match(/\b(64|128|256|512|1024)\s*gb\b/)?.[1]!==storage)return false;
  return /\b(samsung|galaxy|smartphone|celular|iphone|redmi|poco|motorola|xiaomi|apple)\b/.test(titleN);
 }
 const parts=q.split(" ").filter(v=>v.length>=3),modelTokens=parts.filter(v=>/\d/.test(v));
 if(modelTokens.some(v=>!titleN.replace(/\s/g,"").includes(v.replace(/\s/g,""))))return false;
 return parts.filter(v=>titleN.includes(v)).length/Math.max(1,parts.length)>=0.5;
}
function historyObservedDate(date){
 const d=new Date(date);return Number.isFinite(d.getTime())&&d.getTime()<=Date.now()+60000&&d.getTime()>Date.UTC(2020,0,1)?d:null;
}
async function historyPersistPoints(query){
 const key=organicKey(query);
 const toWrite=[],add=(offer,source,seenAt,id)=>{
  const title=String(offer.title||offer.observed_title||"").slice(0,280),merchant=String(offer.merchant||"").slice(0,95);
  const price=Number(offer.price),day=historyObservedDate(seenAt);
  if(!merchant||!historyCompatible(title,query)||!Number.isFinite(price)||price<=0||price>1000000||!day)return;
  const listing=String(id||offer.productId||offer.listingId||offer.source_listing_id||offer.url||title).slice(0,255);
  const rawUrl=String(offer.url||offer.offer_url||"");
  const url=rawUrl.startsWith("https://")&&rawUrl.length<600?rawUrl:null;
  toWrite.push({query_key:key,source,merchant,listing_key:listing,product_title:title,price,currency:"BRL",product_url:url,observed_at:day.toISOString(),observed_day:day.toISOString().slice(0,10)});
 };
 // Existing Serper Shopping cache; updated_at is the actual completed collection time.
 const adhoc=await organicDb("GET","dt_radar_adhoc_cache",null,"?select=offers,updated_at,state&query_key=eq."+encodeURIComponent(key)+"&limit=1");
 for(const row of adhoc)if(row.state==="ready"&&Array.isArray(row.offers)){
  for(const o of row.offers.slice(0,65))add(o,"Serper Shopping",row.updated_at);
 }
 // Organic search records retain checked_at and the product's own direct URL.
 const related=await organicDb("GET","dt_radar_organic_link_cache",null,"?select=offers,checked_at,state&query_key=in.("+encodeURIComponent(key)+","+encodeURIComponent("stores "+key)+")&limit=2");
 for(const row of related)if(row.state==="ready"&&Array.isArray(row.offers)){
  for(const o of row.offers.slice(0,30))add(o,"Serper Organic",row.checked_at);
 }
 // Official Mercado Livre history is already recorded by date. Never relabel it as today.
 const official=await organicDb("GET","dt_radar_price_history",null,"?select=source_listing_id,title,variant,merchant,price,observed_at,observed_day,offer_url,source&order=observed_at.desc&limit=160");
 for(const item of official){
  if(!item?.source_listing_id||!item?.price)continue;
  const title=String(item.title||"");
  if(!historyCompatible(title,query))continue;
  add({...item,title,merchant:item.merchant||"Mercado Livre",url:item.offer_url},"Mercado Livre API",item.observed_at||item.observed_day,item.source_listing_id);
 }
 if(toWrite.length){
  const uniques=[...new Map(toWrite.map(o=>[[o.query_key,o.source,o.merchant,o.listing_key,o.observed_day].join("|"),o])).values()].slice(0,200);
  const base=Bun.env.RADAR_SUPABASE_URL,secret=Bun.env.RADAR_SUPABASE_SERVICE_KEY;
  const r=await fetch(base.replace(/\/$/,"")+"/rest/v1/dt_radar_auto_price_points?on_conflict=query_key,merchant,listing_key,source,observed_day",{
   method:"POST",headers:{"apikey":secret,"Authorization":"Bearer "+secret,"Content-Type":"application/json","Prefer":"resolution=ignore-duplicates,return=minimal"},
   body:JSON.stringify(uniques),signal:AbortSignal.timeout(15000)});
  if(!r.ok)throw Error("history_snapshot_save_"+r.status);
 }
 return toWrite.length;
}
async function autoHistoryData(query){
 const key=organicKey(query);
 if(key.length<3||key.length>140)return {status:"invalid",daily:[],latest:[]};
 let inserted=0;
 try{inserted=await historyPersistPoints(query)}catch(e){console.log("dt_auto_history_ingest",JSON.stringify({query:key,error:String(e?.message||e).slice(0,90)}))}
 const points=await organicDb("GET","dt_radar_auto_price_points",null,"?select=merchant,product_title,price,observed_day,observed_at,source,product_url&query_key=eq."+encodeURIComponent(key)+"&order=observed_day.asc&limit=1000");
 const valid=points.filter(x=>historyCompatible(x.product_title,query)&&Number(x.price)>0);
 const byDay=new Map(),latest=new Map();
 for(const row of valid){
  const day=row.observed_day,price=Number(row.price);
  if(!byDay.has(day))byDay.set(day,{day,lowest:price,highest:price,count:0,merchants:new Set()});
  const record=byDay.get(day);record.lowest=Math.min(record.lowest,price);record.highest=Math.max(record.highest,price);record.count++;record.merchants.add(row.merchant);
  const k=row.merchant+"|"+row.product_title;
  if(!latest.has(k)||row.observed_at>latest.get(k).observed_at)latest.set(k,row);
 }
 const daily=[...byDay.values()].map(x=>({day:x.day,lowest:x.lowest,highest:x.highest,count:x.count,stores:x.merchants.size})).sort((a,b)=>a.day.localeCompare(b.day));
 const latestRows=[...latest.values()].sort((a,b)=>Number(a.price)-Number(b.price)).slice(0,15);
 return {status:"ready",query,days:daily.length,daily,latest:latestRows,recordedObservations:valid.length,ingested:inserted,automatic:true};
}

async function organicSearchOffers(query,focus="base"){
 if(!["base","more-stores"].includes(focus))return {status:"invalid",offers:[]};
 const searchKey=organicKey(query);
 const key=focus==="more-stores"?"stores "+searchKey:searchKey;
 if(key.length<3||key.length>135)return {status:"invalid",offers:[]};
 const today=organicDay(),current=new Date();
 let cache=(await organicDb("GET","dt_radar_organic_link_cache",null,"?select=state,offers,cache_until&query_key=eq."+encodeURIComponent(key)+"&limit=1"))[0];
 if(cache?.state==="ready"&&cache.cache_until&&new Date(cache.cache_until)>current)return {status:"ready",offers:Array.isArray(cache.offers)?cache.offers:[],cached:true};
 if(cache?.state==="processing"&&cache.cache_until&&new Date(cache.cache_until)>current)return {status:"processing",offers:[]};
 if(!Bun.env.SERPER_API_KEY)return {status:"provider_unconfigured",offers:[]};
 // Hard caps on paid search calls, shared across all visitors and products.
 const monthStart=today.slice(0,7)+"-01";
 const monthRuns=await organicDb("GET","dt_radar_organic_link_runs",null,"?select=id&run_day=gte."+monthStart+"&limit=81");
 const dayRuns=await organicDb("GET","dt_radar_organic_link_runs",null,"?select=id&run_day=eq."+today+"&limit=7");
 if(dayRuns.length>=6||monthRuns.length>=80)return {status:"budget_limit",offers:[]};
 try{
  await organicDb("POST","dt_radar_organic_link_runs",[{query_key:key,run_day:today}]);
 }catch{return {status:"already_checked_today",offers:[]}}
 const until=new Date(Date.now()+24*3600000).toISOString();
 if(cache)await organicDb("PATCH","dt_radar_organic_link_cache",{state:"processing",offers:[],cache_until:until,updated_at:current.toISOString()},"?query_key=eq."+encodeURIComponent(key));
 else await organicDb("POST","dt_radar_organic_link_cache",[{query_key:key,state:"processing",offers:[],cache_until:until}]);
 try{
  const searchQuery=focus==="more-stores"?query+" comprar preco site:kabum.com.br OR site:terabyteshop.com.br OR site:pichau.com.br OR site:shopee.com.br OR site:magazineluiza.com.br OR site:br-store.acer.com":query+" comprar preço site:mercadolivre.com.br OR site:magazineluiza.com.br OR site:amazon.com.br OR site:americanas.com.br";
  const r=await fetch("https://google.serper.dev/search",{method:"POST",headers:{"X-API-KEY":Bun.env.SERPER_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({q:searchQuery,gl:"br",hl:"pt-br",num:10}),signal:AbortSignal.timeout(25000)});
  const data=await r.json().catch(()=>({}));
  if(!r.ok||!Array.isArray(data.organic)){console.log("dt_organic_api_error",JSON.stringify({http:r.status,message:String(data.message||data.error||"unknown").slice(0,135)}));throw Error("organic_serper_http_"+r.status)}
  const offers=[];
  for(const x of data.organic.slice(0,30)){
   const page=organicDirectCandidate(x.link),title=String(x.title||"").slice(0,260),snippet=String(x.snippet||"");
   if(!page||!organicOfferMatch(title,query,snippet))continue;
   // Accept every supported verified merchant; never limit discovery to a fixed subset.
   const price=organicPriceFromSameResult(title,snippet);
   if(!price)continue;
   offers.push({title,merchant:page.merchant,price,currency:"BRL",url:page.url,source:"Serper / busca orgânica",linkFrom:"same_organic_search_result",priceConfirmed:false,date:current.toISOString()});
  }
  const unique=[...new Map(offers.map(x=>[x.url,x])).values()].slice(0,20);
  await organicDb("PATCH","dt_radar_organic_link_cache",{state:"ready",offers:unique,checked_at:current.toISOString(),cache_until:until,updated_at:new Date().toISOString(),error_code:null},"?query_key=eq."+encodeURIComponent(key));
  console.log("dt_organic_direct_links",JSON.stringify({key,organic:data.organic.length,eligible:unique.length,domainList:unique.map(x=>x.merchant)}));
  return {status:"ready",offers:unique,cached:false};
 }catch(e){
  const message=String(e?.message||e).slice(0,90);
  await organicDb("PATCH","dt_radar_organic_link_cache",{state:"failed",error_code:message,cache_until:new Date(Date.now()+3600000).toISOString(),updated_at:new Date().toISOString()},"?query_key=eq."+encodeURIComponent(key)).catch(()=>{});
  return {status:"unavailable",offers:[]};
 }
}

setTimeout(async()=>{
 if(Bun.env.RADAR_ORGANIC_TEST_ONCE!=="true")return;
 for(const q of ["Samsung Galaxy A56 256GB","JBL Tune 520BT"]){
  try{
   const result=await organicSearchOffers(q);
   console.log("dt_organic_direct_smoke",JSON.stringify({query:q,status:result.status,cached:result.cached||false,count:result.offers?.length||0,
    merchants:(result.offers||[]).map(o=>({merchant:o.merchant,price:o.price,domain:new URL(o.url).hostname}))}));
  }catch(e){console.log("dt_organic_direct_smoke",JSON.stringify({query:q,error:String(e?.message||e).slice(0,100)}))}
 }
},8000);

setTimeout(async()=>{
 if(Bun.env.RADAR_STORE_FOCUS_TEST_ONCE!=="true")return;
 for(const q of ["Samsung Galaxy A56 256GB","JBL Tune 520BT"]){
  try{
   const result=await organicSearchOffers(q,"more-stores");
   console.log("dt_store_focus_test",JSON.stringify({query:q,status:result.status,cached:result.cached||false,count:result.offers?.length||0,offers:(result.offers||[]).map(x=>({merchant:x.merchant,price:x.price,host:new URL(x.url).hostname}))}));
  }catch(e){console.log("dt_store_focus_test",JSON.stringify({query:q,error:String(e?.message||e).slice(0,90)}))}
 }
},8000);

setTimeout(async()=>{try{for(const q of ["Samsung Galaxy A56 256GB","JBL Tune 520BT"]){const result=await autoHistoryData(q);console.log("dt_auto_history_smoke",JSON.stringify({query:q,status:result.status,days:result.days,latest:result.latest.length,observations:result.recordedObservations,daily:result.daily.slice(-2)}))}}catch(e){console.log("dt_auto_history_smoke",JSON.stringify({error:String(e?.message||e).slice(0,160)}))}},7000);
Bun.serve({port:Number(Bun.env.PORT||3000),async fetch(req){const url=new URL(req.url);if(url.pathname==='/health')return Response.json({ok:true,service:'radar-turbo'});if(url.searchParams.get('api')==='locate'){
 if(req.method!=='POST')return Response.json({error:'method_not_allowed'},{status:405});
 if(!Bun.env.RADAR_INTERNAL_SEARCH_TOKEN)return Response.json({error:'search_unavailable'},{status:503});
 if(Number(req.headers.get('content-length')||0)>3000)return Response.json({error:'payload_too_large'},{status:413});
 if(radarRateLimit(req,'locate'))return Response.json({status:'rate_limit'},{status:429});
 const data=await req.json().catch(()=>null);
 if(typeof data?.title!=='string'||typeof data?.merchant!=='string'||data.title.length>280||data.merchant.length>70)return Response.json({error:'invalid_request'},{status:400});
 try{
  const r=await fetch('https://desapega-shopping-engine-v2-production.up.railway.app/on-demand/link',{
   method:'POST',headers:{'content-type':'application/json','x-radar-internal-token':Bun.env.RADAR_INTERNAL_SEARCH_TOKEN},
   body:JSON.stringify({title:data.title,merchant:data.merchant}),signal:AbortSignal.timeout(35000)
  });
  return new Response(r.body,{status:r.status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}})
 }catch{return Response.json({error:'locator_unavailable'},{status:503})}
}
if(url.searchParams.get("api")==="auto-history"){
 if(req.method!=="GET")return Response.json({error:"method_not_allowed"},{status:405});
 const q=String(url.searchParams.get("q")||"").trim();
 if(q.length<3||q.length>140)return Response.json({error:"invalid_query"},{status:400});
 if(radarRateLimit(req))return Response.json({error:"rate_limit"},{status:429});
 try{
  const result=await autoHistoryData(q);
  return Response.json(result,{headers:{"cache-control":"no-store","x-content-type-options":"nosniff"}});
 }catch(e){console.log("dt_auto_history_error",JSON.stringify({error:String(e?.message||e).slice(0,100)}));return Response.json({status:"unavailable",daily:[],latest:[]},{status:503})}
}
if(url.searchParams.get("api")==="organic-offers"||url.searchParams.get("api")==="organic-stores"){
 if(req.method!=="GET")return Response.json({error:"method_not_allowed"},{status:405});
 const q=String(url.searchParams.get("q")||"").trim();
 if(q.length<3||q.length>140)return Response.json({error:"invalid_query"},{status:400});
 if(radarRateLimit(req))return Response.json({error:"rate_limit"},{status:429});
 try{
  const results=await organicSearchOffers(q,url.searchParams.get("api")==="organic-stores"?"more-stores":"base");
  return Response.json(results,{headers:{"cache-control":"no-store","x-content-type-options":"nosniff"}});
 }catch(e){return Response.json({status:"unavailable",offers:[]},{status:503})}
}
if(url.searchParams.get('api')==='dfs-offers'){
 if(req.method!=='GET')return Response.json({error:"method_not_allowed"},{status:405});
 const q=(url.searchParams.get("q")||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
 if(q!==dfsPilotKey)return Response.json({status:"ready",offers:[],coverage:"pilot_only"},{headers:{"cache-control":"no-store"}});
 if(radarRateLimit(req))return Response.json({error:"rate_limit"},{status:429});
 try{
  const items=await dfsDatabase("GET","dt_radar_dfs_direct_offers",undefined,
   "?select=title,merchant,price,direct_url,link_status,observed_at&query_key=eq."+dfsPilotKey+"&link_status=eq.verified&order=price.asc&limit=15");
  const offers=items.filter(x=>x.direct_url&&dfsPilotMatch(x.title))
  .map(x=>({title:x.title,merchant:x.merchant,price:Number(x.price),currency:"BRL",url:x.direct_url,source:"DataForSEO / Google Shopping",linkFrom:"provider_same_offer",priceConfirmed:false,date:x.observed_at}));
  return Response.json({status:"ready",offers,source:"dataforseo_direct_seller_urls"},{headers:{"cache-control":"no-store"}});
 }catch{return Response.json({status:"unavailable",offers:[]},{status:503})}
}
if(url.searchParams.get('api')==='ml-offers'){
 if(req.method!=='GET')return Response.json({error:'method_not_allowed'},{status:405});
 const q=url.searchParams.get('q')||'';
 if(q.trim().length<3||q.length>140)return Response.json({error:'invalid_query'},{status:400});
 const norm=q.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 if(!/\ba\s*56\b|\ba56\b/.test(norm)||!/\b256\s*gb\b|\b256gb\b/.test(norm)||/\b128\s*gb\b|\b512\s*gb\b|\ba55\b|\ba36\b/.test(norm))return Response.json({status:'ready',provider:'mercadolivre_official_api',offers:[]},{headers:{'cache-control':'no-store'}});
 if(radarRateLimit(req))return Response.json({error:'rate_limit'},{status:429});
 try{
  const r=await fetch('https://desapega-shopping-engine-v2-production.up.railway.app/public-price-history',{signal:AbortSignal.timeout(12000),headers:{accept:'application/json'}});
  if(!r.ok)return Response.json({error:'official_history_unavailable'},{status:503});
  const raw=await r.json(),offers=[];
  for(const item of Array.isArray(raw.series)?raw.series:[]){
   const last=Array.isArray(item.history)?item.history[0]:null;
   if(!last||!/^MLB\d{7,15}$/.test(String(item.listingId||''))||!(Number(last.price)>0))continue;
   const itemId=String(item.listingId),catalogId=String(item.catalogId||"");
   const exact=last.linkVerified===true&&typeof last.url==="string"&&/^https:\/\/(?:www\.|produto\.)?mercadolivre\.com\.br\//i.test(last.url)?last.url:null;
   // Product page with item filter (not a verified item permalink or confirmed price).
   // Avoid constructing a generic search link or misrepresenting it as the exact listing.
   const catalogPage=!exact&&/^MLB\d{7,15}$/.test(catalogId)
    ?"https://www.mercadolivre.com.br/p/"+catalogId+"?pdp_filters="+encodeURIComponent("item_id:"+itemId):null;
   const url=exact||catalogPage;
   offers.push({title:'Samsung Galaxy A56 5G 256GB '+String(item.variant||''),merchant:'Mercado Livre',price:Number(last.price),
    currency:'BRL',url,listingId:itemId,catalogId,variant:item.variant,date:last.day,source:'Mercado Livre API oficial',
    officialPrice:true,linkVerified:Boolean(exact),linkFrom:exact?"official_listing":catalogPage?"ml_catalog_item_filtered":null});
  }
  return Response.json({status:'ready',provider:'mercadolivre_official_api',offers:offers.slice(0,12),source:'saved_daily_official_prices'},{headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}})
 }catch{return Response.json({error:'official_history_unavailable'},{status:503})}
}
if(url.searchParams.get('api')==='merchant'){
 if(req.method!=='GET')return Response.json({error:'method_not_allowed'},{status:405});
 const q=url.searchParams.get('q')||'',store=url.searchParams.get('store')||'';
 if(q.trim().length<3||q.length>140||!['ml','shopee','amazon','magalu'].includes(store))return Response.json({error:'invalid_query'},{status:400});
 if(!Bun.env.RADAR_INTERNAL_SEARCH_TOKEN)return Response.json({error:'search_unavailable'},{status:503});
 if(radarRateLimit(req))return Response.json({error:'rate_limit'},{status:429});
 try{
  const r=await fetch('https://desapega-shopping-engine-v2-production.up.railway.app/on-demand/store-offers',{
   method:'POST',headers:{'content-type':'application/json','x-radar-internal-token':Bun.env.RADAR_INTERNAL_SEARCH_TOKEN},
   body:JSON.stringify({q,store}),signal:AbortSignal.timeout(46000)
  });
  return new Response(r.body,{status:r.status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}})
 }catch{return Response.json({error:'store_provider_unavailable'},{status:503})}
}
if(url.searchParams.get('api')==='search'){
 if(req.method!=='GET'&&req.method!=='POST')return Response.json({error:'method_not_allowed'},{status:405});
 const query=url.searchParams.get('q')||'';
 if(query.trim().length<3||query.length>140)return Response.json({error:'invalid_query'},{status:400});
 if(!Bun.env.RADAR_INTERNAL_SEARCH_TOKEN)return Response.json({error:'search_unavailable'},{status:503});
 if(radarRateLimit(req))return Response.json({error:'rate_limit'},{status:429});
 try{
  const r=await fetch('https://desapega-shopping-engine-v2-production.up.railway.app/on-demand/search',{
   method:'POST',
   headers:{'content-type':'application/json','x-radar-internal-token':Bun.env.RADAR_INTERNAL_SEARCH_TOKEN},
   body:JSON.stringify({q:query}),signal:AbortSignal.timeout(47000)
  });
  return new Response(r.body,{status:r.status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}})
 }catch{return Response.json({error:'search_provider_unavailable'},{status:503})}
}
if(url.searchParams.get('api')==='prices'){try{const r=await fetch('https://desapega-shopping-engine-v2-production.up.railway.app/public-prices',{signal:AbortSignal.timeout(12000),headers:{accept:'application/json'}});return new Response(r.body,{status:r.status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}})}catch{return Response.json({error:'Não foi possível consultar o banco de preços.'},{status:503})}}if(req.method!=='GET')return new Response('Método não permitido',{status:405});return new Response(page,{headers:{'content-type':'text/html;charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff','content-security-policy':"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data: https://www.google.com; object-src 'none'; base-uri 'none'"}})}});