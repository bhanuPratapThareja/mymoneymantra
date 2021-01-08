import Head from 'next/head'
import Link from 'next/link'
import Strapi from '../providers/strapi'
import { useEffect, useState, useRef } from 'react'
import { isScrolledIntoView } from '../utils/elementInView'
import { getDevice } from '../utils/getDevice';

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
            if (isScrolledIntoView(el)) {
               el.classList.add('aos-animate')
            }
         })



         if (!longFormBanner) {
            longFormBanner = document.getElementById('longFormBanner')
            longForm = document.getElementById('longForm')
         } else {
            if (getDevice() === 'desktop') {
               if (longForm && longFormBanner) {
                  const longFormOffset = longForm.offsetTop
                  const longFormHeight = longForm.clientHeight
                  const bannerOffset = longFormBanner.offsetTop
                  const bannerHeight = longFormBanner.clientHeight

                  if (window.pageYOffset >= longFormOffset && window.pageYOffset < longFormOffset + longFormHeight) {
                     longFormBanner.style.position = 'fixed'
                     longFormBanner.style.marginTop = `${20}px`
                     longForm.classList.add('banner-sticky')
                     longFormBanner.classList.add('banner-sticky')
                  }

                  if (window.pageYOffset >= longFormOffset + longFormHeight - bannerHeight) {
                     longFormBanner.style.position = 'absolute'
                     longFormBanner.style.marginTop = `${longFormHeight - bannerHeight - 20}px`
                  }

                  if (window.pageYOffset < longFormOffset) {
                     longFormBanner.style.position = 'relative'
                     longForm.classList.remove('banner-sticky')
                     longFormBanner.classList.remove('banner-sticky')
                  }
               }
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
               return <a key={link.id} href={link.url}>{link.label}</a>
            case 'dropdown':
               return (
                  <div className="dropdown" id="loans" key={link.id}>
                     <button className="dropbtn">
                        {link.label}
                        <img src="/assets/images/icons/down-chevron.svg" />
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
            <title>My Money Mantra</title>
            <link rel="preload" href="https://unpkg.com/gijgo@1.9.13/css/gijgo.min.css" rel="stylesheet" type="text/css" />
         </Head>

         {headerData ? <header className="header" ref={headerRef}>
            <a className="header-menu-icon" id="menu-icon">
               <img src="/assets/images/icons/menu.svg" alt="menu" />
            </a>
            <Link href="/">
               <a>
                  <img
                     className="header-logo"
                     src="/assets/images/icons/logo.png"
                     alt={headerData.logo.name}
                  />
               </a>
            </Link>

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