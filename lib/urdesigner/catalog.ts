export const garmentCatalog = [
 {id:'blouse',name:'Saree blouse',group:'Indian wear',kind:'top',bottom:305,width:79,neck:'v',sleeve:.35},
 {id:'saree',name:'Saree & blouse',group:'Indian wear',kind:'saree',bottom:595,width:122,neck:'round',sleeve:.22},
 {id:'lehenga',name:'Lehenga choli',group:'Indian wear',kind:'set',bottom:600,width:205,neck:'sweetheart',sleeve:.1},
 {id:'anarkali',name:'Anarkali suit',group:'Indian wear',kind:'dress',bottom:600,width:190,neck:'round',sleeve:.7},
 {id:'kurta',name:'Straight kurta',group:'Indian wear',kind:'dress',bottom:530,width:110,neck:'v',sleeve:.7},
 {id:'salwar',name:'Salwar kameez',group:'Indian wear',kind:'suit',bottom:495,width:116,neck:'v',sleeve:.65},
 {id:'sharara',name:'Sharara set',group:'Indian wear',kind:'pantsuit',bottom:405,width:114,neck:'square',sleeve:.3},
 {id:'dress',name:'A-line dress',group:'Dresses',kind:'dress',bottom:530,width:161,neck:'round',sleeve:0},
 {id:'maxi',name:'Maxi dress',group:'Dresses',kind:'dress',bottom:600,width:180,neck:'v',sleeve:0},
 {id:'gown',name:'Evening gown',group:'Dresses',kind:'dress',bottom:610,width:195,neck:'sweetheart',sleeve:0},
 {id:'bodycon',name:'Bodycon dress',group:'Dresses',kind:'dress',bottom:500,width:90,neck:'square',sleeve:0},
 {id:'wrap',name:'Wrap dress',group:'Dresses',kind:'dress',bottom:530,width:144,neck:'v',sleeve:.35},
 {id:'shirt_dress',name:'Shirt dress',group:'Dresses',kind:'dress',bottom:535,width:130,neck:'collared',sleeve:.45},
 {id:'top',name:'Everyday top',group:'Tops & layers',kind:'top',bottom:360,width:108,neck:'round',sleeve:.2},
 {id:'crop',name:'Crop top',group:'Tops & layers',kind:'top',bottom:288,width:85,neck:'square',sleeve:0},
 {id:'camisole',name:'Camisole',group:'Tops & layers',kind:'top',bottom:345,width:98,neck:'v',sleeve:0},
 {id:'peplum',name:'Peplum top',group:'Tops & layers',kind:'top',bottom:365,width:140,neck:'round',sleeve:.15},
 {id:'blazer',name:'Tailored blazer',group:'Tops & layers',kind:'top',bottom:390,width:109,neck:'collared',sleeve:.95},
 {id:'tee',name:'Essential T-shirt',group:'Tops & layers',kind:'top',bottom:360,width:109,neck:'round',sleeve:.3},
 {id:'hoodie',name:'Relaxed hoodie',group:'Tops & layers',kind:'top',bottom:380,width:119,neck:'round',sleeve:.9},
 {id:'skirt',name:'A-line skirt',group:'Bottoms & sets',kind:'skirt',bottom:530,width:169,neck:'round',sleeve:0},
 {id:'pencil',name:'Pencil skirt',group:'Bottoms & sets',kind:'skirt',bottom:495,width:92,neck:'round',sleeve:0},
 {id:'palazzo',name:'Palazzo trousers',group:'Bottoms & sets',kind:'pants',bottom:595,width:115,neck:'round',sleeve:0},
 {id:'trousers',name:'Straight trousers',group:'Bottoms & sets',kind:'pants',bottom:590,width:85,neck:'round',sleeve:0},
 {id:'shorts',name:'Tailored shorts',group:'Bottoms & sets',kind:'pants',bottom:410,width:102,neck:'round',sleeve:0},
 {id:'jumpsuit',name:'Jumpsuit',group:'Bottoms & sets',kind:'jumpsuit',bottom:590,width:95,neck:'v',sleeve:0},
 {id:'coord',name:'Co-ord set',group:'Bottoms & sets',kind:'set',bottom:555,width:145,neck:'square',sleeve:.15},
] as const;
export type GarmentId=typeof garmentCatalog[number]['id'];
export const garmentTypes=garmentCatalog.map(g=>g.id) as [GarmentId,...GarmentId[]];
export const garmentNames=Object.fromEntries(garmentCatalog.map(g=>[g.id,g.name])) as Record<GarmentId,string>;
export const garmentSpec=(id:string)=>garmentCatalog.find(g=>g.id===id)||garmentCatalog[7];
export const necklines=['round','v','square','sweetheart','boat','halter','off-shoulder','collared'] as const;
export const sleeveStyles=['straight','puff','bell','cap','sleeveless'] as const;
export const constructionDefaults={neckline:'round' as typeof necklines[number],backNeckline:'round' as typeof necklines[number],sleeveStyle:'straight' as typeof sleeveStyles[number],length:1,flare:1,waist:1,hem:'straight' as 'straight'|'asymmetric'|'scalloped',closure:'none' as 'none'|'buttons'|'zipper'|'wrap',trim:'none' as 'none'|'border'|'lace'|'embroidered',dupatta:false};
