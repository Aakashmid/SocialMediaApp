import { Close, FilterList } from '@mui/icons-material'
import React, { useContext, useState } from 'react'
import Btn1 from '../common/buttons/Btn1'
import Btn2 from '../common/buttons/Btn2'
import { PostContext } from '../../Contexts/PostContext';

export default function ManagePostsMdl({ toggle, toggleFilterMdl }) {
    const { posts, setPosts } = useContext(PostContext); // get posts which are in PostContext for this user (it can be either saved post or post of this user)
    const [filteredPosts, setFilteredPosts] = useState(posts);

    const handleRemovePost = async (postId) => {

    }

    const Card = ({ post }) => (
        <div key={post.id} className="post-card w-full h-fit rounded-lg overflow-hidden border hover:border-blue-400 transition-all duration-200 flex flex-col">
            <div className="card-content relative flex-1">
                <img src={post.postImg} alt="post-image" className="object-cover h-[10rem] lg:h-[12rem] w-full hover:scale-105 transition-transform duration-300 flex-shrink-0" />
                <span className="checkbox-input absolute top-2 left-2">
                    <input type="checkbox" className="w-5 h-5 cursor-pointer accent-blue-500" defaultChecked={false} />
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
            <div className="grid grid-cols-2 lg:grid-cols-3 px-4 py-4 h-[60%] gap-1  lg:gap-2 overflow-y-scroll">
                {filteredPosts.map((post) => (
                    <Card key={post.id} post={post} />
                ))}
            </div>
            <div className="posts-actions px-4 py-2 border-t-2">
                <h2 className='text-lg'>Select action  : </h2>
                <div className="flex flex-col gap-1 mt-2">
                    <label htmlFor="hide_posts" className="flex items-center">
                        <input name="post_option" type="radio" id="hide_posts" className="mr-2" />
                        Hide Posts
                    </label>
                    <label htmlFor="delete_posts" className="flex items-center">
                        <input name="post_option" type="radio" id="delete_posts" className="mr-2" />
                        Delete Posts
                    </label>
                    <label htmlFor="remove_tags" className="flex items-center">
                        <input name="post_option" type="radio" id="remove_tags" className="mr-2" />
                        Remove Tags
                    </label>
                </div>
                <Btn2 text={'Done'} handleClick={() => console.log('done')} />
            </div>
        </div>
    )
}
