import Head from 'next/head'
import { useEffect, useState } from 'react'
import Strapi from '../providers/strapi'

const Header = () => {
    const strapi = new Strapi()
    const [header, setHeader] = useState(null)

    useEffect(() => {
        async function getHeader() {
            let header = await strapi.processReq('GET', 'header')
            setHeader(header)
        }
      //   getHeader()
    }, [])

    const renderMenuDropDown = ({ dropdown_links }) => {
        return dropdown_links.map(link => {
            return <a key={link.id} href={link.url}>
                {link.label}
            </a>
        })
    }

    const renderMenu = () => {
        return header.menu.links.map(link => {
            switch (link.type) {
                case 'anchor':
                    return <a key={link.id} href={link.url} >{link.label}</a>
                case 'dropdown':
                    return (
                        <div classNameName="dropdown" id="loans" key={link.id}>
                            <button classNameName="dropbtn">
                                {link.label}
                                <img src="../images/icons/down-chevron.svg" />
                            </button>
                            <div classNameName="dropdown-content">
                                <div classNameName="dropdown-content-links">
                                    {renderMenuDropDown(link.dropdown_menu)}
                                </div>
                            </div>
                        </div>
                    )
            }
        })
    }

    return (
        // <>
        //     <Head><title>Next Strapi App</title></Head>

        //     {header ? <header classNameName="header">
        //         <a href="index.html">
        //             <img
        //                 classNameName="header-logo"
        //                 src="../images/logo.png"
        //                 alt={header.logo.name}
        //             />
        //         </a>

        //         <div classNameName="header-links">{renderMenu()}</div>

        //         <div classNameName="header-access">
        //             <div classNameName="login-cta">
        //                 <button id="log_in">{header.login.label}</button>
        //             </div>
        //             <div classNameName="signup-cta secondary-cta">
        //                 <button id="sign_up">{header.signup.label}</button>
        //             </div>
        //         </div>
        //     </header> : null}
        // </>

        <header className="header">
      <a href="index.html">
         <img className="header-logo" src="../images/logo.png" alt="logo" />
      </a>
      <div className="header-links">
         <a href="/credit-cards" className="dropbtn">Credit Cards</a>
         <div className="dropdown" id="loans">
            <button className="dropbtn">Loans
               <img src="../images/icons/down-chevron.svg" />
            </button>
            <div className="dropdown-content">
               <div className="dropdown-content-links">
                  <a href="#">Personal Loan</a>
                  <a href="#">Business Loan</a>
                  <a href="/home-loan">Home Loan</a>
                  <a href="#">Home Loan Balance Transfer</a>
                  <a href="#">Loan Against Property</a>
                  <a href="#">Gold Loan</a>
               </div>
            </div>
         </div>
         <div className="dropdown" id="Insurance">
            <button className="dropbtn">Insurance
               <img src="../images/icons/down-chevron.svg" />
            </button>
            <div className="dropdown-content">
               <div className="dropdown-content-links">
                  <a href="#">Health Insurance</a>
                  <a href="#">Life Insurance</a>
               </div>
            </div>
         </div>
         <div className="dropdown" id="Financial">
            <button className="dropbtn">Financial tools
               <img src="../images/icons/down-chevron.svg" />
            </button>
            <div className="dropdown-content">
               <div className="dropdown-content-links">
                  <a href="#">EMI Calculator</a>
                  <a href="#">Home Loan EMI Calculator</a>
                  <a href="#">Personal Loan EMI Calculator</a>
                  <a href="#">Business Loan EMI Calculator</a>
                  <a href="#">Compound Interest Calculator</a>
                  <a href="#">Loan Prepayment Calculator</a>
                  <a href="#">RD Calculator</a>
                  <a href="#">FD Calculator</a>
               </div>
            </div>
         </div>
         <a href="#" className="dropbtn">Blog</a>
         <div className="credit-score">
            <a href="#" className="header_active">Credit Score</a>
         </div>
      </div>
      <div className="header-access">
         <div className="login-cta">
            <button id="log_in">Login</button>
         </div>
         <div className="signup-cta secondary-cta">
            <div className="border"></div>
            <button id="sign_up">Sign up</button>
         </div>
      </div>
   </header>
    )
}

export default Header