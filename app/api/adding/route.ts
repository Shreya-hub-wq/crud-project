import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);
// create interpreation

async function createadding(data: {term:string,adding:string}){
    try {
        const response = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "Adding", ID.unique(),data);

            return response;
        
    } catch (error) {
        console.error('Error creating adding',error);
        throw new Error("Failed to create  adding");
    }
}

// fetch interpretation

async function fetcheadding(){
    try {
        const response = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
             "Adding", 
            [Query.orderDesc("$createdAt")]
            );

            return response.documents;
        
    } catch (error) {
        console.error('Error fetching adding',error);
        throw new Error("Failed to fetch adding");
    }
}

export async function POST(req: Request){
    try {
        const{term, adding}= await req.json();
        const data ={term,adding};
        const response = await createadding(data);
        return NextResponse.json({message:"Adding created"})
    } catch (error) {
        return NextResponse.json({
            error: "Failed to create Adding",
        },{status:500})
    }
}

export async function GET (){
    try {
        const adding = await fetcheadding();
        return NextResponse.json(adding)
    } catch (error) {
        return NextResponse.json({error:"Failed to adding"},{status:500})
        
    }
}