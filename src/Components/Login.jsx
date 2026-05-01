import { useRef, useState } from "react";
import { login } from "../../store/authSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import img from "../assets/RegisterImage.png";
import { btnStyle } from "../utils/tailwindStyles";
import Loading from "./Loading";
import Ing from "./Ing";



const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, changeError] = useState([]);
  const email = useRef(null);
  const password = useRef(null);
  const [isLoading, changeLoading] = useState(false);


  const handleSubmit = async () => {
    changeLoading(true);
    const emailSend = email.current.value;
    const passwordSend = password.current.value;
    console.log(emailSend);
    console.log(passwordSend);


    const response = await fetch("http://16.176.210.165/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          email: emailSend,
          password: passwordSend,
        }
      )
    });


    const data = await response.json();
    changeLoading(false);

    if (response.status == 422) {
      changeError(data.message);
      return;
    }

    dispatch(login(data));
    navigate("/");

  }


  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row bg-black">


        <div className="hidden md:block md:w-[70%] h-screen">
          <img
            src={img}
            alt="img"
            className="w-full h-full object-cover"
          />
        </div>


        <div className="w-full md:w-[30%] flex items-center justify-center text-white px-6 py-10 md:px-0 md:py-0">
          <div className="w-full max-w-md md:w-[70%] flex flex-col gap-6 md:gap-10">

            <h1 className="text-2xl md:text-3xl tracking-tight leading-tight text-center md:text-left">
              {isLoading ? <><Ing toDisplay="Logging you in" /></> : "Login"}
            </h1>

            <h1 className="text-xl text-white/20" >{errors}</h1>


            <input className="bg-white text-black border p-4 md:p-5 rounded-full placeholder-gray-500" type="text" placeholder="email" ref={email} />
            <input className="bg-white text-black border p-4 md:p-5 rounded-full placeholder-gray-500" type="password" placeholder="password" ref={password} />


            {isLoading ? <Loading /> : (
              <button onClick={handleSubmit} className={btnStyle}>
                Login
              </button>
            )}

          </div>
        </div>
      </div>

    </>
  )
}

export default Login;