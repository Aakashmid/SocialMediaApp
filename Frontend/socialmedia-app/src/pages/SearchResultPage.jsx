import React, { useContext, useEffect, useRef, useState } from 'react'
import Layout from '../Layout/Layout'
import PostList from '../Components/post/PostList'
import { PostProvider } from '../Contexts/PostContext'
import { fetchSearchPosts, fetchSearchUsers, fetchUserPosts } from '../services/apiService'
import { BackToHome } from '../Components/common/SmallComponents'
import UserCard from '../Components/common/UserCard'
import { ProfileDataContext } from '../Contexts/ProfileContext'
import { CircleLoader } from '../Components/Loader'

export default function SearchResultPage() {
    const { profileData: current_user } = useContext(ProfileDataContext);
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [users_posts, setUsers_Posts] = useState([]);
    const [people, setPeople] = useState([]);
    const lastFetchedQuery = useRef({ posts: '', people: '', my_posts: '' });
    const [searchType, setSearchType] = useState('posts');
    const query = new URLSearchParams(window.location.search).get('query');


    const fetchData = async (searchQuery, type) => {
        try {
            setIsLoading(true);
            if (type === 'posts') {
                const data = await fetchSearchPosts(searchQuery);
                setPosts(data);
                lastFetchedQuery.current.posts = searchQuery;
            } else if (type === 'people') {
                const data = await fetchSearchUsers(searchQuery);
                setPeople(data);
                lastFetchedQuery.current.people = searchQuery;
            }
            else {
                const data = await fetchUserPosts(current_user.id, searchQuery);  // searchQuery is passes so that searched post will be fetched
                console.log(data)
                setUsers_Posts(data);
                lastFetchedQuery.current.my_posts = searchQuery;
            }
        } catch (error) {
            console.error(`Error fetching ${type}:`, error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }

    useEffect(() => {
        if (searchType === 'posts' &&
            (posts.length === 0 || lastFetchedQuery.current.posts !== query)) {
            fetchData(query, 'posts');
        } else if (searchType === 'people' &&
            lastFetchedQuery.current.people !== query) {
            fetchData(query, 'people');
        }
        else if (searchType === 'my posts only' && lastFetchedQuery.current.my_posts !== query) {
            console.log('fetch my posts')
            fetchData(query, 'my posts only');
        }
    }, [query, searchType]);

    const renderNoResults = () => (
        <div className="text-center mt-5 p-8 bg-gray-100 rounded-lg shadow-md">
            <h4 className="text-gray-800 mb-4 text-2xl">No results found for "{query}"</h4>
            <p className="text-gray-600 text-base mb-6">Try different keywords or check your spelling</p>
            <BackToHome goTo={'/'} text={'Back to Home'} />
        </div>
    );



    const renderContent = () => {
        if (isLoading) return <CircleLoader />;

        if (searchType === 'posts') {
            return posts.length === 0 ? renderNoResults() : (
                <div className="mt-5">
                    <PostProvider value={{ posts, setPosts }}>
                        <PostList />
                    </PostProvider>
                </div>
            );
        }

        else if (searchType === 'people') {
            return people.length === 0 ? renderNoResults() :
                people.map(user => (
                    <UserCard user={user} key={user.id} setData={setPeople} />
                ));
        }

        else if (searchType === 'my posts only') {
            return users_posts.length === 0 ? renderNoResults() : (
                <div className="mt-5">
                    <PostProvider value={{ posts: users_posts, setPosts: setUsers_Posts }}>
                        <PostList />
                    </PostProvider>
                </div>
            );
        }
    };

    const filters = ['Posts', 'People', 'My Posts Only'];

    return (
        <Layout>
            <div className="searched-result-wrapper p-5">
                <div className="page-top filters overflow-x-auto whitespace-nowrap w-full scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 py-2">
                    {filters.map((filter, index) => (
                        <button
                            key={index}
                            onClick={() => setSearchType(filter.toLowerCase())}
                            className={`px-3 py-1 lg:px-4 lg:py-[5px] rounded-full mx-1 ${searchType === filter.toLowerCase() ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
                <div className="mt-2">
                    {renderContent()}
                </div>
            </div>
        </Layout>
    );
}