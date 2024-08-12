import Post from "./Post";
import SharePost from "./SharePost";

export default function Feed() {
    return (
        <div className="feed-container  p-4">
            <div className="feed-wrapper">
                <SharePost/>
                <div className="posts mt-8">
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
            </div>
        </div>
    )
}
