import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import styles from '../../styles/Header.module.css'
import Strapi from '../../providers/strapi'

const Header = () => {
    const strapi = new Strapi()
    const router = useRouter()
    const [headerItems, setHeadersItems] = useState(null);

    useEffect(() => {
        async function getHeadersItems() {
            let response = await fetch(`${strapi.baseUrl}/header-menu-items`)
            const headerItems = await response.json()
            setHeadersItems(headerItems)
        }
        getHeadersItems()
    }, [])

    return (
        <>
            <Head>
                <title>Next Strapi App</title>
            </Head>
            <AppBar position="static" style={{ backgroundColor: 'transparent' }}>
                <Toolbar>
                    <Typography>Logo</Typography>
                    {headerItems ? <div style={{ marginLeft: '10%', color: 'white' }}>
                        {headerItems.map((item, i) => {
                            return (
                                <Link style={{ marginLeft: '20px' }} className={styles.header_link} href={item.url} key={i}>
                                    <a className={router.asPath === item.url ? styles.active : styles.header_link}
                                    >{item.name}</a>
                                </Link>
                            )
                        })}
                    </div> : null}
                </Toolbar>
            </AppBar>

            <style jsx>{`
                a {
                    margin-left: 20px
                }
            `}</style>
        </>
    )
}

export default Header;