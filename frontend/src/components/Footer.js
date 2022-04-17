import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <ul style={{listStyle: 'none', marginBottom: 0}}>
                    <li className="footer-li"><Link to="/home" className="footer-link">Home</Link></li>
                    <li className="footer-li"><Link to="/" className="footer-link">로그아웃</Link></li>
                </ul>
                <hr className="footer-hr"/>
                <p>© 2022 Sejong Capstone Project 종이새</p>
            </div>
        </div>
    );
};

export default Footer;