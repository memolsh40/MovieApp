import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <div>
            <div className="footerBackground">

        
      
        <footer className=" text-white pt-5  footer  custom-dark-color ">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img  src="/images/FooterImage2.webp" className="footerLogo"></img>
                    </div>
                    <div className="col-md-6 text-md-right">
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <Link to="/about" className="text-white-50 hover-text-white">About Us</Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/services" className="text-white-50 hover-text-white">Services</Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/contact" className="text-white-50 hover-text-white">Contact</Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/privacy" className="text-white-50 hover-text-white">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>
                </div>
               
                <div className="row mt-4 ">
                    <div className="col text-center  ">
                        <p className="small">Follow us on social media:</p>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <Link to="#" className="text-white-50 hover-text-white"><i className="fab fa-facebook-f"></i></Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="text-white-50 hover-text-white"><i className="fab fa-twitter"></i></Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="text-white-50 hover-text-white"><i className="fab fa-instagram"></i></Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="text-white-50 hover-text-white"><i className="fab fa-linkedin-in"></i></Link>
                            </li>
                        </ul>
                    </div>
          
                </div>
                
            </div>
        </footer>
          </div>
        </div>
    );
};
