import React, { Component } from 'react';
import InputRange from 'react-input-range';
import { connect } from 'react-redux';
import 'react-input-range/lib/css/index.css';

class FilterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 'coconut'};
    }
    render() {
        return (

            <div id="filter-bar-customer">
                <div className="container-fluid">
                    <div className="row d-flex justify-content-between">

                        <div className="col-1">
                            <span className="text-nowrap">Mức giá :</span>
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
                            <span className="text-nowrap">Chiều cao:</span>
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
                                <select  className="form-control" value={this.state.value} onChange={this.handleChange}>
                                    <option  selected disabled>Chọn xuất xứ</option>
                                    <option value={"Việt Nam"}>Việt Nam</option>
                                    <option value={"Thái Lan"}>Thái Lan</option>
                                    <option value={"Đài Loan"}>Đài Loan</option>
                                    <option value={"Hoa Kỳ"}>Hoa Kỳ</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="form-group">
                                <select value={99} className="form-control" value={this.state.value} onChange={this.handleChange}>
                                    <option selected disabled>Sắp xếp theo</option>
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
    filterHeight: state.filterHeight
})

export default connect(mapStateToProps)(FilterBar);