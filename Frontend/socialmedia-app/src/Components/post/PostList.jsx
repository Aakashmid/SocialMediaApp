import { CommentsContextProvider } from "../../Contexts/CommentContext"
import PostDetail from "./PostDetail"
// list all posts
export default function PostList({ posts }) {
    return (
        <div className="posts  flex flex-col space-y-4">
            {posts.map((post) => {
                return (
                    <CommentsContextProvider key={post.id} initialCommentsCount={post.comments_count}>   {/* for mananging comments related states*/}
                        <PostDetail key={post.id} post={post} />
                    </CommentsContextProvider>
                )
            })}
        </div>
    )
}
