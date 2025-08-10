import React, { useEffect, useState } from "react";
import { register, showUserById, updateUser, addNewUser } from "../apis/api";
import { useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Cookies from "universal-cookie";

export default function Form({ btnText }) {
  const [formInputs, setFormInputs] = useState({
    username: "",
    email: "",
    password: "",
    repeatpassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const { userContext, setUserContext } = useUserContext();
  const cookie = new Cookies();

  useEffect(() => {
    if (btnText !== "register") {
      showUserById(id).then((userData) => {
        setFormInputs(userData);
      });
    }
  }, []);

  //save user data in local storage
  useEffect(() => {
    if (userContext.token) {
      localStorage.setItem("token", userContext.token);
    }
    if (userContext.userDetails) {
      localStorage.setItem("user", JSON.stringify(userContext.userDetails));
    }
    console.log("userContext.token", userContext.token);
    console.log("userContext.userDetails", userContext.userDetails);
  }, [userContext.token, userContext.userDetails]);

  async function handleSubmit(e) {
    e.preventDefault();

    //Error function
    function showMessageError(message) {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(""), 3000);
    }

    //validation
    if (formInputs.username === "") {
      showMessageError("please enter your name");
    } else if (formInputs.email === "") {
      showMessageError("please enter your E-mail");
    } else if (formInputs.password.length < 8) {
      showMessageError(
        "pasword very shortly, enter password more than 8 characters"
      );
    } else if (formInputs.password !== formInputs.repeatpassword) {
      showMessageError("password not matching");
    } else {
      //send data to backend
      // const token = localStorage.getItem("token");
      const userData = {
        name: formInputs.username,
        email: formInputs.email,
        password: formInputs.password,
        password_confirmation: formInputs.repeatpassword,
      };
      try {
        if (btnText === "register") {
          register(userData).then((res) => {
            cookie.set("Bearer",res.data.data.token)
            const token = res.data.data.token;
            const userDetails = res.data.data.user;
            setUserContext({ token, userDetails });
            // localStorage.setItem("email", formInputs.email);
            window.location.pathname = "/dashboard";
          });
        } else if (btnText === "add") {
          await addNewUser(userData);
          window.location.pathname = "/dashboard/users";
        } else {
          updateUser(id, userData);
          window.location.pathname = "/dashboard/users";
        }
      } catch (err) {
        console.error(err.response.data.message);
        showMessageError(err.response.data.message);
      }
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
          type="text"
          placeholder="Enter Your Name"
          className="form-input"
          value={formInputs.username}
          onChange={(e) =>
            setFormInputs({ ...formInputs, username: e.target.value })
          }
          required
        />
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
        <input
          type="password"
          placeholder="Repeat Password"
          className="form-input"
          value={formInputs.repeatpassword}
          onChange={(e) =>
            setFormInputs({ ...formInputs, repeatpassword: e.target.value })
          }
          required
        />
        <button
          type="submit"
          className="bg-blue-500 color-[black] hover:bg-blue-600 border border-blue-500 px-[20px] py-[10px] rounded-md transition-colors duration-300"
        >
          {btnText}
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
