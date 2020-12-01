import React, { Component } from 'react'

import './FAQ.css';

class FAQ extends Component {
    render() {
        return (
            <div className="FAQ">
                <h2 className="section-title">Frequently Asked Questions</h2>
                <h4 className="question">Q: How does Veteran Business Connection (VBC) make sure only veteran owned businesses are registering?</h4>
                <h6 className="answer">A:  Great question.  We wrestled with this during the whole development phase.  Veteran Business Connection is a
                passion project for each of us, and one that we are fully funding ourselves because we believe our community wants
                and needs a platform like this.  We looked at using the popular ID.me platform but their cost is associate with each
                user.  We also looked at having users upload copies of their DD-214, but that posed a security risk with storing data.
                At this time, we don't have the funding to undertake that level of fidelity.  We check each company that signs up
                personally.  Does that mean we always get it right? No. We are both human.  But as veterans we have a pretty good
                idea when someone is posing as a veteran.  After reaching out to them of course we simply remove that user.  We
                fully plan on instituting some level of automatic vetting of business as we move forward.  If you, or someone you
                know, can help us with this please send us an email!  We know that we do not know it all and cannot do this by
                ourselves.</h6>
                <h4 className="question">Q: How does VBC pay for itself?</h4>
                <h6 className="answer">A:  VBC has been fully funded by Chad and Jason.  We both believe in this project enough that we are willing to inject
                our own funds into getting it developed.  We both have families, full time jobs, are involved in our communities, but
                believe in what we are doing.  We have filed the paperwork with the state of North Carolina to be recognized as a
                non-profit which will then feed an IRS application for non-profit status.  If you would like to help with a financial
                donation, please send it to:
                <br /><br />
                Veteran Business Connection <br />
                1236 Lillibridge Drive <br />
                Leland, NC 28451 </h6>
                <h4 className="question">Q: Who can I contact if I have an idea or want to help?</h4>
                <h6 className="answer">A: You can contact Jason: <a href="mailto:jason@veteranbusinessconnection.org">jason@veteranbusinessconnection.org</a> and/or Chad: 
                <a href="mailto:chad@veteranbusinessconnection.org">chad@veteranbusinessconnection.org</a>  We are open to suggestions, assistance, and constructive criticism.  No 
                individual accomplished a great feat on their own, we need and want your help! </h6>
                <h4 className="question">Q. Who can I contact if I have an IT issue?</h4>
                <h6 className="answer">A: You can contact our webmaster: <a href="mailto:webmaster@veteranbusinessconnection.org">webmaster@veteranbusinessconnection.org</a></h6>
            </div>
        )
    }
}

export default FAQ;
