import Image from '../ImageComponent/ImageComponent'

const BlogFilter = props => {
   const { blogsFilter, data } = props
   return (
      <section className="blogs-filter container">
         <div className="blogs-filter-wrapper">
            <div className="filters">
               <div className="cards">
                  <h3><span id="count">57</span> credit cards</h3>
               </div>
               <div className="filter">
                  <button className="" id="listing-filter">Filters
                   <Image src="/assets/images/icons/down-chevron.svg" />
                  </button>
               </div>
            </div>
         </div>
         <div className="filter-cards">
            <div className="filter-cards-wrapper">
               {
                  data.map((blog, i) => {
                     const { header, short_text, image, read_text, redirect_url, id, createdAt, popular } = blog
                     const date = new Date(createdAt);
                     const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
                     const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
                     const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
                     const createdDate = `${da} ${mo} ${ye}`;
                     return (
                        <div key={i} className="blog-wrapper-card  single card-1" id="blog-card-1">
                           <div className="image_1"></div>
                           <Image image={image} />
                           <div className="content">
                              <span dangerouslySetInnerHTML={{ __html: header }}></span>
                              <span dangerouslySetInnerHTML={{ __html: short_text }}></span>
                              <div className="details">
                                 <span>{createdDate} </span><span>{read_text}</span>
                                 <button>Read more</button>
                              </div>
                           </div>
                        </div>
                     )
                  })
               }
            </div>
            <div className="register-partner load-more">
               <div className="header-access register-cta">
                  <div className="signup-cta secondary-cta">
                     <div className="border"></div>
                     <button id="load_more">Load More</button>
                  </div>
               </div>
            </div>
         </div>
      </section>

   )
}

export default BlogFilter
