import React, { useState } from 'react'
import { Box, Button, IconButton, Modal, Typography, TextField, CircularProgress, MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import { MdArrowDropDown } from "react-icons/md"
import { RxCross1, RxCross2 } from 'react-icons/rx'
import { toast } from 'react-toastify'
import { CiImageOn } from "react-icons/ci"
import {dummyProfile} from '../utils/images'
import Api from '../services/api'

const PostModal = ({ show, onClose }) => {
    const companyProfilePhoto = localStorage?.getItem("companyProfilePhoto")
    const profilePhoto = localStorage?.getItem("profilePhoto")
    const companyName = localStorage?.getItem("companyName")
    const userName = localStorage?.getItem("userName")
    const token = localStorage.getItem("token")
    const [isDragging, setIsDragging] = useState(false)
    const [modalPreviewImage, setModalPreviewImage] = useState(null)
    const [newsFeedErrors, setNewsFeedErrors] = useState(false)
    const [loader, setLoader] = useState(false)
    const [newsPreviewImage, setNewsPreviewImage] = useState(null)
    const [newsData, setNewsData] = useState({
        title: "",
        description: "",
        file: null,
        role: "investor",
    })
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleDataChange = (e) => {
        const { name, value } = e.target
        setNewsData({
            ...newsData,
            [name]: value,
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const maxSizeInBytes = 2 * 1024 * 1024

        if (file) {
            if (file.size > maxSizeInBytes) {
                toast.error("Image size is larger than 2MB. Please upload a smaller file.")
                e.target.value = null
                return
            }
            const reader = new FileReader()
            reader.onloadend = () => {
                setNewsPreviewImage(reader.result)
            }
            reader.readAsDataURL(file)

            setTimeout(() => {
                e.target.value = null
            }, 0)
        }
    }

    const handleNewsFeedSubmit = async () => {
        if (!newsData?.title || !newsData?.description || !newsData?.file) {
            setNewsFeedErrors(true)
            return
        }
        try {
            setLoader(true)
            const formDataa = new FormData()
            for (const key in newsData) {
                formDataa.append(key, newsData[key])
            }
            const response = await Api.addNewsFeed(formDataa, token)
            if (response?.success) {
                setNewsData({
                    title: "",
                    description: "",
                    file: null,
                    role: "investor",
                })
                setNewsPreviewImage(null)
                setNewsFeedErrors(false)
                toast.success("News feed added successfully")
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error) {
            toast.error(error?.data?.message)
        } finally {
            setLoader(false)
        }
    }

    return (
        <Modal open={show} onClose={onClose}>
            <Box className='modal-post' sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Box display="flex" alignItems="center">
                        <img src={dummyProfile} alt="" className="profilep-img" />
                        <Box ml={2}>
                            <Typography variant="h6">Test User</Typography>
                            <FormControl variant="outlined" size="small" sx={{ minWidth: 120, mt: 1 }}>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    label="Role"
                                    value={newsData.role}
                                    onChange={(e) => setNewsData({ ...newsData, role: e.target.value })}
                                    IconComponent={MdArrowDropDown}
                                >
                                    <MenuItem value="investor">Investor</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="user">User</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <IconButton onClick={onClose}>
                        <RxCross1 />
                    </IconButton>
                </Box>
                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        label="Title"
                        name="title"
                        value={newsData.title}
                        onChange={handleDataChange}
                        fullWidth
                        required
                        error={newsFeedErrors && !newsData.title}
                        helperText={newsFeedErrors && !newsData.title && "Please enter title"}
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={newsData.description}
                        onChange={handleDataChange}
                        fullWidth
                        required
                        multiline
                        rows={4}
                        error={newsFeedErrors && !newsData.description}
                        helperText={newsFeedErrors && !newsData.description && "Please enter description"}
                        margin="normal"
                    />
                    {!newsPreviewImage && (
                        <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                            <CiImageOn size={28} className='text-image' />
                            <input
                                id="file-input"
                                type="file"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                        </label>
                    )}
                    {newsPreviewImage && (
                        <Box position="relative" mt={2}>
                            <img src={newsPreviewImage} alt="Preview" className="drag-img mt-0 mb-0" />
                            <IconButton
                                className="cancel-img-icon"
                                onClick={() => setNewsPreviewImage(null)}
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)'
                                    }
                                }}
                            >
                                <RxCross2 />
                            </IconButton>
                        </Box>
                    )}
                </Box>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNewsFeedSubmit}
                        disabled={loader}
                        endIcon={loader && <CircularProgress size={20} />}
                    >
                        Post
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default PostModal
