import React from 'react'

export default function SearchResultPage() {


    return (
        <>
            <Layout>
                <div className="searched-result-wrapper  p-5">
                    <div className="page-top">
                        <div className="flex items-center space-x-6">
                            <Link to={-1} className='p-1 hover:bg-gray-200 rounded'><ArrowBack /></Link>
                            {isSavedPosts ?
                                <h2 className='text-lg xl:text-xl font-medium'>Saved Posts</h2>
                                :
                                <h2 className='text-lg xl:text-xl font-medium'>{profileData.id === profileId ? `Your Posts` : profileData.username + `\'s Posts`}</h2>
                            }
                        </div>
                    </div>
                    {isLoading ? <div className='text-center'>Loading ....</div> :
                        posts.length === 0 ?
                            <div className='flex flex-col items-center justify-center min-h-[200px] text-gray-500'>
                                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                </svg>
                                <p className="text-xl font-semibold">No Result Found</p>
                                <p className="text-sm mt-2">Try different query to get result </p>
                            </div> :
                            // <div className="mt-5">
                            //     <PostProvider value={{ posts, setPosts }}>
                            //         <PostList />
                            //     </PostProvider>
                            // </div>
                    }
                </div>
            </Layout>
        </>

    )
}
