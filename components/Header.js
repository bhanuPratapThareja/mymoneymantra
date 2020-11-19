import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import Strapi from '../providers/strapi'

const Header = () => {
   const strapi = new Strapi()
   const headerRef = useRef()
   const [headerData, setHeaderData] = useState(null)

   useEffect(() => {
      window.onscroll = () => headerEffect(headerRef.current)
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
         <Head><title>Next Strapi App</title></Head>

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
                  <button id="sign_up">{headerData.signup.label}</button>
               </div>
            </div>
         </header> : null}
      </>
   )
}

export default Header