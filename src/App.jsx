import { useEffect, useState } from "react";
import Card from "./components/Card.jsx";
import TaskForm from "./components/TaskForm.jsx";
import Navbar from "./components/Navbar.jsx";
import { FlagTriangleLeft, Plus } from "lucide-react";
import supabase from "./services/supabase-client.js";
import exclSvg from './assets/ecl.svg'
import { ToastContainer } from "react-toastify";
function App() {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [users, setUsers] = useState(null);
  const [refetch, setrefetch] = useState(null);
  const [serchString, setSearchString] = useState(null);

  useEffect(() => {
    async function fetch_usesr() {
      const { data, error } = serchString
        ? await supabase
            .from("tasks")
            .select()
            .ilike("subject", `%${serchString}%`)
        : await supabase.from("tasks").select();
      if (error) {
        console.log("err fetching user", error);
      } else {
        setUsers(data);
        setrefetch(null);
      }
    }

    fetch_usesr();
  }, [refetch, serchString]);
  return (
    <>
      <Navbar setSearchString={setSearchString} />
      <div className="w-full min-h-screen bg-[#171717] p-4 relative transition-all duration-300 ease-in-out">
        {isTaskFormOpen && (
          <TaskForm
            setIsTaskFormOpen={setIsTaskFormOpen}
            setrefetch={setrefetch}
          />
        )}

        <div className="w-full flex flex-row flex-wrap gap-4 justify-center">
          {users?.length > 0 ? (
            users.map((user, index) => (
              <Card key={index} user={user} setrefetch={setrefetch} />
            ))
          ) : (
            <div className="mt-10 text-lg text-white font-bold flex items-center flex-col justify-center gap-4"> 
            <span>No Task found</span>
            <img src={exclSvg} alt=""  className="size-20"/>
            </div>
          )}
        </div>
        <div
          className=" bg-white shadow-lg size-12 flex items-center justify-center rounded-full fixed bottom-2 right-2 z-30"
          onClick={() => setIsTaskFormOpen(!isTaskFormOpen)}
        >
          <Plus size={20} color="#000" strokeWidth={1} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
