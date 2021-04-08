import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import callAPi from '../callAPI/callAPIMainServer';
import SuggestSearch from '../components/SuggestSearch';

class NavigationBarCustomer extends Component {
    

    disableRedirectToHome(){
        this.props.dispatch({type:"DISABLE_REDIRECT_TO_HOME"});
        this.props.dispatch({type:"UPDATE_ACTIVE_PAGE",data:1});
       
    }

    redirectToHome(){
        this.props.dispatch({type:"UPDATE_ACTIVE_PAGE",data:1});
        this.props.dispatch({type:"SHOW_VIDEO_INTRO"});
        callAPi('products').then(res => {
            this.props.dispatch({ type: "FETCH_CUSTOMER_LIST_PRODUCT", data: res.data.list });
            this.props.dispatch({ type: "UPDATE_ITEMS_COUNT_PER_PAGE", data: res.data.pageSize });
            this.props.dispatch({ type: "UPDATE_TOTAL_ITEMS_COUNT", data: res.data.totalItem });
        })
    }

   
    

    render() {
        return (
            <div>
                <nav id="CustomerNavigationBar" className="navbar fixed-top navbar-expand-lg navbar-light">

                    <NavLink onClick={() => this.redirectToHome()} className="navbar-brand" to="/">
                        <img src="/favicon.ico" alt="" width={35} height={24} />
                    </NavLink>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContentTopMenu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContentTopMenu">


                        <SuggestSearch />


                        <ul className="nav nav-pills ml-auto">
                            <li className="nav-item">
                                <NavLink onClick={() => this.redirectToHome()}  activeClassName="NavItemActive" className="nav-link NavItem" to="/home"><i className="fas fa-home"></i> Trang Chủ</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink onClick={()=>this.disableRedirectToHome()} activeClassName="NavItemActive" className="nav-link NavItem" to="/orderTracking"><i className="fas fa-box"></i> Xem đơn hàng</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink onClick={()=>this.disableRedirectToHome()} activeClassName="NavItemActive" className="nav-link NavItem" to="/login"><i className="fas fa-key"></i> Đăng nhập</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink onClick={()=>this.disableRedirectToHome()} activeClassName="NavItemActive" className="nav-link NavItem" to="/register"><i className="fas fa-user-plus"></i> Đăng Kí</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink onClick={()=>this.disableRedirectToHome()} activeClassName="NavItemActive" className="nav-link NavItem" to="/cart"><i className="fas fa-shopping-cart"></i> Giỏ hàng</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink onClick={()=>this.disableRedirectToHome()} activeClassName="NavItemActive" className="nav-link NavItem" to="/contact"><i className="fas fa-shopping-cart"></i> Liên hệ</NavLink>
                            </li>
                        </ul>


                    </div>
                </nav>
                <div id="navigationBarSpacingBottom"></div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    listProductCustomer: state.listProductCustomer,
    rangeBarChange: state.rangeBarChange,
    redirectToHome: state.redirectToHome,
    CustomerKeyWord : state.CustomerKeyWord
})
export default connect(mapStateToProps)(NavigationBarCustomer);