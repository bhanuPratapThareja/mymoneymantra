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
  const [lastNameErrMsg,setLastNameErrMsg]=useState('')
  const [lastNameErr,setLastNameErr]=useState(false)
  const [panError, setPanError] = useState(false)
  const [panErrMsg, setPanErrMsg] = useState('')
  const [dobError, setDobError] = useState(false)
  const [dobErrMsg, setDobErrMsg] = useState('')
  const { setPersonalInfoProgress, setCustomerName } = props
  useEffect(() => {
    getInfo()
  }, [])

  const validateSaveButton = () => {
    return nameError || panError || gender == null || dobError
  }

  const dateDiffInYears = () => {
    let startDate = dob ? dob.split('/').join('-') : dob
    let endDate = moment().format('DD-MM-YYYY')

    let newStartDate = new Date(startDate.split('-').reverse().join('-'))
    let newEndDate = new Date(endDate.split('-').reverse().join('-'))
    const msPerDay = 1000 * 60 * 60 * 24
    let utcStartDate = Date.UTC(
      newStartDate.getFullYear(),
      newStartDate.getMonth(),
      newStartDate.getDate()
    )
    let utcEndDate = Date.UTC(
      newEndDate.getFullYear(),
      newEndDate.getMonth(),
      newEndDate.getDate()
    )

    let differnce = Math.ceil(
      Math.ceil((utcEndDate - utcStartDate) / msPerDay) / 365
    )
    console.log(differnce)
    return differnce
  }

  const validateDob = () => {
    let dobPattern = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/
    if (!dobPattern.test(dob)) {
      setDobError(true)
      setDobErrMsg('Invalid date')
      return
    }

    let month = dob.split('/')[1]
    let day = dob.split('/')[0]
    if (month == '02' && (day == '30' || day == '31')) {
      console.log('invalid day for feb', day)
      setDobError(true)
      setDobErrMsg('Invalid date')
      return
    }


    let differnce = dateDiffInYears()
    if (isNaN(differnce)) {
      setDobError(true)
      setDobErrMsg('Invalid date')
    } else if (differnce > 18 && differnce < 100) {
      setDobError(false)
      setDobErrMsg('')
    } else {
      setDobError(true)
      setDobErrMsg('Age should be between 18-100 ')
    }
  }

  const validateName = (isFirstname) => {
    let pattern = /^[a-z]{3,25}$/gi
    let msg = 'Name should be between 3-25 characters'
    if (isFirstname) {
      if (pattern.test(firstName)) {
        setNameError(false)
        setErrMsg('')
      } else {
        setNameError(true)
        setErrMsg(`First ${msg}`)
      }
    } else {
      if (pattern.test(lastName) || lastName == '') {
        setLastNameErr(false)
        setLastNameErrMsg('')
      } else {
        setLastNameErr(true)
        setLastNameErrMsg(`Last ${msg}`)
      }
    }
  }

  const validatePanNumber = () => {
    let pattern = /^[a-z]{5}[0-9]{4}[a-z]{1,2}$/gi
    if (pattern.test(panNumber)) {
      setPanError(false)
      setPanErrMsg('')
    } else {
      setPanError(true)
      setPanErrMsg('Invalid PAN number')
    }
  }

  const getInfo = () => {
    getPersonalInfo()
      .then((res) => {
        console.log({ res })
        const { firstName, gender, martialStatus, panNo, lastName, dob } = res
        if (firstName && firstName.split(' ').length > 1) {
          setFirstName(firstName.split(' ')[0])
          setLastName(firstName.split(' ')[1])
        } else {
          setFirstName(firstName ? firstName : '')
          setLastName(lastName ? lastName : '')
        }
        setGender(gender)
        setMaritalStatus(martialStatus)
        setPanNumber(panNo)
        setDob(dob ? moment(dob, 'DD/MM/YYYYY').format('DD/MM/YYYY') : null)
        let mName = checkMartialStatus(martialStatus)
        setmartaialname(mName)
        setCustomerName(`${firstName} ${lastName}`)
        calculate(res)
      })
      .catch((err) => {
        console.log(err)
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

  const calculate = (fields) => {
    let progress = 0
    Object.keys(fields).map((field) => {
      if (fields[field]) {
        progress += 1
      }
    })
    setPersonalInfoProgress(progress)
  }

  const cancelHandler = () => {
    setEditing(false)
    getInfo()
    setDobError(false)
    setNameError(false)
    setPanError(false)
  }

  return (
    <div className="personal-wrapper">
      {editing ? (
        <form
          autoComplete={false}
          className="personal-forms-wrapper"
          style={{ display: 'block' }}
          onSubmit={submitHandler}
        >
          <h5>Full Name</h5>
          <div className="shortforms-container personal-style">
            <div className="form__group field">
              <input
                autoComplete={false}
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
                autoComplete={false}
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
            {lastNameErr ? <p style={{ color: 'red' }}>{lastNameErrMsg}</p> : null}
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
                  autoComplete={false}
                  format="DD/MM/YYYY"
                  placeholder="DD / MM / YYYY"
                  required=""
                  data-type="datepicker"
                  data-guid="2c92f534-a412-9063-7136-166bf9b6a4d8"
                  data-datepicker="true"
                  role="input"
                  onChange={(e) => setDob(e.target.value)}
                  onBlur={validateDob}
                />
                <i className="gj-icon" role="right-icon">
                  event
                </i>
              </div>
              <label className="form__label" htmlFor="dob">
                Date of Birth
              </label>
              {dobError ? <p style={{ color: 'red' }}>{dobErrMsg}</p> : null}
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
              autoComplete={false}
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
            {/* <input
              value="2"
              className="lets-checkbox"
              type="radio"
              id="other"
              name="gender"
              required=""
              autoComplete={false}
              onChange={(e) => setGender(e.target.value)}
              defaultChecked={gender == 2 ? true : false}
            /> */}

            <label htmlFor="female">Female</label>
            <label htmlFor="male">Male</label>
            {/* <label htmlFor="other">Other</label> */}
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
              autoComplete={false}
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
              autoComplete={false}
              defaultChecked={maritalStatus == 1 ? true : false}
              onChange={(e) => setMaritalStatus(e.target.value)}
            />
            {/* <input
              value="2"
              className="lets-checkbox"
              type="radio"
              id="separated"
              name="Marital"
              required=""
              autoComplete={false}
              defaultChecked={maritalStatus == 2 ? true : false}
              onChange={(e) => setMaritalStatus(e.target.value)}
            /> */}
            {/* <input
              value="3"
              className="lets-checkbox"
              type="radio"
              id="divorced"
              name="Marital"
              autoComplete={false}
              required=""
              defaultChecked={maritalStatus == 3 ? true : false}
              onChange={(e) => setMaritalStatus(e.target.value)}
            /> */}
            {/* <input
              value="4"
              className="lets-checkbox"
              type="radio"
              id="widowed"
              name="Marital"
              required=""
              autoComplete={false}
              defaultChecked={maritalStatus == 4 ? true : false}
              onChange={(e) => setMaritalStatus(e.target.value)}
            /> */}

            <label htmlFor="single">Single</label>
            <label htmlFor="married">Married</label>
            {/* <label htmlFor="separated">Separated</label>
            <label htmlFor="divorced">Divorced</label>
            <label htmlFor="widowed">Widowed</label> */}
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
                autoComplete={false}
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
            {panError ? <p style={{ color: 'red' }}>{panErrMsg}</p> : null}
          </div>

          <div className="save-options">
            <button
              type="submit"
              className="save-personal"
              id="save-personal"
              disabled={validateSaveButton()}
            >
              Save
            </button>
            <button
              type="button"
              className="cancel"
              id="cancel"
              onClick={cancelHandler}
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
                autoComplete={false}
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
                autoComplete={false}
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
                value={
                  gender == 0
                    ? 'Female'
                    : gender == 1
                    ? 'Male'
                    : gender == 2
                    ? 'Other'
                    : 'Gender'
                }
                id="gender"
                autoComplete={false}
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
                autoComplete={false}
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
                autoComplete={false}
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
            {!editing ? (
              <button
                type="button"
                id="edit-personal"
                className="edit-button"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            ) : null}
          </div>
        )}
    </div>
  )
}

export default PersonalInfo
