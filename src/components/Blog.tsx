import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar } from "lucide-react";
import notionBlogs from '../data/notion-blogs.json';

// Define a type for the blog posts from notion-blogs.json
interface NotionBlogPost {
  slug: string;
  date: string;
  readTime: string;
  category: string | string[];
  title: string;
  excerpt: string;
}

const Blog = () => {
  const [visiblePosts, setVisiblePosts] = useState<Set<number>>(new Set());
  const postRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisiblePosts((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    postRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="blog" className="py-32 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-mono text-accent uppercase tracking-wider mb-4">
          Blog
        </h2>
        <p className="text-2xl md:text-3xl mb-16 max-w-2xl">
          Thoughts on data science, engineering, and the journey of continuous
          learning.
        </p>

        <div className="space-y-1">
          {notionBlogs.length > 0 ? (
            notionBlogs.map((blog: NotionBlogPost, index: number) => (
              <Link
                to={`/blog/${blog.slug}`}
                key={index}
                ref={(el) => (postRefs.current[index] = el)}
                data-index={index}
                className={`relative z-10 block group py-8 border-b border-border last:border-0 cursor-pointer transition-all duration-700 ${visiblePosts.has(index)
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground md:w-48 shrink-0">
                    <Calendar size={14} />
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-neutral-300 mb-2">
                          {Array.isArray(blog.category) ? blog.category[0] || 'General' : blog.category}
                        </span>
                        <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-2 leading-relaxed max-w-2xl">
                          {blog.excerpt}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="shrink-0 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-neutral-400 text-center py-8">No blogs published yet. Add a row to your Notion database!</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
