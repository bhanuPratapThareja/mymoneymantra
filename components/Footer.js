import { useEffect, useState } from 'react'
import Strapi from '../providers/strapi'

const Footer = () => {
    const strapi = new Strapi()
    const [footer, setFooter] = useState(null)

    useEffect(() => {
        // async function getFooter() {
        //     let footer = await strapi.processReq('GET', 'footer')
        //     setFooter(footer)
        // }
        // getFooter(footer)
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
        // <div className="footer">
        //     {footer ? <section className="container">
        //         <img className="footer-logo" src="../images/logo.png" alt={footer.logo.name} />

        //         <div className="top">

        //             <div className="top-main-links">
        //                 <ul>{renderLinks(footer.menu)}</ul>
        //             </div>

        //             <div className="top-primary-links">
        //                 <ul>{renderLinks(footer.quick_links)}</ul>
        //             </div>

        //             <div className="top-connect">
        //                 <h2>{footer.get_in_touch.heading}</h2>
        //                 <a className="mail" href="mailto:someone@example.com" target="_blank">
        //                     <h5>{footer.get_in_touch.contact}</h5>
        //                 </a>

        //                 <h2>
        //                     {footer.social_media.heading}
        //                 </h2>
        //                 <div className="top-connect-social">
        //                     {footer.social_media.plugins.map(plugin => {
        //                         return <a key={plugin.id} href={plugin.url} target="_blank">
        //                             <div className="top-connect-social-container">
        //                                 <img src={`${strapi.baseUrl}${plugin.icon.url}`} alt={plugin.icon.name} />
        //                             </div>
        //                         </a>
        //                     })}
        //                 </div>

        //                 <h2>{footer.get_our_app.heading}</h2>
        //                 <div className="stores">
        //                     {footer.get_our_app.links.map(link => {
        //                         return <a key={link.id} href={link.url} target="_blank">
        //                             <img src={`${strapi.baseUrl}${link.image.url}`} alt={link.image.name} />
        //                         </a>
        //                     })}
        //                 </div>
        //             </div>

        //         </div>

        //         <div className="bottom"><span>{footer.copyright}</span></div>

        //     </section> : null}
        // </div>

        <div className="footer">
            <section className="container">
                <img className="footer-logo" src="/assets/images/icons/logo.png" />

                <div className="top">
                    <div className="top-main-links">
                        <ul>
                            <a href="#">
                                <li>About us</li>
                            </a>
                            <a href="#">
                                <li>Meet the team</li>
                            </a>
                            <a href="#">
                                <li>Careers</li>
                            </a>
                            <a href="#">
                                <li>Our Partners</li>
                            </a>
                            <a href="#">
                                <li>Advisory Group</li>
                            </a>
                            <a href="#">
                                <li>Testimonials</li>
                            </a>
                            <a href="#">
                                <li>Press</li>
                            </a>
                            <a href="#">
                                <li>Privacy Policy</li>
                            </a>
                            <a href="#">
                                <li>Sitemap</li>
                            </a>
                        </ul>
                    </div>
                    <div className="top-primary-links">
                        <ul>
                            <a href="#">
                                <li>Home Loan</li>
                            </a>
                            <a href="#">
                                <li>Home Loan Balance Transfer</li>
                            </a>
                            <a href="#">
                                <li>Loan against Property</li>
                            </a>
                            <a href="#">
                                <li>Personal Loan</li>
                            </a>
                            <a href="#">
                                <li>Business Loan</li>
                            </a>
                            <a href="#">
                                <li>Gold Loan</li>
                            </a>
                            <a href="#">
                                <li>Health Insurance</li>
                            </a>
                            <a href="#">
                                <li>Life Insurance</li>
                            </a>
                            <a href="#">
                                <li>Credit Cards</li>
                            </a>
                            <a href="#">
                                <li>EMI Calculator</li>
                            </a>
                            <a href="#">
                                <li>Compound Interest Calculator</li>
                            </a>
                            <a href="#">
                                <li>Loan Prepayment Calculator</li>
                            </a>
                            <a href="#">
                                <li>RD Calculator</li>
                            </a>
                            <a href="#">
                                <li>FD Calculator</li>
                            </a>
                            <a href="#">
                                <li>Blog</li>
                            </a>
                            <a href="#">
                                <li>Credit Score</li>
                            </a>
                        </ul>
                    </div>
                    <div className="top-connect">
                        <h2>Get in touch</h2>
                        <a className="mail" href="mailto:someone@example.com" target="_blank">
                            <h5>contactus@mymoneymantra.com</h5>
                        </a>
                        <h2>Follow us</h2>
                        <div className="top-connect-social">
                            <a href="#" target="_blank">
                                <div className="top-connect-social-container">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.9 2H3.1C2.80826 2 2.52847 2.11589 2.32218 2.32218C2.11589 2.52847 2 2.80826 2 3.1V20.9C2 21.1917 2.11589 21.4715 2.32218 21.6778C2.52847 21.8841 2.80826 22 3.1 22H12.68V14.25H10.08V11.25H12.68V9C12.6261 8.47176 12.6885 7.93813 12.8627 7.43654C13.0369 6.93495 13.3188 6.47755 13.6885 6.09641C14.0582 5.71528 14.5068 5.41964 15.0028 5.23024C15.4989 5.04083 16.0304 4.96225 16.56 5C17.3383 4.99521 18.1163 5.03528 18.89 5.12V7.82H17.3C16.04 7.82 15.8 8.42 15.8 9.29V11.22H18.8L18.41 14.22H15.8V22H20.9C21.0445 22 21.1875 21.9715 21.321 21.9163C21.4544 21.861 21.5757 21.78 21.6778 21.6778C21.78 21.5757 21.861 21.4544 21.9163 21.321C21.9715 21.1875 22 21.0445 22 20.9V3.1C22 2.95555 21.9715 2.81251 21.9163 2.67905C21.861 2.54559 21.78 2.42433 21.6778 2.32218C21.5757 2.22004 21.4544 2.13901 21.321 2.08373C21.1875 2.02845 21.0445 2 20.9 2Z" fill="white"></path>
                                    </svg>
                                </div>
                            </a>
                            <a href="#" target="_blank">
                                <div className="top-connect-social-container">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.4701 2H3.53006C3.33964 1.99736 3.15056 2.03225 2.97362 2.10269C2.79669 2.17312 2.63536 2.27772 2.49886 2.41051C2.36235 2.54331 2.25334 2.70169 2.17805 2.87661C2.10276 3.05154 2.06267 3.23958 2.06006 3.43V20.57C2.06267 20.7604 2.10276 20.9485 2.17805 21.1234C2.25334 21.2983 2.36235 21.4567 2.49886 21.5895C2.63536 21.7223 2.79669 21.8269 2.97362 21.8973C3.15056 21.9678 3.33964 22.0026 3.53006 22H20.4701C20.6605 22.0026 20.8496 21.9678 21.0265 21.8973C21.2034 21.8269 21.3648 21.7223 21.5013 21.5895C21.6378 21.4567 21.7468 21.2983 21.8221 21.1234C21.8974 20.9485 21.9375 20.7604 21.9401 20.57V3.43C21.9375 3.23958 21.8974 3.05154 21.8221 2.87661C21.7468 2.70169 21.6378 2.54331 21.5013 2.41051C21.3648 2.27772 21.2034 2.17312 21.0265 2.10269C20.8496 2.03225 20.6605 1.99736 20.4701 2ZM8.09006 18.74H5.09006V9.74H8.09006V18.74ZM6.59006 8.48C6.17632 8.48 5.77953 8.31565 5.48697 8.02309C5.19442 7.73053 5.03006 7.33374 5.03006 6.92C5.03006 6.50626 5.19442 6.10947 5.48697 5.81692C5.77953 5.52436 6.17632 5.36 6.59006 5.36C6.80975 5.33509 7.03224 5.35686 7.24293 5.42389C7.45363 5.49092 7.6478 5.60169 7.81272 5.74896C7.97763 5.89624 8.10958 6.07668 8.19993 6.27848C8.29028 6.48029 8.33698 6.6989 8.33698 6.92C8.33698 7.14111 8.29028 7.35972 8.19993 7.56152C8.10958 7.76332 7.97763 7.94377 7.81272 8.09104C7.6478 8.23831 7.45363 8.34909 7.24293 8.41612C7.03224 8.48315 6.80975 8.50492 6.59006 8.48ZM18.9101 18.74H15.9101V13.91C15.9101 12.7 15.4801 11.91 14.3901 11.91C14.0527 11.9125 13.7242 12.0183 13.4489 12.2132C13.1735 12.4081 12.9645 12.6827 12.8501 13C12.7718 13.235 12.7379 13.4826 12.7501 13.73V18.73H9.75006V9.73H12.7501V11C13.0226 10.5271 13.419 10.1375 13.8965 9.8732C14.374 9.60889 14.9146 9.47985 15.4601 9.5C17.4601 9.5 18.9101 10.79 18.9101 13.56V18.74Z" fill="white"></path>
                                    </svg>
                                </div>
                            </a>
                            <a href="#" target="_blank">
                                <div className="top-connect-social-container">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 5.8C21.2483 6.12609 20.4534 6.34166 19.64 6.44C20.4982 5.92732 21.1413 5.12078 21.45 4.17C20.6436 4.65006 19.7608 4.98829 18.84 5.17C18.2245 4.50257 17.405 4.05829 16.5098 3.90685C15.6147 3.7554 14.6945 3.90535 13.8938 4.33319C13.093 4.76102 12.4569 5.44253 12.0852 6.27083C11.7135 7.09914 11.6273 8.02739 11.84 8.91C10.2094 8.82752 8.61444 8.40295 7.15865 7.66386C5.70287 6.92477 4.41885 5.88769 3.39 4.62C3.02914 5.25016 2.83952 5.96382 2.84 6.69C2.83872 7.36438 3.00422 8.02861 3.32176 8.62356C3.63929 9.21851 4.09902 9.72571 4.66 10.1C4.00798 10.0823 3.36989 9.90729 2.8 9.59V9.64C2.80489 10.5849 3.13599 11.4991 3.73731 12.228C4.33864 12.9568 5.17326 13.4556 6.1 13.64C5.74326 13.7486 5.37287 13.8058 5 13.81C4.74189 13.807 4.48442 13.7836 4.23 13.74C4.49391 14.5528 5.00462 15.2631 5.69107 15.7722C6.37753 16.2812 7.20558 16.5635 8.06 16.58C6.6172 17.7153 4.83588 18.3349 3 18.34C2.66574 18.3411 2.33174 18.3211 2 18.28C3.87443 19.4903 6.05881 20.1327 8.29 20.13C9.82969 20.146 11.3571 19.855 12.7831 19.2741C14.2091 18.6931 15.505 17.8339 16.5952 16.7465C17.6854 15.6591 18.548 14.3654 19.1326 12.9409C19.7172 11.5164 20.012 9.98972 20 8.45V7.92C20.7847 7.33481 21.4615 6.61742 22 5.8Z" fill="white"></path>
                                    </svg>
                                </div>
                            </a>
                            <a href="#" target="_blank">
                                <div className="top-connect-social-container">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23 9.71C23.0495 8.27865 22.7365 6.85802 22.09 5.58C21.6514 5.0556 21.0427 4.70171 20.37 4.58C17.5875 4.32752 14.7936 4.22404 12 4.27C9.21667 4.22196 6.43274 4.3221 3.66003 4.57C3.11185 4.66972 2.60454 4.92684 2.20003 5.31C1.30003 6.14 1.20003 7.56 1.10003 8.76C0.954939 10.9176 0.954939 13.0824 1.10003 15.24C1.12896 15.9154 1.22952 16.5858 1.40003 17.24C1.5206 17.7451 1.76455 18.2123 2.11003 18.6C2.51729 19.0035 3.03641 19.2752 3.60003 19.38C5.75594 19.6461 7.92824 19.7564 10.1 19.71C13.6 19.76 16.67 19.71 20.3 19.43C20.8775 19.3316 21.4112 19.0595 21.83 18.65C22.11 18.3699 22.3191 18.0271 22.44 17.65C22.7977 16.5526 22.9733 15.4041 22.96 14.25C23 13.69 23 10.31 23 9.71ZM9.74003 14.85V8.66L15.66 11.77C14 12.69 11.81 13.73 9.74003 14.85Z" fill="white"></path>
                                    </svg>
                                </div>
                            </a>
                        </div>
                        <h2>Get our app</h2>
                        <div className="stores">
                            <a href="#" target="_blank"><img src="/assets/images/icons/google.svg" /></a>
                            <a href="#" target="_blank"><img src="/assets/images/icons/apple.svg" /></a>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <span>©2020 MoneyMantra. All rights reserved.</span>
                </div>
            </section>
        </div>

    )
}

export default Footer