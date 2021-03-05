import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import Image from "../ImageComponent/ImageComponent"
import DecisionButton from "../DecisionButton/DescisionButton"
import { getDevice } from "../../utils/getDevice"
import { makeDecision } from '../../utils/decision'

const ListingCards = (props) => {
  const router = useRouter()
  const [offers, setOffers] = useState([])

  useEffect(() => {
    setOffers(props.offerCards)
  })

  const onOfferClick = (buttonText, offer) => {
    if (getDevice() !== "desktop") {
      const decision = makeDecision(buttonText, offer, props.primaryPath)
      const { pathname, query } = decision
      router.push({ pathname, query }, pathname, { shallow: true })
    }
  };

  if (!offers) {
    return null
  }

  return (
    <section className="container long-cards">

      {offers.map((offer, i) => {
        const { productDecision, bank, product } = offer
        // console.log('inside ListingCards product', product);
        const { product_interest_rate, product_tenure } = product

        // ir = interest rate
        // np = no of period(month)
        // pv =  loan amount
        // let ir = product_interest_rate.max_value;
        // let np = product_tenure.tenure;

        // function PMT (ir, np, pv,fv ) {
        //   let pmt = Math.round( ir * ( pv * Math.pow ( (ir+1), np )+ fv ) ) / ( ( ir + 1 ) * ( Math.pow ( (ir+1), np) -1 ) );
        //   console.log('PMT returned',pmt)
        //   return pmt;

        //  }


        // let pv;


        // const formData = JSON.parse(localStorage.getItem("formData"))
        // console.log('formData--', formData)

        // if (formData && formData[props.primaryPath]) {
        //   console.log('ir',ir);
        //   console.log('np',np)
        //   let data = formData[props.primaryPath]
        //    let pv = data.requestedLoanamount;
        //    let fv= 0;
        //   console.log('inside if pv.requestedLoanamount',pv)
        //   PMT(ir,np,pv,fv)
        // }






        return (
          <div className="long-cards-wrapper"
            key={i}
            onClick={() => onOfferClick(productDecision, offer)}
          >

            <div data-aos={i ? "fade-up" : ""} className="long-cards-wrapper-card aos-init">
              {product.recommended ?
                <img className="recommended" src="/assets/images/icons/stamp.svg" /> : null}

              <div className="top">
                <div className="name">
                  <Image className="mob-logo" image={bank.bank_logo} />
                  <h3><span>{bank.bank_name}</span> {product.product_name}</h3>

                  <div>
                    {props.primaryPath === "credit-cards" && product.product_image ?
                      <Image image={product.product_image.image} /> : null}
                      
                    {props.primaryPath !== "credit-cards" && bank.bank_image ?
                      <Image image={bank.bank_image} /> : null}
                  </div>
                 
                </div>

                <div className="content">
                  <h5>Features:</h5>
                  {product.product_listing_feature ? <ul>
                    {product.product_listing_feature.listing_feature.map((feature) => (
                      <li key={feature.id}>
                        <p>{feature.description}</p>
                      </li>
                    ))}
                  </ul> : null}
                </div>

                {product.product_annual_fee ? (
                  <div className="fee">
                    <h5>Annual fee:</h5>
                    <p><b>₹ {product.product_annual_fee.annual_fee_fy}</b> (First Year)</p>
                    {product.product_annual_fee.annual_fee_sy ? (
                      <p><b>₹ {product.product_annual_fee.annual_fee_sy}</b> (Second year onwards)</p>
                    ) : null}
                  </div>
                ) : null}

                <div className="fee">
                  {product.product_interest_rate ?
                    <h5>Interest Rate:
                      <span><b>&nbsp; {product.product_interest_rate.min_value}% -
                      {product.product_interest_rate.max_value}%
                      {product.product_interest_rate.duration === 'Annually' ? ' p.a' : ' p.m'}</b></span>
                    </h5> : null}

                  {product.product_emi ?
                    <h5>EMI/month: <span><b>&nbsp; ₹ 1000</b></span></h5> : null}

                  {product.product_processing_fee ?
                    <h5>Processing Fee: <span><b>&nbsp; {product.product_processing_fee.processing_fees_from} % - {product.product_processing_fee.processing_fees_upto} %</b></span></h5> : null}

                  {product.product_tenure ?
                    <h5>Tenure: <span><b>&nbsp; {product.product_tenure.tenure}</b></span></h5> : null}
                </div>
              </div>
              <div className="bottom">
                <div className="lifetime">
                  <h5>{product.product_usp_highlight.highlight}</h5>
                </div>
                <div className="options">
                  <DecisionButton
                    idForStyle="view-details"
                    buttonText="View Details"
                    primaryPath={props.primaryPath}
                    offer={offer}
                  />
                  <DecisionButton
                    idForStyle="apply-now"
                    buttonText={offer.productDecision}
                    primaryPath={props.primaryPath}
                    offer={offer}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}

    </section>
  );
};

export default ListingCards;
