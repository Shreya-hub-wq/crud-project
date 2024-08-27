import client from "@/lib/appwrite_client";
import { Databases} from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);
// FETCH A SPECIFIC INTERPRETATION 

async function fetcheadding (id: string){
    try {
        const adding = await database.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
            "Adding",
            id
        );
        return adding
    } catch (error) {
        console.error("Erros fetching adding:",error)
        throw new Error("Failed to fetch the adding");
    }
}

// DELETE A INTREPRETATION

async function deleteAdding(id:string){
    try {
        const response = await database.deleteDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
            "Adding",
            id)
            return response;
    } catch (error) {
        console.error("Erros deleting adding:",error)
        throw new Error("Failed to fetch to delete the adding");
    }
}

// Update
async function updateAdding(id:string, data: {term:string,adding:string}){
    try {
        const response = await database.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
            "Adding",
            id,
            data
        );
            return response;
    } catch (error) {
        console.error("Erros deleting adding:",error)
        throw new Error("Failed to fetch to delete the adding");
    }
}
export async function GET(req: Request,{params}:{params:{id:string}}){
    try {
        const id = params.id;
        const adding = await fetcheadding(id);
        return NextResponse.json({adding});
    } catch (error) {
        return NextResponse.json({error:"Failed to fetch"},{status:500})
    }
}


export async function DELETE(req: Request,{params}:{params:{id:string}}){
    try {
        const id = params.id;
       await deleteAdding(id);
        return NextResponse.json({message:"Adding deleted"});
    } catch (error) {
        return NextResponse.json({error:"Failed to delete"},{status:500})
    }
}

export async function PUT(req: Request,{params}:{params:{id:string}}){
    try {
        const id = params.id;
        const adding = await req.json();
        await updateAdding(id, adding)
        return NextResponse.json({message:"Adding updated"});
    } catch (error) {
        return NextResponse.json({error:"Failed to update adding"},{status:500})
    }
}