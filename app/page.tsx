"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface IAdding{
$id: string;
term: string;
adding: string;
}

export default function Home() {
  const [adding,setAdding] = useState<IAdding[]>([]);
  const[isLoading,setIsLoading] = useState(true);
  const[error,setError] = useState<string | null>(null);

  useEffect(()=>{
const fetchAdding =  async()=>{
  setIsLoading(true);
  try {
    const response = await fetch('/api/adding');
    if(!response.ok){
      throw new Error("Failed to fetch adding")
    }
    const data = await response.json();
    setAdding(data);
  } catch (error) {
    console.log("Error:",error);
    setError("Failed to Load adding. Please try reload adding")
  }finally{
    setIsLoading(false);
  }
};
fetchAdding();
  },[])

const handleDelete = async(id: string)=>{
try {
  await fetch(`/api/adding/${id}`,{method:"Delete"});
  setAdding((prevAdding)=>prevAdding?.filter((i)=> i.$id !== id));
} catch (error) {
  setError("Failed to delete adding. Please try Again..");
}
}

  return (
    <div>
      {error && <p className="py-4 text-red-500">{error}</p>}
      {isLoading ? (<p>Loading Adding..</p>):adding?.length > 0 ? (
        <div>
        {
          adding?.map((adding)=>(
            <div key={adding.$id} className="p-4 my-2 rounded-md border-b leading-8">
<div className="font-bold">{adding.term}</div>
        <div>
       {adding.adding}
        </div>

        <div className="flex gap-4 mt-4 justify-end">
<Link className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest " href={`/edit/${adding.$id}`}>Update</Link>
<button onClick={()=> handleDelete(adding.$id)} className="bg-red-500 text-white  px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest">
Delete
</button>
        </div>
           </div>
          ))}
        
      </div>
      ):(
        <p>No adding found.</p>
      )}
      
    </div>
  )
}
