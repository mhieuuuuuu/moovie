import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const validateName = (name) => {
    // Name should be at least 4 characters and contain only letters and spaces
    const nameRegex = /^[a-zA-Z\s]{4,}$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    // Standard email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password should be at least 8 characters and contain at least one uppercase, one lowercase, one number and one special character
    const passwordRegex = /^.{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!value) {
      setEmailError("");
    } else if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPw(value);
    if (!value) {
      setPwError("");
    } else if (!validatePassword(value)) {
      setPwError("Password must be at least 8 characters");
    } else {
      setPwError("");
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (!value) {
      setNameError("");
    } else if (!validateName(value)) {
      setNameError(
        "Name should be at least 4 characters and contain only letters and spaces"
      );
    } else {
      setNameError("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate name
    if (!validateName(name)) {
      setNameError(
        "Name should be at least 4 characters and contain only letters and spaces"
      );
      isValid = false;
    }

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    // Validate password
    if (!validatePassword(pw)) {
      setPwError("Password must be at least 8 characters");
      isValid = false;
    }

    if (isValid) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, pw);
        await updateProfile(res.user, { displayName: name });
        navigate(from, { replace: true });
      } catch (error) {
        console.log(error);
        alert("This account has already existed!");
      }
      // Reset form
      setName("");
      setEmail("");
      setPw("");
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden absolute">
      <img className="w-full absolute" src="./../../public/footer-bg.jpg"></img>
      <div className="absolute w-full h-full flex flex-col items-center justify-center">
        <div className="w-screen h-screen bg-transparent flex items-center justify-center">
          <form
            onSubmit={handleRegister}
            className="w-[420px] h-[500px] space-y-4 p-6 shadow-lg bg-black/50 rounded-xl flex flex-col gap-5 items-center pt-10"
          >
            <h2 className="text-white text-2xl font-bold">Register</h2>
            <div className="flex flex-col gap-1 w-full">
              <input
                type="text"
                className="w-full p-3 bg-transparent border-b border-white rounded-sm text-white placeholder-subtitle focus-within:ring-0 focus-within:outline-none focus-within:border-hover"
                placeholder="Your name"
                value={name}
                onChange={handleNameChange}
                required
              />
              {nameError && (
                <span className="text-red-500 text-[11px]">{nameError}</span>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <input
                type="email"
                className="w-full p-3 bg-transparent border-b border-white rounded-sm text-white placeholder-subtitle focus-within:ring-0 focus-within:outline-none focus-within:border-hover"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && (
                <span className="text-red-500 text-[11px]">{emailError}</span>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <input
                type="password"
                className="w-full p-3 bg-transparent border-b border-white rounded-sm text-white placeholder-subtitle focus-within:ring-0 focus-within:outline-none focus-within:border-hover"
                placeholder="Password"
                value={pw}
                onChange={handlePasswordChange}
                required
              />
              {pwError && (
                <span className="text-red-500 text-[11px]">{pwError}</span>
              )}
            </div>

            <button className="w-full bg-transparent border-2 border-hover text-hover p-3 rounded-sm hover:bg-hover hover:text-black/50 hover:font-bold transition">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
