import {Design,selectGarment} from './model';
export const looks=[
 {id:'festive',name:'Festive Anarkali',garment:'anarkali',color:'#8c3656',accent:'#dfb46a',fabric:'silk',neckline:'round',trim:'border',sleeve:.7},
 {id:'blouse',name:'Classic V-neck blouse',garment:'blouse',color:'#416660',accent:'#dab889',fabric:'silk',neckline:'v',trim:'border',sleeve:.5},
 {id:'summer',name:'Everyday summer dress',garment:'dress',color:'#b9d3da',accent:'#446879',fabric:'cotton',neckline:'square',trim:'none',sleeve:0},
 {id:'saree',name:'Elegant saree',garment:'saree',color:'#6e497d',accent:'#d7ab68',fabric:'silk',neckline:'round',trim:'border',sleeve:.3},
 {id:'gown',name:'Evening satin gown',garment:'gown',color:'#354f73',accent:'#9eafcb',fabric:'satin',neckline:'sweetheart',trim:'none',sleeve:0},
 {id:'coord',name:'Relaxed linen co-ord',garment:'coord',color:'#d5b38d',accent:'#71543c',fabric:'linen',neckline:'square',trim:'none',sleeve:.25},
] as const;
export function applyLook(d:Design,id:string){const l=looks.find(l=>l.id===id);if(!l)return d;const next=selectGarment(d,l.garment);return {...next,color:l.color,accent:l.accent,fabric:l.fabric,sleeve:l.sleeve,pattern:'solid' as const,fabricImage:undefined,construction:{...next.construction,neckline:l.neckline,trim:l.trim}}}
