import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import ProductItem from '../../components/ProductItemAdmin';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 15
        };
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    render() {
        return (
            <div>
                <h1 className="my-4">Danh Sách sản phẩm</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Thumbnail</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Chiều cao</th>
                            <th scope="col">Xuất xứ</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Chỉnh sửa</th>
                            <th scope="col">Xem đầy đủ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ProductItem/>
                        <ProductItem/>
                        <ProductItem/>
                        <ProductItem/>
                        <ProductItem/>
                        <ProductItem/>
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
                            itemsCountPerPage={10}
                            totalItemsCount={450}
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