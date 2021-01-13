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

            <section className="menu-login">
               <div className="main">
                  <img className="menu-close" src="/assests/images/icons/cross.svg" />
                  <div className="profile">
                     <div className="image">
                        <img src="/assests/images/icons/profile.svg" />
                        <div className="hello">
                           <h2>Hello,</h2>
                           <h2 className="name">Shubham!</h2>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="content">
                  <div className="content-wrapper">
                     <a href="#">
                        <div className="data">
                           <img src="build/images/menu/login.svg" />
                           <h5>My Profile</h5>
                        </div>
                     </a>
                     <a href="#">
                        <div className="data">
                           <img src="build/images/menu/credit.svg" />
                           <h5>My Credit Score</h5>
                        </div>
                     </a>

                  </div>
                  <div className="content-wrapper">
                     <a href="#">
                        <div className="data">
                           <img src="build/images/menu/credit.svg" />
                           <h5>My Credit Score</h5>
                        </div>
                     </a>
                     <div className="data data-expand">
                        <div className="content-wraps">
                           <div className="data-expand-wrap">
                              <img src="build/images/menu/loans.svg" />
                              <h5>Loans</h5>
                           </div>
                           <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                 d="M14.83 12.036l-4.24-4.24a1 1 0 10-1.42 1.41l3.54 3.54-3.54 3.54a1 1 0 000 1.41 1 1 0 00.71.29 1 1 0 00.71-.29l4.24-4.24a1.002 1.002 0 000-1.42z"
                                 fill="#fff" /></svg>
                        </div>
                        <div className="sub-data">
                           <a href="https://www.google.com">
                              <div className="data">
                                 <img src="build/images/menu/credit.svg" />
                                 <h5>Sub data 1</h5>
                              </div>
                           </a>
                           <a href="#">
                              <div className="data">
                                 <img src="build/images/menu/credit.svg" />
                                 <h5>Sub data 2</h5>
                              </div>
                           </a>
                        </div>
                     </div>
                     <div className="data data-expand">
                        <div className="content-wraps">
                           <div className="data-expand-wrap">
                              <img src="build/images/menu/insurance.svg" />
                              <h5>Insurances</h5>
                           </div>
                           <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                 d="M14.83 12.036l-4.24-4.24a1 1 0 10-1.42 1.41l3.54 3.54-3.54 3.54a1 1 0 000 1.41 1 1 0 00.71.29 1 1 0 00.71-.29l4.24-4.24a1.002 1.002 0 000-1.42z"
                                 fill="#fff" /></svg>
                        </div>
                        <div className="sub-data">
                           <a href="#">
                              <div className="data">
                                 <img src="build/images/menu/credit.svg" />
                                 <h5>Sub data 3</h5>
                              </div>
                           </a>
                           <a href="#">
                              <div className="data">
                                 <img src="build/images/menu/credit.svg" />
                                 <h5>Sub data 4</h5>
                              </div>
                           </a>
                        </div>
                     </div>

                     <div className="data data-expand">
                        <div className="content-wraps">
                           <div className="data-expand-wrap">
                              <img src="build/images/menu/tools.svg" />
                              <h5>Financial Tools</h5>
                           </div>
                           <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                 d="M14.83 12.036l-4.24-4.24a1 1 0 10-1.42 1.41l3.54 3.54-3.54 3.54a1 1 0 000 1.41 1 1 0 00.71.29 1 1 0 00.71-.29l4.24-4.24a1.002 1.002 0 000-1.42z"
                                 fill="#fff" /></svg>
                        </div>
                     </div>
                  </div>

                  <div className="content-wrapper">
                     <a href="#">
                        <div className="data">
                           <img src="build/images/menu/blogs.svg" />
                           <h5>Blogs</h5>
                        </div>
                     </a>
                     <a href="#">
                        <div className="data">
                           <img src="build/images/menu/support.svg" />
                           <h5>Support</h5>
                        </div>
                     </a>

                  </div>

                  <div className="content-wrapper">
                     <a href="#">
                        <div className="data">
                           <img src="build/images/menu/logout.svg" />
                           <h5>Logout</h5>
                        </div>
                     </a>
                  </div>
               </div>
            </section>
            
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