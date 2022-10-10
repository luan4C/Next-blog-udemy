/* eslint-disable react/no-children-prop */
import PostHeader from "./post-header";
import styles from './post-content.module.css';
import ReactMarkdown from "react-markdown"; // THIS THING IS AMAZING
import { PrismLight} from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import Image from "next/image";

PrismLight.registerLanguage('js',js)

function PostContent({post}){

    const imagePath = `/images/posts/${post.slug}/${post.image}`;
    const customRenders = {
        // Next images are rendered inside paragraphs
        p(paragraph){
            const { node } = paragraph;
            if(node.children[0].tagName === 'img'){
                const image = node.children[0];
                
                return <div className={styles.image}>
                    <Image src={`/images/posts/${post.slug}/${image.properties.src}`}
                    alt={image.properties.alt} width={600} height={300} />
                </div>
            }
            return <p>{paragraph.children}</p>
        },
        code(code){
            const {className, children} = code
            return <PrismLight language={className.split('-')[1]} children={children} style={atomDark} />
        }
    }

    return <article className={styles.content}>
        <PostHeader title={post.title} image={imagePath} />
        <ReactMarkdown components={customRenders} >{post.content}</ReactMarkdown>
    </article>
}

export default PostContent;