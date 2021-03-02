import { useState, useEffect } from 'react'
import axios from 'axios'

import { getWorkInfo } from '../../utils/userProfileService'
import { getApiData } from '../../api/api'
import {
  getFormattedCurrency,
  getWholeNumberFromCurrency,
} from '../../utils/formattedCurrency'

const WorkInfo = (props) => {
  const [isedit, setIsedit] = useState(false)
  const [employedType, setEmployedType] = useState('')
  const [companyQuery, setCompanyQuery] = useState('')
  const [bankId, setBankId] = useState('')
  const [ifscCode, setIfscCode] = useState(null)
  const [netMonthlyIncome, setNetMonthlyIncome] = useState(null)
  const [accountNo, setAccountNo] = useState(null)
  const [companyOptions, setCompanyOtions] = useState([])
  const [companyId, setCompanyId] = useState('')
  const [companyName, setCompanyName] = useState(null)
  const [customerId, setCustomerId] = useState('')
  const [bankName, setBankName] = useState(null)
  const [bankList, setBankList] = useState([])

  const { setWorkInfoProgress } = props

  useEffect(() => {
    console.log(props.data)
    getWork()
  }, [])

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (companyQuery) {
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
        let formattedIncome = getFormattedCurrency(netMonthlyIncome.toString())
        setBankName(bankName)
        setCustomerId(customerId)
        setCompanyId(companyId)
        setEmployedType(employedType)
        setNetMonthlyIncome(formattedIncome)
        setBankId(bankId)
        setAccountNo(accountNo)
        setIfscCode(ifscCode)
        setCompanyName(companyName)
        // setCompanyQuery(companyName)
        // calculateSectionProgress()
        calculate(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {})
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsedit(false)
    let custId = localStorage.getItem('customerId')
    const { url } = getApiData('workProfile')
    try {
      const responseObject = await axios.post(url, {
        bankName,
        customerId: custId,
        companyId,
        bankId,
        netMonthlyIncome: getWholeNumberFromCurrency(netMonthlyIncome),
        accountNo,
        employedType,
        ifscCode,
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
  const handleBankChange = (e) => {
    let allBanks = props.data
    let inputValue = e.target.value
    let filteredBanks = []
    setBankName(inputValue)
    if (!inputValue.length) {
      setBankList([])
      return
    }
    allBanks.forEach((bank, i) => {
      if (bank.bank_name.toLowerCase().includes(inputValue.toLowerCase())) {
        filteredBanks.push(bank)
      }
    })
    setBankList(filteredBanks)
  }

  const onSelectBank = (bank) => {
    setBankName(bank.bank_name)
    setBankId(bank.bank_id)
    setBankList([])
  }

  const handleIncomeChange = (e) => {
    let { value } = e.target
    value = value.toString()
    const numString = getWholeNumberFromCurrency(value)
    if (isNaN(numString)) {
      return
    }
    value = getFormattedCurrency(value)
    setNetMonthlyIncome(value)
  }

  const calculate = (fields) => {
    let progress = 0
    Object.keys(fields).map((field) => {
      if (fields[field]) {
        progress += 1
      }
    })
    setWorkInfoProgress(progress)
  }

  return (
    <form className="work-wrapper" onSubmit={submitHandler} autocomplete="off">
      {/* <div className="shortforms-container"> */}
      {isedit ? <h5>Employment Type</h5> : null}
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
            <input autocomplete="off"
              value="1000000001"
              className="lets-checkbox"
              type="radio"
              id="self-employed"
              autocomplete="off"
              name="emp-type"
              required=""
              onChange={(e) => setEmployedType(e.target.value)}
              defaultChecked={employedType == 1000000001 ? true : false}
            />
            <input autocomplete="off"
              value="1000000002"
              className="lets-checkbox"
              type="radio"
              id="self-employed-professional"
              name="emp-type"
              required=""
              autocomplete="off"
              onChange={(e) => setEmployedType(e.target.value)}
              defaultChecked={employedType == 1000000002 ? true : false}
            />
            <input autocomplete="off"
              value="1000000004"
              className="lets-checkbox"
              type="radio"
              id="salaried"
              name="emp-type"
              autocomplete="off"
              required=""
              onChange={(e) => setEmployedType(e.target.value)}
              defaultChecked={employedType == 1000000004 ? true : false}
            />
            <input autocomplete="off"
              value="1000000008"
              className="lets-checkbox"
              type="radio"
              id="defense"
              name="emp-type"
              required=""
              autocomplete="off"
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
            <input autocomplete="off"
              readOnly={true}
              autocomplete="off"
              placeholder="Employment Type"
              value={
                employedType == 1000000001
                  ? 'Self Employed'
                  : employedType == 1000000002
                  ? 'Self Employed Professional'
                  : employedType == 1000000004
                  ? 'Salaried'
                  : employedType == 1000000008
                  ? 'Defense'
                  : null
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
          <input autocomplete="off"
            readOnly={!isedit}
            className="form__field"
            type="text"
            autocomplete="off"
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
          <input autocomplete="off"
            readOnly={!isedit}
            className="form__field"
            type="text"
            autocomplete="off"
            value={netMonthlyIncome}
            id="monthly-income"
            placeholder="Net Monthly Income"
            required=""
            onChange={handleIncomeChange}
            // onChange={(e) => setNetMonthlyIncome(e.target.value)}
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
          
          <input autocomplete="off"
            readOnly={!isedit}
            className="form__field"
            type="text"
            id="bank-name"
            autocomplete="off"
            placeholder="Bank Name"
            required=""
            value={bankName ? bankName: null}
            onChange={handleBankChange}
          /><label className="form__label" htmlFor="bank-name">
          Bank Name
        </label>

          {isedit && bankList.length ? (
            <datalist style={{ display: 'block', background: '#fff' }}>
              {bankList.map((bank, i) => (
                <option
                  key={i}
                  value={bank.bank_id}
                  onClick={() => onSelectBank(bank)}
                >
                  {bank.bank_name}
                </option>
              ))}
            </datalist>
          ) : null}
          {/* <select
            readOnly={!isedit}
            className="form__field"
            type="text"
            value={bankId}
            id="bank-name"
            placeholder="Bank Name"
            required=""
            onChange={(e) => setBankId(e.target.value)}
          >
            {props.data.map((item) => (
              <option key={item.bank_id} value={item.bank_id}>
                {item.bank_name}
              </option>
            ))}
          </select> */}
        </div>
        <div
          className={
            isedit
              ? 'form__group field edit-part'
              : 'form__group field read-part'
          }
        >
          <input autocomplete="off"
            readOnly={!isedit}
            className="form__field"
            type="text"
            autocomplete="off"
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
          <input autocomplete="off"
            readOnly={!isedit}
            className="form__field"
            type="text"
            value={ifscCode}
            id="ifsc"
            autocomplete="off"
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

      {!isedit ? (
        <button
          type="button"
          id="edit-work"
          className="edit-button"
          onClick={() => setIsedit(!isedit)}
        >
          Edit
        </button>
      ) : null}
    </form>
  )
}

export default WorkInfo
