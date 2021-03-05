import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
const FactorsAffecting = () => {
  const router=useRouter();
  
 useEffect(() => {
  if (window !== undefined && window.initSlickBanks ) {
    window.initSlickBanks()
}

 }, [])
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
        
        <div className="banks-slider">
              { factors.map((item,index)=> router.pathname !== item.link? <div
                key={index}
                className="slide_cell"
                data-slick-index={item.id}
                aria-hidden="false"
              >
                <div>
                  <div
                    className=""
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
           :<></> )}
              
            </div>
      
      </div> 
    </section>
  )
}

const factors=[
  {
    id:0,
    value:null,
    title:'Payment History',
    link:"/credit-score/rank"
  },
  {
    id:1,
    value:null,
    title:'Credit Card Utilisation',
    link:'/credit-score/utilization'
  },
  {
    id:2,
    value:null,
    title:'Age of Credit',
    link:'/credit-score/age'
  },
  {
    id:3,
    value:null,
    title:'Total Accounts',
    link:'/credit-score/accounts' 
  },
  {
    id:4,
    value:null,
    title:'Enquries',
    link:'/credit-score/enquiries' 
  },
  {
    id:5,
    value:null,
    title:'Credit Overview',
    link:'/credit-score' 
  }
]
export default FactorsAffecting
