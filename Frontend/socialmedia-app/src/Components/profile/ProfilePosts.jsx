
export default function ProfilePosts({ posts, onclickPost }) {
    return (
        <div className='post-wrapper'>
            <ul className="grid gap-[2px] grid-cols-3 sm:grid-cols-4">
                {posts.map((post) => {
                    return <li onClick={() => onclickPost(post.id)} key={post.id} className="aspect-square cursor-pointer" ><img src={post.postImg} className='object-cover h-full w-full border-none' alt="" /></li>
                })
                }
            </ul >
        </div>
    )
}
