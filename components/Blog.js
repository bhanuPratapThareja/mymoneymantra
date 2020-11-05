const Blog = () =>{
    return(
        <section data-aos="fade-up" className="container blog-container aos-init aos-animate">
      <div className="blog">
         <h2>From our Blog</h2>
         <div className="blog-wrapper slick-initialized slick-slider" id="slider_blogs"><div className="slick-list draggable"><div className="slick-track" style={{opacity: "1", width: "15000px", transform: "translate3d(-12px, 0px, 0px)"}}><div className="slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false"><div><div className="blog-wrapper-card card-1" id="blog-card-1" style={{width: "100%", display: "inline-block"}}>
               <div className="image_1"></div>
               <div className="content">
                  <h3>Buy Now, Pay Later for Businesses: What Benefits are Actually Relevant?</h3>
                  <h6>A risus risus vehicula ultricies semper. Viverra gravida morbi aliquam quis in. Arcu morbi
                     placerat porta...
                  </h6>
                  <div className="details">
                     <span>23 Jun 2020 // 6 min read</span>
                     <button tabIndex="0">Read more</button>
                  </div>
               </div>
            </div></div></div><div className="slick-slide" data-slick-index="1" aria-hidden="true" tabIndex="-1"><div><div className="blog-wrapper-card card-2" id="blog-card-2" style={{width: "100%", display: "inline-block"}}>
               <div className="image_2"></div>
               <div className="content">
                  <h3>Buy Now, Pay Later for Businesses: What Benefits are Actually Relevant?</h3>
                  <h6>A risus risus vehicula ultricies semper. Viverra gravida morbi aliquam quis in. Arcu morbi
                     placerat porta...
                  </h6>
                  <div className="details">
                     <span>23 Jun 2020 // 6 min read</span>
                     <button tabIndex="-1">Read more</button>
                  </div>
               </div>
            </div></div></div><div className="slick-slide" data-slick-index="2" aria-hidden="true" tabIndex="-1"><div><div className="blog-wrapper-card card-3" id="blog-card-3" style={{width: "100%", display: "inline-block"}}>
               <div className="image_3"></div>
               <div className="content">
                  <h3>Buy Now, Pay Later for Businesses: What Benefits are Actually Relevant?</h3>
                  <h6>A risus risus vehicula ultricies semper. Viverra gravida morbi aliquam quis in. Arcu morbi
                     placerat porta...
                  </h6>
                  <div className="details">
                     <span>23 Jun 2020 // 6 min read</span>
                     <button tabIndex="-1">Read more</button>
                  </div>
               </div>
            </div></div></div></div></div></div>
      </div>
   </section>
    )
}

export default Blog;