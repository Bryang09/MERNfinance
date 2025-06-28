import { NavLink } from "react-router-dom";

// import "../styles/nav.scss";
import "../../styles/nav.scss";

import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";

import { useState } from "react";

function NavDemo() {
  const [open, isOpen] = useState(false);
  console.log(open);
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
            <NavLink to="/demo" end>
              <li>Overview</li>
            </NavLink>
            <NavLink to="/demo/transactions">
              <li>Transactions</li>
            </NavLink>
            <NavLink to="/demo/investments">
              <li>Investments</li>
            </NavLink>
            <NavLink to="/demo/debts">
              <li>Debts</li>
            </NavLink>
            {/* <NavLink to="/demo/settings">
              <li>Settings</li>
            </NavLink> */}
          </ul>
        </nav>
      </header>
    </>
  );
}
export default NavDemo;
