import Strapi from '../providers/strapi';

const Blog = props => {
   const strapi = new Strapi()
   const blogHeading = props.data.section_heading;
   const blogsData = props.data.blogs_card;

   return (
      <section data-aos="fade-up" className="container blog-container aos-init aos-animate">
         <div className="blog">
            <h2>{blogHeading}</h2>
            <div className="blog-wrapper" id="slider_blogs">
               <div className="blog-wrapper-card card-1" id="blog-card-1">
                  <div className="image_1">
                     <img src={`${strapi.baseUrl}${blogsData[0].image.url}`} alt={blogsData[0].image.name} />
                  </div>
                  <div className="content">
                     <h3>{blogsData[0].heading}</h3>
                     <h6>{blogsData[0].sub_text}</h6>
                     <div className="details">
                        <span>{blogsData[0].read_at}</span>
                        <button>Read more</button>
                     </div>
                  </div>
               </div>

               <div className="blog-wrapper-card card-2" id="blog-card-2">
                  <div className="image_2">
                     <img src={`${strapi.baseUrl}${blogsData[1].image.url}`} alt={blogsData[1].image.name} />
                  </div>
                  <div className="content">
                     <h3>{blogsData[1].heading}</h3>
                     <h6>{blogsData[1].sub_text}</h6>
                     <div className="details">
                        <span>{blogsData[1].read_at}</span>
                        <button>Read more</button>
                     </div>
                  </div>
               </div>

               <div className="blog-wrapper-card card-3" id="blog-card-3">
                  <div className="image_3">
                     <img src={`${strapi.baseUrl}${blogsData[2].image.url}`} alt={blogsData[2].image.name} />
                  </div>
                  <div className="content">
                     <h3>{blogsData[2].heading}</h3>
                     <h6>{blogsData[2].sub_text}</h6>
                     <div className="details">
                        <span>{blogsData[2].read_at}</span>
                        <button>Read more</button>
                     </div>
                  </div>
               </div>

            </div>


         </div>
      </section>
   )
}

export default Blog;

