import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../feature/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
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
    dispatch(register(data)).then((res) => {
      if (res.type === "user/register/fulfilled") {
        toast.success(res.payload.message);
      } else if (res.type === "user/register/rejected") {
        toast.error(res.payload.message);
      }
    });
  };

  return (
    <div className="container">
      <div className="main-container">
        <div className="title">Register</div>
        <div className="input_field">
          <input
            type="text"
            placeholder="name"
            name="name"
            value={data.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
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
            type="text"
            placeholder="password"
            name="password"
            value={data.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="btn">
          <button onClick={() => handleSubmit()}>Register</button>
        </div>
        <div className="navigate" onClick={() => navigate("/login")}>
          already have an account? Sign In
        </div>
      </div>
    </div>
  );
};

export default Register;
