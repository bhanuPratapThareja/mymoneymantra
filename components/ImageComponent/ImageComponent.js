import Strapi from '../../providers/strapi'

const Image = ({ className, image, onImageClick }) => {
    const strapi = new Strapi()

    if (!image) {
        return null
    }

    return <img
        className={className}
        src={`${image.url}`}
        alt={image.name}
        onClick={onImageClick}
    />
}

export default Image