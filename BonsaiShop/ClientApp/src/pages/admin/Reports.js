import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading';

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listReport: null
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: "https://sheet.best/api/sheets/b2998f4f-ab3d-4383-810b-f266ceeb5b11",
        }).then(res => {
            console.log(res.data)
            this.setState({
                listReport: res.data
            })
        })
    }
    render() {

        let records;

        if (this.state.listReport != null) {
            records = this.state.listReport.map(report => {
                return (
                    <tr>
                        <td>{report.Timestamp}</td>
                        <td>{report.phone}</td>
                        <td>{report.name}</td>
                        <td>{report.content}</td>
                        <td><input className="form-check-input" type="checkbox" /></td>
                    </tr>
                )
            })
        }

        return (
            <div className="my-5">
                {(this.state.listReport!=null)?
                (<table className="table">
                <thead>
                    <tr>
                        <th scope="col">Thời gian</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Họ tên</th>
                        <th scope="col">Nội dung</th>
                        <th scope="col">Đã xử lý?</th>
                    </tr>
                </thead>
                <tbody>
                    {records}
                </tbody>
            </table>): (<Loading url='/loading.gif'/>)
                }
            </div>
        );
    }
}

export default Reports;