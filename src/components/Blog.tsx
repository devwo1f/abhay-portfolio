import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Calendar } from "lucide-react";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Building Scalable Data Pipelines in the Cloud",
    excerpt:
      "Exploring best practices for designing and implementing real-time data processing systems that can handle millions of events.",
    date: "Dec 2025",
    readTime: "5 min read",
    category: "Data Engineering",
  },
  {
    title: "My Journey from Library Assistant to AI Engineer",
    excerpt:
      "Reflecting on the unconventional path that led me from managing library systems to building machine learning models.",
    date: "Nov 2025",
    readTime: "8 min read",
    category: "Career",
  },
  {
    title: "Azure Certifications: A Comprehensive Guide",
    excerpt:
      "Tips and strategies for preparing and passing Azure Data Engineer and AI Associate certifications.",
    date: "Oct 2025",
    readTime: "6 min read",
    category: "Certifications",
  },
];

const Blog = () => {
  const [visiblePosts, setVisiblePosts] = useState<Set<number>>(new Set());
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);

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
          {blogPosts.map((post, index) => (
            <div
              key={index}
              ref={(el) => (postRefs.current[index] = el)}
              data-index={index}
              className={`group py-8 border-b border-border last:border-0 cursor-pointer transition-all duration-700 ${
                visiblePosts.has(index)
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <div className="flex items-center gap-3 text-sm text-muted-foreground md:w-48 shrink-0">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-block px-2 py-0.5 bg-accent/10 text-accent text-xs rounded mb-2">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-2 leading-relaxed max-w-2xl">
                        {post.excerpt}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="shrink-0 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
