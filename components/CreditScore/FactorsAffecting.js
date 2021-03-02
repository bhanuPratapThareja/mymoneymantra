import Link from 'next/link'
import { useRouter } from 'next/router'
const FactorsAffecting = () => {
  const router=useRouter();
  
  return (
    <section
      data-aos="fade-up"
      className="banks-holder factorsSection aos-init aos-animate"
    >
      <div className="blue-patch"></div>
      <div className="container banks">
        <h2 className="factors">
          Factors affecting <br className="blankSpace" />
          <b>Credit Score</b>
        </h2>
        <div className="banks-slider slick-initialized slick-slider">
          <button
            className="slick-prev slick-arrow slick-disabled"
            aria-label="Previous"
            type="button"
            aria-disabled="true"
            style={{ display: 'inline-block' }}
          >
            Previous
          </button>
          <div
            className="slick-list draggable scroll"
            style={{ overflowX: 'scroll', overflowY: 'hidden' }}
          >
            <div
              className="slick-track factor-affect"
              style={{
                opacity: 1,
                transform: 'translate3d(0px, 0px, 0px)',
              }}
            >
              {factors.map(item=>  <div
                key={item.id}
                className="slick-slide slick-current slick-active"
                data-slick-index={item.id}
                aria-hidden="false"
                style={{display:router.pathname === item.link ? 'none' : 'block' }}
              >
                <div>
                  <div
                    className="slide_cell"
                    style={{ width: '100%', display: 'inline-block' }}
                  >
                    <Link href={item.link}>
                      <div className="factors-affecting-child">
                      <p className="percent">{item.value}</p>
                      <p className="title">{item.title}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
              
            </div>
          </div>
          <button
            className="slick-next slick-arrow"
            aria-label="Next"
            type="button"
            aria-disabled="false"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

const factors=[
  {
    id:0,
    value:80,
    title:'Payment History',
    link:"/credit-score/rank"
  },
  {
    id:1,
    value:18,
    title:'Credit Card Utilisation',
    link:'/credit-score/utilization'
  },
  {
    id:2,
    value:23,
    title:'Age of Credit',
    link:'/credit-score/age'
  },
  {
    id:3,
    value:45,
    title:'Total Accounts',
    link:'/credit-score/accounts' 
  },
  {
    id:4,
    value:0,
    title:'Enquries',
    link:'/credit-score/enquiries' 
  },
  {
    id:5,
    value:0,
    title:'Credit Overview',
    link:'/credit-score' 
  }
]
export default FactorsAffecting
