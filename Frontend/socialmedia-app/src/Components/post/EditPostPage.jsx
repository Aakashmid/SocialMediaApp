import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Close } from '@mui/icons-material';
import Layout from '../../Layout/Layout';
import { GetPostDetail } from '../../services/apiService';
import { PageTopBackArrow } from '../common/SmallComponents';
// import { toast } from 'react-toastify';

const EditPostPage = () => {

    const [postFormData, setPostFormData] = useState({
        text: '',
        postImg: ''
    });


    const location = useLocation();
    const { initialPost } = location.state || {};

    useEffect(() => {
        console.log(initialPost);
        setPostFormData({
            text: initialPost.text || '',
            postImg: initialPost.postImg || ''
        });
    }, [initialPost]);    // FIM


    const [loading, setLoading] = useState(false);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPostFormData(prev => ({
                ...prev,
                image: file,
                previewImage: URL.createObjectURL(file)
            }));
        }
    };

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('updating post');
        setLoading(true);

        // try {
        //     const formData = new FormData();
        //     formData.append('text', postFormData.text);
        //     if (postFormData.image) {
        //         formData.append('postImg', postFormData.image);
        //     }

        //     const response = await axios.put(`/api/posts/${id}`, formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         }
        //     });

        //     // toast.success('Post updated successfully');
        //     navigate(`/posts/${id}`);
        // } catch (error) {
        //     // toast.error('Error updating post');
        //     console.error(error);
        // } finally {
        //     setLoading(false);
        // }
    };


    return (
        <Layout>
            <div className="edit-post-wrapper p-5">
                <div className="page-top">
                    <PageTopBackArrow pageHeading={"Edit Post"} backTo={-1} />
                </div>

                <div className="page-center pb-10 flex flex-col space-y-6">
                    <div className="p-4 overflow-hidden bg-gray-100 rounded-lg pb-6 relative md:w-[650px]">

                        <form onSubmit={handleSubmit}>
                            {/* Image Preview */}
                            {postFormData.postImg && (
                                <div className="mb-4">
                                    <img
                                        src={postFormData.postImg}
                                        alt="Post preview"
                                        className="w-full max-h-[350px] md:max-h-[400px] object-contain rounded-md"
                                    />
                                </div>
                            )}

                            {/* Image Upload */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2 ">Change Image</label>
                                <div className="relative cursor-pointer ">
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className=" w-full p-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-300"
                                        accept="image/*"
                                    />
                                </div>
                            </div>
                            {/* Caption/Text Input */}
                            <div className="mb-4">
                                <label className="block text-gray-700  mb-2">Caption</label>
                                <textarea
                                    value={postFormData.text}
                                    onChange={(e) => setPostFormData(prev => ({ ...prev, text: e.target.value }))}
                                    className="w-full p-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500  transition duration-300 "
                                    rows="2"
                                    placeholder="Write your caption..."
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 
                            disabled:opacity-50 transition duration-200"
                                >
                                    {loading ? 'Updating...' : 'Update Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default EditPostPage;
