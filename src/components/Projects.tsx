import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Github } from "lucide-react";
import { projectsData, Project } from "@/data/projects";

const Projects = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-mono text-accent uppercase tracking-wider mb-4">
          Projects
        </h2>
        <p className="text-2xl md:text-3xl mb-16 max-w-2xl">
          A selection of work that showcases my expertise in data engineering
          and system design.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {projectsData.map((project: Project, index: number) => (
            <a href={`/project/${project.slug}`} 
              to={`/project/${project.slug}`}
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`relative z-10 block group p-8 bg-card border border-border rounded-lg hover-lift transition-all duration-700 cursor-pointer ${visibleCards.has(index)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <ExternalLink
                  size={18}
                  className="text-muted-foreground hover:text-accent"
                />
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section >
  );
};

export default Projects;
