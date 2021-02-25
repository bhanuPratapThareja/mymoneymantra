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
  const [errMsg, setErrMsg] = useState('')
  const [nameError, setNameError] = useState(false)
  const [panError, setPanError] = useState(false)
  const { totalNumberOfFields, calculateProfileProgress, setPersonalInfoProgress } = props
  useEffect(() => {
    getInfo()
  }, [])

  const validateSaveButton = () => {
    return nameError || panError || (gender == null)
  }

  const validateName = (isFirstname) => {
    let pattern = /^[a-z]{3,25}$/gi
    let msg = 'Name should be between 3-25 characters'
    if (isFirstname) {
      if (pattern.test(firstName)) {
        setNameError(false)
      } else {
        setNameError(true)
        setErrMsg(`First ${msg}`)
      }
    } else {
      if (pattern.test(lastName) || lastName == '') {
        setNameError(false)
      } else {
        setNameError(true)
        setErrMsg(`Last ${msg}`)
      }
    }
  }

  const validatePanNumber = () => {
    let pattern = /^[a-z]{5}[0-9]{4}[a-z]{1,2}$/gi
    if (pattern.test(panNumber)) {
      setPanError(false)
    } else {
      setPanError(true)
      setErrMsg('Invalid PAN number')
    }
  }

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
        setDob(dob ? moment(dob, 'DD/MM/YYYYY').format('DD-MM-YYYY') : null)
        let mName = checkMartialStatus(martialStatus)
        setmartaialname(mName)
        // let today = moment()

        // let dateOfBirth = moment(dob).format()
        // console.log('dob diff in years', today, dateOfBirth, today.diff(dateOfBirth))
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
          autocomplete="off"
          className="personal-forms-wrapper"
          style={{ display: 'block' }}
          onSubmit={submitHandler}
        >
          <h5>Full Name</h5>
          <div className="shortforms-container personal-style">
            <div className="form__group field">
              <input
                autocomplete="off"
                value={firstName}
                className="form__field"
                type="text"
                id="mother-f-name"
                placeholder="First Name"
                required=""
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={() => validateName(true)}
              />
              <label className="form__label" htmlFor="mother-f-name">
                First Name
              </label>
            </div>
            <div className="form__group field">
              <input
                autocomplete="off"
                value={lastName}
                className="form__field"
                type="text"
                id="mother-l-name"
                placeholder="Last Name"
                required=""
                onChange={(e) => setLastName(e.target.value)}
                onBlur={() => validateName(false)}
              />
              <label className="form__label" htmlFor="mother-l-name">
                Last Name
              </label>
            </div>
            {nameError ? <p style={{ color: 'red' }}>{errMsg}</p> : null}
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
                  type="text"
                  id="dob"
                  autocomplete="off"
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
              autocomplete="off"
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
              autocomplete="off"
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
              autocomplete="off"
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
              autocomplete="off"
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
              autocomplete="off"
              defaultChecked={maritalStatus == 2 ? true : false}
              onChange={(e) => setMaritalStatus(e.target.value)}
            />
            <input
              value="3"
              className="lets-checkbox"
              type="radio"
              id="divorced"
              name="Marital"
              autocomplete="off"
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
              autocomplete="off"
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
                autocomplete="off"
                onChange={(e) =>
                  setPanNumber(
                    e.target.value
                      ? e.target.value.toUpperCase()
                      : e.target.value
                  )
                }
                onBlur={validatePanNumber}
              />
              <label className="form__label" htmlFor="l-pan">
                PAN Number
              </label>
            </div>
            {panError ? <p style={{ color: 'red' }}>{errMsg}</p> : null}
          </div>

          <div className="save-options">
            <button type="submit" className="save-personal" id="save-personal" disabled={validateSaveButton()}>
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
                  autocomplete="off"
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
                  value={dob != null ? dob : 'DD/MM/YYYY'}
                  id="dob"
                  autocomplete="off"
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
                  value={gender == 0 ? 'Female' : gender == 1 ? 'Male' : gender == 2 ? 'Other' : 'Gender'}
                  id="gender"
                  autocomplete="off"
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
                  autocomplete="off"
                  value={martaialname ? martaialname : 'Marital Status'}
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
                  autocomplete="off"
                  value={panNumber ? panNumber : 'PAN number'}
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
