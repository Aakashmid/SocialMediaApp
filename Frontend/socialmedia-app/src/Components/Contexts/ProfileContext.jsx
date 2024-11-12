import React, { createContext, useContext, useEffect, useState } from 'react';
import { USER_ID } from '../constants';
import { fetchUserProfile } from '../apiService';
import { LoadingContext } from './LoadingContext';

export const ProfileDataContext = createContext();

export const ProfileDataProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({});
    const {loading,setLoading} = useContext(LoadingContext);
    const userId = localStorage.getItem(USER_ID);
    useEffect(() => {
        const loadProfileData = async () => {
            setLoading(true);
            try {
                const data = await fetchUserProfile(userId);
                setProfileData(data);
            } catch (error) {
                console.error('Failed to fetch profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            loadProfileData();
        }
    }, [userId]);

    return (
        <ProfileDataContext.Provider value={{ profileData, setProfileData }}>
            {children}
        </ProfileDataContext.Provider>
    );
};

