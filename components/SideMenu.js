const SideMenu = () => {

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
                  <img src="/assets/images/icons/profile.svg" />
                  <div className="hello">
                     <h2>Hello,</h2>
                     <h2 className="name">Rakesh Pawa!</h2>
                  </div>
               </div>
            </div>
         </div>
         <div className="content">
            <div className="content-wrapper">
               <a href="#">
                  <div className="data">
                     <img src="/assets/images/menu/login.svg" />
                     <h5>My Profile</h5>
                  </div>
               </a>
               <a href="#">
                  <div className="data">
                     <img src="/assets/images/menu/credit.svg" />
                     <h5>My Credit Score</h5>
                  </div>
               </a>

            </div>
            <div className="content-wrapper">
               <a href="#">
                  <div className="data">
                     <img src="/assets/images/menu/credit.svg" />
                     <h5>My Credit Score</h5>
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
                     <a href="https://www.google.com">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Sub data 1</h5>
                        </div>
                     </a>
                     <a href="#">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Sub data 2</h5>
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
                     <a href="#">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Sub data 3</h5>
                        </div>
                     </a>
                     <a href="#">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Sub data 4</h5>
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
                     <a href="#">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Sub data 3</h5>
                        </div>
                     </a>
                     <a href="#">
                        <div className="data">
                           <img src="/assets/images/menu/credit.svg" />
                           <h5>Sub data 4</h5>
                        </div>
                     </a>
                  </div>
               </div>
            </div>

            <div className="content-wrapper">
               <a href="#">
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

            <div className="content-wrapper">
               <a href="#">
                  <div className="data">
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