import { slice } from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { setBlogId } from '../../utils/localAccess'
import Image from '../ImageComponent/ImageComponent'
import BlogFilterOptions from './BlogFilterOptions'

const BlogFilter = props => {
   const { blogsFilter, data } = props
   let limit = 3
   const [blogs, setBlogs] = useState([])
   const [blogsToDisplay, setBlogsToDispaly] = useState([])
   const [sliceIndex, setSliceIndex] = useState(limit);
   const [hasMore, setHasMore] = useState(true)
   const router = useRouter()
   const sortBlogsByDate = (blogs) => {
      // let sortedBlogsByDate = blogs.sort((a, b) => moment(moment(a.publish_at).format('YYYY-MM-DD')).isBefore(moment(b.publish_at).format('YYYY-MM-DD')) ? 1 : -1)
      let sortedBlogsByDate = blogs.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
      return sortedBlogsByDate
   }
   const onOpenBlog = blog => {
      setBlogId(blog.id)
      router.push(`/blog/details/${blog.slug}`)
   }
   const onOpenFilter = () => {
      const el = document.getElementsByClassName('filter-option')[0]
      $("#" + el.id + "-show").slideToggle("300");
      $('body', "html").css("overflow", "hidden")
   }

   useEffect(() => {
      let sortedBlogs = sortBlogsByDate(data)
      setBlogs(sortedBlogs)
      setBlogsToDispaly(slice(sortedBlogs, 0, limit))
   }, [])

   const fetchMoreData = () => {
      let newIndex = sliceIndex + limit
      let newList = slice(blogs, sliceIndex, newIndex)
      let finalList = [...blogsToDisplay, ...newList]
      setSliceIndex(newIndex)
      if (blogs.length - 1 < newIndex) {
         setHasMore(false)
      } else {
         setHasMore(true)
      }
      setTimeout(() => {
         setBlogsToDispaly(finalList)
      }, 1000)
   }

   const onApplyFilter = (filter) => {
      if (filter.categories.length) {
         let filteredBlogs = []
         data.forEach(blog => {
            const { blog_categories } = blog
            if (blog_categories.length) {
               blog_categories.forEach(category => {
                  console.log(category.blog_category_name)
                  if (filter.categories.includes(category.blog_category_name)) {
                     filteredBlogs.push(blog)
                  }
               })
            }
            let sortedFilteredBlogs = sortBlogsByDate(filteredBlogs)
            setBlogs(sortedFilteredBlogs)
            setBlogsToDispaly(slice(sortedFilteredBlogs, 0, limit))
         })
         return
      }
      if (filter.subCategories.length) {
         let filteredBlogs = []
         data.forEach(blog => {
            const { blog_sub_categories } = blog
            if (blog_sub_categories.length) {
               blog_sub_categories.forEach(category => {
                  console.log(category.blog_sub_category)
                  if (filter.subCategories.includes(category.blog_sub_category)) {
                     filteredBlogs.push(blog)
                  }
               })
            }
            let sortedFilteredBlogs = sortBlogsByDate(filteredBlogs)
            setBlogs(sortedFilteredBlogs)
            setBlogsToDispaly(slice(sortedFilteredBlogs, 0, limit))
         })
         return
      }

      if (filter.date) {
         let filteredBlogs = []
         data.forEach(blog => {
            const { published_at } = blog
            let blogPublishDate = moment(published_at).format('YYYY-MM-DD')
            if (moment(blogPublishDate).isSame(filter.date)) {
               filteredBlogs.push(blog)
            }
         })

         let sortedFilteredBlogs = sortBlogsByDate(filteredBlogs)
         setBlogs(sortedFilteredBlogs)
         setBlogsToDispaly(slice(sortedFilteredBlogs, 0, limit))
         return
      }
      setBlogs(data)

   }
   return (
      <section className="blogs-filter container">
         <div className="blogs-filter-wrapper">
            <div className="filters">
               <div className="cards">
                  <h3><span id="count">{blogs.length}</span> Blogs</h3>
               </div>
               <div className="filter">
                  <button className="filter-option"
                     id="listing-filter" onClick={onOpenFilter} >Filters
                   <Image src="/assets/images/icons/down-chevron.svg" />
                  </button>
               </div>
            </div>
         </div>
         <div className="filter-cards">
            <InfiniteScroll
               dataLength={blogsToDisplay.length}
               hasMore={hasMore}
               loader={blogsToDisplay.length ? <h2>Loading...</h2> : ''}
               next={fetchMoreData}
            >
               <div className="filter-cards-wrapper">
                  {
                     blogsToDisplay.length ? blogsToDisplay.map((blog, i) => {
                        const { header, short_text, image, read_text, redirect_url, id, createdAt, popular, published_at, content } = blog
                        const date = new Date(published_at);
                        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
                        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
                        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
                        const createdDate = `${da} ${mo} ${ye}`;
                        const readingTime = require('reading-time');
                        const blogreadTime = readingTime(content, { wordsPerMinute: '50' });
                        return (
                           <div key={i} className="blog-wrapper-card  single card-1" id="blog-card-1">
                              <div className="image_1"></div>
                              <Image image={image} />
                              <div className="content">
                                 <span dangerouslySetInnerHTML={{ __html: header }}></span>
                                 <span dangerouslySetInnerHTML={{ __html: short_text }}></span>
                                 <div className="details">
                                    <span>{createdDate}//{blogreadTime.text} </span>
                                    <button onClick={() => onOpenBlog(blog)}>Read more</button>
                                 </div>
                              </div>
                           </div>
                        )
                     }) : null
                  }
               </div></InfiniteScroll>
            <div>
               <BlogFilterOptions filters={blogsFilter} applyFilter={onApplyFilter} />
            </div>
            {/* <div className="register-partner load-more">
               <div className="header-access register-cta">
                  <div className="signup-cta secondary-cta">
                     <div className="border"></div>
                     <button id="load_more">Load More</button>
                  </div>
               </div>
            </div> */}
         </div>
      </section>

   )
}

export default BlogFilter
