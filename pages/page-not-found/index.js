import Link from 'next/link'
import { useRouter, withRouter } from 'next/router'
import { useEffect, useState } from 'react';

const PageNotFound = props => {
    const router = useRouter()
    const [basePath, setBasePath] = useState('/')

    useEffect(() => {
        setBasePath(router.query.primaryPath)
        console.log(router)
        console.log(props)
    }, [])

    // props.history.listen((location, action) => {
    //     if (action === 'POP') {
    //         router.push(`/${basePath}`)
    //     }
    // })

    return (
        <div>
            PageNotFound
            {/* <button onClick={goBack}>go back</button> */}
            {/* <Link href={`/${basePath}`}>
                <a style={{ textTransform: 'capitalize'}}>
                    Go back to {basePath.split('-').join(' ')}
                </a>
            </Link> */}
        </div>

    )
}

export default withRouter(PageNotFound)