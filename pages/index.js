import Head from "next/head";
import { Fragment } from "react";
import FeaturedPosts from "../components/home-page/featuredPosts";
import Hero from '../components/home-page/hero';
import {getFeaturedPosts} from '../lib/posts-utils';


function HomePage({posts}){
    return (
        <Fragment>
            <Head>
                <title>Welcome to my Blog</title>
                <meta name="description" content="nextjs, react, programming"/>
            </Head>
            <Hero />
            <FeaturedPosts posts={posts} />
        </Fragment>
    );
}

export function getStaticProps(){
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts: featuredPosts
        },
        revalidate: 60
    }
}

export default HomePage;
