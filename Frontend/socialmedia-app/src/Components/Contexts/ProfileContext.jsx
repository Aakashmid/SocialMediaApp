import React, { createContext, useContext, useEffect, useState } from 'react';
import { USER_ID } from '../constants';
import { fetchUserProfile } from '../apiService';
import { LoadingContext } from './LoadingContext';
import { set } from 'date-fns';

export const ProfileDataContext = createContext();

export const ProfileDataProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({});
    const { loading, setLoading } = useContext(LoadingContext);
    const userId = localStorage.getItem(USER_ID);
    useEffect(() => {
        const loadProfileData = async () => {
            try {
                setLoading(true);
                const data = await fetchUserProfile(userId);

                setProfileData(data);
                setLoading(false);

            } catch (error) {
                console.error('Failed to fetch profile data:', error);
                // here show 404 page
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

