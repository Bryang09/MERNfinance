import "../styles/home.scss";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="landing">
      <div className="landing-container">
        <h1>Finance Tracker</h1>
        <h3>Track Expenses & Plan For Your Future</h3>
        <div className="links">
          <Link to="/">
            <h5 id="create-account">Create Account</h5>
          </Link>
          <Link to="/demo">
            <h5 id="view-demo">View Demo</h5>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
