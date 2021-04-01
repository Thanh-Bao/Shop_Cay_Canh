import React, { Component } from 'react';
import { connect } from 'react-redux';
class App extends Component {
    render() {
        return (
            <div>
                <div>ffassfdasd
                    {console.log(this.props.kkk)}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    kkk: state.abc
})
export default connect(mapStateToProps)(App);