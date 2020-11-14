import React, { Component } from "react";
import Slider from "react-slick";

export default class SlickCards extends Component {
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500
    }
    return (
      <div>
        <h2>Center Mode</h2>
        <Slider {...settings}>
            <div class="popular-cards-slider-card">
              <div class="popular-cards-slider-card-top">
                <div class="head">
                  <h3><b class="card_name">RBL Bank</b><br />Platinum Delight Credit Card</h3>
                  <img src="build/images/icons/citi-logo.png" />
                </div>
                <div class="content">
                  <ul>
                    <li>Earn 10 reward points for every ₹125 spent at apparel & department stores Earn 10
                    reward points for every ₹125 spent at apparel & department stores
                        </li>
                    <li>Earn 10 reward points for every ₹125 spent at apparel & department stores</li>
                  </ul>
                </div>
                <div class="fee">
                  <h5><b>₹2500</b> Annual fee</h5>
                </div>
              </div>
              <div class="popular-cards-slider-card-bottom">
                <div>
                  <h5>Lifetime reward points</h5>
                </div>
              </div>
            </div>
        </Slider>
      </div>
    )
  }
}