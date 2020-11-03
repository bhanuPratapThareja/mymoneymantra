import Strapi from '../providers/strapi'
const fetch = require("isomorphic-unfetch")

const App = () => {
    
    return (
        <></>
    )
}

export async function getServerSideProps(props) {
    console.log('Home Page')

    const strapi = new Strapi()
    const url = 'http://203.122.46.189:1337/header-items'
    const method = 'GET'

    console.log('url: ', url)
    const res = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })


    console.log('res: ', res)
    return { props: { } }
}

export default App