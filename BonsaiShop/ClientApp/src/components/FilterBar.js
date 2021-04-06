import React, { Component } from 'react';
import InputRange from 'react-input-range';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import 'react-input-range/lib/css/index.css';

class FilterBar extends Component {

    handleChange(type, data) {
        this.props.dispatch({ type: type, data: data });
        this.props.dispatch({ type: "REDIRECT_TO_HOME" });
    }
    render() {
        let redirectToHome = () => {
            if (this.props.redirectToHome) {
                return <Redirect to='/home' />
            } else {
                return null;
            }

        }
        return (
            <div id="filter-bar-customer">
                {redirectToHome()}
                <div className="container-fluid">
                    <div className="row d-flex justify-content-between">

                        <div className="col-1">
                            <span className="text-nowrap filter-lbl-nav">Mức giá :</span>
                        </div>
                        <div className="col-3">
                            <InputRange
                                formatLabel={value => `${value} nghìn`}
                                step={100}
                                maxValue={900}
                                minValue={100}
                                value={this.props.filterPrice}
                                onChange={filterPrice => this.handleChange("UPDATE_FILTER_PRICE", filterPrice)} />
                        </div>
                        <div className="col-1">
                            <span className="text-nowrap filter-lbl-nav">Chiều cao:</span>
                        </div>
                        <div className="col-3">
                            <InputRange
                                formatLabel={value => `${value}cm`}
                                step={10}
                                maxValue={100}
                                minValue={20}
                                value={this.props.filterHeight}
                                onChange={filterHeight => this.handleChange("UPDATE_FILTER_HEIGHT", filterHeight)} />
                        </div>
                        <div className="col-2">
                            <div className="form-group">
                                <select className="form-control" value={this.props.filterOrigin} onChange={event => { this.props.dispatch({ type: "UPDATE_FILTER_ORIGIN", data: event.target.value }) }}>
                                    <option value={0}>Chọn xuất xứ</option>
                                    <option value={"Việt Nam"}>Việt Nam</option>
                                    <option value={"Thái Lan"}>Thái Lan</option>
                                    <option value={"Đài Loan"}>Đài Loan</option>
                                    <option value={"Hoa Kỳ"}>Hoa Kỳ</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="form-group">
                                <select className="form-control" value={this.props.SortMode} onChange={event => { this.props.dispatch({ type: "UPDATE_SORT_MODE", data: event.target.value }) }}>
                                    <option value={0}  >Sắp xếp theo</option>
                                    <option value={1}>Giá</option>
                                    <option value={2}>Chiều cao</option>
                                    <option value={3}>Mới cập nhật</option>
                                </select>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
const mapStateToProps = state => ({
    filterPrice: state.filterPrice,
    filterHeight: state.filterHeight,
    filterOrigin: state.filterOrigin,
    SortMode: state.SortMode,
    redirectToHome: state.redirectToHome
})
export default connect(mapStateToProps)(FilterBar);