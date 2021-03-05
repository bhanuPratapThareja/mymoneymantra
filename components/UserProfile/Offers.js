import axios from "axios";
import { useEffect, useState } from "react";
import { getApiData } from "../../api/api";
import { extractOffers } from "../../services/offersService";
import { getItem, keys } from "../../utils/storage";
import Image from "../ImageComponent/ImageComponent";

const Offers = () => {

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerId = getItem(keys.customerId)
        const { url, body } = getApiData("viewOffers");
        body.customerId = customerId;
        const responseObject = await axios.post(url, body);
        const { trendings, populars } = responseObject.data;
        let allOffers = [...trendings, ...populars];
        let offers = await extractOffers(allOffers);
        setOffers(offers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  if (!offers.length) {
    return null;
  }
  return (
    <div className="offers-cards-wrapper">
      {offers.map((offer, i) => {
        const { bank, product } = offer;
        const {
          product_name,
          product_feature,
          product_usp_highlight,
        } = product;
        return (
          <div
            className="popular-cards-slider-card popular-cards-slider-card-user"
            key={product.id}
          >
            <div className="popular-cards-slider-card-top">
              <div className="head">
                <h3>
                  <b className="card_name">{bank.bank_name}</b>
                  <br />
                  {product_name}
                </h3>
                <Image image={bank.bank_logo} />
              </div>
              <div className="content">
                <ul>
                  {product_feature.product_feature.map((feature) => (
                    <li key={feature.id}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: feature.description,
                        }}
                      ></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="popular-cards-slider-card-bottom">
              <div
                dangerouslySetInnerHTML={{
                  __html: `<h5>${product_usp_highlight.highlight}</h5>`,
                }}
              ></div>
            </div>
          </div>
        );
      })}
       </div>
  );
};

export default Offers;
