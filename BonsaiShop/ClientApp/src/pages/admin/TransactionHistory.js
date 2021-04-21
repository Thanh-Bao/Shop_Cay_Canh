import React, { Component } from 'react';
import CallAPI from '../../callAPI/callAPIMainServer';

class TransactionHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: null
        }

    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        CallAPI("Momo").then(res => {
            function unixTimeToDate(timeStamp) {
                const milliseconds = timeStamp * 1000 // 1575909015000
                const dateObject = new Date(milliseconds)
                const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
                return humanDateFormat;
            }
            let arr = []
            let result = res.data.transactions;
            for (let x in result) {
                let transaction = result[x];
                transaction.time = unixTimeToDate(transaction.time);
                arr.push(transaction)
            }
            arr.reverse();

            for(var i=0; i < arr.length; i++) {
                if(arr[i].partner === 'null')
                {
                   arr.splice(i,1);
                }
             }

            this.setState({
                list: arr
            })
        })
    }

    


    render() {

        let listMoMo;
        if (this.state.list != null) {
            listMoMo = this.state.list.map(MoMo => {
                return <tr key={MoMo.TransactionId}>
                    <td><span className="badge bg-warning text-dark">{MoMo.partner}</span></td>
                    <td><span className="badge bg-success">{MoMo.partnerId}</span></td>
                    <td><span className="badge bg-primary">{MoMo.amount}</span> VNĐ</td>
                    <td><span className="badge bg-light text-dark">{MoMo.content}</span></td>
                    <td><span className={(MoMo.type > 0) ? "badge bg-success" : "badge bg-danger"}>{(MoMo.type > 0) ? "nhận" : "chuyển"}</span></td>
                    <td><span className="badge bg-info text-dark">{MoMo.time}</span></td>
                </tr>
            });
        }
        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end ">
                        <button onClick={() => { this.loadData() }} type="button" className="btn btn-primary my-2"><i className="fas fa-sync-alt"></i> Cập nhật lại danh sách</button>
                        </div>
                    </div>
                    <table className="table">

                        <thead>
                            <tr>
                                <th scope="col">Tên</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Số tiền</th>
                                <th scope="col">Lời nhắn</th>
                                <th scope="col">Hình thức</th>
                                <th scope="col">Thời gian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listMoMo}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TransactionHistory;