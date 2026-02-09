import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/site-config';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Blog | Actualités Parapente',
    description: 'Actualités, conseils et témoignages sur le parapente dans la vallée du Champsaur. Découvrez les dernières nouvelles de Parapente Adventure.',
};

export default function BlogPage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}>
                    <Image
                        src="/blog-hero.png"
                        alt="Blog Parapente Adventure"
                        fill
                        priority
                        className={styles.heroImage}
                    />
                    <div className={styles.heroOverlay}></div>
                </div>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>Actualités & Conseils</h1>
                    <p className={styles.subtitle}>
                        Découvrez les dernières nouvelles et conseils pour votre vol
                    </p>
                </div>
            </section>

            {/* Blog Posts */}
            <section className={styles.blog}>
                <div className={styles.container}>
                    <div className={styles.postsGrid}>
                        {blogPosts.map((post) => (
                            <article key={post.id} className={styles.postCard}>
                                <div className={styles.postImage}>
                                    <Image
                                        src="/gallery/G0040365-1024x768.jpg"
                                        alt={post.title}
                                        fill
                                        className={styles.image}
                                    />
                                    <span className={styles.postCategory}>{post.category}</span>
                                </div>
                                <div className={styles.postContent}>
                                    <time className={styles.postDate}>
                                        {new Date(post.date).toLocaleDateString('fr-FR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </time>
                                    <h2 className={styles.postTitle}>{post.title}</h2>
                                    <p className={styles.postExcerpt}>{post.excerpt}</p>
                                    <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                                        Lire la suite →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Comment Section CTA */}
                    <div className={styles.commentCta}>
                        <div className={styles.commentContent}>
                            <span className={styles.commentIcon}>💬</span>
                            <div>
                                <h3>Vous avez volé avec nous ?</h3>
                                <p>Partagez votre expérience et laissez un commentaire !</p>
                            </div>
                            <Link href="/blog/commentez-votre-vol" className="btn btn-primary">
                                Commenter mon vol
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
