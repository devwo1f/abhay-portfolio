import { useParams, Navigate } from "react-router-dom";
import { ExternalLink, Github } from "lucide-react";
import notionProjects from '../data/notion-projects.json';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { DetailHeader } from "@/components/shared/DetailHeader";
import { VisualBackdrop } from "@/components/shared/VisualBackdrop";
import { RelatedItems } from "@/components/shared/RelatedItems";
import { useEffect } from "react";

const ProjectDetails = () => {
    const { slug } = useParams<{ slug: string }>();

    const project: any = notionProjects.find((p: any) => p.slug === slug);
    const otherProjects = notionProjects.filter((p: any) => p.slug !== slug);

    // Scroll to top on mount and when slug changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!project) {
        return <Navigate to="/404" replace />;
    }

    const relatedProjects = otherProjects.map((p: any) => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        cover: p.cover,
    }));

    return (
        <div className="relative min-h-[100dvh]">
            <VisualBackdrop coverImage={project.cover} />
            <div className="relative z-10 font-[family-name:var(--font-sf-pro)]">
                <DetailHeader />

                <main className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
                    <article className="bg-card/20 backdrop-blur-3xl rounded-2xl p-8 md:p-12 border border-border/30 shadow-2xl">
                        {/* Header Section */}
                        <header className="mb-12 border-b border-border/50 pb-8">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-neutral-900 dark:text-neutral-100">
                                {project.title}
                            </h1>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tags?.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-secondary/80 backdrop-blur-sm text-secondary-foreground text-sm rounded-full font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {(project.link || project.github) && (
                                <div className="flex gap-4">
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
                                        >
                                            <ExternalLink size={16} className="mr-2" />
                                            Visit Project
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 shadow-sm"
                                        >
                                            <Github size={16} className="mr-2" />
                                            Source Code
                                        </a>
                                    )}
                                </div>
                            )}
                        </header>

                        <p className="text-xl text-zinc-800 dark:text-muted-foreground mt-8 mb-12 leading-relaxed font-light">
                            {project.description}
                        </p>

                        <div className="prose dark:prose-invert prose-lg max-w-none 
                       prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100 prose-headings:font-bold prose-headings:mt-10 
                       prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                       prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-p:leading-relaxed
                       prose-li:text-zinc-800 dark:prose-li:text-zinc-200
                       prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {project.content}
                            </ReactMarkdown>
                        </div>
                    </article>

                    <RelatedItems items={relatedProjects} type="project" />
                </main>
            </div>
        </div>
    );
};

export default ProjectDetails;
