import React, { useEffect, useRef, useState } from 'react'
import Layout from '../Layout/Layout'
import PostList from '../Components/post/PostList'
import { PostProvider } from '../Contexts/PostContext'
import { fetchSearchPosts, fetchSearchUsers } from '../services/apiService'
import { BackToHome } from '../Components/common/SmallComponents'
import UserCard from '../Components/common/UserCard'

export default function SearchResultPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [people, setPeople] = useState([]);
    //  fetch data for searched query 
    const lastFetchedQuery = useRef({ posts: '', people: '' });

    const [searchType, setSearchType] = useState('posts');

    const query = new URLSearchParams(window.location.search).get('query');
    const get_posts = async (searchQuery) => {
        console.log('fetching posts....')
        try {
            setIsLoading(true);
            const data = await fetchSearchPosts(searchQuery);
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const get_users = async (searchQuery) => {
        try {
            setIsLoading(true);
            const data = await fetchSearchUsers(searchQuery);
            console.log('fetched users');
            setPeople(data);
        } catch (error) {
            console.error('Error fetching people:', error);
        }
        finally {
            setIsLoading(false);
        }
    }



    useEffect(() => {
        if (
            searchType === 'posts' &&
            (posts.length === 0 || lastFetchedQuery.current.posts !== query)
        ) {
            get_posts(query);
            lastFetchedQuery.current.posts = query; // Update last fetched query for posts
        } else if (
            searchType === 'people' &&
            lastFetchedQuery.current.people !== query
        ) {
            get_users(query);
            lastFetchedQuery.current.people = query; // Update last fetched query for users
        }
    }, [query, searchType]);


    const filters = ['Posts', 'People', 'My Posts Only', 'Followings Posts']
    return (
        <>
            <Layout>
                <div className="searched-result-wrapper  p-5">
                    <div className="page-top filters  overflow-x-auto whitespace-nowrap w-full  scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 py-2">
                        {filters.map((filter, index) => (
                            <button
                                key={index}
                                onClick={() => setSearchType(filter.toLowerCase())}
                                className={`px-3 py-1 lg:px-4 lg:py-[5px] rounded-full mx-1 ${searchType === filter.toLowerCase() ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    {searchType === 'posts' &&
                        <div className="">
                            {isLoading ? <div className='text-center'>Loading ....</div> :
                                posts.length === 0 ?
                                    <div className="text-center mt-5 p-8 bg-gray-100 rounded-lg shadow-md">
                                        <h4 className="text-gray-800 mb-4 text-2xl">No results found for "{query}"</h4>
                                        <p className="text-gray-600 text-base mb-6">Try different keywords or check your spelling</p>
                                        <BackToHome goTo={'/'} text={'Back to Home'} />
                                    </div> : <div className="mt-5">
                                        <PostProvider value={{ posts, setPosts }}>
                                            <PostList />
                                        </PostProvider>
                                    </div>
                            }
                        </div>
                    }

                    {searchType === 'people' &&
                        <div className="mt-2">
                            {isLoading ? <div className='text-center'>Loading ....</div> :
                                people.length === 0 ?
                                    <div className="text-center mt-5 p-8 bg-gray-100 rounded-lg shadow-md">
                                        <h4 className="text-gray-800 mb-4 text-2xl">No results found for "{query}"</h4>
                                        <p className="text-gray-600 text-base mb-6">Try different keywords or check your spelling</p>
                                        <BackToHome goTo={'/'} text={'Back to Home'} />
                                    </div> :
                                    people.map(user => {
                                        return <UserCard user={user} key={user.id} setData={setPeople} />
                                    })

                            }
                        </div>
                    }
                </div>
            </Layout>
        </>

    )
}
