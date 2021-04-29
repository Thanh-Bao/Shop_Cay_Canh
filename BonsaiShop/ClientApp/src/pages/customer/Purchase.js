import React, { Component } from 'react';
import CallAPI from '../../callAPI/callAPIMainServer';
import QRCode from "react-qr-code";
import '../../css/Purchase.css';
import { connect } from 'react-redux';


class Purchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderID: 0,
            sum: 0,
            checkingPurchaseFailure: 1,
            customerName: "",
            province: "",
            district: "",
            ward: "",
            street: "",
            listProvinces: "",
            listDistricts: "",
            listWards: ""
        }
        this.ChangeHandle = this.ChangeHandle.bind(this);
    }

    componentDidMount() {
        console.log("xxx")
        console.log(localStorage.getItem("LASTED_ORDERID"))
        console.log(localStorage.getItem("LASTEDSUM"))
        let userPhone = localStorage.getItem("PHONEUSERLOGINED");
        CallAPI("Address/provinces").then(res => {
            this.setState({
                listProvinces: res.data.data
            })
        });
        CallAPI(`Users/${userPhone}`).then(res => {
            this.setState({
                orderID: localStorage.getItem("LASTED_ORDERID") == null ? 0 : localStorage.getItem("LASTED_ORDERID"),
                sum: localStorage.getItem("LASTEDSUM") == null ? 0 : localStorage.getItem("LASTEDSUM"),
                customerName: res.data.name
            })
        })
    }

    acceptPurchase() {
        let userPhone = localStorage.getItem("PHONEUSERLOGINED");
        CallAPI('Orders/accept-purchase', 'POST', { phone: userPhone })
            .then(res => {
                localStorage.setItem("LASTED_ORDERID", res.data);
                localStorage.setItem("LASTEDSUM", this.props.totalItemCart.sum);
            })
            .catch(() => {
                alert("LỖI THANH TOÁN ! Hãy Xóa cache, LOCALSTORAGE, Ctrl+F5 & dùng tab ẩn danh");
            })
    }

    checkEmpty() {
        let province = this.state.province;
        let district = this.state.district;
        let ward = this.state.ward;
        let street = this.state.street;
        let name = this.state.name;

        if (province === ""
            || district === ""
            || ward === ""
            || street == ""
            || name == ""
        ) {
            return false;
        } else {
            return true;
        }
    }


    updateProfile() {
        let province = this.state.province;
        let district = this.state.district;
        let ward = this.state.ward;
        let street = this.state.street;
        let name = this.state.customerName;

        let userPhone = localStorage.getItem("PHONEUSERLOGINED");
        let body = {
            address: province + ", " + district + ", " + ward + ", " + street + ", ",
            name: name
        }
        CallAPI(`Users/${userPhone}`, 'PUT', null, body).then(() => {
            this.acceptPurchase();
        })
    }


    COD() {
        if (this.checkEmpty()) {
            this.updateProfile();
            alert("Đơn hàng của bạn đã tạo thành công!")
            localStorage.removeItem("TOTAL_ITEM_CART")
            this.props.dispatch({ type: "UPDATE_TOTAL_ITEM_CART", totalItemCart: { count: 0, sum: 0 } })
            this.props.history.push('/');
        } else {
            alert("Hãy nhập đầy đủ thông tin")
        }
    }

    checkBanking() {
        if (this.checkEmpty()) {
            this.updateProfile();
            console.log("tỉnh: " + this.state.province + " quận: " + this.state.district + " huyện: " + this.state.ward + " đường: " + this.state.street)
            this.setState({
                checkingPurchaseFailure: 2
            });
            CallAPI('Orders/check-transfer', 'POST', { orderID: localStorage.getItem("LASTED_ORDERID") }).then(
                res => {
                    if (res.data) {

                        CallAPI('Orders/purchase-successful', 'POST', { orderId: localStorage.getItem("LASTED_ORDERID") })
                            .then(res => {
                                alert("Đã xác thực thành công, bạn sẽ nhận được hàng từ 3-5 ngày");
                            }).catch(() => {
                                this.setState({
                                    checkingPurchaseFailure: 4
                                })
                            })

                        localStorage.removeItem("TOTAL_ITEM_CART")
                        this.props.dispatch({ type: "UPDATE_TOTAL_ITEM_CART", totalItemCart: { count: 0, sum: 0 } })
                        this.props.history.push('/');
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
        } else {
            alert("Hãy nhập đầy đủ thông tin")
        }
    }

    ChangeHandle(event) {
        const target = event.target;
        let value = (target.name === 'province' || target.name === "district" || target.name === 'ward') ? event.nativeEvent.target[event.nativeEvent.target.selectedIndex].text : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        if (name === "province") {
            CallAPI("Address/districts", null, { province_id: target.value }).then(res => {
                this.setState({
                    listDistricts: res.data.data
                })
            })
        } else if (name === "district") {
            CallAPI("Address/wards", null, { district_id: target.value }).then(res => {
                this.setState({
                    listWards: res.data.data
                })
            })
        }
    }


    render() {
        var numeral = require('numeral');

        let showMessage;


        switch (this.state.checkingPurchaseFailure) {
            case 2:
                showMessage = (<div className="mt-5"><h1>Hệ thống đang kiểm tra ..... </h1> <div className="google-loader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div></div>)
                break;
            case 3:
                showMessage = (
                    <div className="alert alert-danger mt-4" role="alert">
                        <h3 className="alert-heading">Lỗi xác thực!</h3>
                        <p>Quý khách chưa chuyển tiền hoặc sai mã đơn hàng</p>
                        <hr />
                        <p className="mb-0">Vui lòng xác nhận lại sau 5 phút, hệ thống đang cập nhật hoặc chọn COD</p>
                    </div>
                )
                break;
            case 4:
                showMessage = (
                    <div className="alert alert-warning mt-4" role="alert">
                        <h3 className="alert-heading">Lỗi cập nhật phương thức thanh toán</h3>
                        <p>Hệ thống đã xác nhận chuyển tiền thành công</p>
                        <hr />
                        <p className="mb-0">Phương thức thanh toán hiện tại COD</p>
                    </div>
                )
                break;

            default:
                break;
        }

        let provinces;
        let districts;
        let wards;

        if (this.state.listProvinces !== "") {
            provinces = this.state.listProvinces.map(province => {
                return <option key={province.ProvinceID} value={province.ProvinceID}>{province.ProvinceName}</option>
            })
        }

        if (this.state.listDistricts !== "") {
            districts = this.state.listDistricts.map(district => {
                return <option key={district.DistrictID} value={district.DistrictID}>{district.DistrictName}</option>
            })
        }

        if (this.state.listWards !== "") {
            wards = this.state.listWards.map(ward => {
                return <option key={ward.WardCode} value={ward.WardCode}>{ward.WardName}</option>
            })
        }

        return (

            <div>

                <div className="container mt-5">

                    <div className="row justify-content-center text-center">
                        <div className="col-6">
                            <label htmlFor="SelectProvince">Nhập họ tên</label>
                            <input value={this.state.customerName} name="customerName" onChange={this.ChangeHandle} type="text" className="form-control" placeholder="nhập họ tên" />
                        </div>
                    </div>

                    <div className="row py-5">
                        <div className="col-3">
                            <label htmlFor="SelectProvince">Chọn tỉnh/TP</label>
                            <select onChange={this.ChangeHandle} name="province" className="form-control" id="SelectProvince">
                                <option defaultValue>Chọn tỉnh/TP</option>
                                {provinces}
                            </select>
                        </div>
                        <div className="col-3">
                            <label htmlFor="SelectDistrict">Chọn quận/huyện</label>
                            <select onChange={this.ChangeHandle} name="district" className="form-control" id="SelectDistrict">
                                <option defaultValue>Chọn quận/huyện</option>
                                {districts}
                            </select>
                        </div>
                        <div className="col-3">
                            <label htmlFor="SelectWard">Chọn xã/phường</label>
                            <select onChange={this.ChangeHandle} name="ward" className="form-control" id="SelectWard">
                                <option defaultValue>Chọn xã/phường</option>
                                {wards}
                            </select>
                        </div>
                        <div className="col-3">
                            <label htmlFor="SelectWard">Nhập tên đường/số nhà</label>
                            <input onChange={this.ChangeHandle} name="street" required type="text" className="form-control" />
                        </div>
                    </div>
                </div>



                <div className="container mb-5 justify-content-center text-center">
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
            </div>
        );
    }
}

const mapStateToProps = state => ({
    adminLogined: state.adminLogined,
    totalItemCart: state.totalItemCart
});
export default connect(mapStateToProps)(Purchase);
