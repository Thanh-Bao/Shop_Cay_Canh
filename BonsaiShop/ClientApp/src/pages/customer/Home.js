import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../css/CustomerHome.css';

class Home extends Component {
    render() {
        let videoIntro = () => {
            if (this.props.rangeBarChange) {
                return (
                    <header>
                        <div className="overlay" />
                        <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
                            <source src="/bonsai_Inro.mp4" type="video/mp4" />
                        </video>
                        <div className="container h-100">
                            <div className="d-flex h-100 text-center align-items-center">
                                <div className="w-100 text-white">
                                    <h1 id="brand-name-overlay" className="display-3 sloganOverlay">Bảo Bảo Shop</h1>
                                    <p className="lead mb-0 sloganOverlay">Mang cả thiên nhiên vào chính ngôi nhà của bạn!</p>
                                </div>
                            </div>
                        </div>
                    </header>)
            }
        }
        return (
            <div>
                {console.log(this.props.rangeBarChange)}
                {videoIntro()}
                <h1>1</h1>
                <h1>1</h1>
                <h1>2</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    filterPrice: state.filterPrice,
    filterHeight: state.filterHeight,
    filterOrigin: state.filterOrigin,
    rangeBarChange : state.rangeBarChange,
    SortMode: state.SortMode,
})
export default connect(mapStateToProps)(Home);