import { NavLink } from "react-router-dom";

import "../styles/nav.scss";

function NavDemo() {
  return (
    <header>
      <NavLink to="/">
        <h5 id="nav-title">nav</h5>
      </NavLink>
      <nav>
        <ul>
          <NavLink to="/demo">
            <li>Overview</li>
          </NavLink>
          <NavLink to="/demo/expenses">
            <li>Expenses</li>
          </NavLink>
          <NavLink to="/demo/settings">
            <li>Settings</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}
export default NavDemo;
