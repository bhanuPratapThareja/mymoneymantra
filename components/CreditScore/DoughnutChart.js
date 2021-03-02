import { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
// const data = {
//   labels: ['Red', 'Green', 'Yellow'],
//   datasets: [
//     {
//       data: [300, 50, 100],
//       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//       hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//     },
//   ],
// }
const DoughnutChart = ({ overview }) => {
  const [data, setData] = useState([])
  const [label, setLabel] = useState([])
  useEffect(() => {
    const chartData = []
    const chartLabel = []
    overview?.forEach((item) => {
      if (item.productPercent) {
        chartData.push(item.productPercent)
      }
      chartLabel.push(item.productType)
    })
    setData(chartData)
    setLabel(chartLabel)
  }, [overview])
  return (
    <div>
      <Doughnut
        data={{
          labels: label,
          datasets: [
            {
              data: data.length > 0 ? data : [60, 40],
              backgroundColor: ['#3080CF', '#F03535'],
              hoverBackgroundColor: ['#3080CF', '#F03535'],
            },
          ],
        }}
        options={{
          legend: {
            display: false,
          },
          maintainAspectRatio: true,
          responsive: true,
        }}
      />
    </div>
  )
}

export default DoughnutChart
