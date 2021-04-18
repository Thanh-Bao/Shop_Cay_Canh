import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import callAPi from '../../callAPI/callAPIMainServer';
import firebaseConfig from '../../FirebaseConfig';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}
firebase.analytics();


class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: '',
            quantity: '',
            height: '',
            origin: "Việt Nam",
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
        let productID = localStorage.getItem("LASTED_EDDIT_PRODUCT_ID");
        event.preventDefault();
        callAPi(`products/${productID}`, 'PUT', null, this.state).then(res => {
            alert("Đã Lưu thành công");
        }).catch(err => {
            alert("BẠN KHÔNG CÓ QUYỀN VỚI THAO TÁC NÀY!");
        })

    }


    componentDidMount() {
        let productID = localStorage.getItem("LASTED_EDDIT_PRODUCT_ID");
        callAPi(`Products/Admin/${productID}`).then(res => {
            this.setState({
                name: res.data.name,
                price: res.data.price,
                quantity: res.data.quantity,
                height: res.data.height,
                origin: res.data.origin,
                thumbnail: res.data.thumbnail,
                detailImage: res.data.detailImage,
                description: res.data.description
            });
        })
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
            renderImgThumbnail = <img width={200} src={this.state.thumbnail} />
        }
        if (this.state.detailImage != null) {
            renderImgDetail = <img width={200} src={this.state.detailImage} />
        }


        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1 className="mt-2">Thêm mới 1 sản phẩm</h1>
                        </div>
                        <form onSubmit={this.handleSubmit} id="create-course-form" className="col-12">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Tên</label>
                                <input required
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                                    name="name" type="text" className="form-control" placeholder="Tên không quá 50 ký tự" />
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Giá (VNĐ)</label>
                                        <input required
                                            min={100000}
                                            max={9999999999}
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
                                        <input required
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
                                        <input required
                                            min={10}
                                            max={200}
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

                                initialValue={this.state.description}

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

export default EditProduct;