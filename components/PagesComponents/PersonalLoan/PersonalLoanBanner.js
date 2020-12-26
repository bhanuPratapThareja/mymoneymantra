import Image from '../../ImageComponent/ImageComponent';

const PersonalLoanBanner = props => {
   const { product_banner_heading, product_banner_sub_text, 
      product_banner_image, product_banner_button_text } = props.data.product_banner
   return (
      <section className="banner">
         <div className="banner-wrapper">
            <div className="normal-banner">
               <div dangerouslySetInnerHTML={{ __html: product_banner_heading }}></div>
               <div dangerouslySetInnerHTML={{ __html: product_banner_sub_text }}></div>
               <button>{product_banner_button_text}</button>
            </div>
            <Image className="pl-image" image={product_banner_image} />
         </div>
      </section>
   )
}

export default PersonalLoanBanner