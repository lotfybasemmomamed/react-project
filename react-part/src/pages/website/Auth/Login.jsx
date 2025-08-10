import React, { useState } from "react";
import { login } from "../../../apis/api";
import { useUserContext } from "../../../context/UserContext";
import Cookies from "universal-cookie";

export default function Login() {
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { userContext, setUserContext } = useUserContext();
  const cookie = new Cookies();

  async function handleSubmit(e) {
    e.preventDefault();

    //Error function
    function showMessageError(message) {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(""), 3000);
    }

    //send data to backend
    try {
      const userData = {
        email: formInputs.email,
        password: formInputs.password,
      };
      await login(userData).then((data) => {
        cookie.set("Bearer", data.data.data.token);
        setUserContext({
          token: data.data.data.token,
          userDetails: data.data.data.user,
        });
        // console.log("yser from login",data.data.data.user)
        window.location.pathname = "/dashboard";
      });
      
    } catch (err) {
      showMessageError(err.response.data.message);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-[90%]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-[30px] p-[100px] rounded-[5px] bg-gray-100 shadow-lg"
      >
        {errorMessage && <ErrorMessage message={errorMessage} />}

        <input
          type="email"
          placeholder="Enter Your E-Mail"
          className="form-input"
          value={formInputs.email}
          onChange={(e) =>
            setFormInputs({ ...formInputs, email: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="form-input"
          value={formInputs.password}
          onChange={(e) =>
            setFormInputs({ ...formInputs, password: e.target.value })
          }
          required
        />

        <button
          type="submit"
          className="bg-blue-500 color-[black] hover:bg-blue-600 border border-blue-500 px-[20px] py-[10px] rounded-md transition-colors duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md">
      {message}
    </div>
  );
}
