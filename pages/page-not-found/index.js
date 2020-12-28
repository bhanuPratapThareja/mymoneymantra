import Router from 'next/router'
import Link from 'next/link'
import { useRouter } from 'next/router'

const PageNotFound = props => {
    const router = useRouter()
    return (
        <div>
            PageNotFound
            {/* <Link><a href="#">Go back</a></Link> */}
        </div>

    )
}

export default PageNotFound