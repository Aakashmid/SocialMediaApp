import React from 'react'

export default function ProfilePosts({ posts }) {
    return (
        <div className='post-wrapper'>
            <ul className="grid gap-[2px] grid-cols-3">
                {posts.map((post) => {
                    return <li key={post.id} className="h-28"><img src={post.postImg} className=' object-contain w-auto' alt="" /></li>
                })
                }
            </ul>
        </div>
    )
}
