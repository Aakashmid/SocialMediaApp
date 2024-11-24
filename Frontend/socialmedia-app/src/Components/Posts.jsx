import PostDetail from "./PostDetail"
// list all posts
export default function Posts({ posts }) {
    return (
        <div className="posts  flex flex-col space-y-4">
            {posts.map((post) => {
                    return <PostDetail key={post.id} post={post} />
            })}
        </div>
    )
}
