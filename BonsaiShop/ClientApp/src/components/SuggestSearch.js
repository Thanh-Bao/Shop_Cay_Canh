import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import callAPi from '../callAPI/callAPIMainServer';
import '../css/suggestSearch.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

class SuggestSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ////////////////////////
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ""
        };

    }

    onChange = e => {
        let list = [];
        callAPi('products/search', null, { keyword: e.currentTarget.value }).then(res => {
            list = res.data.list;
            this.setState({
                filteredSuggestions: list
            })
        })
        this.setState({
            activeSuggestion: 0,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    

    handleSubmit = event => {
        event.preventDefault();
        callAPi('products/search', null, { keyword: this.state.userInput }).then(res => {
            this.props.dispatch({ type: "HIDDEN_VIDEO_INTRO" });
            this.props.dispatch({ type: "FETCH_CUSTOMER_LIST_PRODUCT", data: res.data.list });
            this.props.dispatch({ type: "UPDATE_ITEMS_COUNT_PER_PAGE", data: res.data.pageSize });
            this.props.dispatch({ type: "UPDATE_TOTAL_ITEMS_COUNT", data: res.data.totalItem });
        })

    }

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        } else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };



    onClick = e => {
        this.setState({
            userInput: ""
        })
    };


    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((product, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }
                            return (
                                <li className={className} key={product.productID}>
                                    <a target="_blank" 
                                    id="ItemSuggest"
                                     onClick={onClick}
                                    href={process.env.REACT_APP_DOMAIN+`product-detail/`+product.productID}>{product.name}</a>
                                </li>
                            );
                        })}
                    </ul>
                );
            }
        }
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit} id="form-search-nav" className="form-inline ml-auto my-2 my-lg-0">
                    <div className="input-group">
                        <span id="nav-icon-search" className="input-group-text" id="basic-addonNavCustomer"><i className="fas fa-search"></i></span>
                        <input
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            value={userInput}
                            onChange={onChange}
                            id="nav-input-search" type="text"
                            className="form-control" placeholder="Bạn tìm gì?"
                            aria-label="Username" aria-describedby="basic-addonNavCustomer" />
                    </div>
                    <button id="nav-btn-search" className="btn btn-outline-success my-2 my-sm-0 " type="submit">Tìm</button>
                {suggestionsListComponent}
                </form>
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    rangeBarChange: state.rangeBarChange,
    redirectToHome: state.redirectToHome,
    activePage: state.activePage
})
export default connect(mapStateToProps)(SuggestSearch);