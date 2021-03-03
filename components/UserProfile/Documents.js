import axios from 'axios'
import { useEffect, useState } from 'react'
import { fileToByteArray } from '../../utils/byteArray'

const Documents = (props) => {
  const [aadhaar, setAadhaar] = useState({
    documentName: '',
    documentNo: '1000000374',
    documentTypeId: '1000000036',
    uploadStatus: '',
  })
  const [pan, setPan] = useState({
    documentName: '',
    documentNo: '1000000290',
    documentTypeId: '1000000036',
    uploadStatus: '',
  })
  const [bankStatement, setBankStatement] = useState({
    documentName: '',
    documentNo: '1000000308',
    documentTypeId: '1000000044',
    uploadStatus: '',
  })
  const [salarySlips, setSalarySlips] = useState({
    documentName: '',
    documentNo: '1000000307',
    documentTypeId: '1000000043',
    uploadStatus: '',
  })
  const [form16, setForm16] = useState({
    documentName: '',
    documentNo: '1000000305',
    documentTypeId: '1000000043',
    uploadStatus: '',
  })
  const [rentAgreement, setRentAgreement] = useState({
    documentName: '',
    documentNo: '1000000299',
    documentTypeId: '1000000037',
    uploadStatus: '',
  })
  const [bill, setBill] = useState({
    documentName: '',
    documentNo: '1000000321',
    documentTypeId: '1000000037',
    uploadStatus: '',
  })
  const { setDocumentProgress } = props
  useEffect(() => {
    getAllDocuments()
  }, [])

  const getPanAndAadhar = (doc) => {
    if (doc.documentNo == '1000000290') {
      setPan({ ...doc })
    }
    if (doc.documentNo == '1000000374') {
      setAadhaar({ ...doc })
    }
  }
  const getRentAgreementAndBill = (doc) => {
    if (doc.documentNo == '1000000299') {
      setRentAgreement({ ...doc })
    }
    if (doc.documentNo == '1000000321') {
      setBill({ ...doc })
    }
  }
  const getSalarySlipAndForm16 = (doc) => {
    if (doc.documentNo == '1000000305') {
      setForm16({ ...doc })
    }
    if (doc.documentNo == '1000000307') {
      setSalarySlips({ ...doc })
    }
  }

  const getAllDocuments = async () => {
    try {
      const customerId = localStorage.getItem('customerId')
      const responseObject = await axios.get(
        `http://203.122.46.189:8061/customer/api/profile/v1/all-docs`,{params:{customerId}}
      )
      console.log('All documents', responseObject)
      responseObject.data.docList.map((doc) => {
        switch (doc.documentTypeId) {
          case '1000000036':
            // setPan((prevState) => ({ ...prevState, doc }))
            // setPan({ ...doc })
            getPanAndAadhar(doc)
            break
          case '1000000044':
            // setBankStatement((prevState) => ({ ...prevState, doc }))
            setBankStatement({ ...doc })
            break
          case '1000000043':
            // setSalarySlips((prevState) => ({ ...prevState, doc }))
            // setSalarySlips({ ...doc })
            getSalarySlipAndForm16(doc)
            break
          case '1000000037':
            // setBill((prevState) => ({ ...prevState, doc }))
            // setBill({ ...doc })
            getRentAgreementAndBill(doc)
            break
          default:
            break
        }
      })
      console.log('all doc', pan, bankStatement)
      calculate(responseObject.data.docList)
    } catch (err) {
      console.log(err)
    }
  }

  const fileExtention = (fileType) => {
    const fileTypeArray = fileType.split('/')
    return fileTypeArray[1]
  }

  const aadhaarChangeHandler = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    const docBytes = await fileToByteArray(file)
    const documentExtension = fileExtention(file.type)
    const requestBody = {
      documentNo: aadhaar.documentNo,
      documentTypeId: aadhaar.documentTypeId,
      docBytes,
      documentName: file.name,
      documentExtension,
    }
    const uploadStatus = await uploadDocument(requestBody)
    setAadhaar((prevState) => ({
      ...prevState,
      uploadStatus,
      documentName: file.name,
    }))
  }

  const panChangeHandler = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    const docBytes = await fileToByteArray(file)
    const documentExtension = fileExtention(file.type)
    const requestBody = {
      documentNo: pan.documentNo,
      documentTypeId: pan.documentTypeId,
      docBytes,
      documentName: file.name,
      documentExtension,
    }
    console.log(requestBody)
    const uploadStatus = await uploadDocument(requestBody)
    setPan((prevState) => ({
      ...prevState,
      uploadStatus,
      documentName: file.name,
    }))
  }

  const bankStatementChangeHandler = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    const docBytes = await fileToByteArray(file)
    const documentExtension = fileExtention(file.type)
    const requestBody = {
      documentNo: bankStatement.documentNo,
      documentTypeId: bankStatement.documentTypeId,
      docBytes,
      documentName: file.name,
      documentExtension,
    }
    const uploadStatus = await uploadDocument(requestBody)
    setBankStatement((prevState) => ({
      ...prevState,
      uploadStatus,
      documentName: file.name,
    }))
  }

  const salarySlipChangeHandler = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    const docBytes = await fileToByteArray(file)
    const documentExtension = fileExtention(file.type)
    const requestBody = {
      documentNo: salarySlips.documentNo,
      documentTypeId: salarySlips.documentTypeId,
      docBytes,
      documentName: file.name,
      documentExtension,
    }
    const uploadStatus = await uploadDocument(requestBody)
    setSalarySlips((prevState) => ({
      ...prevState,
      uploadStatus,
      documentName: file.name,
    }))
  }

  const form16ChangeHandler = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    const docBytes = await fileToByteArray(file)
    const documentExtension = fileExtention(file.type)
    const requestBody = {
      documentNo: form16.documentNo,
      documentTypeId: form16.documentTypeId,
      docBytes,
      documentName: file.name,
      documentExtension,
    }
    const uploadStatus = await uploadDocument(requestBody)
    setForm16((prevState) => ({
      ...prevState,
      uploadStatus,
      documentName: file.name,
    }))
  }

  const rentAgreementChangeHandler = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    const docBytes = await fileToByteArray(file)
    const documentExtension = fileExtention(file.type)
    const requestBody = {
      documentNo: rentAgreement.documentNo,
      documentTypeId: rentAgreement.documentTypeId,
      docBytes,
      documentName: file.name,
      documentExtension,
    }
    const uploadStatus = await uploadDocument(requestBody)
    setRentAgreement((prevState) => ({
      ...prevState,
      uploadStatus,
      documentName: file.name,
    }))
  }

  const billChangeHandler = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    const docBytes = await fileToByteArray(file)
    const documentExtension = fileExtention(file.type)

    // setBill((prevState) => ({
    //   ...prevState,
    //   docBytes,
    //   documentName: file.name,
    //   documentExtension: file.type,
    // }))

    const requestBody = {
      documentNo: bill.documentNo,
      documentTypeId: bill.documentTypeId,
      docBytes,
      documentName: file.name,
      documentExtension,
    }
    const uploadStatus = await uploadDocument(requestBody)
    setBill((prevState) => ({
      ...prevState,
      uploadStatus,
      documentName: file.name,
    }))
  }

  const uploadDocument = async (body) => {
    try {
      const customerId = localStorage.getItem('customerId')
      const responseObject = await axios.post(
        'http://203.122.46.189:8060/customer/api/profile/v1/doc-upload',
        {
          ...body,
          customerId: customerId 
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

  // console.log({
  //   aadhaar,
  //   pan,
  //   bankStatement,
  //   salarySlips,
  //   form16,
  //   rentAgreement,
  //   bill,
  // })

  const calculate = (fields) => {
    let progress = 0
    fields.map((field) => {
      if (field) {
        progress += 1
      }
    })
    setDocumentProgress(progress)
  }

  return (
    <form>
      <div className="documents-wrapper">
        <div className="docs-container">
          <span>Identity Proof</span>
          <div className="identity-options col-span">
            <div className="options">
              <h5>Aadhaar Card</h5>
              <div>
                <label>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22a5.86 5.86 0 01-6-5.7V6.13A4.24 4.24 0 0110.33 2a4.24 4.24 0 014.34 4.13v10.18a2.67 2.67 0 01-5.33 0V6.92a1 1 0 012 0v9.39a.67.67 0 001.33 0V6.13A2.25 2.25 0 0010.33 4 2.25 2.25 0 008 6.13V16.3a3.86 3.86 0 004 3.7 3.86 3.86 0 004-3.7V6.13a1 1 0 012 0V16.3a5.86 5.86 0 01-6 5.7z"
                      fill="#fff"
                    ></path>
                  </svg>
                  <input
                    type="file"
                    onChange={aadhaarChangeHandler}
                    style={{ display: 'none' }}
                  />
                </label>
                <h6>{aadhaar?.documentName}</h6>
              </div>
              <span>{aadhaar.uploadStatus}</span>
            </div>
          </div>
          <div className="identity-options">
            <div className="options">
              <h5>PAN Card</h5>
              <div>
                <label>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22a5.86 5.86 0 01-6-5.7V6.13A4.24 4.24 0 0110.33 2a4.24 4.24 0 014.34 4.13v10.18a2.67 2.67 0 01-5.33 0V6.92a1 1 0 012 0v9.39a.67.67 0 001.33 0V6.13A2.25 2.25 0 0010.33 4 2.25 2.25 0 008 6.13V16.3a3.86 3.86 0 004 3.7 3.86 3.86 0 004-3.7V6.13a1 1 0 012 0V16.3a5.86 5.86 0 01-6 5.7z"
                      fill="#fff"
                    ></path>
                  </svg>
                  <input
                    type="file"
                    onChange={panChangeHandler}
                    style={{ display: 'none' }}
                  />
                </label>
                <h6>{pan?.documentName}</h6>
              </div>
              <span>{pan.uploadStatus}</span>
            </div>
          </div>
        </div>

        <div className="docs-container">
          <span>Income Proof</span>
          <div className="identity-options col-span">
            <div className="options">
              <h5>Bank Statements</h5>
              <div>
                <label>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22a5.86 5.86 0 01-6-5.7V6.13A4.24 4.24 0 0110.33 2a4.24 4.24 0 014.34 4.13v10.18a2.67 2.67 0 01-5.33 0V6.92a1 1 0 012 0v9.39a.67.67 0 001.33 0V6.13A2.25 2.25 0 0010.33 4 2.25 2.25 0 008 6.13V16.3a3.86 3.86 0 004 3.7 3.86 3.86 0 004-3.7V6.13a1 1 0 012 0V16.3a5.86 5.86 0 01-6 5.7z"
                      fill="#fff"
                    ></path>
                  </svg>
                  <input
                    type="file"
                    onChange={bankStatementChangeHandler}
                    style={{ display: 'none' }}
                  />
                </label>
                <h6>{bankStatement?.documentName}</h6>
              </div>
              <span>{bankStatement.uploadStatus}</span>
            </div>
          </div>
          <div className="identity-options">
            <div className="options">
              <h5>Salary Slips</h5>
              <div>
                <label>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22a5.86 5.86 0 01-6-5.7V6.13A4.24 4.24 0 0110.33 2a4.24 4.24 0 014.34 4.13v10.18a2.67 2.67 0 01-5.33 0V6.92a1 1 0 012 0v9.39a.67.67 0 001.33 0V6.13A2.25 2.25 0 0010.33 4 2.25 2.25 0 008 6.13V16.3a3.86 3.86 0 004 3.7 3.86 3.86 0 004-3.7V6.13a1 1 0 012 0V16.3a5.86 5.86 0 01-6 5.7z"
                      fill="#fff"
                    ></path>
                  </svg>
                  <input
                    type="file"
                    onChange={salarySlipChangeHandler}
                    style={{ display: 'none' }}
                  />
                </label>
                <h6>{salarySlips?.documentName}</h6>
              </div>
              <span>{salarySlips.uploadStatus}</span>
            </div>
          </div>
          <div className="identity-options">
            <div className="options">
              <h5>Form 16 / 26AS / ITR</h5>
              <div>
                <label>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22a5.86 5.86 0 01-6-5.7V6.13A4.24 4.24 0 0110.33 2a4.24 4.24 0 014.34 4.13v10.18a2.67 2.67 0 01-5.33 0V6.92a1 1 0 012 0v9.39a.67.67 0 001.33 0V6.13A2.25 2.25 0 0010.33 4 2.25 2.25 0 008 6.13V16.3a3.86 3.86 0 004 3.7 3.86 3.86 0 004-3.7V6.13a1 1 0 012 0V16.3a5.86 5.86 0 01-6 5.7z"
                      fill="#fff"
                    ></path>
                  </svg>
                  <input
                    type="file"
                    onChange={form16ChangeHandler}
                    style={{ display: 'none' }}
                  />
                </label>
                <h6>{form16?.documentName}</h6>
              </div>
              <span>{form16.uploadStatus}</span>
            </div>
          </div>
        </div>

        <div className="docs-container">
          <span>Address Proof</span>
          <div className="identity-options col-span">
            <div className="options">
              <h5>Rent Agreement</h5>
              <div>
                <label>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22a5.86 5.86 0 01-6-5.7V6.13A4.24 4.24 0 0110.33 2a4.24 4.24 0 014.34 4.13v10.18a2.67 2.67 0 01-5.33 0V6.92a1 1 0 012 0v9.39a.67.67 0 001.33 0V6.13A2.25 2.25 0 0010.33 4 2.25 2.25 0 008 6.13V16.3a3.86 3.86 0 004 3.7 3.86 3.86 0 004-3.7V6.13a1 1 0 012 0V16.3a5.86 5.86 0 01-6 5.7z"
                      fill="#fff"
                    ></path>
                  </svg>
                  <input
                    type="file"
                    onChange={rentAgreementChangeHandler}
                    style={{ display: 'none' }}
                  />
                </label>
                <h6>{rentAgreement?.documentName}</h6>
              </div>
              <span>{rentAgreement.uploadStatus}</span>
            </div>
          </div>
          <div className="identity-options">
            <div className="options">
              <h5>Electricity / Water / Telephone / Utility Bill</h5>
              <div>
                <label>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22a5.86 5.86 0 01-6-5.7V6.13A4.24 4.24 0 0110.33 2a4.24 4.24 0 014.34 4.13v10.18a2.67 2.67 0 01-5.33 0V6.92a1 1 0 012 0v9.39a.67.67 0 001.33 0V6.13A2.25 2.25 0 0010.33 4 2.25 2.25 0 008 6.13V16.3a3.86 3.86 0 004 3.7 3.86 3.86 0 004-3.7V6.13a1 1 0 012 0V16.3a5.86 5.86 0 01-6 5.7z"
                      fill="#fff"
                    ></path>
                  </svg>
                  <input
                    type="file"
                    onChange={billChangeHandler}
                    style={{ display: 'none' }}
                  />
                </label>
                <h6>{bill?.documentName}</h6>
              </div>
              <span>{bill.uploadStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Documents
