import { useRef, useState } from 'react'

const Documents = () => {
  const [aadhaar, setAadhaar] = useState(null)
  const [pan, setPan] = useState(null)
  const [bankStatement, setBankStatement] = useState(null)
  const [salarySlips, setSalarySlips] = useState(null)
  const [form16, setForm16] = useState(null)
  const [rentAgreement, setRentAgreement] = useState(null)
  const [bill, setBill] = useState(null)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  console.log({ aadhaar })

  return (
    <form onSubmit={submitHandler}>
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
                    onChange={(e) => setAadhaar(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </label>
                <h6>{aadhaar?.name}</h6>
              </div>
              <span>uploaded successfully</span>
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
                    onChange={(e) => setPan(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </label>
                <h6>{pan?.name}</h6>
              </div>
              <span className="error">please upload a .jpeg/pdf file</span>
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
                    onChange={(e) => setBankStatement(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </label>
                <h6>{bankStatement?.name}</h6>
              </div>
              <span>uploaded successfully</span>
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
                    name={salarySlips?.filename}
                    onChange={(e) => setSalarySlips(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </label>
                <h6>{salarySlips?.name}</h6>
              </div>
              <span>uploaded successfully</span>
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
                    name={form16?.filename}
                    onChange={(e) => setForm16(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </label>
                <h6>{form16?.name}</h6>
              </div>
              <span>uploaded successfully</span>
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
                    name={rentAgreement?.filename}
                    onChange={(e) => setRentAgreement(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </label>
                <h6>{rentAgreement?.name}</h6>
              </div>
              <span>uploaded successfully</span>
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
                    name={bill?.filename}
                    onChange={(e) => setBill(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </label>
                <h6>{bill?.name}</h6>
              </div>
              <span>uploaded successfully</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Documents
