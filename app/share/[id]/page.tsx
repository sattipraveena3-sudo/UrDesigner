import SharedPreview from './preview';
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;return <SharedPreview id={id}/>}
