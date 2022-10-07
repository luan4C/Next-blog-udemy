import AllPosts from "../../components/posts/all-posts";
import {getAllPosts} from '../../lib/posts-utils'


function AllPostsPage({posts}){
    return <AllPosts posts={posts}/>
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