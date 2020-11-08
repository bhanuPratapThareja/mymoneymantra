import { useEffect, useState } from 'react'
import Strapi from '../providers/strapi'

const Footer = () => {
    const strapi = new Strapi()
    const [footer, setFooter] = useState(null)

    useEffect(() => {
        async function getFooter() {
            let footer = await strapi.processReq('GET', 'footer')
            console.log('footer: ', footer)
            setFooter(footer)
        }
        getFooter(footer)
    }, [])

    const renderLinks = ({ links }) => {
        return links.map(link => {
            return (
                <a href={link.url} key={link.id}>
                    <li>{link.label}</li>
                </a>
            )
        })
    }

    return (
        <div className="footer">
            {footer ? <section className="container">
                <img className="footer-logo" src={`${strapi.baseUrl}${footer.logo.url}`} alt={footer.logo.name} />

                <div className="top">

                    <div className="top-main-links">
                        <ul>{renderLinks(footer.menu)}</ul>
                    </div>

                    <div className="top-primary-links">
                        <ul>{renderLinks(footer.quick_links)}</ul>
                    </div>

                    <div className="top-connect">
                        <h2>{footer.get_in_touch.heading}</h2>
                        <a className="mail" href="mailto:someone@example.com" target="_blank">
                            <h5>{footer.get_in_touch.contact}</h5>
                        </a>

                        <h2>
                            {footer.social_media.heading}
                        </h2>
                        <div className="top-connect-social">
                            {footer.social_media.plugins.map(plugin => {
                                return <a key={plugin.id} href={plugin.url} target="_blank">
                                    <div className="top-connect-social-container">
                                        <img src={`${strapi.baseUrl}${plugin.icon.url}`} alt={plugin.icon.name} />
                                    </div>
                                </a>
                            })}
                        </div>

                        <h2>{footer.get_our_app.heading}</h2>
                        <div className="stores">
                            {footer.get_our_app.links.map(link => {
                                return <a key={link.id} href={link.url} target="_blank">
                                    <img src={`${strapi.baseUrl}${link.image.url}`} alt={link.image.name} />
                                </a>
                            })}
                        </div>
                    </div>

                </div>

                <div className="bottom"><span>{footer.copyright}</span></div>

            </section> : null}
        </div>
    )
}

export default Footer