import { useEffect } from 'react'
import { useState } from 'react'
import { getContactInfo } from '../../utils/userProfileService'
const ContactInfo = () => {
  const [editing, setEditing] = useState(false)
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [currentAddress, setCurrentAddress] = useState('')
  const [permanentAddress, setPermanentAddress] = useState('')
  useEffect(() => {
    getContactInfo()
      .then((res) => {
        console.log(res)
        const { customerId, emailId, mobileNo, address } = res
        setemail(emailId)
        setmobile(mobileNo)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  const submitHandler = (e) => {
    e.preventDefault()
    setEditing(false)
  }
  return (
    <>
      <form
        className="contact-wrapper"
        style={{ display: 'block' }}
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
              readOnly={!editing}
              className="form__field"
              type="text"
              value={mobile}
              id="mob-num"
              onChange={(e) => setMobile(e.target.value)}
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
              value={email}
              id="email"
              placeholder="Email ID"
              onChange={(e) => setEmail(e.target.value)}
              required=""
            />
            <label className="form__label" htmlFor="email">
              Email ID
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
              value={currentAddress}
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
          <button type="submit" className="save-contact" id="save-contact">
            Save
          </button>
          <button
            type="button"
            className="cancel"
            id="cancel"
            onClick={() => setEditing(false)}
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

      {/* read-part */}
    </>
  )
}

export default ContactInfo
