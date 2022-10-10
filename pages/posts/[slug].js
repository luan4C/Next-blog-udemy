import Head from "next/head";
import PostContent from "../../components/posts/post-detail/post-content";
import {getPostData, getAllPostsFiles} from '../../lib/posts-utils'

function PostDetailPage({post}){

    return <>
    <Head>
        <title>{post.title}</title>
        <meta name="post" content={post.excerpt} />
    </Head>
    <PostContent post={post} />
    </>
}

export function getStaticProps(context){
    const { params } = context;
    const { slug } = params;
     
    const postData = getPostData(slug);

    return {
        props: {
            post: postData
        },
        revalidate:600
    }
}

export function getStaticPaths(){
    const postsFilenames = getAllPostsFiles();
    const slugs = postsFilenames.map(fname=> fname.replace(/\.md$/, ''))
    return {
        paths: slugs.map(slug=> ({params: {slug: slug}})),
        fallback: false
    }
}

export default PostDetailPage;

//SLUG: Human readable and Search Engine Freandly