import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import Image from "../ImageComponent/ImageComponent";
import DecisionButton from "../DecisionButton/DescisionButton";
import { getDevice } from "../../utils/getDevice";
import { makeDecision } from '../../utils/decision'

const ListingCards = (props) => {
  const router = useRouter()
  const primaryPath = router.query.primaryPath
  const [offers, setOffers] = useState([])

  useEffect(() => {
    setOffers(props.offerCards)
  });

  const onOfferClick = (buttonText, offer) => {
    if (getDevice() !== "desktop") {
      const decision = makeDecision(buttonText, primaryPath, offer)
      const { pathname, query } = decision
      router.push({ pathname, query }, pathname, { shallow: true })
    }
  }

  if (!offers) {
    return null;
  }

  return (
    <section className="container long-cards">

      {offers.map((offer, i) => {
        const { productDecision, bank, product } = offer
        return (
          <div className="long-cards-wrapper"
            key={offer.id}
            onClick={() => onOfferClick(productDecision, offer)}
          >

            <div data-aos={i ? "fade-up" : ""} className="long-cards-wrapper-card aos-init">
              {product.recommended ?
                <img className="recommended" src="/assets/images/icons/stamp.svg" /> : null}

              <div className="top">
                <div className="name">
                  <Image className="mob-logo" image={bank.bank_logo} />
                  <h3><span>{bank.bank_name}</span> {product.product_name}</h3>

                  {primaryPath === "credit-cards" ?
                    <div> <Image image={product.product_image.image} /></div>
                    : null}

                  {primaryPath !== "credit-cards" ?
                    <div>
                      <Image image={bank.bank_image} />
                    </div>
                    : null}
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
                    <p>
                      <b>₹ {product.product_annual_fee.annual_fee_fy}</b> (First Year)
                    </p>
                    {product.product_annual_fee.annual_fee_sy ? (
                      <p>
                        <b>₹ {product.product_annual_fee.annual_fee_sy}</b> (Second year onwards)
                      </p>
                    ) : null}
                  </div>
                ) : null}

                {/* {offer.intrest_rate ? (
                  <div className="fee">
                    <h5>Interest Rate:</h5>
                    <p
                      dangerouslySetInnerHTML={{ __html: offer.intrest_rate }}
                    ></p>
                  </div>
                ) : null} */}
              </div>

              <div className="bottom">
                <div className="lifetime">
                  <h5>{product.product_usp_highlight.highlight}</h5>
                </div>
                <div className="options">
                  <DecisionButton
                    idForStyle="view-details"
                    buttonText="View Details"
                    offer={offer}
                  />
                  <DecisionButton
                    idForStyle="apply-now"
                    buttonText={offer.productDecision}
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
