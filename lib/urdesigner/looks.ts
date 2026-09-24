import {Design,selectGarment} from './model';
type Look={id:string;name:string;garment:Design['garment'];color:string;accent:string;fabric:Design['fabric'];neckline:Design['construction']['neckline'];trim:Design['construction']['trim'];sleeve:number;occasion:string;construction?:Partial<Design['construction']>;details?:Partial<Design['details']>;pattern?:Design['pattern']};
export const looks:Look[]=[
 {id:'festive',name:'Festive Anarkali',garment:'anarkali',color:'#8c3656',accent:'#dfb46a',fabric:'silk',neckline:'round',trim:'border',sleeve:.7,occasion:'Festive'},
 {id:'blouse',name:'Classic V-neck blouse',garment:'blouse',color:'#416660',accent:'#dab889',fabric:'silk',neckline:'v',trim:'border',sleeve:.5,occasion:'Festive',construction:{backNeckline:'v'}},
 {id:'summer',name:'Everyday summer dress',garment:'dress',color:'#b9d3da',accent:'#446879',fabric:'cotton',neckline:'square',trim:'none',sleeve:0,occasion:'Everyday'},
 {id:'saree',name:'Elegant saree',garment:'saree',color:'#6e497d',accent:'#d7ab68',fabric:'silk',neckline:'round',trim:'border',sleeve:.3,occasion:'Festive'},
 {id:'gown',name:'Evening satin gown',garment:'gown',color:'#354f73',accent:'#9eafcb',fabric:'satin',neckline:'sweetheart',trim:'none',sleeve:0,occasion:'Evening'},
 {id:'coord',name:'Relaxed linen co-ord',garment:'coord',color:'#d5b38d',accent:'#71543c',fabric:'linen',neckline:'square',trim:'none',sleeve:.25,occasion:'Everyday'},
 {id:'bridal',name:'Ruby lehenga ensemble',garment:'lehenga',color:'#8e203e',accent:'#edc884',fabric:'brocade',neckline:'sweetheart',trim:'embroidered',sleeve:.25,occasion:'Wedding',construction:{dupatta:true},details:{seams:'panelled',pleats:true}},
 {id:'ivory',name:'Ivory panelled kurta',garment:'kurta',color:'#e9dfcb',accent:'#866543',fabric:'linen',neckline:'v',trim:'embroidered',sleeve:.7,occasion:'Everyday',details:{seams:'panelled'}},
 {id:'bell',name:'Bell-sleeve wrap dress',garment:'wrap',color:'#275d5a',accent:'#c8b28a',fabric:'georgette',neckline:'v',trim:'none',sleeve:.6,occasion:'Evening',construction:{sleeveStyle:'bell',closure:'wrap'}},
 {id:'garden',name:'Tiered garden maxi',garment:'maxi',color:'#e3bec7',accent:'#8d4865',fabric:'cotton',neckline:'square',trim:'lace',sleeve:.2,occasion:'Everyday',construction:{sleeveStyle:'puff'},details:{tiers:3},pattern:'floral'},
 {id:'midnight',name:'Midnight princess gown',garment:'gown',color:'#1d2945',accent:'#abb6d5',fabric:'velvet',neckline:'boat',trim:'none',sleeve:.8,occasion:'Evening',details:{seams:'princess'}},
 {id:'organza',name:'Organza overlay set',garment:'coord',color:'#aac9c0',accent:'#cbe8df',fabric:'organza',neckline:'square',trim:'border',sleeve:.35,occasion:'Festive',construction:{dupatta:true,sleeveStyle:'puff'}},
 {id:'peplum',name:'Structured peplum blouse',garment:'peplum',color:'#863c67',accent:'#e0b798',fabric:'silk',neckline:'sweetheart',trim:'border',sleeve:.25,occasion:'Festive',details:{seams:'princess'}},
 {id:'sharara',name:'Saffron sharara set',garment:'sharara',color:'#d48c34',accent:'#73542f',fabric:'georgette',neckline:'square',trim:'embroidered',sleeve:.4,occasion:'Wedding',construction:{dupatta:true}},
 {id:'city',name:'City shirt dress',garment:'shirt_dress',color:'#718bad',accent:'#d9dfe8',fabric:'cotton',neckline:'collared',trim:'none',sleeve:.6,occasion:'Workwear',construction:{closure:'buttons'},pattern:'pinstripe'},
 {id:'pencil',name:'Classic pencil skirt',garment:'pencil',color:'#303947',accent:'#a2b0c4',fabric:'denim',neckline:'round',trim:'none',sleeve:0,occasion:'Workwear'},
 {id:'pleated',name:'Pleated silk skirt',garment:'skirt',color:'#a34854',accent:'#ecb7a2',fabric:'silk',neckline:'round',trim:'border',sleeve:0,occasion:'Evening',details:{pleats:true}},
 {id:'jumpsuit',name:'Tailored evening jumpsuit',garment:'jumpsuit',color:'#354d49',accent:'#d4b77b',fabric:'satin',neckline:'v',trim:'none',sleeve:0,occasion:'Evening',construction:{closure:'buttons'}},
];
export function applyLook(d:Design,id:string):Design{const l=looks.find(l=>l.id===id);if(!l)return d;const next=selectGarment(d,l.garment);return {...next,color:l.color,accent:l.accent,fabric:l.fabric,sleeve:l.sleeve,componentColors:{},textureScale:70,textureRotation:0,textureOffsetX:0,textureOffsetY:0,details:{seams:'none',tiers:1,pleats:false,...l.details},pattern:l.pattern||'solid',fabricImage:undefined,construction:{...next.construction,neckline:l.neckline,trim:l.trim,...l.construction}}}
