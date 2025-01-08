import React, { useContext } from 'react';
import { ProfileDataContext } from '../../Contexts/ProfileContext';
import { Bookmark, BookmarkBorder, BorderColor, DeleteForever, Report, Share } from '@mui/icons-material';

export default function PostOptionMenu({ post, onSave, onReport, onShare, onUpdate }) {
  const { profileData } = useContext(ProfileDataContext);
  const options = [
    { text: post.isSaved ? 'Unsave post' : 'Save post', action: onSave, Icon: post.isSaved ? Bookmark : BookmarkBorder },
    { text: post.creator.id === profileData.id ? 'Edit Post' : '', action: onUpdate, Icon: BorderColor },
    { text: 'Report', action: onReport, Icon: Report },
    { text: 'Share', action: onShare, Icon: Share }
  ];
  return (
    <div className='bg-white w-full p-2 shadow-lg'>
      <ul className='options flex flex-col space-y-1'>
        {options.map((option, index) => (
          option.text &&
          <li key={index} onClick={option.action} className='flex space-x-2 items-center cursor-pointer hover:bg-gray-200  px-2 py-[6px] rounded-md'>
            <span className='icon'>
              <option.Icon />
            </span>
            <span className='text '>
              {option.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
