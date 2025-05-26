
// function to render reusable components in index page


function renderReusableComponents(url , targetSelector){

    const promise = new Promise((resolve, reject) => {

        try{

        const targetElement = document.querySelector(targetSelector);

        if(!targetElement){

            throw new Error(`Relevant Target Selector Has Not Been Found`);
        }

        const getComponentHtml = fetch(`components/${url}`);
                
        getComponentHtml.then((response) => {

            if(!response.ok){
                        
                throw new Error(`${response.status} Error Has Been Occurred`);
        
            }

            const result = response.text();

            return result;

        })
        .then((componentHtml) => {

            targetElement.innerHTML = componentHtml;

            resolve();

        })
        .catch((error) => {

            console.log(error.message);

        })

        }

        catch(error){

            console.log(error.message);
        }
        
    });

    return promise;

}
   

renderReusableComponents("header-top/header-top.html" , "#headerTop-section");

renderReusableComponents("header-main/header-main.html" , "#headerMain-section")

.then(() => {

    renderNavbar(navbarContents , "#desktop-navbar")

    renderNavbar(navbarContents , "#mobile-navbar")

});

renderReusableComponents("footer/footer.html" , "#footer-section")

.then(() => {

    renderFooterLinks()

});


// functions to make/render dynamic html elements  //


const footerContents = [

    {
        title: "Community",

        links: ["Doctors" , "Testimonials" , "FAQs" , "Blog" , "Site Map"]
    },

    {
        title: "About",

        links: ["Careers" , "Education" , "About Us" , "Area Of Care" , "Volunteers"]
    },

    {
        title: "Support",

        links: ["Visitor Information" , "Emergency Care" , "Donate" , "Online Services" , "Pay Your Bills"]
    },

    {
        title: "Trust & Legal",

        links: ["Terms & Conditions" , "Privacy Policy" , "Hospital Stay"],

        MediaLink:{

            title: "Social Media",

            icons: ["fa-facebook-f" , "fa-x-twitter" , "fa-instagram" , "fa-linkedin-in"]
        }
    }

];

const navbarContents = ["home" , "about us" , "blog" , "contact us"];

let html1 = "";

let html2 = "";

let html3 = "";

function renderNavbar(elementData , targetSelector){

    const targetElement = document.querySelector(targetSelector);

    try{

        if(!targetElement){

            throw new Error("target element not been found");
        }

        else if(!Array.isArray(elementData)){

            throw new Error("element data must be type of array");
        }
                
        elementData.map(function(Data , index){

        const navLink = `<li class='nav-item'><a href="#" class='nav-link ${index === 0 ? "active" : ""}'>${Data}</a></li>`;

        if(targetSelector === "#desktop-navbar"){

            html1 += navLink;
        }

        else{

            html2 += navLink;
        }

        });

        targetElement.innerHTML = targetSelector === "#desktop-navbar" ? html1 : html2;

    }

    catch(error){

    console.log(error.message);

    }

}


function renderFooterLinks(){

    const footerSection = document.querySelector(".footer-section");

    html3 += "<div class='row'>";

    footerContents.forEach((footerContent , index) => {

        html3 += `<div class='col-sm-6 col-md-6 col-lg-3 footer-links' id='footer-link${index + 1}'>
                        <h3>
                            ${footerContent.title}
                        </h3>
                    <ul>`;

        footerContent.links.forEach((link) => {

            html3  += `<li><a href="#">${link}</a></li>`;

        });

        html3 += "</ul>";

        if(index === footerContents.length - 1){

            html3 += `<div class='social-links'>
                            <span>${footerContent.MediaLink.title}</span>
                      <ul>`;
                        
            footerContent.MediaLink.icons.forEach((icon) => {

                 html3 += `<a href="#"><i class='fa-brands ${icon} footer-icons'></i></a>`;

            });

            html3 += "</ul></div>";
                    
            }

            html3 += "</div>";

        });

        html3 += "</div>"

        footerSection.innerHTML = html3;
    }


// // function when windows load home page appears //

// const mainContent = document.querySelector("#main-section");

// async function loadPage(url){

//     try{

//         const response = await fetch(`../pages/${url}`);
        
//         if(!response.ok){

//             throw new Error(`${response.status} Error Has Been Occurred!`);
//         }

//         const homeHtml = await response.text();

//         mainContent.innerHTML = homeHtml ;

//     }

//     catch(error){

//         console.log(error.message);
//     }
// }


// loadPage("home/home.html")


// // handle different page contents on navbar click //

// const navbarSection = document.querySelector("#navbar-section");

// function handleNavbarEvent(){

//    navbarSection.addEventListener("click" , function(event){

//     event.preventDefault();

//     if(event.target.classList.contains("nav-links")){

//         const pageName = event.target.dataset.name;

//         loadPage(`${pageName}/${pageName}.html`);
//     }

//    });
// }


// handleNavbarEvent()
