import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import callAPi from '../../callAPI/callAPIMainServer';
import '../../css/CustomerHome.css';
import Loading from '../../components/Loading';
import CartProduct from '../../components/CartProduct';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            listProduct: null,
            itemsCountPerPage: 1,
            totalItemsCount: 1
        };
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }


    componentDidMount() {
        callAPi('products').then(res => {
            this.setState({
                listProduct: res.data.list,
                totalItemsCount: res.data.totalItem,
                itemsCountPerPage: res.data.pageSize
            })
        })
    }

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
                                    <p className="lead mb-0 sloganOverlay">Hệ thống mua sắm và thanh toán 1 chạm hàng đầu thế giới</p>
                                </div>
                            </div>
                        </div>
                    </header>)
            }
        }

        let test = () => {
            var elements = [];
            if (this.state.listProduct != null) {
                this.state.listProduct.map(product => {
                    return elements.push(<h1 key={product.productID}>{product.name}</h1>)
                })
            } else {
                elements.push(<Loading />)
            }
            return elements;
        }

        return (
            <div>
                {videoIntro()}
                {/*  LIST */}
                <div className="container mt-4">
                    <div className="row">


                        <div className="col-lg-4 col-sm-6 mb-4">
                            <CartProduct
                                thumbnail="https://picsum.photos/id/132/3200/900"
                                fullImage="https://via.placeholder.com/700x400"
                            />
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4">
                            <CartProduct
                                thumbnail="https://picsum.photos/id/132/3200/900"
                                fullImage="https://via.placeholder.com/700x400"
                            />
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4">
                            <CartProduct
                                thumbnail="https://picsum.photos/id/132/3200/900"
                                fullImage="https://via.placeholder.com/700x400"
                            />
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4">
                            <CartProduct
                                thumbnail="https://picsum.photos/id/132/3200/900"
                                fullImage="https://via.placeholder.com/700x400"
                            />
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4">
                            <CartProduct
                                thumbnail="https://picsum.photos/id/132/3200/900"
                                fullImage="https://via.placeholder.com/700x400"
                            />
                        </div>


                    </div>
                </div>
                {/* / LIST */}
                <div className="container">
                    <div className="row justify-content-center mb-4">
                        <Pagination
                            activePage={this.state.activePage}
                            firstPageText="trang đầu"
                            lastPageText="trang cuối"
                            itemClass="page-item"
                            linkClass="page-link"
                            itemsCountPerPage={this.state.itemsCountPerPage}
                            totalItemsCount={this.state.totalItemsCount}
                            pageRangeDisplayed={parseInt(process.env.REACT_APP_PAGE_RANGE_DISPLAYED)}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>
                </div>


                {
                    test()
                }

            </div>
        );
    }
}
const mapStateToProps = state => ({
    filterPrice: state.filterPrice,
    filterHeight: state.filterHeight,
    filterOrigin: state.filterOrigin,
    rangeBarChange: state.rangeBarChange,
    SortMode: state.SortMode,
})
export default connect(mapStateToProps)(Home);