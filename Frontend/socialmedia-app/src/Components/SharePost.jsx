import { useState } from "react"
import { PermMedia } from '@mui/icons-material'

export default function SharePost({ currentUser, onShare }) {
    const [formData, setFormData] = useState({ text: '', postImg: '' })

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files })
    }

    const handleTextChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        // console.log(formData);

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(formData)
        onShare(formData)
    }

    // console.log(currentUser)
    return (
        <div className="share-container custom-shodow-b p-4 rounded-xl">
            <form onSubmit={handleSubmit}>
                <div className="share-top flex space-x-2">
                    <img src={currentUser.profileImg} alt="" className="w-12 h-12 rounded-[50%] object-cover border" />
                    <input type="text" name="text" id="text" value={formData.text} onChange={handleTextChange} className="focus:outline-none text-[15px] p-1 w-10/12" placeholder={`What is in your mind ${currentUser.username} ?`} />
                </div>
                <hr className="w-[95%] my-5 mx-auto bg-gray-400 h-[2px]" />
                <div className="share-bottom flex">
                    <div className="share-bottomRight flex justify-between w-[95%] mx-auto">
                        <label className="flex items-center space-x-4 cursor-pointer">
                            <PermMedia htmlColor='tomato' className='' />
                            <p className="text-[15px]">
                                Photo or video
                            </p>
                            <input type="file" hidden name="postImg" id="postImg" onChange={handleFileChange} value={formData.postImg} />
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
