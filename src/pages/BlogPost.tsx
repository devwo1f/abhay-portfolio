import { useParams, Navigate } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import notionBlogs from '../data/notion-blogs.json';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { DetailHeader } from "@/components/shared/DetailHeader";
import { VisualBackdrop } from "@/components/shared/VisualBackdrop";
import { RelatedItems } from "@/components/shared/RelatedItems";
import { useEffect } from "react";

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();

    const post: any = notionBlogs.find((p: any) => p.slug === slug);
    const otherPosts = notionBlogs.filter((p: any) => p.slug !== slug);

    // Scroll to top on mount and when slug changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return <Navigate to="/404" replace />;
    }

    const relatedBlogs = otherPosts.map((p: any) => ({
        slug: p.slug,
        title: p.title,
        description: p.excerpt,
        category: Array.isArray(p.category) ? p.category[0] || 'General' : p.category
    }));

    return (
        <div className="min-h-screen">
            <VisualBackdrop />
            <DetailHeader />

            <main className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
                <article className="bg-card/90 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-border/50 shadow-2xl">
                    {/* Header Section */}
                    <header className="mb-12 border-b border-border/50 pb-8">
                        <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full mb-6">
                            {Array.isArray(post.category) ? post.category[0] || 'General' : post.category}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-accent" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>•</span>
                                <span>{post.readTime}</span>
                            </div>
                            {/* Added Author explicitly at user's request, assuming Abhay given portfolio name */}
                            <div className="flex items-center gap-2">
                                <span>•</span>
                                <span>By Abhay</span>
                            </div>
                        </div>

                        <p className="text-xl text-muted-foreground mt-8 leading-relaxed font-light">
                            {post.excerpt}
                        </p>
                    </header>

                    <div className="prose prose-invert prose-lg max-w-none 
                       prose-headings:text-foreground prose-headings:font-bold prose-headings:mt-10 
                       prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                       prose-p:text-muted-foreground prose-p:leading-relaxed">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </article>

                <RelatedItems items={relatedBlogs} type="blog" />
            </main>
        </div>
    );
};

export default BlogPost;
