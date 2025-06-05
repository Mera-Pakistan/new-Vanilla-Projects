
const pageUrls = {

    home: "home/home.html",

    about: "about-us/about-us.html",

    blog: "blog/blog.html",

    contact: "contact-us/contact-us.html",

}

const pageComponents = {

    navbar: {

        data: [{label: "home"} , {label: "about"} , {label: "blog"} , {label: "contact"}],

        targets: [

            { Selector: "#desktop-navbar" },

            { Selector: "#mobile-navbar" }

        ]
        
       
    },

    home: 
    
    [
        { 
            url: "slider/slider.html" , 
                
            target: "#slider-section",

            onLoad:  launchHomeSlider
        },

        { 
            url: "features/features.html" , 
                
            target: "#feature-section",

            onLoad: renderFeature

        },

        { 
            url: "about-section/about-section.html" , 
                
            target: "#about-section",

        },

        { 
            url: "service-section/service.html" , 
                
            target: "#service-section",
        },

        { 
            url: "doctor-information-section/doctor-information.html" , 
                
            target: "#doctor-info-section",

            onLoad: launchTabSlider
        },

        { 
            url: "mobile-app/mobile-app.html" , 
                
            target: "#mobile-app-section",
        },


        { 
            url: "blog/blog.html" , 
                
            target: "#blog-section",

            onLoad: renderBlog
        }
        
    ],

    feature: {

        data: 
        
        [
            {

                icon: "ti-alert-square-rounded",
                
                title: "Visitor Information",

                desc: "View all information of the visitors and follow all terms & conditions."
            },

            {
                icon: "ti-stethoscope",

                title: "Find a Doctor",

                desc: "View all information of the visitors and follow all terms & conditions."
            },

            {
                icon: "ti-ambulance",

                title: "Our Locations",

                desc: "View all information of the visitors and follow all terms & conditions."
            },

            {

            icon: "ti-phone-plus",

            title: "Connect With Us",

            desc: "View all information of the visitors and follow all terms & conditions."

            }
        ],

        targets: [

            { Selector: ".feature-card-section" }

        ]
    },

    blog: {

        data: [

            {
                image: "blog1.jpg",

                category: "Maternity",

                date: "January 29, 2025",

                readTime: "4 MINS READ",

                title: "How to prepare for your baby’s arrival a checklist for expectant parents.",

                link: "#"
            },

            {
                image: "blog2.jpg",

                category: "Maternity",

                date: "January 27, 2025",

                readTime: "5 MINS READ",

                title: "Caring for yourself postpartum what every new mom should know.",

                link: "#"
            },

            {
                image: "blog3.jpg",

                category: "Psychiatric",

                date: "January 28, 2025",

                readTime: "6 MINS READ",

                title: "The importance of self-care in managing stress, especially for women.",

                link: "#"
            }
        ],

        targets: [
            
            { Selector: ".blog-card-section" }
        
        ]

    },

    footer: {

        data: [
                
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
        
        ],

        targets: [

            { Selector: ".footer-section" }
        
        ]
    }
}


// function to load all page components in respective pages //


