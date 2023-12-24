const navLinkStyle = ({ isActive }) => {
  return {
    backgroundColor: "transparent",
    color: isActive ? "#2f69cc" : "rgb(37, 33, 44)",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "17px",
  };
};

export default navLinkStyle;
