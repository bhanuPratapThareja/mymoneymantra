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
        getHeader()
    }, [])

    const renderMenuDropDown = dropdown_menu => {
        return dropdown_menu.dropdown_links.map(link => {
            return <a key={link.id} href={link.url}>{link.label}</a>
        })
    }

    const renderMenu = () => {
        return header.menu.links.map(link => {
            switch (link.type) {
                case 'anchor':
                    return <a key={link.id} href={link.url} >{link.label}</a>
                case 'dropdown':
                    return (
                        <div className="dropdown" id="loans" key={link.id}>
                            <button className="dropbtn">{link.label}</button>
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

            {header ? <header className="header">
                <a href="index.html">
                    <img
                        className="header-logo"
                        src={`${strapi.baseUrl}${header.logo.url}`}
                        alt={header.logo.name}
                    />
                </a>

                <div className="header-links">{renderMenu()}</div>

                <div className="header-access">
                    <div className="login-cta">
                        <button id="log_in">{header.login.label}</button>
                    </div>
                    <div className="signup-cta secondary-cta">
                        <button id="sign_up">{header.signup.label}</button>
                    </div>
                </div>
            </header> : null}
        </>
    )
}

export default Header