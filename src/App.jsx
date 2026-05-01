import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPanel from "./Components/ChatPanel";
import Chats from "./Components/Chats";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { useSelector } from "react-redux";
import Chatting from "./Components/Chatting";
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chatting />}></Route>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/register" element={<Register />}></Route>
          <Route path="/:id" element={<Chatting />}></Route>
        </Routes>


      </BrowserRouter>

    </>
  )
}

export default App
