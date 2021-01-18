import Strapi from '../../providers/strapi'
import { ReactSVG } from 'react-svg'

const SvgImage = ({ className, image, onImageClick }) => {
    const strapi = new Strapi()

    if (!image) {
        return null
    }

    return <ReactSVG
        className={className}
        src={`${strapi.baseUrl}${image.url}`}
        alt={image.name}
        onClick={onImageClick}
    />
}

export default SvgImage