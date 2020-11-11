import { useEffect, useState } from 'react'
import $ from 'jquery'

const LearnMore = props => {
   console.log("inside Learn more props", props);
   const sectionHeading = props.data.section_heading;
   const sectionData = props.data.section;
   console.log("sectionData", sectionData)
   const [learnMore, setLearnMore] = useState([]);

   useEffect(() => {
      console.log('inside useEffect');
      $(".learn-more-wrapper-content .question").click(function () {
         console.log('inside useEffect 1');
         $("#" + this.id + "-ans").slideToggle("ease-in-out");
         $("#" + this.id).find("svg").toggleClass("question-active");
         $("#" + this.id).toggleClass("question-open")
      })

      //inputs with dropdown
      $('input').blur(function () {
         $('input').closest("div").removeClass("active-input");
         $("#" + this.id + "-drop").hide("slow");

      })
         .focus(function () {
            $(this).closest(".form__group").removeClass('filled-input');
            $(this).closest(".form__group").addClass("active-input");
            $("#" + this.id + "-drop").show("slow");

         });


         // sectionData.forEach((section, index) => {
         //    let cssData = {};

         //    cssData.id  ="ques-" + (index+1)
           
         //    sectionData[index].cssData = cssData;

         // })

         // console.log('sectionData ======',sectionData)


   })


   return (
      <section data-aos="fade-up" className="container aos-init aos-animate">
         <div className="learn-more">
            <h2>{sectionHeading}</h2>
            <div className="learn-more-wrapper">

               {sectionData.map((secData,index )=> {
                  return (
                     <div className="learn-more-wrapper-content" key={secData.id}>
                        <div className="question" id={`ques-${index}`}>
                           <h3>{secData.heading}</h3>
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z" fill="white"></path>
                           </svg>
                        </div>
                        <div className="answer" id={`ques-${index}-ans`}>
                           {secData.questions_and_answers}
                        </div>
                     </div>
                  )
               })}
            </div>
         </div>
      </section>
   )
}

export default LearnMore