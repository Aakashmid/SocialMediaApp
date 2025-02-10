import { useContext, useEffect, useState } from "react"
import { PermMedia } from '@mui/icons-material'
import { ProfileDataContext } from "../../Contexts/ProfileContext"
import { CreatePost } from "../../services/apiService"
import { useNavigate } from "react-router-dom"

export default function SharePost({ setPosts, onShare }) {
    const [showAlert, setShowAlert] = useState(false);
    const [formData, setFormData] = useState({
        text: '',
        postImg: ''
    })

    const { profileData } = useContext(ProfileDataContext);
    const navigate = useNavigate();


    // handle createion of post of post data - data
    const sharePost = async (data) => {
        try {
            const post_data = await CreatePost(data);  // creating post using CreatePost function
            setPosts(prevPosts => [...prevPosts, post_data]);
            setShowAlert(true);
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
            postImg: ''
        });
    };
    useEffect(() => {
        if (showAlert) {
            setTimeout(() => setShowAlert(false), 3000);
        }
    }, [showAlert]);

    return (
        <div className="share-container custom-shodow-b p-4 rounded-xl">
            <div className={`message-alert fixed bottom-5 bg-green-500 text-white px-4 py-2 rounded-md transition-all duration-500 ${showAlert ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
                Post created successfully!
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="share-top flex space-x-2">
                    {profileData.profileImg ? (
                        <img
                            onClick={() => navigate(`/profile/${profileData.username}`)}
                            src={profileData.profileImg}
                            alt="Profile"
                            className="w-12 h-12 rounded-[50%] object-cover border cursor-pointer"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-[50%] bg-gray-200 animate-pulse cursor-pointer"
                        />
                    )}
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
                        <label className="flex items-center space-x-4 cursor-pointer bg-gray-100 px-2 rounded hover:bg-gray-200">
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