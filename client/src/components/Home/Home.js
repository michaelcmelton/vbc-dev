import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

const Home = (props) => {

    document.body.style.overflowY = 'scroll';

    const imgPath = process.env.PUBLIC_URL + '/img/';
    return (
        <div className="home">
            <div className="header">
                <img className="header-logo" alt="logo" src={imgPath + 'VBC.png'} />
                <div className="header-flex-container">
                    <h1 className="header-banner">You Served. They Served.</h1>
                    <h4 className="header-subtext">Let us connect you as civilians and to civilians.</h4>
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
                    <h4>List Your Business</h4>
                    <img alt="list-icon" src={imgPath + 'list-icon.svg'} />
                    <p>List your business among hundreds of other veterans just like you! Create an account below to get started.</p>
                    <Link to="/register"><button>Create an Account</button></Link>
                </div>
                <div className="box">
                    <h4>Find a Business</h4>
                    <img alt="seach-icon" src={imgPath + 'search-icon.svg'} />
                    <p>We have many veteran-owned businesses waiting for you to find them! Find what you need today! </p>
                    <Link to="/directory"><button>Search the Directory</button></Link>
                </div>
                <div className="box">
                    <h4>Make Connections</h4>
                    <img alt="connect-icon" src={imgPath + 'connect-icon.svg'} />
                    <p>We will help you make connections with clients and fellow veterans alike. Giving back to those who served.</p>
                    <Link to="/register"><button>Create an Account</button></Link>
                </div>
            </div>
            <div className="founders-desktop">
                <h1>Our Team</h1>
                <div className="founder">
                    <img id="chad-pic-home" alt="chad-gleaton" src={imgPath + 'chad-picture.jpg'} className="clip-circle" />
                    <div className="founder-text-right">
                        <h2>Chad Gleaton</h2>
                        <p>Chad Gleaton served over six years on active duty with the 75th Ranger Regiment.  He was assigned to the 1st Ranger Battalion serving there from 2005 to 2008 where he deployed three times, twice to Iraq and once to Afghanistan.
                        From 2008 to 2011, he served as a RIP instructor with the 75th Ranger Special Troops Battalion.  He served in the SC Army National Guard and has responded to the historic ‘1000 Year Flood’ in 2014, Hurricane Matthew in 2015, and Hurricane Irma in 2017.
                            He is continuing his service within the AK Army National Guard. <Link to='/about'>Find out more about Chad...</Link></p>
                    </div>
                </div>
                <div className="founder">
                    <div className="founder-text-left">
                        <h2>Jason Gaver</h2>
                        <p>Jason Gaver served four years on active duty with the U.S. Navy and five additional years in the U.S. Navy Reserves where he deployed numerous times around the globe.
                        Jason spent 10 years as a Test & Evaluation Engineer supporting numerous Department of Defense Surface Ship Weapons Programs.
                            He was a founding member of TASC Veteran, or TVETS, an employee resource group open solely to TASC employees who are veterans. <Link to='/about/'>Find out more about Jason...</Link></p>
                    </div>
                    <img alt="jason-gaver" src={imgPath + 'jason-picture.jpg'} className='clip-circle' />
                </div>
            </div>
            <div className="founders-mobile">
                <h1>Our Team</h1>
                <div className="founder">
                    <img style={{maxWidth: 24 + 'em'}} alt="chad-gleaton" src={imgPath + 'chad-picture.jpg'} className="clip-circle" />
                    <div className="founder-text">
                        <h2>Chad Gleaton</h2>
                        <p>Chad Gleaton served over six years on active duty with the 75th Ranger Regiment.  He was assigned to the 1st Ranger Battalion serving there from 2005 to 2008 where he deployed three times, twice to Iraq and once to Afghanistan.
                        From 2008 to 2011, he served as a RIP instructor with the 75th Ranger Special Troops Battalion.  He served in the SC Army National Guard and has responded to the historic ‘1000 Year Flood’ in 2014, Hurricane Matthew in 2015, and Hurricane Irma in 2017.
                            He is continuing his service within the AK Army National Guard. <Link to='/about'>Find out more about Chad...</Link></p>
                    </div>
                </div>
                <div className="founder">
                    <img alt="jason-gaver" src={imgPath + 'jason-picture.jpg'} className='clip-circle' />
                    <div className="founder-text">
                        <h2>Jason Gaver</h2>
                        <p>Jason Gaver served four years on active duty with the U.S. Navy and five additional years in the U.S. Navy Reserves where he deployed numerous times around the globe.
                        Jason spent 10 years as a Test & Evaluation Engineer supporting numerous Department of Defense Surface Ship Weapons Programs.
                            He was a founding member of TASC Veteran, or TVETS, an employee resource group open solely to TASC employees who are veterans. <Link to='/about/'>Find out more about Jason...</Link></p>
                    </div>
                </div>
            </div>
            <div className="final">
                <div className="cta">
                    <h3>Ready to list?</h3>
                    <p>Create an account below to get started!</p>
                    <Link to='/register'><button>Create an account</button></Link>
                </div>
                    <div id="contact" className="contact">
                        <h3>Questions?</h3>
                        <h4>Ask below and we will get back to you as soon as possible!</h4>
                        <form className='contact-form'>
                            <label htmlFor="name">Name: </label>
                            <input id="name" name="name" placeholder="Name"></input>
                            <label htmlFor="email">Email: </label>
                            <input id="email" name="email" placeholder="Email"></input>
                            <label htmlFor="phoneNumber">Phone #: </label>
                            <input id="phoneNumber" name="phoneNumber" placeholder="Phone Number"></input>
                            <label htmlFor="questions">Questions: </label>
                            <textarea id="questions" name="questions" rows='10' cols='15' placeholder="Ask your questions here!"></textarea>
                            <button type="button">Submit Questions</button>
                        </form>
                    </div>
            </div>
        </div>
    );
}

export default Home;