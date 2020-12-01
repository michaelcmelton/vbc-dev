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
                    <div id="jason-mobile" className="founder-block">
                        <h4>Jason Gaver</h4>
                        <img alt="jason-gaver" src={imgPath + 'jason-picture.jpg'} id="jason-pic" className="about-clip" />
                        <p className="paragraph-text">
                            Jason Gaver is a perfect example of how valuable United States Veterans can be to their communities.  In addition to a successful entrepreneur and family man, he is the founder of Veteran Business Connection.  Veteran Business Connection provides fellow veteran business owners with the platform they need to connect with supporters.  Jason takes great pride in his personal accomplishments; however, helping his fellow citizens better their lives is the source of his deepest satisfaction.<br/><br/>Jason spent nine years in the Navy, learning the invaluable life skills that would come to define him.  After meeting his wife in DC while working in the Defense sector, he settled in Leland, North Carolina where he purchased Mulch and More.  Under Jason’s leadership, Mulch and More became one of the top landscape supply companies in the state.  Jason would eventually sell the business, but he remains involved in day to day operations.<br/><br/>In addition to his business career, Jason stays consistently active in his community.  He sits on the Town of Leland Planning Board, is a Board Member of North Brunswick Chamber of Commerce, Secretary of Leland Area Rotary Club, and Fund Development Board Member of Brunswick County Habitat for Humanity.  He is also an active participant in Cape Fear F3 and Reach Community Church.  Jason holds both a B.S. and an M.S. in Management & Leadership from John Hopkins University.
                        </p>
                    </div>
                    <div id="jason" className="founder-block">
                        <h4>Jason Gaver</h4>
                        <p className="paragraph-text">
                        Jason Gaver is a perfect example of how valuable United States Veterans can be to their communities.  In addition to a successful entrepreneur and family man, he is the founder of Veteran Business Connection.  Veteran Business Connection provides fellow veteran business owners with the platform they need to connect with supporters.  Jason takes great pride in his personal accomplishments; however, helping his fellow citizens better their lives is the source of his deepest satisfaction.<br/><br/>Jason spent nine years in the Navy, learning the invaluable life skills that would come to define him.  After meeting his wife in DC while working in the Defense sector, he settled in Leland, North Carolina where he purchased Mulch and More.  Under Jason’s leadership, Mulch and More became one of the top landscape supply companies in the state.  Jason would eventually sell the business, but he remains involved in day to day operations.<br/><br/>In addition to his business career, Jason stays consistently active in his community.  He sits on the Town of Leland Planning Board, is a Board Member of North Brunswick Chamber of Commerce, Secretary of Leland Area Rotary Club, and Fund Development Board Member of Brunswick County Habitat for Humanity.  He is also an active participant in Cape Fear F3 and Reach Community Church.  Jason holds both a B.S. and an M.S. in Management & Leadership from John Hopkins University.
                        </p>
                        <img alt="jason-gaver" src={imgPath + 'jason-picture.jpg'} id="jason-pic" className="about-clip" />
                    </div>
                    <div id="chad" className="founder-block">
                        <h4>Chad Gleaton</h4>
                        <img id="chad-pic" alt="chad-gleaton" src={imgPath + 'chad-picture.jpg'} className="about-clip" />
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
