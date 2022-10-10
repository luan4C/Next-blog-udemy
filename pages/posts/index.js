import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import {getAllPosts} from '../../lib/posts-utils'


function AllPostsPage({posts}){
    return <>
    <Head>
    <title>All Posts</title>
        <meta name="posts" content="list of programming related posts" />
    </Head>
    <AllPosts posts={posts}/></>
}
export default AllPostsPage;

export function getStaticProps(){
    const posts = getAllPosts();

    return {
        props: {
            posts
        },
        revalidate: 60
    }
}