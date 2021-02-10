import { useState, useEffect } from "react";
import { getWorkInfo } from "../../utils/userProfileService";

const WorkInfo = (props) => {
  const [isedit, setisedit] = useState(false);
  const [employedType, setemployedType] = useState(null);
  const [companyId, setcompanyId] = useState(null);
  const [bankId, setbankId] = useState(null);
  const [ifscCode, setifscCode] = useState(null);
  const [netMonthlyIncome, setnetMonthlyIncome] = useState(null);
  const [accountNo, setaccountNo] = useState(null);
  const [companyOptions, setcompanyOtions] = useState([])
  useEffect(() => {
    console.log(props.data);
  }, []);

  const getWork = () => {
    getWorkInfo()
      .then((res) => {
        console.log(res);
        const {
          employedType,
          companyId,
          netMonthlyIncome,
          bankId,
          accountNo,
          ifscCode,
        } = { ...res };
        setcompanyId(companyId);
        setemployedType(employedType);
        setnetMonthlyIncome(netMonthlyIncome);
        setbankId(bankId);
        setaccountNo(accountNo);
        setifscCode(ifscCode);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  
  return (
    <form className="work-wrapper">
      <div className="shortforms-container">
        <div
          className={
            isedit
              ? "form__group field edit-part"
              : "form__group field read-part"
          }
        >
          <select
            readOnly={!isedit}
            className="form__field"
            type="text"
            value={employedType}
            id="emp-type"
            placeholder="Employment Type"
            required=""
          >
            <option val={1000000001}>Self Employed</option>
            <option val={1000000002}>Self Employed Professional</option>
            <option val={1000000004}>Salaried</option>
            <option val={1000000008}>Defense</option>
            <label className="form__label" htmlFor="emp-type">
              Employment Type
            </label>
          </select>
        </div>
        <div
          className={
            isedit
              ? "form__group field edit-part"
              : "form__group field read-part"
          }
        >
          <input
            readOnly={!isedit}
            className="form__field"
            type="text"
            value={companyId}
            id="company-name"
            placeholder="Company Name"
            required=""
          />
          <label className="form__label" htmlFor="company-name">
            Company Name
          </label>
          <datalist id="company-name">
            {companyOptions.map((item)=><option key={item.caseCompanyId} value={item.caseCompanyId}>{item.companyName}</option>)}
          </datalist>
        </div>
        <div
          className={
            isedit
              ? "form__group field edit-part"
              : "form__group field read-part"
          }
        >
          <input
            readOnly={!isedit}
            className="form__field"
            type="text"
            value={netMonthlyIncome}
            id="monthly-income"
            placeholder="Net Monthly Income"
            required=""
          />
          <label className="form__label" htmlFor="monthly-income">
            Net Monthly Income
          </label>
        </div>
        <div
          className={
            isedit
              ? "form__group field edit-part"
              : "form__group field read-part"
          }
        >
          <select
            readOnly={!isedit}
            className="form__field"
            type="text"
            value={bankId}
            id="bank-name"
            placeholder="Bank Name"
            required=""
          >
            <label className="form__label" htmlFor="bank-name">
              Bank Name
            </label>
            {props.data.map((item) => (
              <option key={item.bank_id} val={item.bank_id}>
                {item.bank_name}
              </option>
            ))}
          </select>
        </div>
        <div
          className={
            isedit
              ? "form__group field edit-part"
              : "form__group field read-part"
          }
        >
          <input
            readOnly={!isedit}
            className="form__field"
            type="text"
            value={accountNo}
            id="account-num"
            placeholder="Account Number"
            required=""
          />
          <label className="form__label" htmlFor="account-num">
            Account Number
          </label>
        </div>
        <div
          className={
            isedit
              ? "form__group field edit-part"
              : "form__group field read-part"
          }
        >
          <input
            readOnly={!isedit}
            className="form__field"
            type="text"
            value={ifscCode}
            id="ifsc"
            placeholder="IFSC Code"
            required=""
          />
          <label className="form__label" htmlFor="ifsc">
            IFSC Code
          </label>
        </div>
      </div>
      <div className="save-options">
        <button type="button" className="save-work" id="save-work">
          Save
        </button>
        <button
          type="button"
          className="cancel"
          id="cancel"
          onClick={() => setisedit(!isedit)}
        >
          Cancel
        </button>
      </div>

      <button
        type="button"
        id="edit-work"
        className="edit-button"
        onClick={() => setisedit(!isedit)}
      >
        Edit
      </button>
    </form>
  );
};

export default WorkInfo;
