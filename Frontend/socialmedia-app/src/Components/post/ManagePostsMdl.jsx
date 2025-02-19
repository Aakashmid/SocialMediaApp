import { Close, FilterList } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import Btn1 from '../common/buttons/Btn1'
import Btn2 from '../common/buttons/Btn2'
import { ButtonPrimary } from '../common/buttons/ButtonPrimary';
import ConfirmationModal from '../common/ConfirmationModal';
import { DeletePost } from '../../services/apiService';

export default function ManagePostsMdl({ toggle, toggleFilterMdl, posts, setPosts }) {
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [checkedPosts, setCheckedPosts] = useState([]);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isApplyingAction, setIsApplyingAction] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const handleCheckboxChange = (postId) => {
        setCheckedPosts(prev =>
            prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
        );
    };

    useEffect(() => {
        setFilteredPosts(posts);
    }, [posts, setPosts]);

    const handlePostsAction =async (checkedPosts) => {
        if (!selectedOption) {
            console.log("Please select an action")
            return
        }

        setIsApplyingAction(true);
        switch (selectedOption) {
            case 'delete_posts':
                await DeletePosts(checkedPosts);
                console.log('delete posts action for:', checkedPosts)
                setPosts(prevPosts => prevPosts.filter(post => !checkedPosts.includes(post.id)));
                setCheckedPosts([]);
                break;
            case 'hide_posts':
                console.log("Hide posts action for:", checkedPosts)
                break
            case 'remove_tags':
                console.log("Remove tags action for:", checkedPosts)
                break
            default:
                console.log("Invalid action selected")
        }
        setIsApplyingAction(false);
    }



    // perform selected action to selected posts
    const confirmAction = () => {
        if (checkedPosts.length  > 0) {
            handlePostsAction(checkedPosts);
        }
        setIsConfirmationModalOpen(false);
    };

    const Card = ({ post }) => (
        <div onClick={() => handleCheckboxChange(post.id)} key={post.id} className="post-card w-full h-fit rounded-lg border cursor-pointer hover:border-blue-400 transition-all duration-200 flex flex-col">
            <div className="card-content relative flex-1">
                <img src={post.postImg} alt="post-image" className="object-cover h-[10rem] lg:h-[12rem] w-full hover:opacity-95 transition-transform duration-300 flex-shrink-0" />
                <span className="checkbox-input absolute top-2 left-2">
                    <input
                        type="checkbox"
                        className="w-5 h-5 cursor-pointer accent-blue-500"
                        checked={checkedPosts.includes(post.id)}
                        onChange={() => handleCheckboxChange(post.id)}
                    />
                </span>
            </div>
            <div className="card-bottom flex items-center gap-2 bg-gray-200/90 backdrop-blur-sm p-3 border-t">
                <img src={post.creator.profileImg} alt="profile" className="w-8 h-8 object-cover rounded-full border-2 border-gray-200" />
                <p className="text-sm font-medium truncate">{post.text}</p>
            </div>
        </div>
    );

    return (
        <div className='manage-posts-modal-container bg-gray-100 w-full h-full rounded-lg'>
            <div className="flex items-center justify-between p-2">
                <div className=""></div>
                <h1 className="heading text-xl font-semibold">Manage Posts</h1>
                <button className='close-btn bg-gray-300 rounded-full p-1' onClick={toggle}><Close /></button>
            </div>
            <div className="flex items-center justify-between border-2 px-4 py-2">
                <p className="">Select the post you want to manage :</p>
                <div className="filter-option-btn">
                    <Btn1 text={'Filter'} Icon={<FilterList fontSize='small' />} handleClick={toggleFilterMdl} />
                </div>
            </div>

            {/* posts container */}
            <div className="grid grid-cols-2 lg:grid-cols-3 px-4 py-4 h-[65%] gap-1  lg:gap-2 overflow-y-scroll">
                {filteredPosts && filteredPosts.map((post) => (
                    <Card key={post.id} post={post} />
                ))}
            </div>
            <div className="posts-actions px-4 py-2 border-t-2 ">
                <h2 className='text-lg'>Select action  : </h2>
                <div className="flex gap-4 mt-2 mb-2">
                    <label htmlFor="hide_posts" className="flex items-center cursor-pointer" onClick={() => setSelectedOption('hide_posts')}>
                        <input name="post_option" type="radio" id="hide_posts" className="mr-2" />
                        Hide Posts
                    </label>
                    <label htmlFor="delete_posts" className="flex items-center cursor-pointer" onClick={() => setSelectedOption('delete_posts')}>
                        <input name="post_option" type="radio" id="delete_posts" className="mr-2" />
                        Delete Posts
                    </label>
                    <label htmlFor="remove_tags" className="flex items-center cursor-pointer" onClick={() => setSelectedOption('remove_tags')}>
                        <input name="post_option" type="radio" id="remove_tags" className="mr-2" />
                        Remove Tags
                    </label>
                </div>
                <ButtonPrimary text={isApplyingAction ? 'Applying' : 'Apply'} onclick={()=>setIsConfirmationModalOpen(true)} Disabled={isApplyingAction} />
            </div>
            <ConfirmationModal isOpen={isConfirmationModalOpen} message={`Are you sure you want to Apply this actions  '${selectedOption}' to the selected posts`} onCancel={()=>setIsConfirmationModalOpen(false)} onConfirm={confirmAction}  />
        </div>
    )
}
