'use client';
import {useEffect,useRef} from 'react';
import {drawGarment,freshDesign,selectGarment,Design} from '@/lib/urdesigner/model';
export default function GarmentThumbnail({garment}:{garment:Design['garment']}){const ref=useRef<HTMLCanvasElement>(null);useEffect(()=>{const ctx=ref.current?.getContext('2d');if(!ctx)return;const d=selectGarment(freshDesign(),garment);d.color='#bc8393';d.accent='#633748';drawGarment(ctx,d)},[garment]);return <canvas ref={ref} width={512} height={640} aria-label={garment+' editable silhouette'} className="garment-thumbnail"/>}
