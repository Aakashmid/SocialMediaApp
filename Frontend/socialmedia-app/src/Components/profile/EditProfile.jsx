import { AddPhotoAlternate } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileDataContext } from '../../Contexts/ProfileContext';
import Layout from '../../Layout/Layout';
import { partialUpdateUserProfile } from '../../services/apiService';
import {  PageTopBackArrow } from '../common/SmallComponents';
import { ButtonPrimary } from '../common/buttons/ButtonPrimary';


export const FormInput = ({ label_text, handleChange, field_name, input_value, placeholder, field_type }) => {
    return <label htmlFor={field_name} className='font-medium '>
        {label_text}
        <input required type={`${field_type ? field_type : 'text'}`} name={field_name} id={field_name} value={input_value} onChange={handleChange} className="text-sm w-full focus:outline-none text-[15px] p-2 rounded-md" placeholder={`${placeholder ? placeholder : ''}`} />
    </label>
}


export default function EditProfile() {
    const { profileData, setProfileData } = useContext(ProfileDataContext);     // gettign profile data from ProfileDataContext
    const [updateingImage, setUpdateingImage] = useState(false);
    const [updateingProfile, setUpdateingProfile] = useState(false);    
    const [showAlert, setShowAlert] = useState(false);

    // initialize edit profile form data
    const [formData, setFormData] = useState({
        username: '',
        full_name: '',
        bio: '',
        email: '',
        date_of_birth: '',
        profileImg: ''
    });

    const { username } = useParams();


    // function to update profile Image
    const handleUpdateProfileImg = async () => {
        const profileFormData = new FormData();
        try {
            setUpdateingImage(true);
            profileFormData.append('profileImg', formData.profileImg);
            const response = await partialUpdateUserProfile(profileData.id, profileFormData);
            console.log(response);
            setShowAlert(true);
            setProfileData({ ...response });
        } catch (error) {
            console.error(error);
        }
        finally {
            setUpdateingImage(false);
        }
    }


    // function to update profile
    const handleUpdateProfile = async () => {
        const profileDataFormData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'profileImg') {
                profileDataFormData.append(key, value);
            }
        });
        try {
            setUpdateingProfile(true);
            const respose = await partialUpdateUserProfile(profileData.id, profileDataFormData);
            console.log(respose);
            setProfileData({ ...respose });
        } catch (error) {
            console.error(error);
        }
        finally {
            setUpdateingProfile(false);
        }
    }

    // handling changes in input 
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] })
    }


    useEffect(() => {
        // set profile formData if profileData is changed
        if (profileData) {
            setFormData({
                username: profileData.username || '',
                full_name: profileData.full_name || '',
                bio: profileData.bio || '',
                email: profileData.email || '',
                date_of_birth: profileData.date_of_birth || '',
                profileImg: profileData.profileImg || ''
            });
        }
        // console.log(first)
    }, [profileData]);

    return (
        <Layout>
            <div className='edit-profile-page-wrapper p-5'>
                <div className="page-top">
                    <PageTopBackArrow pageHeading={"Edit profile"} backTo={-1} />
                </div>
                <div className="page-center pb-10  flex flex-col space-y-6 mt-4">
                    <div className="page-center-top  overflow-hidden bg-gray-100 rounded-lg pb-6 relative ">
                        {/* <span className="p-2 top-4 right-4 absolute"><Edit/></span> */}
                        <label className="p-1 hover:bg-gray-200 top-4 right-4 absolute bg-white rounded-xl">
                            <AddPhotoAlternate />
                            <input type="file" name='cover_img' className='hidden cover-image' />
                        </label>
                        <div className="">
                            <img src="/images/post/3.jpeg" className='cover-img w-full h-28 object-cover' alt="..." />
                            <img src={
                                typeof formData.profileImg === 'object' && formData.profileImg instanceof File
                                    ? URL.createObjectURL(formData.profileImg) // Create URL if it's a File object
                                    : formData.profileImg
                            } className='profile-img w-24 h-24 rounded-[50%] absolute left-[10%] top-14 object-cover  border-4 border-white' alt="" />
                        </div>
                        <div className='mt-10 ml-[10%] flex flex-col '>
                            <h1 className='font-medium text-lg'>Your Photo</h1>
                            <p className="text-sm">this will be displayed to you profile</p>
                            <div className="flex space-x-[20px] mt-2">
                                <label className='px-4 py-1 outline rounded-md outline-1 cursor-pointer bg-white hover:transform hover:bg-blue-100 hover:duration-500'>Upload New
                                    <input type="file" accept="image/*" className='hidden' name='profileImg' onChange={handleFileChange} required />
                                </label>

                                <ButtonPrimary onclick={() => handleUpdateProfileImg()}  Disabled={updateingImage}  text={updateingImage ? 'Saving...' : 'Save'} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-100 rounded-lg px-3 lg:px-4 py-6 h-fit my-2 ">
                        {/* <h1 className='font-medium text-lg'>About You</h1> */}
                        {/* here show error if */}
                        <form className=' mt-4 flex flex-col space-y-6' onSubmit={handleUpdateProfile}>
                            <FormInput label_text={'Username'} field_name='username' input_value={formData.username} placeholder={'Enter username'} handleChange={handleChange} />
                            <FormInput label_text={'Full Name'} field_name='full_name' input_value={formData.full_name} placeholder={'Enter full name'} handleChange={handleChange} />
                            <FormInput label_text={'Email'} field_type={'email'} field_name='email' input_value={formData.email} placeholder={'Enter email'} handleChange={handleChange} />
                            {/* <FormInput label_text={'Full Name'} field_name='full_name' input_value={formData.full_name} placeholder={'Enter full name'} handleChange={handleChange} /> */}
                            <label htmlFor="bio" className='font-medium'>
                                Bio
                                <textarea onChange={handleChange} className='text-sm w-full focus:outline-none text-[15px] p-2 rounded-md h-20' name="bio" id="" value={formData.bio} placeholder='write about yourself...'></textarea>
                            </label>
                            <ButtonPrimary onclick={() => handleUpdateProfile()} text={updateingProfile ? 'Updateing...' : 'Update'}  Disabled={updateingProfile}/>
                        </form>
                    </div>
                </div>
            </div>
            <div></div>
        </Layout >
    )
}
