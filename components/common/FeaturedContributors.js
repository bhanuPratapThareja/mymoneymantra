import Image from '../ImageComponent/ImageComponent'
import Strapi from "../../providers/strapi"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const FeaturedContributors = (props) => {
   const { section_heading, blog_contributors } = props.data
   let featuredContributors = blog_contributors
   featuredContributors.forEach((contributor => {
      props.allBlogs.forEach(blog => {
         if (contributor.blog_contributors_name.includes(blog.blog_author)) {
            contributor.blog_count++
         }
      })
   })
   )
   let sortedContributors = featuredContributors.sort((a, b) => b.blog_count - a.blog_count)
   const [sliceLength, setSliceLength] = useState(4)
   const router = useRouter()
   const strapi = new Strapi()
   const goToContributorDetailPage = (contributor) => {
      router.push({ pathname: "/blog/contributor-detail", query: { slug: contributor.id } })
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
            {sortedContributors.map((contributor, index) => {
               if (index + 1 <= sliceLength) {
                  return <div onClick={() => goToContributorDetailPage(contributor)} className="people" key={index}>
                     <div className="image">
                        <Image image={contributor.blog_contributors_image} />
                        {/* <img src={`${contributor.blog_contributors_image.url}`} alt={contributor.blog_contributors_image.name} /> */}
                     </div>
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