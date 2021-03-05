import Head from 'next/head'
import Link from 'next/link'
import Strapi from '../providers/strapi'
import SideMenu from './SideMenu'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import { isScrolledIntoView } from '../utils/elementInView'
import { getDevice } from '../utils/getDevice'
import $ from 'jquery'
import { getItem, keys, setItem } from '../utils/storage'

const Header = () => {
   const router = useRouter()
   const strapi = new Strapi()

   const headerRef = useRef()
   const [headerData, setHeaderData] = useState(null)
   const [headerClasses, setHeaderClasses] = useState('header')
   const [isLoggedId, setisLoggedId] = useState(false)
   let longFormBanner = null
   let longForm = null

   useEffect(() => {

      if (router.pathname === '/' && getDevice() !== 'desktop') {
         setHeaderClasses('header mobile-header')
      }

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

      const customerId = getItem(keys.customerId);
      if (customerId && customerId !== '' && customerId !== null && customerId !== undefined) {
         setisLoggedId(true);
      }
      else {
         setisLoggedId(false);

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

   const onOpenSideMenu = () => {
      $(".menu-login").show("slide");
      $('body', "html").css("overflow", "hidden")
   }
   const logout = async () => {
      // setisLoggedId(false);

      setItem(keys.customerId,null);
      setTimeout(() =>
         router.push('/', '/', { shallow: false }), 300
      )

   }
   return (
      <>
         <Head>
            <link rel="preload" href="https://unpkg.com/gijgo@1.9.13/css/gijgo.min.css" rel="stylesheet" type="text/css" />
         </Head>

         {headerData ? <header className={headerClasses} ref={headerRef}>
            <a className="header-menu-icon" id="menu-icon" >
               <img src="/assets/images/icons/menu.svg" alt="menu" onClick={onOpenSideMenu} />
            </a>

            <SideMenu menuData={headerData} />

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

               {!isLoggedId ? <><div className="login-cta">
                  <button id="log_in"><a href="/login">{headerData.login.label}</a></button>
               </div>
                  <div className="signup-cta secondary-cta">
                     <div className="border"></div>
                     <button id="sign_up"><a href="/sign-up">{headerData.signup.label}</a></button>
                  </div></> : <>
                     <div className="login-cta">
                        <button id="log_in"><a href="/user-profile">My Profile</a></button>
                     </div>
                     <div className="signup-cta secondary-cta">
                        <div className="border"></div>
                        <button id="sign_up" onClick={(e) => { logout(); e.preventDefault() }}>Logout</button>
                     </div>
                  </>
               }
            </div>
         </header> : null}
      </>
   )
}

export default Header