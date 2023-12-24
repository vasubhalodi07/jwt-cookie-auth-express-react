import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../feature/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(login(data)).then((res) => {
      if (res.type === "user/login/fulfilled") {
        console.log("called fulfilled");
        toast.success(res.payload.message);
      } else if (res.type === "user/login/rejected") {
        toast.error(res.payload.message);
        console.log("called rejected");
      }
    });
  };

  return (
    <div className="container">
      <div className="main-container">
        <div className="title">Login</div>
        <div className="input_field">
          <input
            type="text"
            placeholder="email"
            name="email"
            value={data.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input_field">
          <input
            type="password"
            placeholder="password"
            name="password"
            value={data.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="btn">
          <button onClick={() => handleSubmit()}>Login</button>
        </div>
        <div className="navigate" onClick={() => navigate("/register")}>
          Don`t have account? Sing Up
        </div>
      </div>
    </div>
  );
};

export default Login;
