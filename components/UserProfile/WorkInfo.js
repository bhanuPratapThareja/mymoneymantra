const WorkInfo = () => {
  return (
    <form className="work-wrapper">
      <div className="shortforms-container">
        <div className="form__group field read-part">
          <input readonly="" className="form__field" type="text" value="Salaried" id="emp-type" placeholder="Employment Type" required="" />
          <label className="form__label" for="emp-type">
            Employment Type
          </label>
        </div>
        <div className="form__group field read-part">
          <input readonly="" className="form__field" type="text" value="Earnest &amp; Young Co." id="company-name" placeholder="Company Name" required="" />
          <label className="form__label" for="company-name">
            Company Name
          </label>
        </div>
        <div className="form__group field read-part">
          <input readonly="" className="form__field" type="text" value="₹ 5,00,000" id="monthly-income" placeholder="Net Monthly Income" required="" />
          <label className="form__label" for="monthly-income">
            Net Monthly Income
          </label>
        </div>
        <div className="form__group field read-part">
          <input readonly="" className="form__field" type="text" value="HDFC Bank" id="bank-name" placeholder="Bank Name" required="" />
          <label className="form__label" for="bank-name">
            Bank Name
          </label>
        </div>
        <div className="form__group field read-part">
          <input readonly="" className="form__field" type="text" value="HDFC Bank" id="account-num" placeholder="Account Number" required="" />
          <label className="form__label" for="account-num">
            Account Number
          </label>
        </div>
      </div>
      <div className="save-options">
        <button type="button" className="save-work" id="save-work">
          Save
        </button>
        <button type="button" className="cancel" id="cancel">
          Cancel
        </button>
      </div>

      <button type="button" id="edit-work" className="edit-button">
        Edit
      </button>
    </form>
  )
}

export default WorkInfo
