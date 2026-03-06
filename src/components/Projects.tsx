import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import notionProjects from '../data/notion-projects.json';

interface NotionProject {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  cover?: string;
}

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set());
  const projectRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 320 : 450;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleProjects((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-base md:text-lg font-semibold font-mono text-accent uppercase tracking-wider mb-4">
          Projects
        </h2>
        <p className="text-2xl md:text-3xl mb-16 max-w-2xl">
          A selection of work that showcases my expertise in ML infrastructure
          and system design.
        </p>

        <div className="relative w-full group/carousel">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 lg:-ml-12 z-20 p-3 rounded-full bg-background/80 backdrop-blur border border-border shadow-md hover:bg-secondary transition-colors opacity-0 sm:group-hover/carousel:opacity-100 disabled:opacity-0"
            aria-label="Scroll left"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 lg:-mr-12 z-20 p-3 rounded-full bg-background/80 backdrop-blur border border-border shadow-md hover:bg-secondary transition-colors opacity-0 sm:group-hover/carousel:opacity-100 disabled:opacity-0"
            aria-label="Scroll right"
          >
            <ArrowRight size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-8 pt-4 snap-x snap-mandatory scrollbar-hide flex-nowrap w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {notionProjects.length > 0 ? (
              notionProjects.map((project: NotionProject, index: number) => (
                <Link
                  to={`/project/${project.slug}`}
                  key={index}
                  ref={(el) => (projectRefs.current[index] = el)}
                  data-index={index}
                  className={`relative z-10 flex-col group cursor-pointer transition-all duration-700 shrink-0 snap-start w-[85vw] sm:w-[400px] lg:w-[450px] ${visibleProjects.has(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-64 md:h-80 w-full mb-6 overflow-hidden rounded-xl bg-muted/30">
                    {project.cover ? (
                      <img
                        src={project.cover}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                        <span className="text-neutral-700 text-6xl font-black opacity-30 select-none group-hover:scale-110 transition-transform duration-700">PROJECT</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags?.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="shrink-0 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                    />
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-neutral-400 w-full text-center py-8">No projects published yet. Add a row to your Notion database!</div>
            )}
          </div>
        </div>
      </div>
    </section >
  );
};

export default Projects;
