import { useContext, useState } from "react"
import { PermMedia } from '@mui/icons-material'
import { ProfileDataContext } from "../../Contexts/ProfileContext"
import { CreatePost } from "../../services/apiService"

export default function SharePost({ posts, setPosts }) {
    const [formData, setFormData] = useState({ text: '', postImg: '' })


    // Create post
    const sharePost = async (data) => {
        try {
            const post_data = await CreatePost(data);
            setPosts([...posts,post_data]);
        } catch (error) {
            console.error(error)
        }
        
    }


    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] })
    }

    const handleChange = (e) => { // post description
        setFormData({ ...formData, [e.target.name]: e.target.value })
        // console.log(formData);
    }

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.text === '' || formData.postImg === '') {
            alert('Description or Post image is not provided !!');
        } else {
            const data = new FormData();
            data.append('text', formData.text);
            data.append('postImg', formData.postImg);
            sharePost(data);
        }
        // clear the form data
        setFormData({ text: '', postImg: '' })
    };

    const { profileData } = useContext(ProfileDataContext);   // accessing profile data using ProfileContext
    return (
        <div className="share-container custom-shodow-b p-4 rounded-xl">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="share-top flex space-x-2">
                    <img onClick={() => { window.location.href = `/profile/${profileData.id}` }} src={profileData.profileImg} alt="" className="w-12 h-12 rounded-[50%] object-cover border cursor-pointer" />
                    <input type="text" name="text" id="text" value={formData.text} onChange={handleChange} className="focus:outline-none text-[15px] p-1 w-10/12" placeholder={`What is in your mind ${profileData.username} ?`} />
                </div>
                <hr className="w-[95%] my-5 mx-auto bg-gray-400 h-[2px]" />
                <div className="share-bottom flex">
                    <div className="share-bottomRight flex justify-between w-[95%] mx-auto">
                        <label className="flex items-center space-x-4 cursor-pointer">
                            <PermMedia htmlColor='tomato' className='' />
                            <p className="text-[15px]">
                                Photo or video
                            </p>
                            <input type="file" hidden name="postImg" id="postImg" onChange={handleFileChange} />
                        </label>
                        <div className="">
                            <button type="submit" className="bg-green-700 rounded-md px-3 py-1 text-white">
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
