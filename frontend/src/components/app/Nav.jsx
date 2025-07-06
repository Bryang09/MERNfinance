import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";

import { NavLink } from "react-router-dom";

function Nav() {
  const user = localStorage.getItem("user");
  return (
    <>
      <span className="mobile">
        <h3 onClick={() => isOpen(!open)}>
          {!open ? (
            <GiHamburgerMenu className="mobile-icon" size={"25px"} />
          ) : (
            <MdOutlineClose className="mobile-icon" size={"25px"} />
          )}
        </h3>
      </span>

      <header className={open ? "open" : "closed"}>
        <NavLink to="/">
          <h5 id="nav-title">nav</h5>
        </NavLink>
        <nav>
          <ul>
            <NavLink to="/overview">
              <li>Overview</li>
            </NavLink>
            <NavLink to={`/transactions`}>
              <li>Transactions</li>
            </NavLink>
            <NavLink to="/investments">
              <li>Investments</li>
            </NavLink>
            <NavLink to="/debts">
              <li>Debts</li>
            </NavLink>
            <NavLink to="settings">
              <li>Settings</li>
            </NavLink>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Nav;
