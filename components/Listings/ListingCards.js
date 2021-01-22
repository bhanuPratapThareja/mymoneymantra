import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "../ImageComponent/ImageComponent";
import DecisionButton from "../DecisionButton/DescisionButton";
import { getDevice } from "../../utils/getDevice";

const ListingCards = (props) => {
  const router = useRouter();
  const primaryPath = router.query.primaryPath;
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    setOffers(props.offerCards)
  });

  const onOfferClick = (buttonText, offer) => {
    if (getDevice() !== "desktop") {
      onButtonClick(buttonText, offer)
    }
  };

  const onButtonClick = (buttonText, offer) => {
    const { bank: { bank_name: bankName, slug: bankSlug }, product: { slug: productSlug } } = offer
    let pathname = ''
    const query = { bankName }

    switch (buttonText) {
      case "Apply Now":
      case "Instant Approval":
        pathname = `/${primaryPath}/thank-you`;
        break;

      case "EConnect":
        pathname = `/${primaryPath}/long-form/${bankSlug}/${productSlug}`;
        break;

      // view details
      default:
        pathname = `/${primaryPath}/${bankSlug}/${productSlug}`;
    }

    routerRedirect(pathname, query);
  };

  const routerRedirect = (pathname, query) => {
    router.push({ pathname, query }, pathname, { shallow: true });
  };

  if (!offers) {
    return null;
  }

  return (
    <section className="container long-cards">

      {offers.map((offer, i) => {
        return (
          <div className="long-cards-wrapper"
            key={offer.id}
            onClick={() => onOfferClick(offer.productDecision, offer)}
          >

            <div data-aos={i ? "fade-up" : ""} className="long-cards-wrapper-card aos-init">
              {offer.product.recommended ?
                <img className="recommended" src="/assets/images/icons/stamp.svg" /> : null}

              <div className="top">
                <div className="name">
                  <Image className="mob-logo" image={offer.bank.bank_logo} />
                  <h3><span>{offer.bank.bank_name}</span> {offer.product.product_name}</h3>

                  {primaryPath === "credit-cards" ?
                    <div> <Image image={offer.product.product_image.image} /></div>
                    : null}

                  {primaryPath !== "credit-cards" ?
                    <div>
                      <Image image={offer.bank.bank_image} />
                    </div>
                    : null}
                </div>

                <div className="content">
                  <h5>Features:</h5>
                  {offer.product.product_listing_feature ? <ul>
                    {offer.product.product_listing_feature.listing_feature.map((feature) => (
                      <li key={feature.id}>
                        <p>{feature.description}</p>
                        {/* <span
                          dangerouslySetInnerHTML={{
                            __html: feature.listing_card_feature,
                          }}
                        ></span> */}
                      </li>
                    ))}
                  </ul> : null}
                </div>

                {offer.product.product_annual_fee ? (
                  <div className="fee">
                    <h5>Annual fee:</h5>
                    <p>
                      <b>₹ {offer.product.product_annual_fee.annual_fee_fy}</b> (First Year)
                    </p>
                    {offer.product.product_annual_fee.annual_fee_sy ? (
                      <p>
                        <b>₹ {offer.product.product_annual_fee.annual_fee_sy}</b> (Second year onwards)
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
                  <h5>{offer.product.product_usp_highlight.highlight}</h5>
                </div>
                <div className="options">
                  <DecisionButton
                    id="view-details"
                    buttonText="View Details"
                    offer={offer}
                    onButtonClick={onButtonClick}
                  />
                  <DecisionButton
                    id="apply-now"
                    buttonText={offer.productDecision}
                    offer={offer}
                    onButtonClick={onButtonClick}
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
