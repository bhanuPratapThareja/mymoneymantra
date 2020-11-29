import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import Strapi from '../providers/strapi'
import { isScrolledIntoView } from '../Utils/elementInView'

const Header = () => {
   const strapi = new Strapi()
   const headerRef = useRef()
   const [headerData, setHeaderData] = useState(null)

   let longFormBanner = null
   let longForm = null

   useEffect(() => {
      window.onscroll = () => {
         headerEffect(headerRef.current)

         const els = document.querySelectorAll('[data-aos="fade-up"]')
         els.forEach(el => {
           if(isScrolledIntoView(el)) {
              el.classList.add('aos-animate')
           }
         })


         if (!longFormBanner) {
            longFormBanner = document.getElementById('longFormBanner')
            longForm = document.getElementById('longForm')
         } else {
            const longFormOffset = longForm.offsetTop
            const longFormHeight = longForm.clientHeight
            const longFormBottomPos = longFormOffset + longFormHeight
            const windowOffsetForBannerStop = longFormBottomPos - longFormBanner.clientHeight

            if (window.pageYOffset >= longFormOffset && window.pageYOffset < windowOffsetForBannerStop) {
               longFormBanner.classList.add("banner-sticky")
               longFormBanner.classList.remove("banner-sticky_bottom")
            } 
            
            if (window.pageYOffset >= windowOffsetForBannerStop - 70) {
               longFormBanner.classList.remove("banner-sticky")
               longFormBanner.classList.add("banner-sticky_bottom")
            } 
            
            if (window.pageYOffset < longFormOffset) {
               longFormBanner.classList.remove("banner-sticky")
               longFormBanner.classList.remove("banner-sticky_bottom")
            }

         }
      }

      getHeaderData()
      async function getHeaderData() {
         const header = await strapi.processReq('GET', 'header')
         setHeaderData(header)
      }
   }, [])

   const headerEffect = header => {
      if (header) {
         if (window.pageYOffset >= 100) header.classList.add('scrolled')
         else header.classList.remove('scrolled')
      }
   }

   const renderMenuDropDown = ({ dropdown_links }) => {
      return dropdown_links.map(link => {
         return <a key={link.id} href={link.url}>
            {link.label}
         </a>
      })
   }

   const renderMenu = () => {
      return headerData.menu.links.map(link => {
         switch (link.type) {
            case 'anchor':
               return <a key={link.id} href={link.url} >{link.label}</a>
            case 'dropdown':
               return (
                  <div className="dropdown" id="loans" key={link.id}>
                     <button className="dropbtn">
                        {link.label}
                        <img src="../images/icons/down-chevron.svg" />
                     </button>
                     <div className="dropdown-content">
                        <div className="dropdown-content-links">
                           {renderMenuDropDown(link.dropdown_menu)}
                        </div>
                     </div>
                  </div>
               )
         }
      })
   }

   return (
      <>
         <Head>
            <title>Next Strapi App</title>
         </Head>

         {headerData ? <header className="header" ref={headerRef}>
            <a href="index.html">
               <img
                  className="header-logo"
                  src="../images/logo.png"
                  alt={headerData.logo.name}
               />
            </a>

            <div className="header-links">{renderMenu()}</div>

            <div className="header-access">
               <div className="login-cta">
                  <button id="log_in">{headerData.login.label}</button>
               </div>
               <div className="signup-cta secondary-cta">
                  <div className="border"></div>
                  <button id="sign_up">{headerData.signup.label}</button>
               </div>
            </div>
         </header> : null}
      </>
   )
}

export default Header