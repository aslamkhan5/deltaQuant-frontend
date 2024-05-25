import React, { useState } from 'react'
import { Col, Modal, Row, Spinner } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import { DragDrop, dummyProfile } from '../utils/images';
import { MdArrowDropDown } from "react-icons/md";
import { RxCross1, RxCross2 } from 'react-icons/rx';
import InputField from './InputField';
import FormLabel from './FormLabel';
import Api from '../services/api';
import { toast } from 'react-toastify';
import { CiImageOn } from "react-icons/ci";
import { RiGalleryUploadLine } from 'react-icons/ri';


const PostModal = ({ show, onClose }) => {
    const companyProfilePhoto = localStorage?.getItem("companyProfilePhoto");
    const profilePhoto = localStorage?.getItem("profilePhoto");
    const companyName = localStorage?.getItem("companyName");
    const userName = localStorage?.getItem("userName");
    const token = localStorage.getItem("token");
    const [isDragging, setIsDragging] = useState(false);
    const [modalPreviewImage, setModalPreviewImage] = useState(null);
    const [newsFeedErrors, setNewsFeedErrors] = useState(false);
    const [loader, setLoader] = useState(false);
    const [newsPreviewImage, setNewsPreviewImage] = useState(null);
    const [newsData, setNewsData] = useState({
        title: "",
        description: "",
        file: null,
        role: "investor",
    });
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setNewsData({
            ...newsData,
            [name]: value,
        });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const maxSizeInBytes = 2 * 1024 * 1024;

        if (file) {
            if (file.size > maxSizeInBytes) {
                toast.error(
                    "Image size is larger than 2MB. Please upload a smaller file."
                );
                e.target.value = null;
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {

                setNewsPreviewImage(reader.result);
                // setNewsData((newsFeed) => ({
                //     ...newsFeed,
                //     file: file,
                // }));

            };
            reader.readAsDataURL(file);

            setTimeout(() => {
                e.target.value = null;
            }, 0);
        }
    };

    const handleNewsFeedSubmit = async () => {
        if (!newsData?.title || !newsData?.description || !newsData?.file) {
            setNewsFeedErrors(true);
            return;
        }
        try {
            setLoader(true);
            const formDataa = new FormData();
            for (const key in newsData) {
                formDataa.append(key, newsData[key]);
            }
            const response = await Api.addNewsFeed(formDataa, token);
            if (response?.success) {
                setNewsData((newsFeed) => ({
                    ...newsFeed,
                    title: "",
                    description: "",
                    file: null,
                    role: "investor",
                }));
                setNewsPreviewImage(null);
                setNewsFeedErrors(false);
                // getNewsFeed();
                toast.success("News feed added successfully");
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            toast.error(error?.data?.message);
        } finally {
            setLoader(false);
        }
    };
    return (
        <Modal show={show} onHide={onClose} className='modal-post'>
            <Modal.Header >
                <Modal.Title className='w-100 d-flex justify-content-between   align-items-start px-2 py-2'>
                    <div className=' d-flex align-items-center w-100 gap-3 ps-4 pt-4'>
                        <div className="profilep-img">
                            <img
                                src={dummyProfile}
                                alt=""
                            />
                        </div>
                        <div className='d-flex flex-column align-items-start'>
                            <h1 className="owner-name profile-owner mb-0 d-flex align-items-center gap-2">
                                Test User
                                <span>
                                    <Dropdown className="settings-dropdown">
                                        <Dropdown.Toggle id="dropdown-basic">
                                            <MdArrowDropDown className="arrow-down" />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </span>
                            </h1>
                            <p className='modal-desc'>
                                Post to Anyone
                            </p>
                        </div>

                    </div>
                    <button onClick={onClose} className='cross-btn '>
                        <RxCross1
                            className="cross-icon"
                        />
                    </button>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col
                        lg={12}
                        md={12}
                        xs={12}
                        className="portfolio-fields portfolio-fields-feed d-flex flex-column gap-4 px-4"
                    >
                        <div className=" form-group d-flex flex-column gap-2 mt-2">
                            <FormLabel
                                className="form-label"
                                labelText="Title"
                                required={true}
                            />
                            <InputField
                                className="form-input"
                                placeholder="Enter title"
                                type="text"
                                name="title"
                                value={newsData?.title}
                                onChange={(e) => handleDataChange(e)}
                            />
                            {newsFeedErrors && !newsData.title && (
                                <p className="error-message secondary-text mb-0">
                                    Please enter title
                                </p>
                            )}
                        </div>
                        <div className="form-group d-flex flex-column gap-2 mt-1">
                            <FormLabel
                                className="form-label"
                                labelText="Description"
                                required={true}
                            />
                            <textarea
                                id=""
                                cols="30"
                                rows="10"
                                className="form-input about-company about-feed"
                                name="description"
                                value={newsData?.description}
                                placeholder="Enter Description"
                                onChange={(e) => handleDataChange(e)}
                            ></textarea>
                            {newsFeedErrors && !newsData.description && (
                                <p className="error-message secondary-text mb-0">
                                    Please enter description
                                </p>
                            )}
                        </div>
                    </Col>

                    <Col lg={12} md={12} xs={12} className='px-4 mt-3'>
                        {!newsPreviewImage && (
                            <>
                                {/* <FormLabel
                                    className="form-label"
                                    labelText="Image"
                                    required={true}
                                /> */}

                                <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                                    <CiImageOn size={28} className='text-image' />
                                </label>
                                <input
                                    id="file-input"
                                    type="file"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </>
                        )}
                        {
                            newsPreviewImage ? (
                                <>
                                    <div className='position-relative mt-2'>
                                        <img
                                            src={newsPreviewImage}
                                            alt="Drag and drop icon"
                                            className=" drag-img mt-0 mb-0 "
                                        />
                                        <div className="cancel-img d-flex align-items-center justify-content-center">
                                            <RxCross2
                                                className="cancel-img-icon"
                                                onClick={() => setNewsPreviewImage(null)}
                                            />
                                        </div>
                                    </div>

                                </>
                            ) : (
                                <></>
                            )
                        }
                    </Col>
                </Row>

            </Modal.Body>
            <Row>
                <Col lg={12} md={12} xs={12} className='pb-2'>
                    <div className="d-flex justify-content-end align-items-center gap-3 mb-2 px-4  ">
                        <button
                            className="primary-btn update-button"
                            onClick={(e) => handleNewsFeedSubmit(e)}
                        >
                            Post{" "}
                            {loader ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : (
                                <></>
                            )}
                        </button>
                    </div>
                </Col>
            </Row>

            {/* <div className="modal-footer d-flex justify-content-end gap-3 align-items-center">
                <button onClick={onClose} className='profile-post'>Post</button>
            </div> */}

        </Modal>
    )
}

export default PostModal