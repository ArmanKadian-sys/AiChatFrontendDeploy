import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChat, deleteChat } from "../../store/chatSlice";
import { logout } from "../../store/authSlice";
import { btnStyle } from "../utils/tailwindStyles";
import { AiFillDelete } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { RiChatNewLine } from "react-icons/ri";
import Loading from "./Loading";




const ChatPanel = () => {

  const { token, isLoggedIn } = useSelector((state) => { return state.auth });
  const { chats, name } = useSelector((state) => { return state.chat });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleDeleteChat = (deleteId) => {
    setLoading(true);
    fetch(`http://demo1.aichatarman.online/api/deleteGemini/${deleteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authentication: "Bearer" + " " + token
      }
    })
      .then((response) => {
        if (response.status == 500) {
          setError("Delete is failed. Try again later.");
          setLoading(false);
        }
        return response.json();
      }).then((data) => {
        setLoading(false);
        dispatch(deleteChat(deleteId));
        navigate("/");

      }).catch((error) => {
        console.error("Error deleting chat:", error);
        setLoading(false);
      });
  };





  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchChat());
    }

  }, [token]);





  return (
    <div className="h-screen w-full bg-black text-white flex flex-col px-3 py-4 sm:px-5 sm:py-6 lg:px-6">
      {error && (
        <h1 className="mb-4 rounded-xl border border-red-800 bg-red-950/40 px-3 py-2 text-xs sm:text-sm text-red-300">
          {error}
        </h1>
      )}

      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-5 sm:mb-6">
        Welcome <span className="text-gray-300">{name}</span>
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-5 sm:mb-6">
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
          className={`${btnStyle} flex items-center justify-center gap-2 w-full sm:w-auto`}
        >
          Logout
          <CiLogout />
        </button>

        {chats.length != 0 && (
          <button
            onClick={() => {
              navigate("/");
            }}
            className={`${btnStyle} flex items-center justify-center gap-2 w-full sm:w-auto`}
          >
            <span>New Chat</span>
            <RiChatNewLine />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 sm:pr-2">
        {chats.length == 0 ? (
          <h1 className="text-gray-500 text-base sm:text-lg">You dont have any chats</h1>
        ) : (
          chats.map((chat) => {
            return (
              <div
                key={chat._id}
                className="flex items-center justify-between gap-3 mt-6 sm:mt-8"
              >
                <h1
                  className={`cursor-pointer text-sm sm:text-base font-medium truncate flex-1 ${chat._id == id ? "text-white" : "text-gray-400"
                    }`}
                  onClick={() => {
                    navigate(`/${chat._id}`);
                  }}
                >
                  {chat.title}
                </h1>

                <button
                  onClick={() => {
                    handleDeleteChat(chat._id);
                  }}
                  className="shrink-0 px-2 sm:px-3 py-1 text-base sm:text-lg text-gray-300 hover:text-white transition-all duration-200"
                >
                  {loading ? <Loading /> : <AiFillDelete />}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>


  )

}

export default ChatPanel;