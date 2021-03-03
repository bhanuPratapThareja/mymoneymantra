import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import CreditScore from'./credit-score';
const CreditScoreBanner = ({ accountHistory, score }) => {
  const [data, setData] = useState([])
  const [label, setLabel] = useState([])

  useEffect(() => {
    const chartData = []
    const chartLabel = []
    accountHistory?.forEach((item) => {
      chartData.push(item.score)
      chartLabel.push(item.date)
    })
    setData(chartData)
    setLabel(chartLabel)
  }, [accountHistory])
  return (
    <section
      data-aos="fade-up"
      className="container banner new-credit-wrap aos-init aos-animate"
    >
      <div className="creditScore-wrapper">
        <div className="creditScore-wrapper-left">
          <div>
            <h2>Your Credit Score</h2>
            <img
              className="underline-img"
              src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/underline.png"
              alt=""
            />
          </div>
          <div className="score-scale-img">
          <div className="cp-score-custom">{score}</div>
            <CreditScore></CreditScore>
          </div>
        </div>
        <div className="creditScore-wrapper-right">
          <div>
            <h2>Your Credit Score History</h2>
            <img
              className="underline-img"
              src="https://the1thing.github.io/MyMoneyMantra/build/images/CP_profile/underline.png"
              alt=""
            />
          </div>
          <div className="score-graph-img">
            {accountHistory && data.length > 0 && label.length > 0 && (
              <Line
                data={{
                  labels: label,
                  datasets: [
                    {
                      label: 'Credit Score History',
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: 'rgba(75,192,192,0.4)',
                      borderColor: 'rgba(75,192,192,1)',
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: 'rgba(75,192,192,1)',
                      pointBackgroundColor: '#fff',
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                      pointHoverBorderColor: 'rgba(220,220,220,1)',
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: data,
                    },
                  ],
                }}
                width={425}
                height={239}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    yAxes: [
                      {
                        stacked: true,
                      },
                    ],
                    xAxes: [
                      {
                        stacked: true,
                      },
                    ],
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreditScoreBanner
