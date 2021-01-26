import Image from '../ImageComponent/ImageComponent'
import Strapi from "../../providers/strapi"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const FeaturedContributors = (props) => {
   const { section_heading, blog_contributors } = props.data
   const [sliceLength, setSliceLength] = useState(4)
   const router = useRouter()
   const strapi = new Strapi()
   const goToContributorDetailPage = (contributor) => {
      router.push({ pathname: "/blog/contributor-detail", query: { id: contributor.id } })
   }
   useEffect(() => {
      if (blog_contributors.length > 4) {
         setSliceLength(4)
      }
   }, [])

   const handleViewAll = () => {
      setSliceLength(blog_contributors.length)
   }
   return (
      <section className="featured-wrapper">
         <h2>{section_heading}</h2>
         <div className="container">
            {blog_contributors.map((contributor, index) => {

               if (index + 1 <= sliceLength) {
                  return <div onClick={() => goToContributorDetailPage(contributor)} className="people" key={index}>
                     <div className="image"><img src={`${strapi.baseUrl}${contributor.blog_contributors_image.url}`} alt={contributor.blog_contributors_image.name} /></div>
                     <div className="detail">
                        <span dangerouslySetInnerHTML={{ __html: contributor.blog_contributors_name }}></span>
                        <h5 dangerouslySetInnerHTML={{ __html: contributor.blog_contributors_text }}></h5>
                     </div>
                  </div>
               } else {
                  return null
               }
            }
            )}
         </div>
         {blog_contributors.length > sliceLength ? <div className="view-all container">
            <button onClick={handleViewAll} >View all
              <img src="assets/images/icons/down-chevron.svg" />
            </button>
         </div> : null}
      </section>
   );
}

export default FeaturedContributors;