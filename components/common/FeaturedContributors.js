import Image from '../ImageComponent/ImageComponent'
import Strapi from "../../providers/strapi"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { setContributorId } from '../../utils/localAccess'
import { cleanAuthorName } from '../../utils/formatDataForBlogs'

const FeaturedContributors = (props) => {
   const { section_heading, post_contributors } = props.data
   let featuredContributors = post_contributors
   featuredContributors.forEach((contributor => {
      props.allBlogs.forEach(blog => {
         if (contributor.post_contributors_name.includes(blog.blog_contributor.blog_contributors_name)) {
            contributor.post_count++
         }
      })
   })
   )
   let sortedContributors = featuredContributors.sort((a, b) => b.post_count - a.post_count)
   const [sliceLength, setSliceLength] = useState(4)
   const router = useRouter()
   const strapi = new Strapi()
   const goToContributorDetailPage = (contributor) => {
      let name = cleanAuthorName(contributor.post_contributors_name)
      setContributorId(contributor.id)
      router.push(`/blog/contributor-detail/${name}`)
   }
   useEffect(() => {
      if (post_contributors.length > 4) {
         setSliceLength(4)
      }
   }, [])

   const handleViewAll = () => {
      setSliceLength(post_contributors.length)
   }
   return (
      <section className="featured-wrapper">
         <h2>{section_heading}</h2>
         <div className="container">
            {sortedContributors.map((contributor, index) => {
               if (index + 1 <= sliceLength) {
                  return <div onClick={() => goToContributorDetailPage(contributor)} className="people" key={index}>
                     <div className="image">
                        <Image image={contributor.post_contributors_image} />
                        {/* <img src={`${contributor.blog_contributors_image.url}`} alt={contributor.blog_contributors_image.name} /> */}
                     </div>
                     <div className="detail">
                        <span dangerouslySetInnerHTML={{ __html: contributor.post_contributors_name }}></span>
                        <h5 dangerouslySetInnerHTML={{ __html: contributor.post_contributors_text }}></h5>
                     </div>
                  </div>
               } else {
                  return null
               }
            }
            )}
         </div>
         {post_contributors.length > sliceLength ? <div className="view-all container">
            <button onClick={handleViewAll} >View all
              <img src="assets/images/icons/down-chevron.svg" />
            </button>
         </div> : null}
      </section>
   );
}

export default FeaturedContributors;