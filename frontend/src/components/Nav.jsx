import { NavLink } from "react-router-dom";

// import "../styles/nav.scss";
import "../styles/nav2.scss";

function NavDemo() {
  return (
    <header>
      {/* <NavLink to="/">
        <h5 id="nav-title">nav</h5>
      </NavLink> */}
      <nav>
        <ul>
          <NavLink to="/demo" end>
            <li>Overview</li>
          </NavLink>
          <NavLink to="/demo/transactions">
            <li>Transactions</li>
          </NavLink>
          <NavLink to="/demo/debt">
            <li>Debts</li>
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
