import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { getApiData } from '../../api/api'
import { getContactInfo, saveContactInfo } from '../../utils/userProfileService'
const ContactInfo = (props) => {
  const [editing, setEditing] = useState(false)
  const [mobileNo, setMobileNo] = useState('')
  const [emailId, setEmailId] = useState('')
  const [currentAddressDisplay, setCurrentAddressDisplay] = useState('')
  const [permanentAddressDisplay, setPermanentAddressDisplay] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [currentAddressId, setCurrentAddressId] = useState(null)
  const [currentPincode, setCurrentPincode] = useState('')
  const [currentPincodeQuery, setCurrentPincodeQuery] = useState('')
  const [currentCity, setCurrentCity] = useState('')
  const [currentAddressLine1, setCurrentAddressLine1] = useState('')
  const [currentAddressLine2, setCurrentAddressLine2] = useState('')
  const [currentStateId, setCurrentStateId] = useState(0)
  const [currentCityId, setCurrentCityId] = useState(0)
  const [permanentAddressId, setPermanentAddressId] = useState(null)
  const [permanentPincode, setPermanentPincode] = useState('')
  const [permanentPincodeQuery, setPermanentPincodeQuery] = useState('')
  const [permanentCity, setPermanentCity] = useState('')
  const [permanentAddressLine1, setPermanentAddressLine1] = useState('')
  const [permanentAddressLine2, setPermanentAddressLine2] = useState('')
  const [permanentStateId, setPermanentStateId] = useState(0)
  const [permanentCityId, setPermanentCityId] = useState(0)
  const [sameAddress, setSameAddress] = useState(false)
  const [cities, setCities] = useState([])

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
      setPermanentCityId(currentCityId)
      setPermanentStateId(currentStateId)
    }
  }, [
    sameAddress,
    currentPincode,
    currentCity,
    currentAddressLine1,
    currentAddressLine2,
    currentStateId,
    currentCityId,
  ])

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (currentPincodeQuery) {
        try {
          const { url, body } = getApiData('pincode')
          body.name = currentPincodeQuery
          const responseObject = await axios.post(url, body)
          const { data } = responseObject
          console.log({ responseObject })
          setCities(data.pinList)
        } catch (err) {
          console.log(err)
        }
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [currentPincodeQuery])

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (permanentPincodeQuery) {
        try {
          const { url, body } = getApiData('pincode')
          body.name = permanentPincodeQuery
          const responseObject = await axios.post(url, body)
          const { data } = responseObject
          console.log({ responseObject })
          setCities(data.pinList)
        } catch (err) {
          console.log(err)
        }
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [permanentPincodeQuery])

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
        // setAddress(address)
        address.map((a) => {
          if (a.addressTypeMasterId == 1000000001) {
            if (a.addressId) {
              setCurrentAddressId(a.addressId)
            }
            setCurrentAddressLine1(a.addressline1);
            setCurrentAddressLine2(a.addressline2);
            setCurrentCityId(a.city);
            setCurrentCity(a.city);
            
            setCurrentStateId(a.state);
            setCurrentPincode(a.pincode);
            setCurrentAddressDisplay(`${a.addressline1}, ${a.addressline2}, ${a.pincode}, ${a.city},${a.state} `)
          }
          if (a.addressTypeMasterId == 1000000003) {
            if (a.addressId) {
              setPermanentAddressId(a.addressId)
            }
            setPermanentAddressLine1(a.addressline1);
            setPermanentAddressLine2(a.addressline2);
            setPermanentCityId(a.city);
            setPermanentCity(a.city);
            setPermanentStateId(a.state);
            setPermanentPincode(a.pincode);
            setPermanentAddressDisplay(`${a.addressline1}, ${a.addressline2}, ${a.pincode}, ${a.city},${a.state} `)
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
        addressTypeMasterId: 1000000003,
        pincode: permanentPincode,
        city: permanentCityId,
        state: permanentStateId,
        addressline1: permanentAddressLine1,
        addressline2: permanentAddressLine2,
      }
      if (permanentAddressId) {
        permanentAddress.addressId = permanentAddressId
      }
      const currentAddress = {
        addressTypeMasterId: 1000000001,
        pincode: currentPincode,
        city: currentCityId,
        state: currentStateId,
        addressline1: currentAddressLine1,
        addressline2: currentAddressLine2,
      }
      if (currentAddressId) {
        currentAddress.addressId = currentAddressId
      }
      const address = [permanentAddress, currentAddress]
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
    setEmailError(false)
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

  const currentPincodeQueryHandler = (e) => {
    setCurrentPincodeQuery(e.target.value)
    setCurrentPincode(e.target.value)
  }

  const permanentPincodeQueryHandler = (e) => {
    setPermanentPincodeQuery(e.target.value)
    setPermanentPincode(e.target.value)
  }

  const currentPincodeHandler = (pincodeObject) => {
    setCurrentCity(pincodeObject.cityName)
    setCurrentPincode(pincodeObject.pincode)
    setCurrentStateId(pincodeObject.stateId)
    setCurrentCityId(pincodeObject.cityId)
    setCurrentPincodeQuery('')
  }

  const permanentPincodeHandler = (pincodeObject) => {
    setPermanentCity(pincodeObject.cityName)
    setPermanentPincode(pincodeObject.pincode)
    setPermanentStateId(pincodeObject.stateId)
    setPermanentCityId(pincodeObject.cityId)
    setPermanentPincodeQuery('')
  }

  return (
    <>
      <div className="contact-wrapper">
        <form
          className="contact-forms-wrapper"
          style={{ display: 'block' }}
          autoComplete={"off"}
          
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
              <input  autoComplete={"off"}
                readOnly={true}
                className="form__field"
                type="text"
                value={mobileNo}
                id="mob-num"
                autoComplete={"off"}
                onChange={(e) => setMobileNo(e.target.value)}
                placeholder="Mobile Number"
                required=""
                disabled
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
              <input  autoComplete={"off"}
                readOnly={!editing}
                className="form__field"
                type="text"
                value={emailId}
                autoComplete={"off"}
                id="email"
                placeholder="Email ID"
                onChange={(e) => setEmailId(e.target.value)}
                required=""
                onBlur={validateEmail}
                disabled={!editing}
              />
              <label className="form__label" htmlFor="email">
                Email ID
              </label>
              {emailError ? <p style={{ color: 'red' }}>{errMsg}</p> : null}
            </div>
            <div
              className={
                editing
                  ? 'form__group field hide-form'
                  : 'form__group field read-part'
              }
            >
              <input  autoComplete={"off"}
                readOnly
                className="form__field"
                type="text"
                value={currentAddressDisplay}
                autoComplete={"off"}
                id="current-address"
                disabled={true}
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
                  ? 'form__group field hide-form'
                  : 'form__group field read-part'
              }
            >
              <input  autoComplete={"off"}
                readOnly
                className="form__field"
                type="text"
                autoComplete={"off"}
                value={permanentAddressDisplay}
                id="permanent-address"
                placeholder="Permanent Address"
                required=""
                disabled={!editing}
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
                  <input  autoComplete={"off"}
                    value={currentPincode}
                    class="form__field"
                    type="text"
                    id="c-pincode"
                    placeholder="Pincode"
                    required=""
                    pattern="[0-9]{6}"
                    onChange={currentPincodeQueryHandler}
                    disabled={!editing}
                  />
                  <label class="form__label" htmlFor="c-pincode">
                    Pincode
                  </label>
                  {editing &&
                    cities.length > 0 &&
                    currentPincodeQuery.length > 0 && (
                      <datalist
                        id="company-name"
                        style={{ display: 'block', background: '#fff' }}
                      >
                        {cities.map((item) => (
                          <option
                            key={item.pincode}
                            value={item.pincode}
                            onClick={() => currentPincodeHandler(item)}
                          >
                            {item.pincode}
                          </option>
                        ))}
                      </datalist>
                    )}
                </div>
                <div class="form__group field edit-part">
                  <input  autoComplete={"off"}
                    value={currentCity}
                    class="form__field"
                    type="text"
                    id="c-city"
                    placeholder="City"
                    required=""
                    readOnly
                    disabled={!editing}
                  />
                  <label class="form__label" htmlFor="c-city">
                    City
                  </label>
                </div>
                <div class="form__group field edit-part">
                  <input  autoComplete={"off"}
                    value={currentAddressLine1}
                    class="form__field"
                    type="text"
                    id="c-address-line-1"
                    placeholder="Address Line 1"
                    required=""
                    onChange={(e) => setCurrentAddressLine1(e.target.value)}
                    disabled={!editing}
                  />
                  <label class="form__label" htmlFor="c-address-line-1">
                    Address Line 1
                  </label>
                </div>
                <div class="form__group field edit-part">
                  <input  autoComplete={"off"}
                    value={currentAddressLine2}
                    class="form__field"
                    type="text"
                    id="c-address-line-2"
                    placeholder="address-line-2"
                    required=""
                    onChange={(e) => setCurrentAddressLine2(e.target.value)}
                    disabled={!editing}
                  />
                  <label class="form__label" htmlFor="c-address-line-2">
                    Address Line 2
                  </label>
                </div>
              </div>
              <div class="checkbox-container">
                <div class="checkbox edit-part">
                  <input  autoComplete={"off"}
                    type="checkbox"
                    id="checkbox"
                    name=""
                    checked={sameAddress}
                    onChange={(e) => setSameAddress(e.target.checked)}
                    disabled={!editing}
                  />
                  <label htmlFor="checkbox">
                    <span>Permanent address is same as current address.</span>
                  </label>
                </div>
              </div>
              <h5>Permanent address</h5>
              <div class="shortforms-container personal-style">
                <div class="form__group field edit-part">
                  <input  autoComplete={"off"}
                    readOnly={sameAddress}
                    value={permanentPincode}
                    class="form__field"
                    type="tel"
                    id="p-pincode"
                    placeholder="Pincode"
                    required=""
                    onChange={permanentPincodeQueryHandler}
                    disabled={!editing}
                  />
                  <label class="form__label" htmlFor="p-pincode">
                    Pincode
                  </label>
                  {!sameAddress &&
                    editing &&
                    cities.length > 0 &&
                    permanentPincodeQuery.length > 0 && (
                      <datalist
                        id="company-name"
                        style={{ display: 'block', background: '#fff' }}
                      >
                        {cities.map((item,index) => (
                          <option
                            key={index}
                            value={item.pincode}
                            onClick={() => permanentPincodeHandler(item)}
                          >
                            {item.pincode}
                          </option>
                        ))}
                      </datalist>
                    )}
                </div>
                <div class="form__group field edit-part">
                  <input  autoComplete={"off"}
                    readOnly
                    value={permanentCity}
                    class="form__field"
                    type="text"
                    id="p-city"
                    placeholder="City"
                    required=""
                    disabled={!editing}
                  />
                  <label class="form__label" htmlFor="p-city">
                    City
                  </label>
                </div>
                <div class="form__group field edit-part">
                  <input  autoComplete={"off"}
                    readOnly={sameAddress}
                    value={permanentAddressLine1}
                    class="form__field"
                    type="text"
                    id="p-address-line-1"
                    placeholder="Address Line 1"
                    required=""
                    onChange={(e) => setPermanentAddressLine1(e.target.value)}
                    disabled={!editing}
                  />
                  <label class="form__label" htmlFor="p-address-line-1">
                    Address Line 1
                  </label>
                </div>
                <div class="form__group field edit-part">
                  <input  autoComplete={"off"}
                    readOnly={sameAddress}
                    value={permanentAddressLine2}
                    class="form__field"
                    type="text"
                    id="p-address-line-2"
                    placeholder="address-line-2"
                    required=""
                    onChange={(e) => setPermanentAddressLine2(e.target.value)}
                    disabled={!editing}
                  />
                  <label class="form__label" htmlFor="p-address-line-2">
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
      </div>
    </>
  )
}

export default ContactInfo
