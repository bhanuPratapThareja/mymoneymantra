import Strapi from '../../providers/strapi'

const Image = ({ className, image }) => {
    const strapi = new Strapi()

    if (!image) {
        return null
    }

    return <img
        className={className}
        src={`${strapi.baseUrl}${image.url}`}
        alt={image.name}
    />
}

export default Image