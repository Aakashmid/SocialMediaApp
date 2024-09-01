import React from 'react'

export default function ProfilePosts({ posts }) {
    return (
        <div className='post-wrapper'>
            <ul className="grid gap-[2px] grid-cols-3 sm:grid-cols-4">
                {posts.map((post) => {
                    if (post.postImg) {
                        return <li key={post.id} className="aspect-square " ><img src={post.postImg} className='object-cover h-full w-full border-none' alt="" /></li>
                    } else {
                        return
                    }
                })
                }
            </ul >
        </div>
    )
}
