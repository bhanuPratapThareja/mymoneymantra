import { arc } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { format } from 'd3-format'

const ScoreGauge = ({ value = 50, min = 300, max = 900, label, units }) => {
  const backgroundArc = arc()
    .innerRadius(0.85)
    .outerRadius(1)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2)
    .cornerRadius(1)()

  const percentScale = scaleLinear().domain([min, max]).range([0, 1])
  const percent = percentScale(value)

  const angleScale = scaleLinear()
    .domain([0, 1])
    .range([-Math.PI / 2, Math.PI / 2])
    .clamp(true)

  const angle = angleScale(percent)

  const filledArc = arc()
    .innerRadius(0.85)
    .outerRadius(1)
    .startAngle(-Math.PI / 2)
    .endAngle(angle)
    .cornerRadius(1)()

  const colorScale = scaleLinear().domain([0, 1]).range(['#DC3737', '#89C142'])

  const gradientSteps = colorScale.ticks(10).map((value) => colorScale(value))

  const markerLocation = getCoordsOnArc(angle, 1 - (1 - 0.85) / 2)

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <svg
        style={{ overflow: 'visible' }}
        width="15em"
        viewBox={[-1, -1, 2, 1].join(' ')}
      >
        <defs>
          <linearGradient
            id="Gauge__gradient"
            gradientUnits="userSpaceOnUse"
            x1="-1"
            x2="1"
            y2="0"
          >
            {gradientSteps.map((color, index) => (
              <stop
                key={color}
                stopColor={color}
                offset={`${index / (gradientSteps.length - 1)}`}
              />
            ))}
          </linearGradient>
        </defs>
        <path d={backgroundArc} fill="#dbdbe7" />
        <path d={filledArc} fill="url(#Gauge__gradient)" />
        <circle
          cx={markerLocation[0]}
          cy={markerLocation[1]}
          r="0.1"
          stroke="#2c3e50"
          strokeWidth="0.01"
          fill={colorScale(percent)}
        />
        <path
          d="M21.6911 3.77757C22.4838 3.89316 22.8248 4.84719 22.2827 5.43278L8.80793 19.9889C8.30126 20.5363 7.3907 20.3485 7.13919 19.6448L0.909865 2.21553C0.65836 1.51184 1.24612 0.796451 1.98701 0.904483L21.6911 3.77757Z"
          fill="#5B5B5B"
          transform={`rotate(${
            angle * (180 / Math.PI)
          }) translate(-0.2, -0.33)`}
          fill="#6a6a85"
        />
      </svg>

      <div
        style={{
          marginTop: '0.4em',
          fontSize: '3em',
          lineHeight: '1em',
          fontWeight: '900',
          fontFeatureSettings: "'zero', 'tnum' 1",
        }}
      >
        {format(',')(value)}
      </div>

      {!!label && (
        <div
          style={{
            color: '#8b8ba7',
            marginTop: '0.6em',
            fontSize: '1.3em',
            lineHeight: '1.3em',
            fontWeight: '700',
          }}
        >
          {label}
        </div>
      )}

      {!!units && (
        <div
          style={{
            color: '#8b8ba7',
            lineHeight: '1.3em',
            fontWeight: '300',
          }}
        >
          {units}
        </div>
      )}
    </div>
  )
}

const getCoordsOnArc = (angle, offset = 10) => [
  Math.cos(angle - Math.PI / 2) * offset,
  Math.sin(angle - Math.PI / 2) * offset,
]

export default ScoreGauge
