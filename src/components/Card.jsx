import React, { useState } from "react";
import { Pencil, Trash2, Calendar, Clock2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import supabase from "../services/supabase-client.js";
import { toast } from "react-toastify";

const Card = ({ user, setrefetch }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(null);

  const actualTime = formatDistanceToNow(new Date(user.created_at), {
    addSuffix: true,
  });
  const handleDelete = async () => {
    console.log('sho', user.id, parseInt(user.id))
    const { error } = await supabase.from("tasks").delete().eq('id', user.id );
    if (error) {
      toast.error("Failed to delete",{
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true
      })
      setIsDeleteOpen(false);
    } else {
      toast.success("Deleted successfuly",{
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true
      })
      setIsDeleteOpen(false);
      setrefetch("deleted")
    }
  };
  return (
    <div className="bg-[#0F0F0F] relative overflow-hidden transition-all duration-500 ease-in-out w-[180px] h-[180px] shadow-lg rounded-lg border-[1px] border-gray-600 hover:border-gray-400  flex flex-col p-2">
      <span className="text-gray-200 font-bold">{user.subject.length >= 15 ? user.subject.slice(0,15) + " ...": user.subject}</span>
      <span className="text-[#808389] font-semibold text-xs flex gap-1 items-center">
        <Clock2 size={16} color="#808389" strokeWidth={1} />
        {actualTime}
      </span>
      <span className="text-gray-100 text-sm">{user.description.length >= 90 ? user.description.slice(0,80) + " . . .": user.description}</span>
      <span className="text-[#808389] font-semibold text-xs flex gap-1 items-center absolute bottom-2">
        <Calendar size={16} color="#808389" strokeWidth={1} />
        {user.date}
      </span>
      <div className="flex flex-row gap-1 mt-2 absolute bottom-1 right-2 ">
        <span className="p-2  rounded-full hover:bg-[#202020] transition-all duration-300 ease-in-out cursor-pointer">
          <Pencil size={15} color="#4471ca" strokeWidth={1} />
        </span>
        <span
          className="p-2  rounded-full hover:bg-[#202020] transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => {
            setIsDeleteOpen(true);
          }}
        >
          <Trash2 size={15} color="#d34a4a" strokeWidth={1} />
        </span>
      </div>
      {isDeleteOpen && (
        <div className="bg-[#171717] inset-0 absolute flex flex-col items-center gap-2 justify-center">
          <span className="text-white">Are you sure?</span>
          <div className="flex flex-row gap-3">
            <span
              className="px-2 py-1 rounded-lg text-xs font-semibold bg-green-500 hover:bg-green-600 cursor-pointer"
              onClick={handleDelete}
            >
              confirm
            </span>
            <span
              className="px-4 py-1 rounded-lg text-xs font-semibold bg-red-500  hover:bg-red-600 cursor-pointer"
              onClick={() => {
                setIsDeleteOpen(false);
              }}
            >
              cancel
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
