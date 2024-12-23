import { useContext, useState } from "react"
import { PermMedia } from '@mui/icons-material'
import { ProfileDataContext } from "../../Contexts/ProfileContext"
import { CreatePost } from "../../services/apiService"
import { useNavigate } from "react-router-dom"

export default function SharePost({ posts, setPosts, onShare }) {
    const [formData, setFormData] = useState({
        text: '',
        postImg: '',
        is_public: true
    })

    const { profileData } = useContext(ProfileDataContext);
    const navigate = useNavigate();

    const sharePost = async (data) => {
        try {
            const post_data = await CreatePost(data);
            setPosts(prevPosts => [...prevPosts, post_data]);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, postImg: file }));
    }

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handlePublicToggle = (e) => {
        setFormData(prev => ({ ...prev, is_public: e.target.checked }));
    }

    const validateForm = () => {
        if (!formData.text || !formData.postImg) {
            alert('Description and Post image are required!');
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const data = new FormData();
        data.append('text', formData.text);
        data.append('postImg', formData.postImg);

        onShare ? onShare(data) : sharePost(data);

        setFormData({
            text: '',
            postImg: '',
            is_public: true
        });
    };

    return (
        <div className="share-container custom-shodow-b p-4 rounded-xl">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="share-top flex space-x-2">
                    <img
                        onClick={() => navigate(`/profile/${profileData.id}`)}
                        src={profileData.profileImg}
                        alt="Profile"
                        className="w-12 h-12 rounded-[50%] object-cover border cursor-pointer"
                    />
                    <input
                        type="text"
                        name="text"
                        value={formData.text}
                        onChange={handleTextChange}
                        className="focus:outline-none text-[15px] p-1 w-10/12"
                        placeholder={`What is in your mind ${profileData.username} ?`}
                    />
                </div>
                <hr className="w-[95%] my-5 mx-auto bg-gray-400 h-[2px]" />
                <div className="share-bottom flex">
                    <div className="share-bottomRight flex justify-between w-[95%] mx-auto">
                        <label className="flex items-center space-x-4 cursor-pointer">
                            <PermMedia htmlColor='tomato' />
                            <p className="text-[15px]">Photo or video</p>
                            <input
                                type="file"
                                hidden
                                name="postImg"
                                onChange={handleFileChange}
                            />
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="is_public"
                                    checked={formData.is_public}
                                    onChange={handlePublicToggle}
                                />
                                <span className="text-[15px]">Public</span>
                            </label>
                            <button
                                type="submit"
                                className="bg-green-700 rounded-md px-3 py-1 text-white"
                            >
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}