import { useState } from 'react'

const ContactInfo = () => {
  const [editing, setEditing] = useState(false)

  return (
    <form className="contact-wrapper">
      <div className="shortforms-container">
        <div className="form__group field read-part">
          <input readonly="" className="form__field" type="text" value="+91 8790765432" id="mob-num" placeholder="Mobile Number" required="" />
          <label className="form__label" for="mob-num">
            Mobile Number
          </label>
        </div>
        <div className="form__group field read-part">
          <input readonly="" className="form__field" type="text" value="venkat90@gmail.com" id="email" placeholder="Email ID" required="" />
          <label className="form__label" for="email">
            Email ID
          </label>
        </div>
        <div className="form__group field read-part">
          <input readonly="" className="form__field" type="text" value="A-99, Manish Marg, Nemi Nagar, Jaipur, Rajasthan-302021" id="current-address" placeholder="Current Address" required="" />
          <label className="form__label" for="current-address">
            Current Address
          </label>
        </div>
        <div className="form__group field read-part">
          <input readonly="" className="form__field" type="text" value="B-21, Rajouri Garden, New Delhi, Delhi-110021" id="permanent-address" placeholder="Permanent Address" required="" />
          <label className="form__label" for="permanent-address">
            Permanent Address
          </label>
        </div>
      </div>
      <div className="save-options">
        <button type="button" className="save-contact" id="save-contact">
          Save
        </button>
        <button type="button" className="cancel" id="cancel">
          Cancel
        </button>
      </div>

      <button type="button" id="edit-contact" className="edit-button">
        Edit
      </button>
    </form>
  )
}

export default ContactInfo
