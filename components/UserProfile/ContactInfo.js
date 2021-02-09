import { useEffect } from "react";
import { useState } from "react";
import {getContactInfo} from "../../utils/userProfileService";
const ContactInfo = () => {
  const [editing, setEditing] = useState(false);
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [currentAddress, setcurrentAddress] = useState("");
  const [permanentAddress, setpermanentAddress] = useState("");
  useEffect(() => {
    getContactInfo().then(res=>{
      console.log(res);
      const {customerId,emailId,mobileNo,address}=res;
      setemail(emailId);
      setmobile(mobileNo);
    }).catch(err=>{
      console.log(err);
    })
  }, [])
  return (
    <>
      {editing ? (
        <form className="contact-wrapper" style={{ display: "block" }}>
          <div className="shortforms-container">
            <div className="form__group field">
              <input
                className="form__field"
                type="text"
                value={mobile}
                id="mob-num"
                placeholder="Mobile Number"
                required=""
              />
              <label className="form__label" htmlFor="mob-num">
                Mobile Number
              </label>
            </div>
            <div className="form__group field">
              <input
                className="form__field"
                type="text"
                value={email}
                id="email"
                placeholder="Email ID"
                required=""
              />
              <label className="form__label" htmlFor="email">
                Email ID
              </label>
            </div>
            <div className="form__group field">
              <input
                className="form__field"
                type="text"
                value={currentAddress}
                id="current-address"
                placeholder="Current Address"
                required=""
              />
              <label className="form__label" htmlFor="current-address">
                Current Address
              </label>
            </div>
            <div className="form__group field">
              <input
                className="form__field"
                type="text"
                value={permanentAddress}
                id="permanent-address"
                placeholder="Permanent Address"
                required=""
              />
              <label className="form__label" htmlFor="permanent-address">
                Permanent Address
              </label>
            </div>
          </div>
          <div className="save-options">
            <button
              type="button"
              className="save-contact"
              id="save-contact"
              onClick={() => setEditing(false)}
            >
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
        </form>
      ) : (
        <form className="contact-wrapper">
          <div className="shortforms-container">
            <div className="form__group field read-part">
              <input
                readOnly={true}
                className="form__field"
                type="text"
                value={mobile}
                id="mob-num"
                placeholder="Mobile Number"
                required=""
              />
              <label className="form__label" htmlFor="mob-num">
                Mobile Number
              </label>
            </div>
            <div className="form__group field read-part">
              <input
                readOnly={true}
                className="form__field"
                type="text"
                value={email}
                id="email"
                placeholder="Email ID"
                required=""
              />
              <label className="form__label" htmlFor="email">
                Email ID
              </label>
            </div>
            <div className="form__group field read-part">
              <input
                readOnly={true}
                className="form__field"
                type="text"
                value="A-99, Manish Marg, Nemi Nagar, Jaipur, Rajasthan-302021"
                id="current-address"
                placeholder="Current Address"
                required=""
              />
              <label className="form__label" htmlFor="current-address">
                Current Address
              </label>
            </div>
            <div className="form__group field read-part">
              <input
                readOnly={true}
                className="form__field"
                type="text"
                value="B-21, Rajouri Garden, New Delhi, Delhi-110021"
                id="permanent-address"
                placeholder="Permanent Address"
                required=""
              />
              <label className="form__label" htmlFor="permanent-address">
                Permanent Address
              </label>
            </div>
          </div>
          <div className="save-options">
            <button
              type="button"
              className="save-contact"
              id="save-contact"
              onClick={() => setEditing(false)}
            >
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

          <button
            type="button"
            id="edit-contact"
            className="edit-button"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        </form>
      )}
    </>
  );
};

export default ContactInfo;
