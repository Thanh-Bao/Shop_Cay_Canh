import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import ProductItem from '../../components/ProductItemAdmin';
import CallAPI from '../../callAPI/callAPIMainServer';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            listProduct: null,
            pageSize: 1,
            totalItem: 1
        };
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
        this.fetchData(pageNumber);

    }

    fetchData(page) {
        CallAPI('Products/Admin', null, { page: page }).then(res => {
            this.setState({
                listProduct: res.data.list,
                pageSize: res.data.pageSize,
                totalItem: res.data.totalItem

            })
        })
    }

    componentDidMount() {
        this.fetchData(1);
    }

    render() {
        let showListProduct;

        if (this.state.listProduct != null) {
            showListProduct = this.state.listProduct.map(product => {
                return <ProductItem
                    key={product.productID}
                    productID={product.productID}
                    thumbnail={product.thumbnail}
                    name={product.name}
                    price={product.price}
                    quantity={product.quantity}
                    height={product.height}
                    origin={product.origin}
                    description={product.description}

                />
            })
        }

        return (
            <div>
                <h1 className="my-4">Danh Sách sản phẩm</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Thumbnail</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Giá(đ)</th>
                            <th scope="col">Số lượng(cây)</th>
                            <th scope="col">Chiều cao(cm)</th>
                            <th scope="col">Xuất xứ</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Chỉnh sửa</th>
                            <th scope="col">Xem đầy đủ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showListProduct}
                    </tbody>
                </table>


                <div className="container mt-5 mb-5 pb-5">
                    <div className="row d-flex justify-content-center">
                        <Pagination
                            activePage={this.state.activePage}
                            firstPageText="trang đầu"
                            lastPageText="trang cuối"
                            itemClass="page-item"
                            linkClass="page-link"
                            itemsCountPerPage={this.state.pageSize}
                            totalItemsCount={this.state.totalItem}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Products;