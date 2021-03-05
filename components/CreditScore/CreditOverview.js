import { useEffect, useState } from 'react'
import { getFormattedCurrency } from '../../utils/formattedCurrency'
import DoughnutChart from './DoughnutChart'



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
          
          
          <div className="creditOverview-wrapper-left-content desktop-overrview-wrapper">
            {props.overview && props.overview.length ? (
              props.overview.map((item, index) => (
                <div className="creditOverview-components">
                  <div
                    style={{ backgroundColor: `${customColor[index]}` }}
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
        <div className="creditOverview-wrapper-left-icon">
            <div className="three-holder">
              <DoughnutChart overview={props?.overview} colors={customColor} />
              
            </div>
        </div>
        <div className="creditOverview-wrapper-left-content mobile-overrview-wrapper">
        {props.overview && props.overview.length ? (
          props.overview.map((item, index) => (
            <div className="creditOverview-components">
              <div
                style={{ backgroundColor: `${customColor[index]}` }}
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
    </section>
  )
}

const customColor=[
  'blue',
  'red',
  'green',
  'orange',
  'violet',
  'black',
  'indigo',
  'yellow',
  'magenta',
  'aquamarine',
  'crimson'
]

export default CreditOverview
