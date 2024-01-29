
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Autoplay} from 'swiper/modules';
import  SwiperCore  from 'swiper';
import '../../../assets/vendor/swiper/swiper-bundle.min.css';
import './Testimonials.css';

SwiperCore.use([Pagination, Autoplay]);
const Testimonials = (props) => {
    return (
        <div className="testimonials container">

            <div className="section-title">
                <h2>Testimonials</h2>
            </div>

            <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
                <Swiper
                speed={600}
                loop={true}
                autoplay={{delay: 5000, disableOnInteraction: false}}
                slidesPerView={'auto'}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                      },
                
                      1200: {
                        slidesPerView: 2,
                        spaceBetween: 20
                      }
                }}
                 pagination={{clickable: true}}>
                    <SwiperSlide>
                        <div className="swiper-slide">
                            <div className="testimonial-item">
                            <p>
                                <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                Our non-profit organization needed a website that effectively communicated our mission
                                and engaged our supporters. Fouwa Stael not only delivered a visually stunning website 
                                but also made it simple for us to manage content. His passion for our cause was evident
                                throughout the project, and the positive response from our community has been overwhelming.
                                <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                            </p>
                            <h3>Dr Soh Wenda</h3>
                            <h4>Ceo &amp; Founder of RuPEN</h4>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="swiper-slide">
                            <div className="testimonial-item">
                            <p style={{padding : '47.27px '}}>
                                <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                Fouwa Stael played a pivotal role in bringing our Startup's vision to life. His techincal expertise 
                                dedication to understanding our unique requirements were fundamental to the success of our project.
                                The website he built has been instrumental in attracting invertors and early adopters.
                                <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                            </p>
                            <h3>Fopa Duclair</h3>
                            <h4>Software Developer</h4>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="swiper-slide">
                            <div className="testimonial-item">
                            <p>
                                <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                Working with Fouwa Stael was a game-changer for my business. His expertise not only transformed 
                                our website but also enhanced our online visibility. The site's performance and aethetics have 
                                received fantastic feedback from our customers. I highly recommend Fouwa Stael to anyone seeking
                                top-notch web development services. 
                                <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                            </p>
                            <h3>Fakembe Divine</h3>
                            <h4>Graphics Desiner</h4>
                            </div>
                        </div>
                    </SwiperSlide>
                    
                </Swiper>
                <div className="swiper-pagination"></div>
            </div>

        </div>
    );
}

export default Testimonials;

