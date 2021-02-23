import { useState, useEffect } from 'react'
import axios from 'axios'

import { getWorkInfo } from '../../utils/userProfileService'
import { getApiData } from '../../api/api'

const WorkInfo = (props) => {
  const [isedit, setIsedit] = useState(false)
  const [employedType, setEmployedType] = useState('')
  const [companyQuery, setCompanyQuery] = useState('')
  const [bankId, setBankId] = useState('')
  const [ifscCode, setIfscCode] = useState('')
  const [netMonthlyIncome, setNetMonthlyIncome] = useState('')
  const [accountNo, setAccountNo] = useState('')
  const [companyOptions, setCompanyOtions] = useState([])
  const [companyId, setCompanyId] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [bankName, setBankName] = useState('')

  useEffect(() => {
    console.log(props.data)
    getWork()
  }, [])

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (companyQuery.length > 0) {
        try {
          const { url, body } = getApiData('company')
          body.name = companyQuery
          const responseObject = await axios.post(url, body)
          const { data } = responseObject
          console.log({ responseObject })
          setCompanyOtions(data?.companyMaster)
        } catch (err) {
          console.log(err)
        }
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [companyQuery])

  const getWork = () => {
    getWorkInfo()
      .then((res) => {
        console.log({ res })
        const {
          employedType,
          companyId,
          netMonthlyIncome,
          bankId,
          accountNo,
          ifscCode,
          companyName,
          customerId,
          bankName,
        } = { ...res }
        setBankName(bankName)
        setCustomerId(customerId)
        setCompanyId(companyId)
        setEmployedType(employedType)
        setNetMonthlyIncome(netMonthlyIncome)
        setBankId(bankId)
        setAccountNo(accountNo)
        setIfscCode(ifscCode)
        setCompanyName(companyName)
        setCompanyQuery(companyName)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {})
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsedit(false)
    const { url } = getApiData('workProfile')
    try {
      const responseObject = await axios.post(url, {
        bankName,
        customerId,
        companyId,
        bankId,
        netMonthlyIncome,
        accountNo,
        employedType,
      })
      if (responseObject.status === 200) {
        getWork()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const selectCompanyId = (id, name) => {
    setCompanyId(id)
    setCompanyName(name)
    setCompanyOtions([])
    setCompanyQuery('')
  }

  const companyNameChangeHandler = (e) => {
    setCompanyName(e.target.value)
    setCompanyQuery(e.target.value)
  }

  return (
    <form className="work-wrapper" onSubmit={submitHandler}>
      {/* <div className="shortforms-container"> */}
      <h5>Employment Type</h5>
      <div className="shortforms-container">
        {/* <div
          className={
            isedit
              ? 'form__group field edit-part'
              : 'form__group field read-part'
          }
        >
          <select
            readOnly={!isedit}
            className="form__field"
            type="text"
            value={employedType}
            id="emp-type"
            placeholder="Employment Type"
            required=""
            onChange={(e) => setEmployedType(e.target.value)}
          >
            <option value={1000000001}>Self Employed</option>
            <option value={1000000002}>Self Employed Professional</option>
            <option value={1000000004}>Salaried</option>
            <option value={1000000008}>Defense</option>
            <label className="form__label" htmlFor="emp-type">
              Employment Type
            </label>
          </select>
        </div> */}
        {isedit ? (
          <div className="shortforms-container gender-style">
            <input
              value="1000000001"
              className="lets-checkbox"
              type="radio"
              id="self-employed"
              name="emp-type"
              required=""
              onChange={(e) => setEmployedType(e.target.value)}
              defaultChecked={employedType == 1000000001 ? true : false}
            />
            <input
              value="1000000002"
              className="lets-checkbox"
              type="radio"
              id="self-employed-professional"
              name="emp-type"
              required=""
              onChange={(e) => setEmployedType(e.target.value)}
              defaultChecked={employedType == 1000000002 ? true : false}
            />
            <input
              value="1000000004"
              className="lets-checkbox"
              type="radio"
              id="salaried"
              name="emp-type"
              required=""
              onChange={(e) => setEmployedType(e.target.value)}
              defaultChecked={employedType == 1000000004 ? true : false}
            />
            <input
              value="1000000008"
              className="lets-checkbox"
              type="radio"
              id="defense"
              name="emp-type"
              required=""
              onChange={(e) => setEmployedType(e.target.value)}
              defaultChecked={employedType == 1000000008 ? true : false}
            />
            <label htmlFor="self-employed">Self Employed</label>
            <label htmlFor="self-employed-professional">
              Self Employed Professional
            </label>
            <label htmlFor="salaried">Salaried</label>
            <label htmlFor="defense">Defense</label>
          </div>
        ) : (
          <div className="form__group field">
            <input
              readOnly={true}
              value={
                employedType == 1000000001
                  ? 'Self Employed'
                  : employedType == 1000000002
                  ? 'Self Employed Professional'
                  : employedType == 1000000004
                  ? 'Salaried'
                  : 'Defense'
              }
              className="form__field"
              type="text"
              id="emp-type"
              name="emp-type"
              required=""
            />
            <label className="form__label" htmlFor="emp-type">
              Employment Type
            </label>
          </div>
        )}
        {/* <div className="shortforms-container"> */}
        <div
          className={
            isedit
              ? 'form__group field edit-part'
              : 'form__group field read-part'
          }
        >
          <input
            readOnly={!isedit}
            className="form__field"
            type="text"
            value={companyName}
            id="company-name"
            placeholder="Company Name"
            required=""
            onChange={companyNameChangeHandler}
          />
          <label className="form__label" htmlFor="company-name">
            Company Name
          </label>
          {isedit && companyOptions.length > 0 && companyQuery.length > 0 && (
            <datalist
              id="company-name"
              style={{ display: 'block', background: '#fff' }}
            >
              {isedit &&
                companyOptions.length > 0 &&
                companyQuery.length > 0 &&
                companyOptions.map((item) => (
                  <option
                    key={item.caseCompanyId}
                    value={item.caseCompanyId}
                    onClick={() =>
                      selectCompanyId(item.caseCompanyId, item.companyName)
                    }
                  >
                    {item.companyName}
                  </option>
                ))}
            </datalist>
          )}
        </div>
        <div
          className={
            isedit
              ? 'form__group field edit-part'
              : 'form__group field read-part'
          }
        >
          <input
            readOnly={!isedit}
            className="form__field"
            type="text"
            value={netMonthlyIncome}
            id="monthly-income"
            placeholder="Net Monthly Income"
            required=""
            onChange={(e) => setNetMonthlyIncome(e.target.value)}
          />
          <label className="form__label" htmlFor="monthly-income">
            Net Monthly Income
          </label>
        </div>
        <div
          className={
            isedit
              ? 'form__group field edit-part'
              : 'form__group field read-part'
          }
        >
          <select
            readOnly={!isedit}
            className="form__field"
            type="text"
            value={bankId}
            id="bank-name"
            placeholder="Bank Name"
            required=""
            onChange={(e) => setBankId(e.target.value)}
          >
            <label className="form__label" htmlFor="bank-name">
              Bank Name
            </label>
            {props.data.map((item) => (
              <option key={item.bank_id} value={item.bank_id}>
                {item.bank_name}
              </option>
            ))}
          </select>
        </div>
        <div
          className={
            isedit
              ? 'form__group field edit-part'
              : 'form__group field read-part'
          }
        >
          <input
            readOnly={!isedit}
            className="form__field"
            type="text"
            value={accountNo}
            id="account-num"
            placeholder="Account Number"
            required=""
            onChange={(e) => setAccountNo(e.target.value)}
          />
          <label className="form__label" htmlFor="account-num">
            Account Number
          </label>
        </div>
        <div
          className={
            isedit
              ? 'form__group field edit-part'
              : 'form__group field read-part'
          }
        >
          <input
            readOnly={!isedit}
            className="form__field"
            type="text"
            value={ifscCode}
            id="ifsc"
            placeholder="IFSC Code"
            required=""
            onChange={(e) => setIfscCode(e.target.value)}
          />
          <label className="form__label" htmlFor="ifsc">
            IFSC Code
          </label>
        </div>
        {/* </div> */}
      </div>

      <div
        className="save-options"
        style={{ display: isedit ? 'flex' : 'none' }}
      >
        <button type="submit" className="save-work" id="save-work">
          Save
        </button>
        <button
          type="button"
          className="cancel"
          id="cancel"
          onClick={() => setIsedit(!isedit)}
        >
          Cancel
        </button>
      </div>

      <button
        type="button"
        id="edit-work"
        className="edit-button"
        onClick={() => setIsedit(!isedit)}
      >
        Edit
      </button>
    </form>
  )
}

export default WorkInfo
