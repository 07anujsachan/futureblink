import { UserPlus } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const LeadSourceModal = ({emails, setEmails, setSelectedNodeId, handleSaveEmails}:any) =>{
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-white p-6 rounded-lg w-[600px]">
            <div className="flex items-center">
                <div className="bg-blue-200/50 pl-3  pr-2 py-1.5 mr-2 border-blue-700 border-2 rounded">

                <UserPlus className=" w-6 h-6 text-blue-600 "/>
                </div>


          <h2 className="text-xl font-semibold">
          Add a Source Block
          </h2>

            </div>
          <p className="mb-5 mt-2">Enter the emails(comma separated) of new leads that you want to add in this sequence</p>
          <input
            type="text"
            className="w-full border px-3 py-2 mb-4"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            placeholder="abc@gmail.com, xyz@gmail.com"
          />
          <div className="flex justify-end gap-3">
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => {
                setSelectedNodeId(null);
                setEmails("");
              }}
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleSaveEmails}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    )
}