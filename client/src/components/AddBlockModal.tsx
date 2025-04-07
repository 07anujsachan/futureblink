/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ColdEmailModal from "./ColdEmail";
import Delay from "./Delay";
const AddBlockModal = ({ onClose, getSequence, seqId, emails, setNodes, activeSequence }: any) => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [showDelay, setShowDelay] = useState(false);
  return (
    <div className="fixed inset-0 bg-black/50 z-30 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[800px] h-[600px]  p-6 relative">
 
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-red-400 hover:text-red-500 border-3 border-red-400 px-1 rounded-md"
        >
          ❌
        </button>


        <h2 className="text-xl font-semibold my-4">
          Add Blocks{" "}
          <span className="border-3  rounded-full px-[6px] text-xl font-bold">
            ?
          </span>
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          Click on a block to configure and add it in sequence.
        </p>
        <hr className=" text-gray-300" />
        <div className="flex justify-between">
        
          <div className="mb-3 w-full mr-3">
            <h3 className="text-xl  font-semibold text-gray-700 mb-3 mt-6">
              Outreach
            </h3>
            <div className="">
              <div
                onClick={() => setIsEmailModalOpen(true)}
                className="cursor-pointer border-1 border-gray-300 rounded-lg p-5 hover:bg-gray-50 flex w-full"
              >
                <div className="text-blue-500 text-4xl mb-1 mr-4 border-3 px-2 py-1 bg-blue-50 rounded-lg">
                  📧
                </div>
                <div>
                  <h4 className="font-semibold text-xl  mb-1">Cold Email</h4>
                  <p className="text-lg font-medium text-gray-500">
                    Send an email to a lead.
                  </p>
                </div>
              </div>
            </div>
          </div>


          <div className="w-full ">
            <h3 className="text-xl  font-semibold text-gray-700 mb-3 mt-6">
              Conditions
            </h3>
            <div className="">
              <div
                onClick={() => setShowDelay(true)}
                className="cursor-pointer border-1 border-gray-300 rounded-lg p-5 hover:bg-gray-50 flex w-full"
              >
                <div className="text-blue-500 text-4xl mb-1 mr-4 border-3  px-2 py-1 bg-blue-50 rounded-lg">
                  ⏳
                </div>
                <div className="">
                  <h4 className="font-semibold text-xl  mb-1">Wait</h4>
                  <p className="text-lg font-medium text-gray-500">
                    Add a delay between blocks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDelay && (
        <Delay
          onClose={() => setShowDelay(false)}
          setNodes={setNodes}
          isOpen={showDelay}
          seqId={seqId}
          getSequence={getSequence}
        />
      )}
      {isEmailModalOpen && (
        <ColdEmailModal
          emails={emails}
          isOpen={isEmailModalOpen}
          seqId={seqId}
          onClose={() => setIsEmailModalOpen(false)}
          setNodes={setNodes}
          activeSequence={activeSequence}
          getSequence={getSequence}
        />
      )}
    </div>
  );
};

export default AddBlockModal;
