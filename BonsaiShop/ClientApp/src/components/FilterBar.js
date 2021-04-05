import React, { Component } from 'react';
import InputRange from 'react-input-range';
import { connect } from 'react-redux';
import 'react-input-range/lib/css/index.css';

class FilterBar extends Component {
    handleChange(event) {
        this.setState(console.log({ value: event.target.value }));
    }
    render() {
        return (
            <div id="filter-bar-customer">
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
                                onChange={filterPrice => this.props.dispatch({ type: "UPDATE_FILTER_PRICE", data: filterPrice })} />
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
                                onChange={filterHeight => this.props.dispatch({ type: "UPDATE_FILTER_HEIGHT", data: filterHeight })} />
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
})
export default connect(mapStateToProps)(FilterBar);