import React, { Component } from 'react';

class Contact extends Component {

    change(hihi) {
        console.log(hihi)
    }



    render() {
        return (
            <div className="container text-center mt-5">
                <div className="row">
                    <div className="col-12">
                        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeBBME7YPFEPPQN8lGrZYwCkEFFDM9kcKOASOMeuGBG-RLDvA/viewform?embedded=true" width="600" height="800" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;