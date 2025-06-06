/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pencil, SendHorizonal, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { SequenceName } from "../components/SequenceName";
import { deleteSequence, getAllSequences } from "../services";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [sequences, setSequences] = useState([]);
  const navigate = useNavigate();
  const fetchSequences = async () => {
    try {
      const data = await getAllSequences();
      setSequences(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSequences();
  }, []);

  const handleDelete = async (sequenceId: any) => {
    try {
      const response = await deleteSequence(sequenceId);
      if (response) {
        fetchSequences();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mt-8 mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center">
            <span className="text-blue-500 mr-2">My</span> Sequences{" "}
            <SendHorizonal className="ml-2 font-bold text-blue-500" />{" "}
          </h1>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + New Sequence
          </button>
        </div>

        <div className="bg-white border border-neutral-200 shadow rounded-lg">
          {sequences.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No Sequences Found. Create One!
            </p>
          ) : (
            <table className="w-full text-left">
              <thead className="">
                <tr className="border-b border-neutral-200">
                  <th className="p-4">Sequence Name</th>
                  <th className="p-4">Created At</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sequences.map((seq: any) => (
                  <tr key={seq._id} className="border-b border-neutral-200">
                    <td className="p-4">{seq.name}</td>
                    <td className="p-4">{seq.createdAt}</td>
                    <td className="p-4 ">
                      <span className="border-2 px-10 rounded-md bg-[#f3e8c4] py-1 border-[#fbd355]">
                        {seq.status}
                      </span>
                    </td>
                    <td className="p-4 flex gap-4">
                      <Pencil
                        onClick={() => {
                          navigate(
                            `/builder/${seq._id}?name=${encodeURIComponent(
                              seq.name
                            )}`
                          );
                        }}
                        className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-800"
                      />

                      <Trash2
                        onClick={() => handleDelete(seq._id)}
                        className="w-5 h-5 text-red-600 cursor-pointer hover:text-red-800"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <SequenceName
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Dashboard;
