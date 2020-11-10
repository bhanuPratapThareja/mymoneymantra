import Strapi from '../providers/strapi';

const Blog = props => {
   const strapi = new Strapi()
   const blogHeading = props.data.section_heading;
   const blogsData = props.data.blogs_card;

   return (
      <section data-aos="fade-up" className="container blog-container aos-init aos-animate">
         <div className="blog">
            <h2>{blogHeading}</h2>
            {blogsData.map(blogData => {
               return (
                  <div className="blog-wrapper" id="slider_blogs" key={blogData.id}>
                     <div className="blog-wrapper-card card-1" id="blog-card-1">
                        <div className="image_1">
                        <img src={`${strapi.baseUrl}${blogData.image.url}`} alt={blogData.image.name} />
                        </div>

                        <div className="content">
                           <h3>{blogData.heading}</h3>
                           <h6>{blogData.sub_text}
                        </h6>
                           <div className="details">
                              <span>{blogData.read_at}</span>
                              <button>Read more</button>
                           </div>
                        </div>
                     </div>
                    
                
                  </div>
               )
               }
               )

            }
        
      </div>
      </section>
   )
}

export default Blog;

