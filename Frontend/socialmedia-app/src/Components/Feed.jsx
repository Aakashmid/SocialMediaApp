import SharePost from "./SharePost";

export default function Feed() {
    return (
        <div className="feed-container lg:flex-[5] p-4">
            <div className="feed-wrapper">
                <SharePost/>
            </div>
        </div>
    )
}
