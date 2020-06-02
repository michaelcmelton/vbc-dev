import React from 'react';

import './Home.css';

const Home = (props) => {

    const imgPath = process.env.PUBLIC_URL + '/img/';
    return (
        <div className="home">
           <div className="header">
               <img className="header-logo" alt="logo" src={imgPath + 'VBC.png'} />
               <div className="header-flex-container">
                    <h1 className="header-banner">You Served. They Served.</h1>
                    <h4 className="header-subtext">Let us connect you as Civilans.</h4>
               </div>
               <img className="mobile-header-logo" alt="logo" src={imgPath + 'VBC.png'} />
           </div>
           <div>
               <p className="body-text">
               As veterans, we have an unbreakable bond that is built on trust and a shared goal of service to the nation. We have seen across generations that once a service member leaves the armed forces there is a loss of that bond and trust. 
               Our vision is to bring together military supporters, veterans, and veteran business owners in their communities on a platform that will allow them to connect and achieve mission completion whether it is needing a plumber, 
               cake decorator, mechanic, or financial advisor. We believe the strength of the veteran community lies in the bonds forged in service. We will facilitate that trust and bond in the civilian world.
               </p>
           </div>
           <div className="box-container">
                <div className="box">
                        
                </div>
                <div className="box">

                </div>
                <div className="box">

                </div>
           </div>
        </div>
    );
}

export default Home;