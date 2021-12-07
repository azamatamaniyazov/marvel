import "./appHeader.scss";
import { Link, NavLink } from "react-router-dom";

const AppHeader = () => {
  const activeClass = ({ isActive }) => {
    return {
      color: isActive ? "#9F0013" : "",
    };
  };
  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink style={activeClass} to="/">
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink style={activeClass} to="/comics">
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
