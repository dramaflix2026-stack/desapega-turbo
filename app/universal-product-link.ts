/**
 * Desapega Turbo — Universal product-page matching foundation.
 * No network calls, no credits. Integrate into the existing locator only after tests.
 * A verified product page is NOT proof that its displayed price matches the observed price.
 */
export type LinkCandidate={url:string;title:string;merchant:string};
export type MatchResult={ok:boolean;reason:string;url?:string};
const normalize=(s:string)=>String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
const forbidden=/\b(usado|seminovo|recondicionado|refil|peca|capa|capinha|pelicula|cabo|suporte|adaptador|kit|combo|compativel|reposicao|reparo)\b/;
const stores:Record<string,{merchant:RegExp;host:RegExp;path:RegExp}>={
 mercadolivre:{merchant:/mercado\s*livre|mercadolivre/i,host:/(^|\.)mercadolivre\.com\.br$/i,path:/\/(?:MLB-?\d{7,15}|p\/MLB\d{7,15})(?:[/?-]|$)/i},
 amazon:{merchant:/amazon/i,host:/(^|\.)amazon\.com\.br$/i,path:/\/(?:dp|gp\/product)\/[A-Z0-9]{10}(?:[/?]|$)/i},
 shopee:{merchant:/shopee/i,host:/(^|\.)shopee\.com\.br$/i,path:/(?:\/product\/\d+\/\d+|-i\.\d+\.\d+)/i},
 magalu:{merchant:/magalu|magazine\s*luiza/i,host:/(^|\.)magazineluiza\.com\.br$/i,path:/\/p\/[a-z0-9]{5,20}/i},
 kabum:{merchant:/kabum|ka\s*bum/i,host:/(^|\.)kabum\.com\.br$/i,path:/\/produto\/\d+/i},
 terabyte:{merchant:/terabyte/i,host:/(^|\.)terabyteshop\.com\.br$/i,path:/\/produto\/\d+/i},
};
const modelTokens=(s:string)=>normalize(s).split(" ").filter(x=>/[a-z]/.test(x)&&/\d/.test(x)&&x.length>=3);
const variantTokens=(s:string)=>normalize(s).match(/\b(?:\d{2,4}\s*(?:gb|tb|hz|polegadas|pol)|(?:110|127|220)\s*v)\b/g)||[];
export function validateProductLink(observedTitle:string,merchant:string,candidate:LinkCandidate):MatchResult{
 const store=Object.values(stores).find(x=>x.merchant.test(merchant));
 if(!store)return {ok:false,reason:"merchant_not_supported"};
 let url:URL;try{url=new URL(candidate.url)}catch{return {ok:false,reason:"invalid_url"}}
 if(url.protocol!=="https:"||url.username||url.password||url.port||!store.host.test(url.hostname)||!store.path.test(url.pathname))return {ok:false,reason:"not_a_product_page"};
 const observed=normalize(observedTitle),found=normalize(candidate.title);
 if(!observed||!found||forbidden.test(found)&&!forbidden.test(observed))return {ok:false,reason:"wrong_condition_or_accessory"};
 const models=modelTokens(observed).filter(x=>!/^\\d+(?:gb|tb|hz|pol)$/.test(x));
 if(models.length&&models.some(x=>!found.replace(/\\s+/g,"").includes(x)))return {ok:false,reason:"model_mismatch"};
 const variants=variantTokens(observed);
 if(variants.some(x=>!found.includes(x)))return {ok:false,reason:"variant_mismatch"};
 const words=observed.split(" ").filter(x=>x.length>=4&&!/^(monitor|gamer|produto|preto|branco|novo|para|com|full|ultra|polegadas)$/.test(x));
 const overlap=words.filter(x=>found.split(" ").includes(x)).length;
 if(words.length<2||overlap/words.length<0.7)return {ok:false,reason:"insufficient_title_match"};
 return {ok:true,reason:"same_product_candidate_price_unverified",url:url.href};
}
