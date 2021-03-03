import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getPersonalInfo, getPictureservice } from "../utils/userProfileService";

const SideMenu = (props) => {
const [picture, setpicture] = useState('/assets/images/icons/profile.svg')
const [name, setName] = useState('Guest');
const router=useRouter();
   useEffect(() => {
      
      getPicture();
      getInfo();
   },[]);
   const logout=(e)=>{
      e.preventDefault();
      localStorage.setItem('customerId','');
      setName('Guest');
      setpicture('/assets/images/icons/profile.svg')
      router.push('/','/',{shallow:false})
   }
   
   const getInfo = () => {
      getPersonalInfo()
        .then((res) => {
          console.log({ res })
          const { firstName} = res
          setName(firstName);
        })
        .catch((err) => {
          console.log(err)
          setName('Guest');
        })
    }
   const checkCustomerId=()=>{
      return localStorage.getItem('customerId');
   }
   
   const getPicture = async () => {
      console.log('in side .........')
      try {
        const responseObject= await getPictureservice();
        if (responseObject.status === 200) {
          
          let res = responseObject.data.docList
          let i = -1
          res.forEach((item, index) => {
            // console.log(item)
            if (item.documentTypeId == 2130000043) i = item.documentId
          })
          
          if (i > 0) {
            
            
            setTimeout(()=>getPictureByte(i),3000)
            
          }
        }
      } catch (err) {
         console.log(err)
         setpicture('/assets/images/icons/profile.svg')
      }
    }

    const getPictureByte = async (id) => {
      try {
         
        const responseObject = await axios.get(
          'http://203.122.46.189:8061/customer/api/profile/v1/doc',
          { params: { documentId: id } }
        )
      //
        setpicture(`data:image/png;base64,${responseObject.data.docByte}`)
      } catch (err) {
         console.log(err);
      }
    }

   const onCloseSideMenu = () => {
      $(".menu-login").hide("slide");
      $('body', "html").css("overflow", "scroll")
   }

   const onDataExpand = (i) => {
      const els = document.getElementsByClassName('data-expand')
      const el = els[i]
      $(el).find(".sub-data").slideToggle("slow");
      $(el).find("svg").toggleClass("rotate-menu-icons")
   }

   return (
      <section className="menu-login" id="side-menu">
         <div className="main">
            <img className="menu-close" onClick={onCloseSideMenu} src="/assets/images/icons/cross.svg" />
            <div className="profile">
               <div className="image">
                  <img src={picture}  style={{height:'64px', width:'64px'}}/>
                  <div className="hello">
                     <h2>Hello,</h2>
                     <h2 className="name">{name}!</h2>
                  </div>
               </div>
            </div>
         </div>
         <div className="content">
            { !checkCustomerId() ? <div className="content-wrapper">
               <a href="/login">
                  <div className="data">
                     <img src="/assets/images/menu/login.svg" />
                     <h5>Login</h5>
                  </div>
               </a>
               <a href="/sign-up">
                  <div className="data">
                     <img src="/assets/images/menu/credit.svg" />
                     <h5>Sign Up</h5>
                  </div>
               </a>

            </div> : <div className="content-wrapper">
               <a href="/user-profile">
                  <div className="data">
                     <img src="/assets/images/menu/login.svg" />
                     <h5>My Profile</h5>
                  </div>
               </a>
               <a href="/credit-score">
                  <div className="data">
                     <img src="/assets/images/menu/credit.svg" />
                     <h5>My Credit Score</h5>
                  </div>
               </a>

            </div>}
            <div className="content-wrapper">
               <a href="/credit-cards">
                  <div className="data">
                     <img src="/assets/images/menu/credit.svg" />
                     <h5>Credit Cards</h5>
                  </div>
               </a>
               <div className="data data-expand" onClick={() => onDataExpand(0)}>
                  <div className="content-wraps">
                     <div className="data-expand-wrap">
                        <img src="/assets/images/menu/loans.svg" />
                        <h5>Loans</h5>
                     </div>
                     <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                           d="M14.83 12.036l-4.24-4.24a1 1 0 10-1.42 1.41l3.54 3.54-3.54 3.54a1 1 0 000 1.41 1 1 0 00.71.29 1 1 0 00.71-.29l4.24-4.24a1.002 1.002 0 000-1.42z"
                           fill="#fff" /></svg>
                  </div>
                  <div className="sub-data">
                     <a href="/personal-loans">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Personal Loan</h5>
                        </div>
                     </a>
                     <a href="/business-loans">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Business Loan</h5>
                        </div>
                     </a>
                     <a href="/home-loans">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Home Loan</h5>
                        </div>
                     </a>
                     <a href="/home-loan-balance-transfer">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Home Loan Balance Transfer</h5>
                        </div>
                     </a>
                     <a href="/loan-against-property">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Loan Against Property</h5>
                        </div>
                     </a>
                     <a href="/gold-loans">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Gold Loan</h5>
                        </div>
                     </a>
                  </div>
               </div>
               <div className="data data-expand" onClick={() => onDataExpand(1)}>
                  <div className="content-wraps">
                     <div className="data-expand-wrap">
                        <img src="/assets/images/menu/insurance.svg" />
                        <h5>Insurances</h5>
                     </div>
                     <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                           d="M14.83 12.036l-4.24-4.24a1 1 0 10-1.42 1.41l3.54 3.54-3.54 3.54a1 1 0 000 1.41 1 1 0 00.71.29 1 1 0 00.71-.29l4.24-4.24a1.002 1.002 0 000-1.42z"
                           fill="#fff" /></svg>
                  </div>
                  <div className="sub-data">
                     <a href="/insurance/health-insurance">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Health Insurance</h5>
                        </div>
                     </a>
                     <a href="/insurance/life-insurance">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Life Insurance</h5>
                        </div>
                     </a>
                  </div>
               </div>

               <div className="data data-expand" onClick={() => onDataExpand(2)}>
                  <div className="content-wraps">
                     <div className="data-expand-wrap">
                        <img src="/assets/images/menu/tools.svg" />
                        <h5>Financial Tools</h5>
                     </div>
                     <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                           d="M14.83 12.036l-4.24-4.24a1 1 0 10-1.42 1.41l3.54 3.54-3.54 3.54a1 1 0 000 1.41 1 1 0 00.71.29 1 1 0 00.71-.29l4.24-4.24a1.002 1.002 0 000-1.42z"
                           fill="#fff" /></svg>
                  </div>
                  <div className="sub-data">
                     <a href="/financialTool/emi-calculator">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>EMI Calculator</h5>
                        </div>
                     </a>
                     <a href="/financialTool/home-loan-emi-calculator">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Home Loan EMI Calculator</h5>
                        </div>
                     </a>
                     <a href="/financialTool/personal-loan-emi-calculator">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Peronal Loan EMI Calculator</h5>
                        </div>
                     </a>
                     <a href="/financialTool/business-loan-emi-calculator">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Business Loan EMI Calculator</h5>
                        </div>
                     </a>
                     <a href="/financialTool/compound-interest-calculator">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Compound Interest Calculator</h5>
                        </div>
                     </a>
                     <a href="/financialTool/loan-prepayment-calculator">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Loan Prepayment Calculator</h5>
                        </div>
                     </a>
                     <a href="/financialTool/rd-calculator">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>RD Calculator</h5>
                        </div>
                     </a>
                     <a href="/financialTool/fd-calculator">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>FD Calculator</h5>
                        </div>
                     </a>
                  </div>
               </div>
            </div>

            <div className="content-wrapper">
               <a href="/blog">
                  <div className="data">
                     <img src="/assets/images/menu/blogs.svg" />
                     <h5>Blogs</h5>
                  </div>
               </a>
               <a href="#">
                  <div className="data">
                     <img src="/assets/images/menu/support.svg" />
                     <h5>Support</h5>
                  </div>
               </a>

            </div>

            <div className="content-wrapper" style={{display:checkCustomerId() ? 'block' :'none' }}>
               <a href="#" onClick={logout}>
                  <div className="data" >
                     <img src="/assets/images/menu/logout.svg" />
                     <h5>Logout</h5>
                  </div>
               </a>
            </div>
         </div>
      </section>
   )
}

export default SideMenu