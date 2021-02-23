import axios from 'axios'
import { useState } from 'react'
import Layout from '../../components/Layout'
import Application from '../../components/UserProfile/Application'
import ContactInfo from '../../components/UserProfile/ContactInfo'
import Documents from '../../components/UserProfile/Documents'
import Help from '../../components/UserProfile/Help'
import Offers from '../../components/UserProfile/Offers'
import PersonalInfo from '../../components/UserProfile/PersonalInfo'
import ReferEarn from '../../components/UserProfile/ReferEarn'
import WorkInfo from '../../components/UserProfile/WorkInfo'
import { fileToByteArray } from '../../utils/byteArray'
import { getClassesForPage } from '../../utils/classesForPage'

const userProfile = (props) => {
  const [picture, setPicture] = useState('')
  const [pictureType, setPictureType] = useState('')
  const fileExtention = (fileType) => {
    const fileTypeArray = fileType.split('/')
    return fileTypeArray[1]
  }
  const pictureUpload = async e => {
    console.log(e.target.files[0])
    const file = e.target.files[0]
    if (!file) return
    const docBytes = await fileToByteArray(file)
    const documentExtension = fileExtention(file.type)
    let body = {
      docBytes,
      documentName: file.name,
      documentExtension,
      documentNo: '2130000043',
      documentTypeId: '2130000043',
    }
    const uploadStatus = await uploadPicture(body)
    if (uploadStatus) {
      setPicture(docBytes)
      setPictureType(documentExtension)
    }

  }
  const uploadPicture = async (body) => {
    try {
      const customerId = localStorage.getItem('customerId')
      const responseObject = await axios.post(
        'http://203.122.46.189:8060/customer/api/profile/v1/doc-upload',
        {
          ...body,
          customerId: customerId ? customerId : '101',
        }
      )
      console.log(responseObject)
      if (responseObject.status === 200) {
        return responseObject.data.message
      } else {
        return 'Something went wrong'
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className={props.pageClasses}>
      <Layout>
        <div className="profile-head">
          <div className="profile-container container">
            <div className="profile-head-wrapper">
              <div className="profile-image">
                <img src={picture.length ? `data:image/${pictureType};base64,${picture}` : "https://the1thing.github.io/MyMoneyMantra/build/images/icons/people1.png"} />
                <input
                  type="file"
                  onChange={pictureUpload}
                  style={{ display: 'none' }}
                  id='profile-picture'
                />
                <label
                  id="edit-personal"
                  className="edit-button"
                  htmlFor='profile-picture'
                >
                  Edit
          </label>
              </div>
              <h1>{'Customer Name'}</h1>
              <div className="profile-progress">
                <div className="inner">
                  <div className="percent-bar">
                    <div className="perctange-wrap">
                      <h6 id="percentage">57%</h6>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                Complete your profile for the best results and ease up your
                application process
              </p>
            </div>
            <div className="profile-options-wrapper">
              <div className="option-wrapper">
                <div id="option-1" className="option question-open">
                  <h3>Personal Information</h3>
                  <svg
                    className="question-active"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
                <div
                  className="option-data"
                  id="option-1-data"
                  style={{ display: 'block' }}
                >
                  <PersonalInfo />
                </div>
              </div>
              <div className="option-wrapper">
                <div id="option-2" className="option">
                  <h3>Contact Information</h3>
                  <svg
                    className=""
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
                <div className="option-data" id="option-2-data">
                  <ContactInfo />
                </div>
              </div>
              <div className="option-wrapper">
                <div id="option-3" className="option">
                  <h3>Work Information</h3>
                  <svg
                    className=""
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
                <div className="option-data" id="option-3-data">
                  <WorkInfo data={props.data} />
                </div>
              </div>
              <div className="option-wrapper">
                <div id="option-4" className="option">
                  <h3>Documents</h3>
                  <svg
                    className=""
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
                <div className="option-data" id="option-4-data">
                  <Documents />
                </div>
              </div>
              <div className="option-wrapper">
                <div id="option-5" className="option">
                  <h3>Application</h3>
                  <svg
                    className=""
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
                <div className="option-data" id="option-5-data">
                  <Application banks={props?.data} />
                </div>
              </div>
              <div className="option-wrapper">
                <div id="option-6" className="option">
                  <h3>Offers</h3>
                  <svg
                    className=""
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
                <div className="option-data" id="option-6-data">
                  <Offers />
                </div>
              </div>
              <div className="option-wrapper">
                <div id="option-7" className="option">
                  <h3>Refer &amp; Earn</h3>
                  <svg
                    className=""
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
                <div className="option-data" id="option-7-data">
                  <ReferEarn />
                </div>
              </div>
              <div className="option-wrapper">
                <div id="option-8" className="option">
                  <h3>Help</h3>
                  <svg
                    className=""
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
                <div className="option-data" id="option-8-data">
                  <Help />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const primaryPath = 'user-profile'
  const responseObject = await fetch('http://203.122.46.189:1338/banks')
  const data = await responseObject.json()
  const pageClasses = getClassesForPage(primaryPath)
  return { props: { pageClasses, data } }
}
export default userProfile
