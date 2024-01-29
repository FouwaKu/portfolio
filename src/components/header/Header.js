import React, { useEffect } from 'react';
import { on, select, scrollto } from '../../assets/js/main';
import './Header.css';
import About from '../about/About';
import Resume from '../resume/Resume';
import Contact from '../contact/Contact';
import Footer from '../footer/Footer';
import Services from '../services/Services';
import Porfolio from '../porfolio/Porfolio';


const Header = (props) => {
    
    useEffect(()=>{
       
        on('click', '.mobile-nav-toggle', function(e) {
            select('#navbar').classList.toggle('navbar-mobile');
            this.classList.toggle('bi-list');
            this.classList.toggle('bi-x');
        });
        on('click', '#navbar .nav-link', function(e) {
            let section = select(this.hash)
            if (section) {
              e.preventDefault()
        
              let navbar = select('#navbar')
              let header = select('#header')
              let sections = select('section', true)
              let navlinks = select('#navbar .nav-link', true)
        
              navlinks.forEach((item) => {
                item.classList.remove('active')
              })
        
              this.classList.add('active')
        
              if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
              }
        
              if (this.hash === '#header') {
                header.classList.remove('header-top')
                sections.forEach((item) => {
                  item.classList.remove('section-show')
                })
                return;
              }
        
              if (!header.classList.contains('header-top')) {
                header.classList.add('header-top')
                setTimeout(function() {
                  sections.forEach((item) => {
                    item.classList.remove('section-show')
                  })
                  section.classList.add('section-show')
        
                }, 350);
              } else {
                sections.forEach((item) => {
                  item.classList.remove('section-show')
                })
                section.classList.add('section-show')
              }
        
              scrollto(this.hash)
            }
          }, true);
          return () =>{
            
          }
    }, []);
    return (
        <React.Fragment>
           
            <header id="header">
                <div className="container">

                    <h1><a href="#">Fouwa Kuete Stael</a></h1>
                     {/*   <!-- Uncomment below if you prefer to use an image logo -->
                    <!-- <a href="index.html" className="mr-auto"><img src="assets/img/logo.png" alt="" className="img-fluid"></a> --> */}
                    <h2>I'm a passionate <span>Full Stack Web Developer / Graphics Designer</span> from New York</h2>

                    <nav id="navbar" className="navbar">
                        <ul>
                        <li><a className="nav-link active" href="#header">Home</a></li>
                        <li><a className="nav-link" href="#about">About</a></li>
                        <li><a className="nav-link" href="#resume">Resume</a></li>
                        <li><a className="nav-link" href="#services">Services</a></li>
                        <li><a className="nav-link" href="#portfolio">Portfolio</a></li>
                        <li><a className="nav-link" href="#contact">Contact</a></li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>

                    <div className="social-links">
                        <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                        <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                        <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                        <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                    </div>

                </div>
            </header>
            
              <About/>
              <Resume/>
              <Services/>
              <Contact/>
              <Porfolio/>
              <Footer/>
        </React.Fragment>
    );
};

export default Header;