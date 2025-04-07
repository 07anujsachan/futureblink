export const DelayNode = ({data}:any) =>{
    return (
        <div className="bg-blue-500 text-white px-4 py-2 rounded shadow">
          {data.label || 'Lead Source'}
        </div>
      );
}