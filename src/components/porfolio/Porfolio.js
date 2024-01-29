import './Porfolio.css';
import {useEffect, useRef, useState} from 'react';
import Glightbox from 'glightbox';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateShowLoader, setErrorMessage, setSuccessMessage } from "../../store/reducers/loaderSlice";
import { getProjects, getCategories, setProjectCategory } from "../../store/reducers/PortfolioSlice";
import Loader from "../loader/Loader";
import AlertError from "../alerts/AlertError";
import AlertSuccess from "../alerts/AlertSuccess";
import { findProjectCategory } from '../../services/PortfolioService';
import PorfolioDetails from './PorfolioDetails';

const Porfolio = (props) =>{
    const dispatch = useDispatch();
    const {project, category} = useSelector(state => state.portfolio);
    const showLoading = useSelector(state => state.loader.showLoader);
    const errorMessage = useSelector(state => state.loader.errorMessage);
    const successMessage = useSelector(state => state.loader.successMessage);
    const portfolioFiltersRef = useRef([]);
    const portfolioItemsRef = useRef([]);
    let [currentProject, setCurrentProject] = useState(null);

    const getAllCategories = () =>{
        if(category && !category.length){
            dispatch(updateShowLoader(true));
            dispatch(getCategories('category.json')).then(response =>{
                const types = response.type.split('/');
                const type = types[types.length - 1];
                if(type === 'rejected'){
                    dispatch(setErrorMessage('An error occured. Try again!!!'));
                    dispatch(setSuccessMessage(''));
                }
            });
            return true;
        }
        return false;        
    };
    const getAllProgects = () =>{
        if(project && !project.length){
            dispatch(updateShowLoader(true));
            dispatch(getProjects('project.json')).then(response =>{
                const types = response.type.split('/');
                const type = types[types.length - 1];
               
                if(type === 'rejected'){
                    dispatch(setErrorMessage('An error occured. Try again!!!'));
                    dispatch(setSuccessMessage(''));
                }
               
            });
            return true;
        }
        return false;  
    }
    const storeElements = ()=>{
        portfolioFiltersRef.current = Array.from(document.querySelectorAll('.filters'));
        portfolioItemsRef.current = Array.from(document.querySelectorAll('.portfolio-item'));
        project.forEach((p,index)=>{
            let categoryName = findProjectCategory(p.category, category);
            if(categoryName[0])
                dispatch(setProjectCategory({index: index, categoryName: categoryName[0].category}));
        });
    };
     useEffect(()=>{
        storeElements();
        let portfolioLightbox = Glightbox({
            selector: '.portfolio-lightbox',
            touchNavigation: true,
            loop: true,
            draggable: true,
        });
        return ()=>{
            portfolioLightbox.destroy();
            
        };
     });   
     useEffect(()=>{
        
        dispatch(setErrorMessage(''));
        dispatch(setSuccessMessage(''));
        getAllCategories();
        getAllProgects();
        
    }, []);
    const handleFilters = (e) =>{
        const filterData = e.target.getAttribute('data-filter');
        portfolioFiltersRef.current.forEach(function(el) {
            el.classList.remove('filter-active');
        });
        e.target.classList.add('filter-active');
        portfolioItemsRef.current.forEach((item,index)=>{
            if (filterData === '*') 
                item.classList.remove('d-none');
            else{
                if (item.classList.contains(filterData)) {
                    item.classList.remove('d-none');
                }
                else 
                    item.classList.add('d-none'); 
            }
            
        });
    }
    
    return (
        <section id="portfolio" className="portfolio">
            {errorMessage && <AlertError/>}
            {successMessage && <AlertSuccess />}
             { showLoading &&  
                        <Loader />      
            }
            <div className="container">

            <div className="section-title">
                <h2>Portfolio</h2>
                <p>My Works </p>
            </div>

            <div className="row">
                <div className="col-lg-12 d-flex justify-content-center">
                <ul id="portfolio-flters">
                   
                    <li data-filter="*" onClick={e =>{handleFilters(e)}} className="filters filter-active">All</li>
                    {category.map((c, index)=>
                        <li className='filters' onClick={e =>{handleFilters(e)}} data-filter={'filter-' + c.id} key={c.id}>{c.category.toUpperCase()}</li>
                    )}
                     
                </ul>
                </div>
            </div>

            <div className="row portfolio-container">
                {project.map((p, index)=>(
                    <div key={index} className={`col-lg-4 col-md-6 portfolio-item filter-${p.category}`}>
                    <div className="portfolio-wrap">
                        <img src={p.images.split(',')[0]} className="img-fluid" alt=""/>
                        <div className="portfolio-info">
                        <p>{p.categoryName}</p>
                        <div className="portfolio-links">
                            <a href={p.images.split(',')[0]} data-gallery="portfolioGallery" className="portfolio-lightbox" title={p.categoryName}><i className="bx bx-plus"></i></a>
                            <NavLink to='/details' state={{id: p.id }}>
                                <i class="bx bx-link"></i>
                            </NavLink>


                        </div>
                        </div>
                    </div>
                    </div>
                ))}        

            </div>

            </div>
        </section>
    );
}

export default Porfolio;