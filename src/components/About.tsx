import { useEffect, useRef, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = {
    technical: [
      "Python",
      "SQL",
      "Machine Learning",
      "Data Pipelines",
      "Cloud Engineering",
      "NLP",
      "Computer Vision",
    ],
    certifications: [
      "Databricks Certified Data Engineer",
      "Azure AI Associate",
      "Azure Data Engineer Associate",
    ],
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-sm font-mono text-accent uppercase tracking-wider">
              About Me
            </h2>
            <p className="text-2xl md:text-3xl leading-relaxed">
              A passionate Data Scientist and AI Engineer with experience in building 
              real-time data pipelines and optimizing cloud-based solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Currently pursuing my MS in Data Science at the University of Maryland, 
              College Park. Previously worked at Accenture as an AI/ML Analyst and 
              Data Engineer, where I engineered high-performance data systems and 
              collaborated with cross-functional teams.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My background in Computer Science from RGPV, combined with hands-on 
              experience in machine learning, NLP, and computer vision, drives my 
              passion for creating intelligent, scalable solutions.
            </p>
          </div>

          <div
            className={`space-y-8 transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div>
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-4">
                Technical Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.technical.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-4">
                Certifications
              </h3>
              <div className="space-y-2">
                {skills.certifications.map((cert) => (
                  <div
                    key={cert}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
