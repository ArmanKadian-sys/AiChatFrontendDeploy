import { useSelector } from "react-redux";
import ChatPanel from "./ChatPanel";
import Chats from "./Chats";

const Chatting = () => {
  const { isLoggedIn } = useSelector((state) => { return state.auth });






  if (!isLoggedIn) {
    return (
      <Chats />)
  }

  return (
    <div className="min-h-screen  text-white flex flex-col md:flex-row">
      <div className="w-full bg-black md:w-[30%] border-b md:border-b-0 md:border-r border-white/20">
        <ChatPanel />
      </div>
      <div className="w-full md:w-[70%] bg-white min-h-[70vh] md:min-h-screen">
        <Chats />
      </div>
    </div>
  )
}


export default Chatting;