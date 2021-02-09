import Strapi from '../../providers/strapi'

const Image = ({ className, image, onImageClick }) => {
    const strapi = new Strapi()

    if (!image) {
        return null
    }

    let imgSrc = `${strapi.baseUrl}${image.url}`

    if(imgSrc.includes('amazonaws')) {
        imgSrc = `${image.url}`
    }


    return <img
        className={className}
        src={imgSrc}
        alt={image.name}
        onClick={onImageClick}
    />
}

export default Image