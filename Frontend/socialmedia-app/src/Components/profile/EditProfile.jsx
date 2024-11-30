import React, { useContext, useState } from 'react'
import Layout from '../Layout'
import { PageTopBackArrow } from '../SmallComponents'
import { ProfileDataContext } from '../Contexts/ProfileContext'
import { useParams } from 'react-router-dom';
import { AddPhotoAlternate, Camera, Edit } from '@mui/icons-material';

export default function EditProfile() {
    const { profileData, setProfileData } = useContext(ProfileDataContext);
    const { formData, seFormData } = useState({ 'full_name': profileData.full_name, 'bio': profileData.bio, 'email': profileData.email, 'date_of_birth': profileData.date_of_birth, 'profileImg': profileData.profile })
    const { username } = useParams();
    console.log(username);

    // handle update function to handle profile update 
    const handleUpdate = () => {
        //
    }

    return (
        <Layout>
            <div className={`edit-profile-page-wrapper p-5`}>
                <div className="page-top">
                    <PageTopBackArrow pageHeading={"Edit profile"} id={profileData.id} />
                </div>
                {/* <div className="page-center">
                    {Object.keys(profileData).map((value, index) => {
                        return <h1 key={index} >{value}</h1>
                    })}
                </div> */}
                <div className="page-center grid grid-rows-4  gap-5">
                    <div className="page-center-top overflow-hidden bg-gray-100 rounded-lg pb-6 relative md:w-[650px]">
                        {/* <span className="p-2 top-4 right-4 absolute"><Edit/></span> */}
                        <label className="p-1 hover:bg-gray-200 top-4 right-4 absolute bg-white rounded-xl">
                            <AddPhotoAlternate />
                            <input type="file" name='cover_img' className='hidden cover-image' />
                        </label>
                        <div className="">
                            <img src="/src/assets/post/3.jpeg" className='cover-img w-full h-28 object-cover' alt="..." />
                            <img src={profileData.profileImg} className='profile-img w-24 h-24 rounded-[50%] absolute left-[10%] top-14 object-cover  border-4 border-white' alt="" />
                        </div>
                        <div className='mt-10 ml-[10%] flex flex-col '>
                            <h1 className='font-medium text-lg'>Your Photo</h1>
                            <p className="text-sm">this will be displayed to you profile</p>
                            <div className="flex space-x-[20px] mt-2">

                                <label className='px-4 py-1 outline rounded-md outline-1 cursor-pointer bg-white hover:transform hover:bg-blue-100 hover:duration-500'>Upload New
                                    <input type="file" className='hidden' />
                                </label>
                                <button className='bg-blue-600 text-white rounded-md  px-3 py-1'>Save</button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 rounded-lg py-2  h-10 my-2 ">
                        <form onSubmit={handleUpdate}></form>
                    </div>
                    {/* <div className="bg-gray-100 rounded-lg py-2  md:w-[650px]">
                        <form onSubmit={handleUpdate}></form>
                    </div>
                    <div className="bg-gray-100 rounded-lg py-2  h-10 my-2">
                        <form onSubmit={handleUpdate}></form>
                    </div> */}
                </div>
            </div>
        </Layout >
    )
}
