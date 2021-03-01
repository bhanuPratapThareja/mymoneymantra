import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { getContactInfo, saveContactInfo } from '../../utils/userProfileService'
const ContactInfo = (props) => {
  const [editing, setEditing] = useState(false)
  const [mobileNo, setMobileNo] = useState('')
  const [emailId, setEmailId] = useState('')
  const [currentAddressDisplay, setCurrentAddressDisplay] = useState('')
  const [permanentAddressDisplay, setPermanentAddressDisplay] = useState('')
  const [address, setAddress] = useState([])
  const [emailError, setEmailError] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [currentPincode, setCurrentPincode] = useState('')
  const [currentCity, setCurrentCity] = useState('')
  const [currentAddressLine1, setCurrentAddressLine1] = useState('')
  const [currentAddressLine2, setCurrentAddressLine2] = useState('')
  const [permanentPincode, setPermanentPincode] = useState('')
  const [permanentCity, setPermanentCity] = useState('')
  const [permanentAddressLine1, setPermanentAddressLine1] = useState('')
  const [permanentAddressLine2, setPermanentAddressLine2] = useState('')
  const [sameAddress, setSameAddress] = useState(false)

  const { setContactInfoProgress } = props

  useEffect(() => {
    getContact()
  }, [])

  useEffect(() => {
    if (sameAddress) {
      setPermanentPincode(currentPincode)
      setPermanentCity(currentCity)
      setPermanentAddressLine1(currentAddressLine1)
      setPermanentAddressLine2(currentAddressLine2)
    } else {
      setPermanentPincode('')
      setPermanentCity('')
      setPermanentAddressLine1('')
      setPermanentAddressLine2('')
    }
  }, [sameAddress])

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
        address.map((a) => {
          if (a.addressId == 300) {
            setCurrentAddress(a.addressline1)
          }
          if (a.addressId == 301) {
            setPermanentAddress(a.addressline1)
          }
        })
        console.log('adderss', address)
        let count = emailId ? 1 : 0
        count = mobileNo ? count + 1 : count
        count = address ? count + 1 : count

        sendCount(count, 3)
        calculate(res)
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
      const permanentAddress = {
        pincode: permanentPincode,
        city: permanentCity,
        addressline1: permanentAddressLine1,
        addressline2: permanentAddressLine2,
      }
      const currentAddress = {
        pincode: currentPincode,
        city: currentCity,
        addressline1: currentAddressLine1,
        addressline2: currentAddressLine2,
      }
      // const customerId = localStorage.getItem('customerId')
      let contactNo = JSON.stringify(mobileNo)
      const responseObject = await saveContactInfo(
        contactNo,
        emailId,
        currentAddress,
        permanentAddress
      )
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

  const calculate = (fields) => {
    let progress = 0
    Object.keys(fields).map((field) => {
      if (fields[field]) {
        progress += 1
      }
    })
    setContactInfoProgress(progress)
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
              readOnly
              className="form__field"
              type="text"
              value={currentAddressDisplay}
              autocomplete="off"
              id="current-address"
              placeholder="Current Address"
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
              readOnly
              className="form__field"
              type="text"
              autocomplete="off"
              value={permanentAddressDisplay}
              id="permanent-address"
              placeholder="Permanent Address"
              required=""
            />
            <label className="form__label" htmlFor="permanent-address">
              Permanent Address
            </label>
          </div>
        </div>
        {editing && (
          <>
            <h5>Current address</h5>
            <div class="shortforms-container personal-style">
              <div class="form__group field edit-part">
                <input
                  value={currentPincode}
                  class="form__field"
                  type="text"
                  id="c-pincode"
                  placeholder="Pincode"
                  required=""
                  onChange={(e) => setCurrentPincode(e.target.value)}
                />
                <label class="form__label" for="c-pincode">
                  Pincode
                </label>
              </div>
              <div class="form__group field edit-part">
                <input
                  value={currentCity}
                  class="form__field"
                  type="text"
                  id="c-city"
                  placeholder="City"
                  required=""
                  onChange={(e) => setCurrentCity(e.target.value)}
                />
                <label class="form__label" for="c-city">
                  City
                </label>
              </div>
              <div class="form__group field edit-part">
                <input
                  value={currentAddressLine1}
                  class="form__field"
                  type="text"
                  id="c-address-line-1"
                  placeholder="Address Line 1"
                  required=""
                  onChange={(e) => setCurrentAddressLine1(e.target.value)}
                />
                <label class="form__label" for="c-address-line-1">
                  Address Line 1
                </label>
              </div>
              <div class="form__group field edit-part">
                <input
                  value={currentAddressLine2}
                  class="form__field"
                  type="text"
                  id="c-address-line-2"
                  placeholder="address-line-2"
                  required=""
                  onChange={(e) => setCurrentAddressLine2(e.target.value)}
                />
                <label class="form__label" for="c-address-line-2">
                  Address Line 2
                </label>
              </div>
            </div>
            <div class="checkbox-container">
              <div class="checkbox edit-part">
                <input
                  type="checkbox"
                  id="checkbox"
                  name=""
                  checked={sameAddress}
                  onChange={(e) => setSameAddress(e.target.checked)}
                />
                <label for="checkbox">
                  <span>Permanent address is same as current address.</span>
                </label>
              </div>
            </div>
            <h5>Permanent address</h5>
            <div class="shortforms-container personal-style">
              <div class="form__group field edit-part">
                <input
                  value={permanentPincode}
                  class="form__field"
                  type="text"
                  id="p-pincode"
                  placeholder="Pincode"
                  required=""
                  onChange={(e) => setPermanentPincode(e.target.value)}
                />
                <label class="form__label" for="p-pincode">
                  Pincode
                </label>
              </div>
              <div class="form__group field edit-part">
                <input
                  value={permanentCity}
                  class="form__field"
                  type="text"
                  id="p-city"
                  placeholder="City"
                  required=""
                  onChange={(e) => setPermanentCity(e.target.value)}
                />
                <label class="form__label" for="p-city">
                  City
                </label>
              </div>
              <div class="form__group field edit-part">
                <input
                  value={permanentAddressLine1}
                  class="form__field"
                  type="text"
                  id="p-address-line-1"
                  placeholder="Address Line 1"
                  required=""
                  onChange={(e) => setPermanentAddressLine1(e.target.value)}
                />
                <label class="form__label" for="p-address-line-1">
                  Address Line 1
                </label>
              </div>
              <div class="form__group field edit-part">
                <input
                  value={permanentAddressLine2}
                  class="form__field"
                  type="text"
                  id="p-address-line-2"
                  placeholder="address-line-2"
                  required=""
                  onChange={(e) => setPermanentAddressLine2(e.target.value)}
                />
                <label class="form__label" for="p-address-line-2">
                  Address Line 2
                </label>
              </div>
            </div>
          </>
        )}
        <div
          className="save-options"
          style={{ display: editing ? 'flex' : 'none' }}
        >
          <button
            type="submit"
            className="save-contact"
            id="save-contact"
            disabled={emailError}
          >
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
