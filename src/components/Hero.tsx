import { ArrowDown, Mail, Linkedin, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-muted-foreground font-mono text-sm animate-slide-up">
              Data Science & AI Engineer
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight animate-slide-up animate-delay-100">
              Abhayraj
              <br />
              <span className="text-accent">Singh</span>
            </h1>
          </div>

          <p className="max-w-lg text-lg text-muted-foreground leading-relaxed animate-slide-up animate-delay-200">
            MS Data Science student at University of Maryland, crafting
            intelligent solutions through data pipelines, machine learning, and
            cloud engineering.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground animate-slide-up animate-delay-300">
            <a
              href="mailto:abhay16@umd.edu"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail size={16} />
              abhay16@umd.edu
            </a>
            <a
              href="https://linkedin.com/in/abhay16"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              College Park, MD
            </span>
          </div>

          <div className="pt-12 animate-slide-up animate-delay-400">
            <a
              href="#about"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <span>Scroll to explore</span>
              <ArrowDown
                size={16}
                className="group-hover:translate-y-1 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
