/* eslint-disable @typescript-eslint/no-explicit-any */

const AddBlockModal = ({ onClose, onSelect }:any) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          ❌
        </button>

        {/* Heading */}
        <h2 className="text-xl font-semibold mb-2">Add Blocks</h2>
        <p className="text-sm text-gray-500 mb-4">
          Click on a block to configure and add it in sequence.
        </p>

        {/* Outreach Section */}
        <div className="mb-3">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Outreach</h3>
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => onSelect("coldEmail")}
              className="cursor-pointer border rounded-lg p-3 hover:bg-gray-50"
            >
              <div className="text-purple-500 text-2xl mb-1">📧</div>
              <h4 className="font-medium text-sm mb-1">Cold Email</h4>
              <p className="text-xs text-gray-500">Send an email to a lead.</p>
            </div>
          </div>
        </div>

        {/* Condition Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Conditions</h3>
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => onSelect("wait")}
              className="cursor-pointer border rounded-lg p-3 hover:bg-gray-50"
            >
              <div className="text-blue-500 text-2xl mb-1">⏳</div>
              <h4 className="font-medium text-sm mb-1">Wait</h4>
              <p className="text-xs text-gray-500">Add a delay between blocks.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlockModal;
