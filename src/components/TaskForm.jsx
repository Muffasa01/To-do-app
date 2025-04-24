import React, { useState } from "react";
import superbase from "../services/supabase-client.js";
import { toast } from "react-toastify";
import { Send } from "lucide-react";

const TaskForm = ({ setIsTaskFormOpen, setrefetch }) => {
  const [subject, setSubject] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, data } = await superbase
      .from("tasks")
      .insert({
        subject,
        description,
        date,
      })
      .select();

    if (error) {
      console.log("superbase err", error);
      toast.error("Failed To Add New Task", {
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    } else {
      console.log("superbase data", data);
      setDescription(null);
      setDate(null);
      setDescription(null);
      setIsTaskFormOpen(false);
      toast.success("New Activity Added", {
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
      setrefetch("created")
    }
  };

  return (
    <div className=" h-[calc(100vh-70px)] text-white flex items-center justify-center absolute inset-0 z-20 shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="w-[400px] flex-col p-4 flex gap-3 items-center bg-[#0F0F0F]  justify-center rounded-md">
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-[#808389]">
              Title:
            </label>
            <input
              type="text"
              id="#title"
              className=" outline-none border-b-1 border-gray-700 w-[250px]"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-[#808389]">Description:</label>
            <textarea
              id="#description"
              onChange={(e) => setDescription(e.target.value)}
              className="outline-none border-1 border-gray-700 overflow-hidden w-[250px] h-[120px]"
            ></textarea>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="date1" className="text-[#808389]">Date:</label>
            <input
              type="date"
              name=""
              id="#date1"
              onChange={(e) => setDate(e.target.value)}
              className="outline-none border-b-1 border-gray-700 overflow-hidden w-[250px]"
            />
          </div>

          <button className="flex items-center gap-2 hover:border-green-800 border-[1px] border-green-500 px-2 py-1 rounded-md"
          >
            {" "}
            <span>Submit</span>
            <Send size={15} color="#a7a5a5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
