
import './Skills.css';
import {  select } from '../../../assets/js/main';
import {Waypoint } from 'react-waypoint';

const Skills = (props) => {
    const handleEnter = () =>{
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
    }
    return (
        <div className="skills container">

            <div className="section-title">
                <h2>Skills</h2>
            </div>
                
            <div className="row skills-content">

                <div className="col-lg-6">
                <Waypoint
                scrollableAncestor={window}
                topOffset={'80%'}
                onEnter={() => handleEnter()}/>
                <div className="progress">
                    <span className="skill">HTML <i className="val">100%</i></span>
                    <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>

                <div className="progress">
                    <span className="skill">CSS <i className="val">90%</i></span>
                    <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>

                <div className="progress">
                    <span className="skill">JavaScript <i className="val">95%</i></span>
                    <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>

                </div>

                <div className="col-lg-6">

                <div className="progress">
                    <span className="skill">Python <i className="val">90%</i></span>
                    <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>

                <div className="progress">
                    <span className="skill">WordPress/CMS <i className="val">60%</i></span>
                    <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>

                <div className="progress">
                    <span className="skill">Photoshop <i className="val">80%</i></span>
                    <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>

                </div>

            </div>

        </div>
    );
}

export default Skills;