import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import callAPi from '../../callAPI/callAPIMainServer';
import '../../css/CustomerHome.css';
import ImageHolder from '../../components/Loading';
import CartProduct from '../../components/CartProduct';


class Home extends Component {

    handlePageChange(pageNumber) {
        console.log(pageNumber);
        this.props.dispatch({ type: "UPDATE_ACTIVE_PAGE", data: pageNumber });
        this.props.dispatch({ type: "FETCH_CUSTOMER_LIST_PRODUCT", data: null });
        callAPi('products', null, { page: pageNumber }).then(res => {
            this.props.dispatch({ type: "FETCH_CUSTOMER_LIST_PRODUCT", data: res.data.list });
            this.props.dispatch({ type: "UPDATE_ITEMS_COUNT_PER_PAGE", data: res.data.pageSize });
            this.props.dispatch({ type: "UPDATE_TOTAL_ITEMS_COUNT", data: res.data.totalItem });
        })
    }


    componentDidMount() {
        callAPi('products').then(res => {
            this.props.dispatch({ type: "FETCH_CUSTOMER_LIST_PRODUCT", data: res.data.list });
            this.props.dispatch({ type: "UPDATE_ITEMS_COUNT_PER_PAGE", data: res.data.pageSize });
            this.props.dispatch({ type: "UPDATE_TOTAL_ITEMS_COUNT", data: res.data.totalItem });
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
                                    <p className="lead mb-0 sloganOverlay">Hệ thống chuỗi của hàng mua sắm và thanh toán 1 chạm hàng đầu thế giới</p>
                                </div>
                            </div>
                        </div>
                    </header>)
            }
        }

        let listCartProducts;
        if (this.props.listProductCustomer != null) {
            if (this.props.listProductCustomer.length == 0) {
                listCartProducts = <ImageHolder url="/no_result.gif" />
            } else {
                listCartProducts = this.props.listProductCustomer.map(product => {
                    return (
                        <div key={product.productID} className="col-lg-4 col-sm-6 mb-4">
                            <CartProduct
                                thumbnail="https://picsum.photos/id/132/3200/900"
                                fullImage="https://via.placeholder.com/700x400"
                                name={product.name}
                                price={product.price}
                                height={product.height}
                                description={product.description}
                                origin={product.origin}
                            />
                        </div>
                    )
                })
            }   
        } else {
            listCartProducts = <ImageHolder url="/loading.gif" />
        };


        let showPagination;

        if (this.props.listProductCustomer!=null && this.props.listProductCustomer.length > 0) {
            showPagination = (
                <div className="container mt-4">
                    <div className="row justify-content-center mb-4">
                        <Pagination
                            activePage={this.props.activePage}
                            firstPageText="trang đầu"
                            lastPageText="trang cuối"
                            itemClass="page-item"
                            linkClass="page-link"
                            itemsCountPerPage={this.props.itemsCountPerPage}
                            totalItemsCount={this.props.totalItemsCount}
                            pageRangeDisplayed={parseInt(process.env.REACT_APP_PAGE_RANGE_DISPLAYED)}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>
                </div>
            );
        }

        return (
            <div>
                {videoIntro()}
                {/*  LIST */}
                <div className="container mt-4">
                    <div className="row">
                        {listCartProducts}
                    </div>
                </div>
                {/* / LIST */}

                {showPagination}

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
    listProductCustomer: state.listProductCustomer,
    itemsCountPerPage: state.itemsCountPerPage,
    totalItemsCount: state.totalItemsCount,
    activePage: state.activePage
})
export default connect(mapStateToProps)(Home);