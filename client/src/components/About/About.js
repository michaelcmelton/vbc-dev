import React, { Component } from 'react'

import './About.css';
const imgPath = process.env.PUBLIC_URL + '/img/';

class About extends Component {

    render() {

        document.body.style.overflowY = 'scroll';

        return (
            <div className="about">
                <div>
                    <h2>Company</h2>
                    <div className="company-content">
                        <img alt="logo" id="about-logo" src={imgPath + 'VBC.png'} />
                        <p>
                            As veterans, we have an unbreakable bond that is built on trust and a shared goal of service to the nation. We have seen across generations that once a service member leaves the armed forces there is a loss of that bond and trust.
                            Our vision is to bring together military supporters, veterans, and veteran business owners in their communities on a platform that will allow them to connect and achieve mission completion whether it is needing a plumber,
                            cake decorator, mechanic, or financial advisor. We believe the strength of the veteran community lies in the bonds forged in service. We will facilitate that trust and bond in the civilian world.
                        </p>
                    </div>
                </div>
                <div>
                    <h2>Founders</h2>
                    <div id="jason" className="founder-block">
                        <h4>Jason Gaver</h4>
                        <p className="paragraph-text">
                            Jason served four years on active duty with the U.S. Navy and five additional years in the U.S. Navy Reserves where he deployed numerous times around the globe.  Jason spent 10 years as a Test & Evaluation Engineer supporting numerous
                            Department of Defense Surface Ship Weapons Programs.  He was a founding member of TASC Veteran, or TVETS, an employee resource group open solely to TASC employees who are veterans.  The mission of TVETS is to provide mentoring and community outreach to
                            veterans by promoting networking among veterans, sponsoring veteran initiatives and professional development opportunities.<br /> <br /> Jason is currently the President of Mulch & More, Southeast North Carolina’s leading landscape supply and garden center.  In his
                            role he oversees the strategic trajectory of the organization and provides operational support of day to day operations.  Jason and his family live in Leland, North Carolina where he is active in his community with the Leland Area Rotary Club and the
                            Cape Fear F3 community. Jason holds an A.A. degree from Carroll Community College as well as a B.S. and M.S. degree from The Johns Hopkins University.
                        </p>
                        <img alt="jason-gaver" src={imgPath + 'jason-picture.jpg'} id="jason-pic" className="about-clip" />
                    </div>
                    <div className="founder-block">
                        <h4>Chad Gleaton</h4>
                        <img alt="chad-gleaton" src={imgPath + 'chad-picture.jpg'} id="chad-pic" className="about-clip" />
                        <p className="paragraph-text">
                            Chad Gleaton served over six years on active duty with the 75th Ranger Regiment.  He was assigned to the 1st Ranger Battalion serving there from 2005 to 2008 where he deployed three times, twice to Iraq and once to Afghanistan.  From 2008 to 2011,
                            he served as a RIP instructor with the 75th Ranger Special Troops Battalion.  He served in the SC Army National Guard and has responded to the historic ‘1000 Year Flood’ in 2014, Hurricane Matthew in 2015, and Hurricane Irma in 2017.  He is continuing
                            his service within the AK Army National Guard. <br /><br /> Chad works fulltime with Bureau of Alcohol Tobacco Firearms and Explosives as an Industry Operations Investigator.  Chad and his family reside in Anchorage, AK where they are active in the community.  Chad
                            and his wife have two boys and work directly with Office of Children Services fostering three additional children.  Chad is active within the Anchorage Youth Soccer Club serving as a Team Manager, Fundraiser and Marketing Committee Member, and an amateur
                            Sports Photographer. Chad holds a B.S. degree from Appalachian State University, M.A. degree from American Public University System (American Military University), and a Ph.D. in Public Safety from Capella University.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;
