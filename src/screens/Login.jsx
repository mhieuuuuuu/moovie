import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      alert("Wrong email or password!");
    }
  };

  const handleToRegister = () => {
    navigate("/register", { state: location.state });
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden absolute">
      <img className="w-full absolute" src="./../../public/footer-bg.jpg"></img>
      <div className="absolute w-full h-full flex flex-col items-center justify-center">
        <div className="w-screen h-screen bg-transparent flex items-center justify-center">
          <form
            onSubmit={handleLogin}
            className="w-[400px] h-[500px] space-y-4 p-6 shadow-lg bg-black/50 rounded-xl flex flex-col gap-5 items-center pt-10"
          >
            <h2 className="text-white text-2xl font-bold">Login</h2>
            <input
              type="email"
              className="w-full p-3 bg-transparent border-b border-white rounded-sm text-white placeholder-subtitle focus-within:ring-0 focus-within:outline-none focus-within:border-hover"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full p-3 bg-transparent border-b border-white rounded-sm text-white placeholder-subtitle focus-within:ring-0 focus-within:outline-none focus-within:border-hover"
              placeholder="Password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
            />
            <button className="w-full bg-transparent border-2 border-hover text-hover p-3 rounded-sm hover:bg-hover hover:text-black/50 hover:font-bold transition">
              Login
            </button>
            <p className="text-sm text-subtitle">
              Don't have an account yet?{" "}
              <button
                onClick={handleToRegister}
                className="text-white hover:text-hover"
              >
                Register
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
