import {test,expect} from "bun:test";
import {validateProductLink} from "./universal-product-link";
test("monitor gamer: accepted matching direct listing",()=>{
 const x=validateProductLink("Monitor Gamer Acer Nitro KG243Y 23.8 144Hz","Magalu",{merchant:"Magalu",title:"Monitor Gamer Acer Nitro KG243Y 23.8 144Hz",url:"https://www.magazineluiza.com.br/monitor-gamer-acer-nitro/p/123456789/in/mogm/"});
 expect(x.ok).toBe(true);
});
test("monitor: reject unrelated model",()=>{
 const x=validateProductLink("Monitor Gamer Acer Nitro KG243Y 144Hz","KaBuM!",{merchant:"KaBuM!",title:"Monitor Gamer LG UltraGear 27 180Hz",url:"https://www.kabum.com.br/produto/123456"});
 expect(x.ok).toBe(false);
});
test("reject category search page",()=>{
 const x=validateProductLink("Monitor Gamer Acer Nitro KG243Y 144Hz","Amazon",{merchant:"Amazon",title:"Monitor Gamer Acer Nitro KG243Y 144Hz",url:"https://www.amazon.com.br/s?k=acer+nitro"});
 expect(x.ok).toBe(false);
});
test("reject mismatched merchant domain",()=>{
 const x=validateProductLink("Monitor Gamer Acer Nitro KG243Y 144Hz","Magalu",{merchant:"Magalu",title:"Monitor Gamer Acer Nitro KG243Y 144Hz",url:"https://www.amazon.com.br/dp/B012345678"});
 expect(x.ok).toBe(false);
});
test("reject accessory instead of original item",()=>{
 const x=validateProductLink("Monitor Gamer Acer Nitro KG243Y 144Hz","KaBuM!",{merchant:"KaBuM!",title:"Suporte compatível Monitor Gamer Acer Nitro KG243Y 144Hz",url:"https://www.kabum.com.br/produto/123456"});
 expect(x.ok).toBe(false);
});
