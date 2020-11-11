import { useEffect } from 'react'
import $ from 'jquery'

const LearnMore = props => {

   console.log(props.data)
   const { section_heading, section } = props.data

   useEffect(() => {
      $(".learn-more-wrapper-content .question").click(function () {
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
   })

   return (
      <section data-aos="fade-up" className="container aos-init aos-animate">
         <div className="learn-more">
            <h2>{section_heading}</h2>
            <div className="learn-more-wrapper">
               {section.map((section, i) => {
                  return (
                     <div className="learn-more-wrapper-content">
                        <div className="question" id={`ques-${i}`}>
                           <h3>{section.heading}</h3>
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16.9999 9.79079C16.8126 9.60454 16.5591 9.5 16.2949 9.5C16.0308 9.5 15.7773 9.60454 15.5899 9.79079L11.9999 13.3308L8.45995 9.79079C8.27259 9.60454 8.01913 9.5 7.75495 9.5C7.49076 9.5 7.23731 9.60454 7.04995 9.79079C6.95622 9.88376 6.88183 9.99436 6.83106 10.1162C6.78029 10.2381 6.75415 10.3688 6.75415 10.5008C6.75415 10.6328 6.78029 10.7635 6.83106 10.8854C6.88183 11.0072 6.95622 11.1178 7.04995 11.2108L11.2899 15.4508C11.3829 15.5445 11.4935 15.6189 11.6154 15.6697C11.7372 15.7205 11.8679 15.7466 11.9999 15.7466C12.132 15.7466 12.2627 15.7205 12.3845 15.6697C12.5064 15.6189 12.617 15.5445 12.7099 15.4508L16.9999 11.2108C17.0937 11.1178 17.1681 11.0072 17.2188 10.8854C17.2696 10.7635 17.2957 10.6328 17.2957 10.5008C17.2957 10.3688 17.2696 10.2381 17.2188 10.1162C17.1681 9.99436 17.0937 9.88376 16.9999 9.79079Z" fill="white"></path>
                           </svg>
                        </div>
                        <div className="answer" id={`ques-${i}-ans`}>
                           {section.questions_and_answers}
                           {/* <h3>What are the benefits of using a credit card?</h3>
                     <ol>
                        <li>Credit Cards are the perfect alternative to cash. There is no need of carrying large
                        amounts of money when you have a Credit Card.
                     </li>
                        <li>You get an interest-free window depending on the date of billing and the due date. The
                        maximum interest-free period is between 52 and 55 days.
                     </li>
                        <li>Credit cardholders can avail cash advance facility on an urgent basis. Every Credit Card
                        comes with a cash advance limit. Note that this is not an interest-free advance. You
                        have to pay interest on the cash advance portion from day 1.
                     </li>
                        <li>You can own a Credit Card and enjoy various benefits that come with it such as bonus
                        points, gift vouchers, rewards programs, cashback benefits, and multiple other benefits.
                        Banks allow credit cardholders to apply for add-on cards for their family members. They
                        can use these cards on an individual basis.
                     </li>
                        <li>Banks issue unique Credit Cards that allow the cardholders to avail travel benefits like
                        air miles, airport lounge access, airline offers, hotel offers, and travel insurance.
                        These cards are also known as Co-branded Credit Cards.
                     </li>
                     </ol>
                     <h3>Why Apply for a Credit Card through MyMoneyMantra?</h3>
                     <p>MyMoneyMantra can help you:</p>
                     <p>- Choose the best option among the different cards available </p>
                     <p>- Opt for banks that charge lower application and renewal fees </p>
                     <p>- With a quick turnaround time </p>
                     <p>- Understand various features of the Credit Card </p> */}
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