import "../styles/header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="header-container">
          <span className="title">Sai Anusha</span>
          <Link to="/about" className="links">About</Link>
          <Link to="/contact" className="links">Contact</Link>
        
      </div>
    </>
  );
};

export default Header;
