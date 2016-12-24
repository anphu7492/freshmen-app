import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';
import StudentCard from '../components/StudentCard.jsx';

export default class About extends BaseComponent {

    render() {
        return (
            <div id="about">
                &nbsp;
                <div className="about-content">
                    <h1 id="about-title">&nbsp; &nbsp;About Freshmen Guide</h1>
                    <p id="description">A Student , A Tutor , A Study Corordinator</p>
                    &nbsp;
                    <p id="content">Freshmen Guide is a service designed to relieve the stress of the orientation week on newly enrolled students. It aims at providing a one-stop solution to all the guidance a new student might need during the orientation week.</p>
                </div>
                &nbsp;
                <div className="contributors">
                    <div id="abhishek">
                        <img class="img-circle" src="http://www.desktopwallpaperhd.net/wallpapers/19/7/themes-joker-desktop-face-gallery-194503.jpg" height="100px" width="100px"/>
                        <h3>Abhishek Ramesh Shetty</h3>
                        <h4>Master's Programme in ICT Innovation.</h4>
                    </div>

                    <div id="phu">
                        <img class="img-circle" src="http://www.desktopwallpaperhd.net/wallpapers/19/7/themes-joker-desktop-face-gallery-194503.jpg" height="100px" width="100px"/>
                        <h3>Phu Pham</h3>
                        <h4>Master's Programme in Computer Science.</h4>
                    </div>

                    <div id="kalai">
                        <img class="img-circle" src="http://www.desktopwallpaperhd.net/wallpapers/19/7/themes-joker-desktop-face-gallery-194503.jpg" height="100px" width="100px"/>
                        <h3>Kalaiarasan Saminathan</h3>
                        <h4>Master's Programme in Computer Science.</h4>
                    </div>
                </div>
            </div>
        )
    }
}
