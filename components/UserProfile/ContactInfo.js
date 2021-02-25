import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { getContactInfo, saveContactInfo } from '../../utils/userProfileService'
const ContactInfo = (props) => {
  const [editing, setEditing] = useState(false)
  const [mobileNo, setMobileNo] = useState('')
  const [emailId, setEmailId] = useState('')
  const [currentAddress, setCurrentAddress] = useState('')
  const [permanentAddress, setPermanentAddress] = useState('')
  const [address, setAddress] = useState([])
  const [emailError, setEmailError] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const { totalNumberOfFields, calculateProfileProgress, setContactInfoProgress } = props

  useEffect(() => {
    getContact()
  }, [])
  const validateEmail = () => {
    let pattern = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/
    if (pattern.test(emailId)) {
      setEmailError(false)
    } else {
      setEmailError(true)
      setErrMsg('Invalid Email Id')
    }
  }
  const getContact = () => {
    getContactInfo()
      .then((res) => {
        console.log({ res })
        const { customerId, emailId, mobileNo, address } = res
        setEmailId(emailId)
        setMobileNo(mobileNo)
        setAddress(address)

        let count = emailId ? 1 : 0;
        count = mobileNo ? count + 1 : count;
        count = address ? count + 1 : count;

        sendCount(count, 3);


      })
      .catch((err) => {
        console.log(err)
      })
  }

  const sendCount = (val, max) => {
    props.contactCount(val, max)
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    setEditing(false)
    try {
      // const customerId = localStorage.getItem('customerId')
      let contactNo = JSON.stringify(mobileNo)
      const responseObject = await saveContactInfo(contactNo, emailId, address)
      if (responseObject.status === 200) {
        getContact()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const cancleHandler = () => {
    setEditing(false)
    getContact()
  }

  return (
    <>
      <form
        className="contact-wrapper"
        style={{ display: 'block' }}
        autocomplete="off"
        onSubmit={submitHandler}
      >
        <div className="shortforms-container">
          <div
            className={
              editing
                ? 'form__group field edit-part'
                : 'form__group field read-part'
            }
          >
            <input
              readOnly={true}
              className="form__field"
              type="text"
              value={mobileNo}
              id="mob-num"
              autocomplete="off"
              onChange={(e) => setMobileNo(e.target.value)}
              placeholder="Mobile Number"
              required=""
            />
            <label className="form__label" htmlFor="mob-num">
              Mobile Number
            </label>
          </div>
          <div
            className={
              editing
                ? 'form__group field edit-part'
                : 'form__group field read-part'
            }
          >
            <input
              readOnly={!editing}
              className="form__field"
              type="text"
              value={emailId}
              autocomplete="off"
              id="email"
              placeholder="Email ID"
              onChange={(e) => setEmailId(e.target.value)}
              required=""
              onBlur={validateEmail}
            />
            <label className="form__label" htmlFor="email">
              Email ID
            </label>
            {emailError ? <p style={{ color: 'red' }}>{errMsg}</p> : null}
          </div>
          <div
            className={
              editing
                ? 'form__group field edit-part'
                : 'form__group field read-part'
            }
          >
            <input
              readOnly={!editing}
              className="form__field"
              type="text"
              value={currentAddress}
              autocomplete="off"
              id="current-address"
              placeholder="Current Address"
              onChange={(e) => setCurrentAddress(e.target.value)}
              required=""
            />
            <label className="form__label" htmlFor="current-address">
              Current Address
            </label>
          </div>
          <div
            className={
              editing
                ? 'form__group field edit-part'
                : 'form__group field read-part'
            }
          >
            <input
              readOnly={!editing}
              className="form__field"
              type="text"
              autocomplete="off"
              value={permanentAddress}
              id="permanent-address"
              placeholder="Permanent Address"
              onChange={(e) => setPermanentAddress(e.target.value)}
              required=""
            />
            <label className="form__label" htmlFor="permanent-address">
              Permanent Address
            </label>
          </div>
        </div>
        <div
          className="save-options"
          style={{ display: editing ? 'flex' : 'none' }}
        >
          <button type="submit" className="save-contact" id="save-contact" disabled={emailError}>
            Save
          </button>
          <button
            type="button"
            className="cancel"
            id="cancel"
            onClick={cancleHandler}
          >
            Cancel
          </button>
        </div>
        {!editing && (
          <button
            type="button"
            id="edit-contact"
            className="edit-button"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        )}
      </form>
    </>
  )
}

export default ContactInfo
