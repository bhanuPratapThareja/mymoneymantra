import { useState } from 'react'

const PersonalInfo = () => {
  const [editing, setEditing] = useState(false)
  return (
    <div className="personal-wrapper">
      {editing ? (
        <form className="personal-forms-wrapper" style={{ display: 'block' }}>
          <h5>Full Name</h5>
          <div className="shortforms-container personal-style">
            <div className="form__group field">
              <input value="" className="form__field" type="text" id="mother-f-name" placeholder="First Name" required="" />
              <label className="form__label" for="mother-f-name">
                First Name
              </label>
            </div>
            <div className="form__group field">
              <input value="" className="form__field" type="text" id="mother-l-name" placeholder="Last Name" required="" />
              <label className="form__label" for="mother-l-name">
                Last Name
              </label>
            </div>
          </div>
          <h5>Date of Birth</h5>
          <div className="shortforms-container personal-style">
            <div className="form__group field">
              <div role="wrapper" className="gj-datepicker gj-datepicker-md gj-unselectable">
                <input
                  value=""
                  className="form__field profile-dob datepicker gj-textbox-md"
                  type="text"
                  id="dob"
                  placeholder="MM / DD / YYYY"
                  required=""
                  data-type="datepicker"
                  data-guid="2c92f534-a412-9063-7136-166bf9b6a4d8"
                  data-datepicker="true"
                  role="input"
                />
                <i className="gj-icon" role="right-icon">
                  event
                </i>
              </div>
              <label className="form__label" for="dob">
                Date of Birth
              </label>
            </div>
          </div>
          <h5>Gender</h5>
          <div className="shortforms-container gender-style">
            <input value="" className="lets-checkbox" type="radio" id="female" name="gender" required="" />
            <input value="" className="lets-checkbox" type="radio" id="male" name="gender" required="" />
            <input value="" className="lets-checkbox" type="radio" id="other" name="gender" required="" />

            <label for="female">Female</label>
            <label for="male">Male</label>
            <label for="other">Other</label>
          </div>
          <h5>Marital Status</h5>
          <div className="shortforms-container marital-style">
            <input value="" className="lets-checkbox" type="radio" id="single" name="Marital" required="" />
            <input value="" className="lets-checkbox" type="radio" id="married" name="Marital" required="" />
            <input value="" className="lets-checkbox" type="radio" id="separated" name="Marital" required="" />
            <input value="" className="lets-checkbox" type="radio" id="divorced" name="Marital" required="" />
            <input value="" className="lets-checkbox" type="radio" id="widowed" name="Marital" required="" />

            <label for="single">Single</label>
            <label for="married">Married</label>
            <label for="separated">Separated</label>
            <label for="divorced">Divorced</label>
            <label for="widowed">Widowed</label>
          </div>
          <h5>PAN Number</h5>
          <div className="shortforms-container">
            <div className="form__group field">
              <input value="" className="form__field" type="text" id="l-pan" placeholder="PAN Number" required="" />
              <label className="form__label" for="l-pan">
                PAN Number
              </label>
            </div>
          </div>

          <div className="save-options">
            <button type="button" className="save-personal" id="save-personal" onClick={() => setEditing(false)}>
              Save
            </button>
            <button type="button" className="cancel" id="cancel" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="before-edit">
          <div className="shortforms-container">
            <div className="form__group field">
              <input readonly="" className="form__field" type="text" value="Venkitaraman Hariharan" id="full-name" placeholder="Full Name" required="" />
              <label className="form__label" for="full-name">
                Full Name
              </label>
            </div>
            <div className="form__group field">
              <input readonly="" className="form__field" type="text" value="01 / 11 / 2020" id="dob" placeholder="Date of Birth" required="" />
              <label className="form__label" for="dob">
                Date of Birth
              </label>
            </div>
            <div className="form__group field">
              <input readonly="" className="form__field" type="text" value="Male" id="gender" placeholder="Gender" required="" />
              <label className="form__label" for="gender">
                Gender
              </label>
            </div>
            <div className="form__group field">
              <input readonly="" className="form__field" type="text" value="Single" id="marital-Status" placeholder="Marital Status" required="" />
              <label className="form__label" for="marital-Status">
                Marital Status
              </label>
            </div>
            <div className="form__group field">
              <input readonly="" className="form__field" type="text" value="XXXX728KYZ1" id="pan-num" placeholder="PAN Number" required="" />
              <label className="form__label" for="pan-num">
                PAN Number
              </label>
            </div>
          </div>
          <button type="button" id="edit-personal" className="edit-button" onClick={() => setEditing(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  )
}

export default PersonalInfo
