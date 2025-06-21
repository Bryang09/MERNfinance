import Nav from "../../components/Nav";

// import "../../styles/demo/debts.scss";

function DemoDebts() {
  return (
    <>
      <Nav />
      <div className="debt-page-container">
        <div className="debt-container">
          <div className="form-container">
            <form>
              <div className="input-container">
                <label htmlFor="debtName">Debt Name</label>
                <input type="text" name="debtName" id="debtName" />
              </div>
              <div className="input-container">
                <label htmlFor="debtAmount">Debt Amount</label>
                <input type="number" name="debtAmount" id="debtAmount" />{" "}
              </div>
              <div className="input-container">
                <label htmlFor="interest">Interest Rate</label>
                <input type="number" name="interest" id="interest" />{" "}
              </div>
              <div className="input-container">
                <label htmlFor="minimumPayment">Minimum Payment</label>
                <input
                  type="number"
                  name="minimumPayment"
                  id="minimumPayment"
                />
              </div>
              <button>Submit</button>
            </form>
          </div>

          <div className="debt-section"></div>
        </div>
      </div>
    </>
  );
}

export default DemoDebts;
