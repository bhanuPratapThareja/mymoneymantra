import { useEffect, useState } from 'react'
import { getFormattedCurrency } from '../../utils/formattedCurrency'
import DoughnutChart from './DoughnutChart'

const defaultColor = ['#3080CF', '#F03535', '#56AB2F']

const CreditOverview = (props) => {
  const [data, setData] = useState([])
  const [label, setLabel] = useState([])
  useEffect(() => {
    const chartData = []
    const chartLabel = []
    props.overview?.forEach((item, index) => {
      chartData.push(item.productPercent)
      chartLabel.push(item.productType)
    })
    setData(chartData)
    setLabel(chartLabel)
  }, [props])
  return (
    <section
      data-aos="fade-up"
      className="container creditOverview aos-init aos-animate"
    >
      <div className="creditOverview-head">
        <h2>Credit Overview</h2>
      </div>
      <div className="creditOverview-wrapper">
        <div className="creditOverview-wrapper-left">
          <div className="creditOverview-wrapper-left-head">
            <h3>Total Current Credit</h3>
            <h2>{getFormattedCurrency(props.totalScore)}</h2>
            <hr />
          </div>
          <div className="creditOverview-wrapper-left-icon">
            <div className="three-holder">
              <DoughnutChart overview={props?.overview} />
              {/* <div className="blue">
                <h2>60,000</h2>
              </div>
              <div className="green">
                <h3>35,000</h3>
              </div>
              <div className="red">
                <h6>5,000</h6>
              </div> */}
            </div>
          </div>
          <div className="creditOverview-wrapper-left-content">
            {props.overview && props.overview.length ? (
              props.overview.map((item, index) => (
                <div className="creditOverview-components">
                  <div
                    style={{ backgroundColor: `${defaultColor[index]}` }}
                    className="color-box"
                  ></div>
                  <p className="sector">{item.productType} -</p>
                  <p className="percentages">{item.productPercent}%</p>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreditOverview
