import React, { Component } from 'react';
import CallAPI from '../../callAPI/callAPIMainServer';
import QRCode from "react-qr-code";
import '../../css/Purchase.css';
import { connect } from 'react-redux';

class Purchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderID: localStorage.getItem("LASTED_ORDERID") == null ? 0 : localStorage.getItem("LASTED_ORDERID"),
            sum: localStorage.getItem("LASTEDSUM") == null ? 0 : localStorage.getItem("LASTEDSUM"),
            checkingPurchaseFailure: 1
        }
    }

    componentDidMount() {

    }

    COD() {
        alert("Đơn hàng của bạn đã tạo thành công!")
        localStorage.removeItem("TOTAL_ITEM_CART")
        this.props.dispatch({type:"UPDATE_TOTAL_ITEM_CART",totalItemCart : {count:0, sum:0}})
        this.props.history.push('/profile');
    }

    checkBanking() {
        this.setState({
            checkingPurchaseFailure: 2
        })

        let userPhone = localStorage.getItem("PHONEUSERLOGINED");
        CallAPI(`Orders/check-transfer${userPhone}`, 'POST', { orderID: localStorage.getItem("LASTED_ORDERID") }).then(
            res => {
                if (res.data) {
                    alert("Đã xác thực thành công, bạn sẽ nhận được hàng từ 3-5 ngày");
                    localStorage.removeItem("TOTAL_ITEM_CART")
                    this.props.dispatch({type:"UPDATE_TOTAL_ITEM_CART",totalItemCart : {count:0, sum:0}})
                    this.props.history.push('/profile');
                } else {
                    this.setState({
                        checkingPurchaseFailure: 3
                    })
                }
            }
        ).catch(err => {
            this.setState({
                checkingPurchaseFailure: 3
            })
        })
    }


    render() {
        var numeral = require('numeral');

        let showMessage;

        if (this.state.checkingPurchaseFailure === 3) {
            showMessage = (
                <div className="alert alert-danger mt-4" role="alert">
                    <h3 className="alert-heading">Lỗi xác thực!</h3>
                    <p>Quý khách chưa chuyển tiền hoặc sai mã đơn hàng</p>
                    <hr />
                    <p className="mb-0">Vui lòng kiểm tra lại hoặc chọn hình thức COD</p>
                </div>
            )
        } else if (this.state.checkingPurchaseFailure == 2) {
            showMessage = (<div className="mt-5"><h1>Đang kiểm tra ..... </h1> <div class="google-loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div></div>)
        }


        return (
            <div className="container my-5 justify-content-center text-center">
                <QRCode value={`2|99|0943417917|TRAN THANH BAO|thanh.bao@outlook.com|0|0|${this.state.sum}`} />
                <h1 className="mt-3">Số tiền cần thanh toán: <span className="text-danger">{numeral(this.state.sum).format('0,0')} đ</span></h1>
                <h1>Nhập mã đơn hàng <span className="text-danger">{this.state.orderID}</span> vào nội dung chuyển tiền.</h1>
                <div className="row text-center justify-content-center">
                    <button onClick={() => { this.checkBanking() }} type="button" className="btn btn-primary mx-4"><i className="fas fa-money-check-alt"></i> Xác nhận đã chuyển tiền</button>
                    <button onClick={() => { this.COD() }}
                     type="button" className="btn btn-primary" 
                     data-bs-toggle="tooltip" data-bs-placement="top" title="COD:  cash on delivery-Thanh toán sau khi nhận hàng">
                         <i className="fas fa-people-carry"></i> Thanh toán COD </button>
                    <span className="mb-4"></span>
                </div>
                <div className="row text-center justify-content-center">
                    <span className="mb-4"></span>
                    {showMessage}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    adminLogined: state.adminLogined
});
export default connect(mapStateToProps)(Purchase);