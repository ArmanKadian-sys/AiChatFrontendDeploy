import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/RegisterImage.png";
import { btnStyle } from "../utils/tailwindStyles";
import Loading from "./Loading";
import Ing from "./Ing";


const Register = () => {
  const navigate = useNavigate();
  const [errors, changeErrors] = useState([]);
  const [isLoading, changeLoading] = useState(false);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirm_password = useRef(null);


  const onSubmit = async () => {
    changeLoading(true);


    const nameSend = name.current.value;
    const emailSend = email.current.value;
    const passwordSend = password.current.value;
    const confirm_passwordSend = confirm_password.current.value;


    const response = await fetch("http://demo1.aichatarman.online/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          name: nameSend,
          email: emailSend,
          password: passwordSend,
          confirmPassword: confirm_passwordSend,
        }
      )
    });

    const data = await response.json();
    changeLoading(false);

    if (response.status == 422) {
      changeErrors(data.message);
      return;
    }

    navigate("/auth/login");
  }

  return (
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
            {isLoading ? <><Ing toDisplay="Registering you in" /></> : "Register"}
          </h1>

          {errors.map((error, i) => (
            <ul className="text-sm text-white/60">
              <li>{error}</li>
            </ul>
          ))}

          <input className="bg-white text-black border p-4 md:p-5 rounded-full placeholder-gray-500" placeholder="name" ref={name} />
          <input className="bg-white text-black border p-4 md:p-5 rounded-full placeholder-gray-500" type="text" placeholder="email" ref={email} />
          <input className="bg-white text-black border p-4 md:p-5 rounded-full placeholder-gray-500" type="password" placeholder="password" ref={password} />
          <input className="bg-white text-black border p-4 md:p-5 rounded-full placeholder-gray-500" type="password" placeholder="confirm_password" ref={confirm_password} />

          {isLoading ? <Loading /> : (
            <button onClick={onSubmit} className={btnStyle}>
              Submit
            </button>
          )}

        </div>
      </div>
    </div>
  )
}

export default Register;