import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import callAPi from '../../callAPI/callAPIMainServer';



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCfAKzNHLhlI3_0xxlQQ2PKeuVExG6E_xY",
    authDomain: "dotnet2021bonsaishop.firebaseapp.com",
    databaseURL: "https://dotnet2021bonsaishop-default-rtdb.firebaseio.com",
    projectId: "dotnet2021bonsaishop",
    storageBucket: "dotnet2021bonsaishop.appspot.com",
    messagingSenderId: "716055325870",
    appId: "1:716055325870:web:1383595713b4d66658913f",
    measurementId: "G-12JX969BP3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: '',
            quantity: '',
            height: '',
            origin: "",
            thumbnail: null,
            detailImage: null,
            description: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUploadSuccessThumbnail = filename => {
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ thumbnail: url }));
    };
    handleUploadSuccessimgDetail = filename => {
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ detailImage: url }));
    };

    handleInputChange(event) {
        const target = event.target;
        let value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });


    }

    handleSubmit(event) {
        event.preventDefault();
        callAPi('products/create', 'POST', null , this.state).then(res => {
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })

        alert("Đã thêm thành công");

    }

    handleEditorChange = content => {
        this.setState({
            description: content
        });
    }
    render() {

        let renderImgThumbnail;
        let renderImgDetail;
        if (this.state.thumbnail != null) {
            renderImgThumbnail = <img width={100} src={this.state.thumbnail} />
        }
        if (this.state.detailImage != null) {
            renderImgDetail = <img width={100} src={this.state.detailImage} />
        }


        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1 className="mt-2">Thêm mới 1 sản phẩm</h1>
                        </div>
                        <form onSubmit={this.handleSubmit} className="col-12">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Tên</label>
                                <input
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                                    name="name" type="text" className="form-control" placeholder="Tên không quá 50 ký tự" />
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Giá (VNĐ)</label>
                                        <input
                                            value={this.state.price}
                                            onChange={this.handleInputChange}
                                            name="price" type="number" id="inputPassword5" className="form-control"
                                            placeholder="> 100.000đ"
                                        />

                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Số lượng</label>
                                        <input
                                            value={this.state.quantity}
                                            onChange={this.handleInputChange}
                                            name="quantity" type="number" id="inputPassword5" className="form-control"
                                        />

                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Chiều cao (cm)</label>
                                        <input
                                            value={this.state.height}
                                            onChange={this.handleInputChange}
                                            name="height" type="number" id="inputPassword5" className="form-control"
                                            placeholder="10cm - 100cm"
                                        />

                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label >Chọn Xuất Xứ:</label>
                                        <select
                                            value={this.state.origin}
                                            onChange={this.handleInputChange}
                                            name="origin" id="inputState" className="form-control">
                                            <option value={"Việt Nam"}>Việt Nam</option>
                                            <option value={"Thái Lan"}>Thái Lan</option>
                                            <option value={"Đài Loan"}>Đài Loan</option>
                                            <option value={"Hoa Kỳ"}>Hoa Kỳ</option>
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-3">
                                    <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                                        Chọn ảnh thumbnail
                                         <FileUploader
                                            hidden
                                            accept="image/*"
                                            storageRef={firebase.storage().ref('images')}
                                            onUploadStart={this.handleUploadStart}
                                            onUploadError={this.handleUploadError}
                                            onUploadSuccess={this.handleUploadSuccessThumbnail}
                                            onProgress={this.handleProgress}
                                        />
                                    </label>
                                </div>
                                <div className="col-3">
                                    {renderImgThumbnail}
                                </div>
                                <div className="col-3">
                                    <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                                        Chọn ảnh mô tả
                                         <FileUploader
                                            hidden
                                            accept="image/*"
                                            storageRef={firebase.storage().ref('images')}
                                            onUploadStart={this.handleUploadStart}
                                            onUploadError={this.handleUploadError}
                                            onUploadSuccess={this.handleUploadSuccessimgDetail}
                                            onProgress={this.handleProgress}
                                        />
                                    </label>
                                </div>
                                <div className="col-3">
                                    {renderImgDetail}
                                </div>
                            </div>

                            <p>Nhập Mô tả chi tiết</p>
                            <Editor

                                initialValue="<span></span>"

                                init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
                                }}
                                onEditorChange={this.handleEditorChange}
                            />

                            <div className="row mt-3 mb-5">
                                <div className="col-12 text-center">
                                    <button style={{ fontSize: 30 }} type="submit" className="btn btn-primary btn-lg"><i className="fas fa-save"></i> Lưu</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddProduct;