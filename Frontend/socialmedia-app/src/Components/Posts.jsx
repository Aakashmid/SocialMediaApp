import Post from "./Post"

export default function Posts({ posts }) {
    return (
        <div className="posts  flex flex-col space-y-4">
            {posts.map((post) => {
                return <Post key={post.id} post={post} />
            })}
        </div>
    )
}
