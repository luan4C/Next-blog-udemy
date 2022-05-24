import AllPosts from "../../components/posts/all-posts";

const DUMMY_POSTS =[
    {
        title: "next course",
        slug: "getting-started-with-nextjs",
        image:"getting-started-nextjs.png",
        excerpt:"NextJS is the react framework for production, it makes building fullstack app...",
        date:"2022-05-23",

    },
    {
        title: "next course",
        slug: "getting-started-with-nextjs2",
        image:"getting-started-with-nextjs.png",
        excerpt:"NextJS is the react framework for production, it makes building fullstack app...",
        date:"2022-05-23",

    },
    {
        title: "next course",
        slug: "getting-started-with-nextjs3",
        image:"getting-started-with-nextjs.png",
        excerpt:"NextJS is the react framework for production, it makes building fullstack app...",
        date:"2022-05-23",

    },
    {
        title: "next course",
        slug: "getting-started-with-nextjs4",
        image:"getting-started-with-nextjs.png",
        excerpt:"NextJS is the react framework for production, it makes building fullstack app...",
        date:"2022-05-23",

    }

];

function AllPostsPage(){
    return <AllPosts posts={DUMMY_POSTS}/>
}
export default AllPostsPage;