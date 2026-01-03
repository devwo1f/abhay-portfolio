import { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

interface TimelineItem {
  date: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  type: "work" | "education";
}

const timelineData: TimelineItem[] = [
  {
    date: "Aug 2025 – Present",
    title: "MS Data Science",
    organization: "University of Maryland, College Park",
    location: "College Park, USA",
    description:
      "Coursework: DATA601, DATA602, DATA603 - Advanced data science methodologies and applications.",
    type: "education",
  },
  {
    date: "Sep 2024 – Aug 2025",
    title: "AI/ML Analyst",
    organization: "Accenture",
    location: "Hyderabad, India",
    description:
      "Engineered real-time data pipelines and optimized cloud-based software for high performance.",
    type: "work",
  },
  {
    date: "Oct 2022 – Sep 2024",
    title: "Data Engineer Associate",
    organization: "Accenture",
    location: "India",
    description:
      "Designed reliable data workflows and collaborated with teams to improve system efficiency.",
    type: "work",
  },
  {
    date: "Aug 2021 – Mar 2022",
    title: "Research Assistant",
    organization: "RGPV",
    location: "Bhopal, India",
    description:
      "Built data pipelines and improved accuracy of language models using Python.",
    type: "work",
  },
  {
    date: "Aug 2018 – Jun 2022",
    title: "BS Computer Science",
    organization: "RGPV",
    location: "Bhopal, India",
    description:
      "Focus areas: Data Structures, Machine Learning, OOP, NLP, Computer Vision.",
    type: "education",
  },
];

const Timeline = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="py-32 px-6 bg-card">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm font-mono text-accent uppercase tracking-wider mb-16 text-center">
          My Journey
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {timelineData.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className={`relative flex items-start gap-8 mb-12 md:mb-16 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div
                className={`flex-1 ml-16 md:ml-0 transition-all duration-700 ${
                  visibleItems.has(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}
              >
                <span className="text-sm font-mono text-muted-foreground">
                  {item.date}
                </span>
                <h3 className="text-xl font-semibold mt-1">{item.title}</h3>
                <p className="text-accent font-medium">{item.organization}</p>
                <p className="text-sm text-muted-foreground">{item.location}</p>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Icon */}
              <div
                className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  visibleItems.has(index)
                    ? "bg-accent text-accent-foreground scale-100"
                    : "bg-secondary text-muted-foreground scale-75"
                }`}
              >
                {item.type === "work" ? (
                  <Briefcase size={18} />
                ) : (
                  <GraduationCap size={18} />
                )}
              </div>

              {/* Empty space for layout */}
              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
