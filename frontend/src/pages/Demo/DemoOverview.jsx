import Overview from "../../components/Demo/Overview";
import NavDemo from "../../components/Nav";
// import "../../styles/demo.scss";
import "../../styles/demo/overview2.scss";
import { User } from "./User";

function Demo() {
  return (
    <>
      <NavDemo />
      <div className="home-container">
        <div className="overview-container">
          <h1>
            Hello, <span>{User.name}.</span>
          </h1>
        </div>

        <div className="overview">
          <h2>Account Overview</h2>
          <Overview data={User} type="Debt" />
        </div>
      </div>
    </>
  );
}

export default Demo;
