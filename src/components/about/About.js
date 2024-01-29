import React from "react";
import Biographie from "./biographie/Biographie";
import PCounter from "./purecounter/PureCounter";
import Skills from "./skills/Skills";
import Interests from "./interests/Interests";
import Testimonials from "./testimonials/Testimonials";
import './About.css';

const About = (props) =>{
    return (
       <React.Fragment>
            <section id="about" className="about">
                <Biographie/>
                <PCounter />
                <Skills />
                <Interests />
                <Testimonials />
            </section>
       </React.Fragment>         
    );
}

export default About;