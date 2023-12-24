import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateAuthRoute } from "./components/PrivateRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "./feature/userSlice";
import { ToastContainer, toast } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

const App = () => {
  const dispatch = useDispatch();
  const { loginStatus, token } = useSelector((state) => state.userKey);

  useEffect(() => {
    if (loginStatus && !token.access_token && !token.refresh_token) {
      dispatch(getToken()).then((action) => {
        if (action.type === "user/token/fulfilled") {
          toast.success(action.payload.message);
        } else if (action.type === "user/token/rejected") {
          toast.error(action.payload.message);
        }
      });
    }
  }, [dispatch, loginStatus]);

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      ></ToastContainer>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<PrivateAuthRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
