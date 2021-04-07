import React, { Component } from 'react';

class Contact extends Component {

     change(hihi){
    console.log(hihi)
     }



    render() {
        return (
            <div>
            <select id="lang" value="123" onChange={event => this.change(event.target.value)} >
               <option value="select">Select</option>
               <option value="Java">Java</option>
               <option value="C++">C++</option>
            </select>
            <p></p>
        </div>
        );
    }
}

export default Contact;