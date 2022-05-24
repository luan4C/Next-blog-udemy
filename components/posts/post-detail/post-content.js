import PostHeader from "./post-header";
import styles from './post-content.module.css';
import ReactMarkdown from "react-markdown"; // THIS THING IS AMAZING

const DUMMY_POST={
    title: "next course",
    slug: "getting-started-with-nextjs",
    image:"getting-started-nextjs.png",
    date:"2022-05-23",
    content:"# This is a first post"

}

function PostContent(){

    const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;


    return <article className={styles.content}>
        <PostHeader title={DUMMY_POST.title} image={imagePath} />
        <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>
    </article>
}

export default PostContent;