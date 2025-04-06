/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ColdEmailModal from "./ColdEmail";
const AddBlockModal = ({ onClose, onSelect, seqId }: any) => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
 
  return (
    <>
    <div className="fixed inset-0 bg-black/50 z-30 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[800px]  p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-red-400 hover:text-red-500 border-3 border-red-400 px-1 rounded-md"
        >
          ❌
        </button>
        <hr className="mt-8 mb-3" />
        {/* Heading */}
        <h2 className="text-xl font-semibold mb-2">
          Add Blocks{" "}
          <span className="border-3  rounded-full px-[6px] text-xl font-bold">
            ?
          </span>
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          Click on a block to configure and add it in sequence.
        </p>
        <hr />
        <div className="flex justify-between">
          {/* Outreach Section */}
          <div className="mb-3 w-full mr-3">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Outreach</h3>
            <div className="">
              <div
               
                onClick={() => setIsEmailModalOpen(true)}
                className="cursor-pointer border-1 border-gray-300 rounded-lg p-5 hover:bg-gray-50 flex w-full"
              >
                <div className="text-blue-500 text-2xl mb-1 mr-4 border-2 border-amber-700 px-3 py-2 bg-pink-200">
                  📧
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Cold Email</h4>
                  <p className="text-xs text-gray-500">
                    Send an email to a lead.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Condition Section */}
          <div className="w-full">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Conditions
            </h3>
            <div className="">
              <div
                onClick={() => onSelect("wait")}
                className="cursor-pointer border-1 border-gray-300 rounded-lg p-5 hover:bg-gray-50 flex w-full"
              >
                <div className="text-blue-500 text-2xl mb-1 mr-4 border-2 border-amber-700 px-3 py-2 bg-pink-200 ">
                  ⏳
                </div>
                <div className="">
                  <h4 className="font-medium text-sm mb-1">Wait</h4>
                  <p className="text-xs text-gray-500">
                    Add a delay between blocks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {isEmailModalOpen && <ColdEmailModal isOpen={isEmailModalOpen} seqId={seqId} onClose={()=> setIsEmailModalOpen(false)}/>}
    </>
  );
};

export default AddBlockModal;
