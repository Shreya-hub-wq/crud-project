export default function EditPage(){
    return(
        <div>
            <h2 className="text-2xl font-bold my-8">Update...</h2>

<form className="flex gap-3 flex-col ">
    <input type="text" name="term" placeholder="Term" className="py-1 px-4
    border rounded-md"/>

    <textarea 
    name="add new" 
    rows={4} 
    placeholder="Add new.."
    className="py-1 px-4 border rounded-md resize-none"
    ></textarea>
    <button className="bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer">
        Update
    </button>
</form>
</div>

        
    )
}