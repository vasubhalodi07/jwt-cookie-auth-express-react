import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import navLinkStyle from "./LinkStyle";
import { logout } from "../feature/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { loginStatus } = useSelector((state) => state.userKey);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="nav">
      <NavLink style={navLinkStyle} to="/">
        {loginStatus ? "Dashboard" : "Home"}
      </NavLink>
      <div className="auth-routes">
        {!loginStatus && (
          <NavLink style={navLinkStyle} to="/login">
            Login
          </NavLink>
        )}
        {!loginStatus && (
          <NavLink style={navLinkStyle} to="/register">
            Register
          </NavLink>
        )}
        {loginStatus && (
          <NavLink className="link" onClick={() => handleLogout()}>
            Logout
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
