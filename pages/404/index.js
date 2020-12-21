import Router from 'next/router'
import Link from 'next/link'
import { useRouter } from 'next/router'

const fourOFour = props => {
    const router = useRouter()
    return (
        <div>
            404
            {/* <Link><a href="#">Go back</a></Link> */}
        </div>

    )
}

export default fourOFour