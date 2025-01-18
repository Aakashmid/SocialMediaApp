import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import { UpdatePost } from '../../services/apiService';
import { PageTopBackArrow } from '../common/SmallComponents';
import { ProfileDataContext } from '../../Contexts/ProfileContext';
import { PostContext } from '../../Contexts/PostContext';

const EditPostPage = () => {
    const [loading, setLoading] = useState(false);
    const { setPosts } = useContext(PostContext);
    const { profile: profileData } = useContext(ProfileDataContext);
    const [postFormData, setPostFormData] = useState({
        text: '',
        postImg: ''
    });

    const location = useLocation();
    // const { initialPost } = location.state || JSON.parse(localStorage.getItem('edit_post')) || {};
    const { initialPost } = location.state || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (initialPost) {
            setPostFormData({
                text: initialPost.text || '',
                postImg: initialPost.postImg || '',
                previewImg: null,
            });
        }
    }, [initialPost]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPostFormData(prev => ({
                ...prev,
                postImg: file,
                previewImg: URL.createObjectURL(file)
            }));
        }
    };


    // handle update post
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('text', postFormData.text);
            if (postFormData.postImg instanceof File) {
                formData.append('postImg', postFormData.postImg);
            }
            const post = await UpdatePost(initialPost.id, formData);
            setPosts(prevPosts => prevPosts.map(p => p.id === initialPost.id ? post : p));  // updating state 
            navigate(-1);
        } catch (error) {
            console.error('Error updating post:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderImagePreview = () => {
        const imageUrl = postFormData.previewImg || postFormData.postImg;
        if (!imageUrl) return null;

        return (
            <div className="mb-4">
                <img
                    src={imageUrl}
                    alt="Post preview"
                    className="w-full max-h-[350px] md:max-h-[400px] object-contain rounded-md"
                />
            </div>
        );
    };

    return (
        <Layout>
            <div className="edit-post-wrapper p-5">
                <div className="page-top">
                    <PageTopBackArrow pageHeading="Edit Post" backTo={-1} />
                </div>
                <div className="page-center pb-10 flex flex-col space-y-6 mt-4">
                    <div className="p-4 overflow-hidden bg-gray-100 rounded-lg pb-6 relative md:w-[650px]">
                        <form onSubmit={handleSubmit}>
                            {renderImagePreview()}

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Change Image</label>
                                <div className="relative cursor-pointer">
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="w-full p-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-300"
                                        accept="image/*"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Caption</label>
                                <textarea
                                    value={postFormData.text}
                                    onChange={(e) => setPostFormData(prev => ({ ...prev, text: e.target.value }))}
                                    className="w-full p-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                                    rows="2"
                                    placeholder="Write your caption..."
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition duration-200"
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