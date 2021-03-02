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
const DoughnutChart = ({ overview,colors }) => {
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
    <div style={{position: 'relative', width:'512px'}}>
      <Doughnut
        data={{
          labels: label,
          datasets: [
            {
              data:  data,
              backgroundColor: colors,
              hoverBackgroundColor: colors,
            },
          ],
        }}
        options={{
          legend: {
            display: false,
          },
          aspectRatio:1,
          cutoutPercentage:70,
          responsiveAnimationDuration:2,
          maintainAspectRatio: true,
          responsive: true,
          showLines:true,
          title:{
            display:false
          }
        }}
      />
    </div>
  )
}

export default DoughnutChart
