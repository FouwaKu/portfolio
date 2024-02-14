
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Autoplay} from 'swiper/modules';
import  SwiperCore  from 'swiper';

import './PorfolioDetails.css';
import '../../assets/vendor/swiper/swiper-bundle.min.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProjectsByID } from '../../store/selectors/PortfolioSelector';
import { useEffect } from 'react';

SwiperCore.use([Pagination, Autoplay]);


const PorfolioDetails = (props) =>{
    const location = useLocation();
    let project = useSelector(state =>getProjectsByID(state, location.state.id));
    const navigate = useNavigate();
    useEffect(()=>{
      if(project && !project.length)
        navigate('/');
    },[]);

    return (

        <div id="portfolio-details" className="portfolio-details">
            <div className="container">

                <div className="row">

                <div className="col-lg-8">
                    <h2 className="portfolio-title">Portfolio Details</h2>

                    <div className="portfolio-details-slider swiper">
                        <Swiper
                            speed={600}
                            loop={true}
                            autoplay={{delay: 5000, disableOnInteraction: false}}
                            slidesPerView={1}
                            spaceBetween={50}
                            pagination={{clickable: true}}  >
                           {project[0] && project[0].images.split(',').map((img, index)=>(
                                <SwiperSlide key={index + 'a'} className='swiper-slide'>
                                    <img width='400px' height='400px' src={img} alt="" />
                                </SwiperSlide>
                           ))}

                            <div class="swiper-pagination"></div>
                        </Swiper>

                    </div>

                </div>

                <div className="col-lg-4 portfolio-info">
                    <h3>Project information</h3>
                    <ul>
                    <li><strong>Category</strong>: {project[0] && project[0].categoryName}</li>
                    {project[0] &&
                        <li><strong>Client</strong>: {project[0] && project[0].client}</li>
                    }

                    <li><strong>Project date</strong>: {project[0] && project[0].date}</li>
                    {project[0] &&
                        <li><strong>Project URL</strong>: {project[0] && project[0].url && <a href={project[0].url}>Visit</a>}</li>
                    }

                    </ul>

                    <p>
                        {project[0] && project[0].description}
                    </p>
                    <div>
                        <NavLink to='/' className='btn btn-danger'><i className='bi bi-house-fill'></i> Back to Hone</NavLink>
                    </div>
                </div>

                </div>

            </div>
        </div>
    );
};

export default PorfolioDetails;