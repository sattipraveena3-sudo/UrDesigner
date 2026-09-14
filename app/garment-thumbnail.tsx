'use client';
import {useEffect,useRef} from 'react';
import {drawGarment,freshDesign,selectGarment,Design} from '@/lib/urdesigner/model';
export default function GarmentThumbnail({garment,color='#bc8393',accent='#633748'}:{garment:Design['garment'];color?:string;accent?:string}){const ref=useRef<HTMLCanvasElement>(null);useEffect(()=>{const ctx=ref.current?.getContext('2d');if(!ctx)return;const d=selectGarment(freshDesign(),garment);d.color=color;d.accent=accent;drawGarment(ctx,d)},[garment,color,accent]);return <canvas ref={ref} width={512} height={640} aria-label={garment+' editable silhouette'} className="garment-thumbnail"/>}
