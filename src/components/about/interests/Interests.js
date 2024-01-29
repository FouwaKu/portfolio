import './Interests.css';

const Interests = (props) =>{
    return (
        <div className="interests container">

      <div className="section-title">
        <h2>Interests</h2>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4">
          <div className="icon-box">
            <i className="ri-store-line" style={{color: "#ffbb2c"}}></i>
            <h3>Art and Design Appreciation</h3>
          </div>
        </div>
       
        <div className="col-lg-3 col-md-4 mt-md-0 mt-4">
          <div className="icon-box">
            <i className="ri-calendar-todo-line" style={{color: "#e80368"}}></i>
            <h3>Creativity and Art</h3>
          </div>
        </div>
       
        <div className="col-lg-3 col-md-4 mt-md-0 mt-4">
          <div className="icon-box">
            <i className="ri-database-2-line" style={{color: "#47aeff"}}></i>
            <h3>Technology and Innovation</h3>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 mt-lg-0 mt-4">
          <div className="icon-box">
            <i className="ri-gradienter-line" style={{color: "#ffa76e"}}></i>
            <h3>Travel and Photography</h3>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 mt-4">
          <div className="icon-box">
            <i className="ri-file-list-3-line" style={{color: "#11dbcf"}}></i>
            <h3>Typography and Lettering</h3>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 mt-4">
          <div className="icon-box">
            <i className="ri-price-tag-2-line" style={{color: "#4233ff"}}></i>
            <h3>Tech Entrepreneurship and Startup Culture</h3>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 mt-4">
          <div className="icon-box">
            <i className="ri-anchor-line" style={{color: "#b2904f"}}></i>
            <h3>Community involvement</h3>
          </div>
        </div>
        
        <div className="col-lg-3 col-md-4 mt-4">
          <div className="icon-box">
            <i className="ri-base-station-line" style={{color: "#ff5828"}}></i>
            <h3>Open Source Contribution</h3>
          </div>
        </div>
        
      </div>

    </div>
    );
}

export default Interests;