function loadAllPageComponents(url , targetSelector){
    
    const promise = new Promise((resolve, reject) => {

        try{

        const targetElement = document.querySelector(targetSelector);

        if(!targetElement){

            throw new Error(`Relevant Target Selector Has Not Been Found`);
        }

        const getComponent = fetch(`components/${url}`);

        getComponent.then((response) => {

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
   

loadAllPageComponents("header-top/header-top.html" , "#headerTop-section");

loadAllPageComponents("header-main/header-main.html" , "#headerMain-section")

.then(() => {

    renderNavbar()

    // renderNavbar(navbarContents , "#mobile-navbar")

    // handleNavbarEvent()

});

loadAllPageComponents("footer/footer.html" , "#footer-section")

.then(() => {

    renderFooter()

});


// function to load all pages in main index page //

async function loadPage(pageName , targetSelector){
    
    try{

        const targetElement = document.querySelector(targetSelector);
        
        if(!targetElement){

            throw new Error("Target Element Not Found");  
        }

        const getComponent = await fetch(`pages/${pageUrls[pageName]}`);

        if(!getComponent.ok){

            throw new Error(`${getComponent.status} Error Has Been Occured`);
        }

        const componentHtml = await getComponent.text();

        targetElement.innerHTML = componentHtml;

        const components = pageComponents[pageName];

        if(Array.isArray(components)){

            components.forEach(component => {

                loadAllPageComponents(component.url , component.target)
                
                .then(() => {

                    if(typeof component.onLoad === "function"){

                        component.onLoad();

                    }

                });
            
            });

        }

    }

    catch(error){

        console.log(error.message);
    }

}

loadPage("home" , "#content-section");

function launchHomeSlider(){

    new Splide( '.splide' , {

        classes: {

		arrows: 'splide__arrows slider-arrows-box',

		arrow : 'splide__arrow slider-arrow',

		prev  : 'splide__arrow--prev arrow-prev',

		next  : 'splide__arrow--next arrow-next',
    },

    pagination: false,

    autoplay: true,

    rewind: true

    }).mount();

    const sliderArrows = document.querySelectorAll(".slider-arrow");

    sliderArrows.forEach((sliderArrow) => {

        sliderArrow.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' width='40' height='40'><g transform='scale(0.078125)'><path d='M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h306.7L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z'/></g></svg>";
    })

}


function launchTabSlider(){

    new Swiper(".swiper" , {

        autoplay: true,

        navigation: {

            nextEl: '.custom-button-next',
            prevEl: '.custom-button-prev'

        },

        breakpoints: {

            768: {

                slidesPerView: 2
            },

            992: {

                slidesPerView: 3
            },

            1200: {

                slidesPerView: 4
            }

        }

    });
}


// function to validate components which are render dynamically //

function validateComponents(componentName , selector = null){

    // if(selector){

    //     console.log(selector);
    // }

    try{

        const component = pageComponents[componentName];


        if(!component){

            throw new Error("Component name or Component target not found");
        }

        if(!Array.isArray(component.data) || !Array.isArray(component.targets)){

            throw new Error("component data and target selector must be an array");

        }

        else if(component.data.length === 0 || component.targets.length === 0){

            throw new Error("component data and target selector array must not be empty");
        }


        if(selector){

            const element = document.querySelector(selector);

            if(!element){

                throw new Error("dom target selector not found");

            }

            return {component , element};

        }
    

        return {component};
    }

    catch(error){

        console.log(error.message);

    }

}

// functions to render dynamic html components  //

function renderNavbar(){

    try{

        if(validateComponents("navbar")){

            const {component: navbarDetails} = validateComponents("navbar");

            navbarDetails.targets.forEach((navTarget) => {

                let navLink = "";

                navbarDetails.data.forEach((navData , index) => {

                    navLink += `<li class="nav-item"><a href="" class="${index === 0 ? 'active' : ''} nav-link" page-data="${navData.label}">${navData.label}</a></li>`;

                const {element: targetElement} = validateComponents("navbar" , navTarget.Selector);

                targetElement.innerHTML = navLink;

                })

            })

        }

    }

    catch(error){

    console.log(error.message);

    }

}


function renderFeature(){

    try{

        if(validateComponents("feature")){

            let Feature = "";

            const {component: featureDetails} = validateComponents("feature");

            featureDetails.targets.forEach((featureTarget) => {

                featureDetails.data.forEach((featureData , index) => {

                    Feature += `<div class="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                                    <div class="features-card" id="features-card${index + 1}">
                                        <div class="title">
                                            <i class="ti ${featureData.icon}"></i>
                                            <h3>${featureData.title}</h3>
                                        </div>

                                        <p>${featureData.desc}</p>

                                        <a href="#" class="features-btn">
                                            <i class="ti ti-arrow-right"></i>
                                            learn more
                                        </a>
                                    </div>
                                </div>`
                })

                const {element: targetElement} = validateComponents("feature" , featureTarget.Selector);

                targetElement.innerHTML = Feature;

            })

        }

    }

    catch(error){

        console.log(error.message);

    }
}

function renderBlog(){

    try{

        if(validateComponents("blog")){

            let blog = "";

            const {component: blogDetails} = validateComponents("blog");

            blogDetails.targets.forEach((blogTarget) => {

                blogDetails.data.forEach((blogData) => {

                    blog += `<div class="col-md-6 col-lg-4 blog-card">
                                <div class="blog-image">
                                    <a href="#">
                                        <img src="images/${blogData.image}" alt="">
                                    </a>
                                    <a href="#" class="tag-btn">
                                        ${blogData.category}
                                    </a>
                                </div>
                                <div class="blog-content">
                                    <ul class="meta">
                                        <li>${blogData.date}</li>
                                        <li class="meta-time">${blogData.readTime}</li>
                                    </ul>

                                    <h3>
                                        <a href="#">
                                        ${blogData.title}
                                        </a>
                                    </h3>
                                    <a href="" class="blog-btn"><i class="fa-solid fa-arrow-right"></i> read more</a>
                                </div>
                            </div>`
                })

                const {element: targetElement} = validateComponents("blog" , blogTarget.Selector);

                targetElement.innerHTML = blog;
            })

        }

    }

    catch(error){

        console.log(error.message);
    }
    
}

function renderFooter(){

    try{

        if(validateComponents("footer")){

            let footer = "";

            const {component: footerDetails} = validateComponents("footer");

            footerDetails.targets.forEach((footerTarget) => {

                footer += "<div class='row'>";

                footerDetails.data.forEach((footerData , index) => {

                    footer += `<div class='col-sm-6 col-md-6 col-lg-3 footer-links' id='footer-link${index + 1}'>
                                    <h3>
                                        ${footerData.title}
                                    </h3>
                                <ul>`;
            

                    footerData.links.forEach((link) => {

                        footer  += `<li><a href="#">${link}</a></li>`;

                    });

                    footer += "</ul>";
                    
                        if(index === footerDetails.data.length - 1){

                            footer += `<div class='social-links'>
                                            <span>${footerData.MediaLink.title}</span>
                                        <ul>`;
                                            
                            footerData.MediaLink.icons.forEach((icon) => {

                            footer += `<a href="#"><i class='fa-brands ${icon} footer-icons'></i></a>`;

                            });

                            footer += "</ul></div>";
                                        
                        }

                        footer += "</div>";

                });

                footer += "</div>";

                const {element} = validateComponents("footer" , footerTarget.Selector);

                element.innerHTML = footer;
                        
            });

        }

    }

    catch(error){

        console.log(error.message);
    }

}


// function handleNavbarEvent(){
   
//    const navbarSection = document.querySelector("#desktop-navbar");

//    navbarSection.addEventListener("click" , function(event){

//     event.preventDefault();

//     if(event.target.classList.contains("nav-link")){

//         const pageName = event.target.dataset.page;

//         loadPage(pageName , "#content-section");
//     }

//    });
// }





