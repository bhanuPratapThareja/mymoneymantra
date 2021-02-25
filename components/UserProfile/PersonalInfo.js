import { useState, useEffect } from 'react'
import {
  getPersonalInfo,
  savePersonalInfo,
} from '../../utils/userProfileService'
import moment from 'moment'

const PersonalInfo = (props) => {
  const [editing, setEditing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [maritalStatus, setMaritalStatus] = useState('')
  const [panNumber, setPanNumber] = useState('')
  const [martaialname, setmartaialname] = useState('')
  const { totalNumberOfFields, calculateProfileProgress, setPersonalInfoProgress } = props
  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = () => {
    getPersonalInfo()
      .then((res) => {
        console.log({ res })
        const { firstName, gender, martialStatus, panNo, lastName, dob } = res
        if (firstName.split(' ').length > 1) {
          setFirstName(firstName.split(' ')[0])
          setLastName(firstName.split(' ')[1])
        } else {
          setFirstName(firstName)
          setLastName(lastName ? lastName : '')
        }
        setGender(gender)
        setMaritalStatus(martialStatus)

        setPanNumber(panNo)
        setDob(dob ? moment(dob, 'DD/MM/YYYYY').format('YYYY-MM-DD') : null)
        let mName = checkMartialStatus(martialStatus)
        setmartaialname(mName)
      })
      .catch((err) => {
        console.log(err)
        alert(err.message)
      })
  }
  const submitHandler = (e) => {
    e.preventDefault()
    setEditing(false)
    let mName = checkMartialStatus(maritalStatus)
    setmartaialname(mName)
    savePersonalInfo(firstName, lastName, gender, maritalStatus, panNumber, dob)
      .then((res) => {
        console.log(res)
        getInfo()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const checkMartialStatus = (martial = -1) => {
    if (martial == 0) {
      return 'Single'
    } else if (martial == 1) {
      return 'Married'
    } else if (martial == 2) {
      return 'Separated'
    } else if (martial == 3) {
      return 'Divorced'
    } else if (martial == 4) {
      return 'Widowed'
    } else return ''
  }

  return (
    <div className="personal-wrapper">
      {editing ? (
        <form
          className="personal-forms-wrapper"
          style={{ display: 'block' }}
          onSubmit={submitHandler}
        >
          <h5>Full Name</h5>
          <div className="shortforms-container personal-style">
            <div className="form__group field">
              <input
                value={firstName}
                className="form__field"
                type="text"
                id="mother-f-name"
                placeholder="First Name"
                required=""
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className="form__label" htmlFor="mother-f-name">
                Full Name
              </label>
            </div>
            <div className="form__group field">
              <input
                value={lastName}
                className="form__field"
                type="text"
                id="mother-l-name"
                placeholder="Last Name"
                required=""
                onChange={(e) => setLastName(e.target.value)}
              />
              <label className="form__label" htmlFor="mother-l-name">
                Last Name
              </label>
            </div>
          </div>
          <h5>Date of Birth</h5>
          <div className="shortforms-container personal-style">
            <div className="form__group field">
              <div
                role="wrapper"
                className="gj-datepicker gj-datepicker-md gj-unselectable"
              >
                <input
                  value={dob}
                  className="form__field profile-dob datepicker gj-textbox-md"
                  type="date"
                  id="dob"
                  format="DD/MM/YYYY"
                  placeholder="DD / MM / YYYY"
                  required=""
                  data-type="datepicker"
                  data-guid="2c92f534-a412-9063-7136-166bf9b6a4d8"
                  data-datepicker="true"
                  role="input"
                  onChange={(e) => setDob(e.target.value)}
                />
                <i className="gj-icon" role="right-icon">
                  event
                </i>
              </div>
              <label className="form__label" htmlFor="dob">
                Date of Birth
              </label>
            </div>
          </div>
          <h5>Gender</h5>
          <div className="shortforms-container gender-style">
            <input
              value="0"
              className="lets-checkbox"
              type="radio"
              id="female"
              name="gender"
              required=""
              onChange={(e) => setGender(e.target.value)}
              defaultChecked={gender == 0 ? true : false}
            />
            <input
              value="1"
              className="lets-checkbox"
              type="radio"
              id="male"
              name="gender"
              required=""
              onChange={(e) => setGender(e.target.value)}
              defaultChecked={gender == 1 ? true : false}
            />
            <input
              value="2"
              className="lets-checkbox"
              type="radio"
              id="other"
              name="gender"
              required=""
              onChange={(e) => setGender(e.target.value)}
              defaultChecked={gender == 2 ? true : false}
            />

            <label htmlFor="female">Female</label>
            <label htmlFor="male">Male</label>
            <label htmlFor="other">Other</label>
          </div>
          <h5>Marital Status</h5>
          <div className="shortforms-container marital-style">
            <input
              value="0"
              className="lets-checkbox"
              type="radio"
              id="single"
              name="Marital"
              required=""
              defaultChecked={maritalStatus == 0 ? true : false}
              onChange={(e) => setMaritalStatus(e.target.value)}
            />
            <input
              value="1"
              className="lets-checkbox"
              type="radio"
              id="married"
              name="Marital"
              required=""
              defaultChecked={maritalStatus == 1 ? true : false}
              onChange={(e) => setMaritalStatus(e.target.value)}
            />
            <input
              value="2"
              className="lets-checkbox"
              type="radio"
              id="separated"
              name="Marital"
              required=""
              defaultChecked={maritalStatus == 2 ? true : false}
              onChange={(e) => setMaritalStatus(e.target.value)}
            />
            <input
              value="3"
              className="lets-checkbox"
              type="radio"
              id="divorced"
              name="Marital"
              required=""
              defaultChecked={maritalStatus == 3 ? true : false}
              onChange={(e) => setMaritalStatus(e.target.value)}
            />
            <input
              value="4"
              className="lets-checkbox"
              type="radio"
              id="widowed"
              name="Marital"
              required=""
              defaultChecked={maritalStatus == 4 ? true : false}
              onChange={(e) => setMaritalStatus(e.target.value)}
            />

            <label htmlFor="single">Single</label>
            <label htmlFor="married">Married</label>
            <label htmlFor="separated">Separated</label>
            <label htmlFor="divorced">Divorced</label>
            <label htmlFor="widowed">Widowed</label>
          </div>
          <h5>PAN Number</h5>
          <div className="shortforms-container">
            <div className="form__group field">
              <input
                value={panNumber}
                className="form__field"
                type="text"
                id="l-pan"
                placeholder="PAN Number"
                required=""
                onChange={(e) =>
                  setPanNumber(
                    e.target.value
                      ? e.target.value.toUpperCase()
                      : e.target.value
                  )
                }
              />
              <label className="form__label" htmlFor="l-pan">
                PAN Number
              </label>
            </div>
          </div>

          <div className="save-options">
            <button type="submit" className="save-personal" id="save-personal">
              Save
            </button>
            <button
              type="button"
              className="cancel"
              id="cancel"
              onClick={() => {
                setEditing(false)
                getInfo()
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
          <div className="before-edit">
            <div className="shortforms-container">
              <div className="form__group field">
                <input
                  readOnly={true}
                  className="form__field"
                  type="text"
                  value={`${firstName} ${lastName}`}
                  id="full-name"
                  placeholder="Full Name"
                  required=""
                />
                <label className="form__label" htmlFor="full-name">
                  Full Name
              </label>
              </div>
              <div className="form__group field">
                <input
                  readOnly={true}
                  className="form__field"
                  type="text"
                  value={moment(dob, 'YYYY-MM-DD').format('DD/MM/YYYY')}
                  id="dob"
                  placeholder="Date of Birth"
                  required=""
                />
                <label className="form__label" htmlFor="dob">
                  Date of Birth
              </label>
              </div>
              <div className="form__group field">
                <input
                  readOnly={true}
                  className="form__field"
                  type="text"
                  value={gender == 0 ? 'Female' : gender == 1 ? 'Male' : 'Other'}
                  id="gender"
                  placeholder="Gender"
                  required=""
                />
                <label className="form__label" htmlFor="gender">
                  Gender
              </label>
              </div>
              <div className="form__group field">
                <input
                  readOnly={true}
                  className="form__field"
                  type="text"
                  value={martaialname}
                  id="marital-Status"
                  placeholder="Marital Status"
                  required=""
                />
                <label className="form__label" htmlFor="marital-Status">
                  Marital Status
              </label>
              </div>
              <div className="form__group field">
                <input
                  readOnly={true}
                  className="form__field"
                  type="text"
                  value={panNumber}
                  id="pan-num"
                  placeholder="PAN Number"
                  required=""
                />
                <label className="form__label" htmlFor="pan-num">
                  PAN Number
              </label>
              </div>
            </div>
            <button
              type="button"
              id="edit-personal"
              className="edit-button"
              onClick={() => setEditing(true)}
            >
              Edit
          </button>
          </div>
        )}
    </div>
  )
}

export default PersonalInfo
