export const LeadSourceNode = ({ data }: any) => {
  return (
    <div className="w-64 h-24 border border-gray-300 rounded-xl flex flex-col items-center justify-center bg-white cursor-pointer hover:shadow-md transition">
      <div className="text-2xl text-gray-800 ">+</div>
      <h3 className="text-gray-700 font-semibold">
        {data.label || "Add Lead Source"}
      </h3>
      <p className="text-gray-800 text-sm  ">
        Click to add leads from List or CRM
      </p>
    </div>
  );
};
