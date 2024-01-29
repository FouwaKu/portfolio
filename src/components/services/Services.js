import './Services.css';

const Services = (props) =>{
    return (
        <section id="services" className="services">
                <div className="container">
            
                <div className="section-title">
                    <h2>Services</h2>
                    <p>My Services</p>
                </div>
            
                <div className="row">
                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                    <div className="icon-box">
                        <div className="icon"><i className="bx bxl-dribbble"></i></div>
                        <h4><a href="">Print Design</a></h4>
                        <p>
                            Designing captivating print materials including brochures, posters, and business cards that resonate 
                            with audiences and leave a lasting impact.
                        </p>
                    </div>
                    </div>
            
                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                    <div className="icon-box">
                        <div className="icon"><i className="bx bx-file"></i></div>
                        <h4><a href="">UI/UX Design</a></h4>
                        <p>
                            Developing intuitive and visually appealing user interfaces and experiences that streamline 
                            interactions and elevate user engagement.
                        </p>
                    </div>
                    </div>
            
                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                    <div className="icon-box">
                        <div className="icon"><i className="bx bx-tachometer"></i></div>
                        <h4><a href="">Brand Identity Design</a></h4>
                        <p>
                            Crafting distinctive brand identities through logo design, color palettes, and visual elements
                             that reflect the essence of each band. 
                        </p>
                    </div>
                    </div>
            
                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                    <div className="icon-box">
                        <div className="icon"><i className="bx bx-world"></i></div>
                        <h4><a href="">Front-end Development</a></h4>
                        <p>
                            Implementing responsive and visually stunning front-end designs that seamlessly adapt to various
                            devices and screen sizes.
                        </p>
                    </div>
                    </div>
            
                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                    <div className="icon-box">
                        <div className="icon"><i className="bx bx-slideshow"></i></div>
                        <h4><a href="">Back-end Development</a></h4>
                        <p>
                            Crafting robust and scalable back-end solutions that power dynamic web applications, ensuring 
                            seamless functionality and data management. 
                        </p>
                    </div>
                    </div>
            
                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                    <div className="icon-box">
                        <div className="icon"><i className="bx bx-arch"></i></div>
                        <h4><a href="">E-commerce Development</a></h4>
                        <p>
                            Building secure and user-friendly e-commerce platforms that facilitate seamless transactions
                            and enhance the online shopping experience for customers.
                        </p>
                    </div>
                    </div>
            
                </div>
            
                </div>
            </section>
    );
}

export default Services;