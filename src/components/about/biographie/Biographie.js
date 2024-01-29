import React from "react";
import './Biographie.css';

const Biographie = (props) =>{
    return (
        <React.Fragment>
            <div className="about-me container">

                <div className="section-title">
                    <h2>About</h2>
                    <p>Learn more about me</p>
                </div>

                <div className="row">
                    <div className="col-lg-4" data-aos="fade-right">
                        <img src="../../../assets/img/me.jpg" className="img-fluid" alt="" />
                    </div>
                    <div className="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
                        <h3>Full Stack Web Dev &amp; Graphic Designer</h3>
                        <p className="fst-italic">
                            Let's collaborate to bring your vision to life and elevate your digital presence. 
                        </p>
                        <div className="row">
                        <div className="col-lg-6">
                            <ul>
                                <li><i className="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+237 680 133 903</span></li>
                                <li><i className="bi bi-chevron-right"></i> <strong>City:</strong> <span>Mbouda, Cameroun</span></li>
                                <li><i className="bi bi-chevron-right"></i> <strong>Email:</strong> <span>fouwakuete@gmail.com</span></li>
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <ul>
                                <li><i className="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>Bachelor's Degree</span></li>
                                <li><i className="bi bi-chevron-right"></i> <strong>Freelance:</strong> <span>Available</span></li>
                            </ul>
                        </div>
                        </div>
                        <p>
                            My holistic approach to design and development centers around effective communication, client collaboration,
                             and a relentless pursuit of quality. By combining the artistry of graphic design with the technical prowess 
                             of web development, I strive to create impactful, holistic digital experiences that captivate audineces and 
                             drive tangible results.
                        </p>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
}

export default Biographie;