import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Close } from '@mui/icons-material';
// import { toast } from 'react-toastify';

const EditPostModal = ({ post, onUpdate, onClose }) => {

    const [postData, setPostData] = useState({
        text: post?.text || '',
        image: null,
        is_public: post?.is_public || false,
        previewImage: post?.postImg || null
    });
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPostData(prev => ({
                ...prev,
                image: file,
                previewImage: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('text', postData.text);
            if (postData.image) {
                formData.append('postImg', postData.image);
            }

            const response = await axios.put(`/api/posts/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            // toast.success('Post updated successfully');
            navigate(`/posts/${id}`);
        } catch (error) {
            // toast.error('Error updating post');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="md:w-[650px] h-[90vh] mx-auto lg:w-[45%] lg:px-12">
            <div className="p-4 bg-white rounded-lg shadow-lg">
                <div className="flex justify-between  items-center mb-6 ">
                    <h2 className="text-2xl font-bold  p-1">Edit Post</h2>
                    <span onClick={() => onClose()} className='p-1 hover:bg-gray-200'>
                        <Close />
                    </span>
                </div>
                <hr className='mb-1' />
                <form onSubmit={handleSubmit}>
                    {/* Image Preview */}
                    {postData.previewImage && (
                        <div className="mb-4">
                            <img
                                src={postData.previewImage}
                                alt="Post preview"
                                className="w-full max-h-[350px] md:max-h-[400px] object-contain rounded-md"
                            />
                        </div>
                    )}

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Change Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full p-2 border rounded-lg"
                            accept="image/*"
                        />
                    </div>

                    {/* Caption/Text Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Caption</label>
                        <textarea
                            value={postData.text}
                            onChange={(e) => setPostData(prev => ({ ...prev, text: e.target.value }))}
                            className="w-full px-3 py-2 border rounded-lg resize-none"
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
    );
};

export default EditPostModal;
