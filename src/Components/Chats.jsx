import { useContext, useReducer, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addChat, updateChat, deleteChat } from "../../store/chatSlice";
import { useState } from "react";
import TypingMessage from "./TypingEffect";
import { btnStyle } from "../utils/tailwindStyles";
import Ing from "./Ing";

const Chats = () => {


  const { token, isLoggedIn } = useSelector((state) => { return state.auth });
  const { chats, name } = useSelector((state) => { return state.chat });
  const [postError, setPostError] = useState(null);
  const [userChat, setUserChat] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const contents = useRef(null);


  const { id } = useParams();
  console.log("This is the ID:", id);


  const handleSubmit = () => {
    const content = contents.current.value;
    contents.current.value = '';
    setUserChat(content);

    if (id) {
      fetch(`http://demo1.aichatarman.online/api/putGemini/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authentication: "Bearer" + " " + token
        },
        body: JSON.stringify({ content })
      })
        .then(res => res.json()
        )
        .then((data) => {
          setUserChat(null);
          if (data.message) {
            setUserChat(null);
            contents.current.value = '';
            setPostError(data.message);
            return;
          }
          dispatch(updateChat({ reaction: data.reaction, id }));
          contents.current.value = '';
        })
    }


    else {
      fetch(`http://demo1.aichatarman.online/api/postGemini`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authentication: "Bearer" + " " + token
        },
        body: JSON.stringify({ content })
      })
        .then(res => res.json())
        .then((data) => {
          setUserChat(null);
          if (data.message) {
            setUserChat(null);
            contents.current.value = '';
            setPostError(data.message);
            return;

          }
          dispatch(addChat({ result: data.result }));
          navigate(`/${data.result._id}`);
          contents.current.value = '';
        }
        )
    }



  }

  if (!isLoggedIn) {
    return (
      <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center gap-20 text-center px-4">

        <TypingMessage />

        <div className="flex gap-3 w-48">
          <button
            onClick={() => navigate("/auth/register")}
            className={btnStyle}
          >
            Register
          </button>

          <button
            onClick={() => navigate("/auth/login")}
            className={btnStyle}
          >
            Login
          </button>
        </div>

      </div>
    );
  }
  else if (id && chats.length == 0) {
    navigate("/");
    return;
  }





  return (

    <div>

      {id ? <> {chats.find((item) => { return (id == item._id) }).messages.map((item) => {
        return (
          <div
            className={`flex ${item.role === "user" ? "justify-end" : "justify-start"} p-10`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl shadow-md 
                  ${item.role === "user"
                  ? "bg-gray-100 text-black rounded-br-none"
                  : "bg-gray-100 text-black rounded-bl-none"}`}
            >
              <h1 className="text-sm opacity-70 mb-1">{item.role == "user" ? name : "AI agent"}</h1>
              <p className="text-lg">{item.content}</p>
            </div>
          </div>
        )
      })}
        {postError}
        {userChat && <div>
          <div className="flex justify-end p-10">
            <div className="max-w-xs px-4 py-2 rounded-2xl shadow-md bg-gray-200 text-black rounded-br-none">
              <h1 className="text-sm opacity-70 mb-1">{name}</h1>
              <p className="text-lg">{userChat}</p>
            </div>
          </div>

          <div className="flex justify-start p-10">
            <div className="max-w-xs px-4 py-4 rounded-2xl shadow-md bg-gray-200 text-black rounded-bl-none">
              <h1 className="text-sm opacity-70 mb-1">AI Agent</h1>
              <p className="text-lg">Typing<Ing /></p>
            </div>
          </div>
        </div>
        }
      </>

        :
        userChat ? <div className="h-[80vh] flex items-center justify-center text-black text-5xl font-medium" ><h1>Getting Your First Response<Ing /></h1></div> : (
          <div className="h-[80vh] flex items-center justify-center" >
            <h1 className="text-5xl font-medium text-gray-500">
              Start to chat with AI
            </h1>
          </div>
        )


      }
      <div className="relative bottom-0 left-0 w-full px-4 py-3">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center gap-3">

          <input
            type="text"
            ref={contents}
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-black border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white placeholder-gray-500"
          />

          <button
            onClick={handleSubmit}
            className={"px-5 py-2 rounded-full bg-white text-black border border-gray-500 shadow-md hover:border-black hover:shadow-lg active:scale-95 transition-all duration-200"}
          >
            Send
          </button>
        </div>
      </div>
    </div >


  )
}


export default Chats;
