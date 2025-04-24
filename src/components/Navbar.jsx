import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { Search } from "lucide-react";

const Navbar = ({setSearchString}) => {
  const [valueDetected, setValueDetected] = useState(null)
  return (
    <div className="w-full border-b-1 border-gray-700 h-[50px] bg-[#171717] flex  flex-row items-center justify-between px-4">
      <img src={logo} alt="" className="size-30 cursor-pointer"  />
      <div className="flex px-2 rounded-lg flex-row items-center gap-1 border-gray-700 border-1  text-[#808389]">
        
        <input
          type="text"
          placeholder="Search by title ..."
          className="outline-none text-sm p-1"
          onChange={(e) => setValueDetected(e.target.value)}
          onBlur={() => {
            if(valueDetected){
              setSearchString(valueDetected)
            }else(
              setSearchString(null)
            )
            
          }}
        />
        <Search size={15} color="#808389" strokeWidth={1} />
      </div>
    </div>
  );
};

export default Navbar;
