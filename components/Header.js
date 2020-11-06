import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Strapi from '../providers/strapi'

const Header = () => {
    const strapi = new Strapi()
    const [headerItems, setHeadersItems] = useState(null);

    useEffect(() => {
        async function getHeadersItems() {
            let response = await fetch(`${strapi.baseUrl}/headers`)
            // console.log('res: ', response)
            const headerItems = await response.json()
            // console.log('headerItems: ', headerItems)
            setHeadersItems(headerItems)
        }
        // getHeadersItems()
    }, [])

    return (
        <>
            <Head>
                <title>Next Strapi App</title>
            </Head>
            {/* <AppBar position="static" style={{ backgroundColor: 'transparent' }}>
                <Toolbar>
                    <Typography>Logo</Typography>
                    {headerItems ? <div style={{ marginLeft: '10%', color: 'white' }}>
                        {headerItems.map((item, i) => {
                            return (
                                <Link style={{ marginLeft: '20px' }} classNameName={styles.header_link} href={item.url} key={i}>
                                    <a classNameName={router.asPath === item.url ? styles.active : styles.header_link}
                                    >{item.name}</a>
                                </Link>
                            )
                        })}
                    </div> : null}
                </Toolbar>
            </AppBar> */}

            <header className="header">
                <a className="header-menu-icon" id="menu-icon">
                    <img src="images/icons/menu.svg" alt="menu" />
                </a>
                <a href="index.html">
                    <img className="header-logo" src="images/icons/logo.png" alt="logo" />
                </a>
                <div className="header-links">
                    <a href="/credit-cards" className="header_active">Credit Cards</a>

                    <div className="dropdown" id="loans">
                        <button className="dropbtn header_active">Loans
                            <img src="images/icons/down-chevron.svg" />
                        </button>
                        <div className="dropdown-content">
                            <div className="dropdown-content-links">
                                <a href="#">Personal Loan</a>
                                <a href="#">Business Loan</a>
                                <a href="#">Home Loan</a>
                                <a href="#">Home Loan Balance Transfer</a>
                                <a href="#">Loan Against Property</a>
                                <a href="#">Gold Loan</a>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown" id="Insurance">
                        <button className="dropbtn">Insurance
                            <img src="images/icons/down-chevron.svg" />
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
                            <img src="images/icons/down-chevron.svg" />
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
                        <a href="#">Credit Score</a>
                    </div>
                </div>
                <div className="header-access">
                    <div className="login-cta">
                        <button id="log_in">Login</button>
                    </div>
                    <div className="signup-cta secondary-cta">
                        <button id="sign_up">Sign up</button>
                    </div>
                </div>
            </header>
        </>
    )
}

export async function getServerSideProps(props) {
   console.log(props.resolvedUrl)
    return { props: {  } }
}


export default Header;