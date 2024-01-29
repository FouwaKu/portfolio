import { useEffect } from 'react';
import './PureCounter.css';
import PureCounter from '@srexi/purecounterjs';

const PCounter = (props) =>{
    useEffect(() =>{
        new PureCounter();
    }, []);
    return (
        <div className="counts container">

            <div className="row">

                <div className="col-lg-3 col-md-6">
                    <div className="count-box">
                        <i className="bi bi-emoji-smile"></i>
                        
                        <span data-purecounter-start="0" data-purecounter-end="5" data-purecounter-duration="1" className="purecounter"></span>
                        <p>Happy Clients</p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                    <div className="count-box">
                        <i className="bi bi-journal-richtext"></i>
                        <span data-purecounter-start="0" data-purecounter-end="5" data-purecounter-duration="1" className="purecounter"></span>
                        <p>Projects</p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                    <div className="count-box">
                        <i className="bi bi-headset"></i>
                        <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" className="purecounter"></span>
                        <p>Hours Of Support</p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                    <div className="count-box">
                        <i className="bi bi-award"></i>
                        <span data-purecounter-start="0" data-purecounter-end="2" data-purecounter-duration="1" className="purecounter"></span>
                        <p>Certificates</p>
                    </div>
                </div>

            </div>

    </div>
    );
};

export default PCounter;