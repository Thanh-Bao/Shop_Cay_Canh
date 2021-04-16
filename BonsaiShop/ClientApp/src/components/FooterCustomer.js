import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class FooterCustomer extends Component {
    render() {
        return (
            <div>
                <footer id="footer" className="bg-primary text-white d-flex-column text-center">
                    <hr className="mt-0" />
                    {/*Social buttons*/}
                    <div className="text-center">
                        <h4>Liên hệ với chúng tôi qua : </h4>

                        <div className="container">
                            <div className="headline">
                            </div>
                            <div className="social-buttons">
                                {/* facebook  Button */}
                                <a href="https://www.facebook.com/thanhbao123456/" target="blank" className="social-margin">
                                    <div className="social-icon facebook">
                                        <i className="fab fa-facebook-f"></i>
                                    </div>
                                </a>
                                {/* pinterest Button */}
                                <a href="https://pinterest.com/" target="blank" className="social-margin">
                                    <div className="social-icon pinterest">
                                        <i className="fab fa-pinterest-p" aria-hidden="true" />
                                    </div>
                                </a>
                                {/* LinkedIn Button */}
                                <a href="hhttps://www.linkedin.com/in/thanhbao/" className="social-margin" target="blank">
                                    <div className="social-icon linkedin">
                                        <i className="fab fa-linkedin" aria-hidden="true" />
                                    </div>
                                </a>
                                {/* Github Button */}
                                <a href="https://github.com/Thanh-Bao/Shop_Cay_Canh" target="blank" className="social-margin">
                                    <div className="social-icon github">
                                        <i className="fab fa-github-alt" aria-hidden="true" />
                                    </div>
                                </a>
                                {/* Youtube Button */}
                                <a href="https://www.youtube.com/channel/UCxhEc0Tw67AETbGQ_ZD49qg/videos" target="blank" className="social-margin">
                                    <div className="social-icon youtube">
                                        <i className="fab fa-youtube" aria-hidden="true" />
                                    </div>
                                </a>
                                {/* Behance Button */}
                                <a href="https://behance.com/" target="blank" className="social-margin">
                                    <div className="social-icon behance">
                                        <i className="fab fa-behance" aria-hidden="true" />
                                    </div>
                                </a>
                                {/* Soundcloud Button */}
                                <a href="http://soundcloud.com/" target="blank" className="social-margin">
                                    <div className="social-icon soundcloud">
                                        <i className="fab fa-soundcloud" aria-hidden="true" />
                                    </div>
                                </a>
                                {/* TwitterButton */}
                                <a href="https://twitter.com/TranThanhBao44" target="blank" className="social-margin">
                                    <div className="social-icon twitter">
                                        <i className="fab fa-twitter" aria-hidden="true" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/*/.Social buttons*/}
                    <hr className="mb-0" />
                    {/*Footer Links*/}
                    <div className="container text-left text-md-center">
                        <div className="row">
                            {/*First column*/}
                            <div className="col-md-3 mx-auto shfooter">
                                <h5 className="my-2 font-weight-bold d-none d-md-block">Product</h5>
                                <div className="d-md-none title" data-target="#Product" data-toggle="collapse">
                                    <div className="mt-3 font-weight-bold">Product
          <div className="float-right navbar-toggler">
                                            <i className="fas fa-angle-down" />
                                            <i className="fas fa-angle-up" />
                                        </div>
                                    </div>
                                </div>
                                <ul className="list-unstyled collapse" id="Product">
                                    <li><a className="link-footer" href="https://www.facebook.com/thanhbao123456/">Create Websites</a></li>
                                    <li><a className="link-footer" href="https://www.facebook.com/thanhbao123456/">Secure Cloud Hosting</a></li>
                                    <li><a className="link-footer" href="https://www.facebook.com/thanhbao123456/">Engage Your Audience</a></li>
                                    <li><a className="link-footer" href="https://www.facebook.com/thanhbao123456/">Website Support</a></li>
                                </ul>
                            </div>
                            {/*/.First column*/}
                            <hr className="clearfix w-100 d-md-none mb-0" />
                            {/*Second column*/}
                            <div className="col-md-3 mx-auto shfooter">
                                <h5 className="my-2 font-weight-bold d-none d-md-block">Company</h5>
                                <div className="d-md-none title" data-target="#Company" data-toggle="collapse">
                                    <div className="mt-3 font-weight-bold">Company
          <div className="float-right navbar-toggler">
                                            <i className="fas fa-angle-down" />
                                            <i className="fas fa-angle-up" />
                                        </div>
                                    </div>
                                </div>
                                <ul className="list-unstyled collapse" id="Company">
                                    <li><a className="link-footer" href="https://www.facebook.com/thanhbao123456/">About</a></li>
                                    <li><a className="link-footer" href="https://www.facebook.com/thanhbao123456/">Careers</a></li>
                                    <li><a className="link-footer" href="https://www.facebook.com/thanhbao123456/">Support</a></li>
                                    <li><a className="link-footer" href="https://www.facebook.com/thanhbao123456/">Pricing</a></li>
                                    <li><a className="link-footer" href="https://www.facebook.com/thanhbao123456/">FAQ</a></li>
                                </ul>
                            </div>
                            {/*/.Second column*/}
                            <hr className="clearfix w-100 d-md-none mb-0" />
                            {/*Third column*/}
                            <div className="col-md-3 mx-auto shfooter">
                                <h5 className="my-2 font-weight-bold d-none d-md-block">Resources</h5>
                                <div className="d-md-none title" data-target="#Resources" data-toggle="collapse">
                                    <div className="mt-3 font-weight-bold">Resources
          <div className="float-right navbar-toggler">
                                            <i className="fas fa-angle-down" />
                                            <i className="fas fa-angle-up" />
                                        </div>
                                    </div>
                                </div>
                                <ul className="list-unstyled collapse" id="Resources">
                                    <li><a className="link-footer" href="https://www.facebook.com/thanhbao123456/">Blog</a></li>
                                    <li><a className="link-footer" href="https://www.facebook.com/thanhbao123456/">eBooks</a></li>
                                    <li><a className="link-footer" href="https://www.facebook.com/thanhbao123456/">Whitepapers</a></li>
                                    <li><a className="link-footer" href="https://www.facebook.com/thanhbao123456/">Comparison Guide</a></li>
                                    <li><a className="link-footer" href="https://www.facebook.com/thanhbao123456/">Website Grader</a></li>
                                </ul>
                            </div>
                            {/*/.Third column*/}
                            <hr className="clearfix w-100 d-md-none mb-0" />
                            {/*Fourth column*/}
                            <div className="col-md-3 mx-auto shfooter">
                                <h5 className="my-2 font-weight-bold d-none d-md-block"><strong>WILL REMOVE IN PRODUCTION</strong></h5>
                                <div className="d-md-none title" data-target="#Get-Help" data-toggle="collapse">
                                    <div className="mt-3 font-weight-bold"> <strong>WILL REMOVE IN PRODUCTION</strong>
          <div className="float-right navbar-toggler">
                                            <i className="fas fa-angle-down" />
                                            <i className="fas fa-angle-up" />
                                        </div>
                                    </div>
                                </div>
                                <ul className="list-unstyled collapse" id="Get-Help">
                                    <li><a className="link-footer" href="https://www.facebook.com/thanhbao123456/">Contact Us</a></li>
                                    <li><a className="link-footer" href="https://www.facebook.com/thanhbao123456/">Privacy Policy</a></li>
                                    <li><a className="link-footer" href="https://www.facebook.com/thanhbao123456/">Terms</a></li>
                                    <li><Link className="link-footer" to="/admin/login"><i className="fas fa-shield-alt"></i> Admin Login</Link></li>
                                </ul>
                            </div>
                            {/*/.Fourth column*/}
                        </div>
                    </div>
                    {/*/.Footer Links*/}

                    <hr className="mb-0" />
                    {/*Copyright*/}
                    <div className="py-3 text-center">
                       <img src="DMCA.png" alt="dmca"/> Copyright 2000-2022  | Cty Cổ Phần Thương Mại và Dịch Vụ Thanh Bảo Group
                    </div>
                    {/*/.Copyright*/}
                </footer>
            </div>

        );
    }
}

export default FooterCustomer;