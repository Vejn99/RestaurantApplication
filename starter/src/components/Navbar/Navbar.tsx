import "./Navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="Header d-flex justify-content-between align-items-center border-bottom py-4">
      <Link to={"/"}>
        <h4>Restaurant</h4>
      </Link>
      <Link to={"/favorites"}>
        <i className="fa-solid fa-heart fa-2xl"></i>
      </Link>
    </div>
  );
};
