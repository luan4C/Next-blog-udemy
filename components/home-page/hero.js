import Image from 'next/image';
import styles from './hero.module.css'

//Content on the public folder will be on the root in browser

function Hero(){
    return <section className={styles.hero}>
        <div className={styles.image}>
            <Image src="/images/site/hero.jpg" alt="An image showing Luan" width={330} height={360} layout="responsive" />
        </div>
        <h1>Hi, I'm Luan</h1>
        <p>I study NextJs on Udemy</p>
    </section>
}

export default Hero;