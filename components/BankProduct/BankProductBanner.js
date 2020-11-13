import Strapi from '../../providers/strapi';

const BankProductBanner= props =>{
    const strapi = new Strapi()
    const {button,heading,image,sub_text}= props.data;
    return(
        <div className="credit-card-flow">
        <section className="banner container">
            <div className="banner-wrapper">
    <h1>{heading}</h1>
                <p>{sub_text}</p>
    <button>{button}</button>
            </div>
            <div>
                <img className="banner-card" src={`${strapi.baseUrl}${image.url}`} alt={image.name} />             
            </div> 
        </section>
        </div>
    )
}

export default BankProductBanner;