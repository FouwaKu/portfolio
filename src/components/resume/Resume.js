import './Resume.css';

const Resume = (props) =>{
    return (
        <section id="resume" className="resume">
            <div className="container">

            <div className="section-title">
                <h2>Resume</h2>
                <p>Check My Resume</p>
            </div>

            <div className="row">
                <div className="col-lg-6">
                <h3 className="resume-title">Sumary</h3>
                <div className="resume-item pb-0">
                    <h4>Fouwa Stael</h4>
                    <p><em>Innovative and deadline-driven Graphic Designer / Web Dev with 3+ years of experience designing and developing user-centered digital/print marketing material, websites and apps from initial concept to final, polished deliverable.</em></p>
                    <div>
                    <ul>
                    <li>Mbouda, Cameroon</li>
                    <li>(+237) 680 133 903</li>
                    <li>fouwakuete@gmail.com</li>
                    </ul>
                    </div>
                </div>

                <h3 className="resume-title">Education</h3>
                <div className="resume-item">
                    <h4>Bachelor's Degree in Computer Science</h4>
                    <h5>2016 - 2020</h5>
                    <p><em>University of Bamenda, University of Dschang</em></p>
                    <p>
                        This academic accomplishement has equiped me with a strong knowledge base and a valuable skilll set to 
                        excel in the ever-evolving world of technology.
                    </p>
                </div>
                
                </div>
                <div className="col-lg-6">
                <h3 className="resume-title">Professional Experience</h3>
                <div className="resume-item">
                    <h4>Full Stack Web Dev Specialist</h4>
                    <h5>2020 - Present</h5>
                    <p><em>Mbouda Cameroon </em></p>
                    <div>
                    <ul>
                    <li>Lead in the design, development, and implementation of the frontend and backend of websites</li>
                    <li>Delegate tasks to the partners of the project team and provide counsel on all aspects of the project. </li>
                    <li>Supervise the assessment of all website components in order to ensure quality and accuracy of the website</li>
                    <li>Oversee the efficient use of production project resources</li>
                    </ul>
                    </div>
                </div>
                <div className="resume-item">
                    <h4>Graphic design specialist</h4>
                    <h5>2020 - present</h5>
                    <p><em>Mbouda, Cameroon</em></p>
                    <div>
                    <ul>
                    <li>Developed numerous marketing programs (logos, brochures,infographics, presentations, and advertisements).</li>
                    <li>Managed up to 5 projects or tasks at a given time while under pressure</li>
                    <li>Recommended and consulted with clients on the most appropriate graphic design</li>
                    <li>Created 4+ design presentations and proposals a month for clients and account managers</li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>

            </div>
         </section>
    );
}
export default Resume;