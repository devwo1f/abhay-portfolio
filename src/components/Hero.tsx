import { ArrowDown, Mail, Linkedin, MapPin } from "lucide-react";
import heroAnimation from "@/assets/hero-animation.mp4";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Floating orbs */}
      <div 
        className="hero-orb w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent/25 -top-32 md:-top-48 -right-32 md:-right-48"
        style={{ animationDelay: '0s' }}
      />
      <div 
        className="hero-orb w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-accent/15 top-1/2 -left-20 md:-left-32"
        style={{ animationDelay: '-5s' }}
      />
      <div 
        className="hero-orb w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-primary/10 bottom-20 right-1/4"
        style={{ animationDelay: '-10s' }}
      />
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-2">
              <p className="text-muted-foreground font-mono text-xs md:text-sm animate-slide-up">
                Data Science & AI Engineer
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-slide-up animate-delay-100">
                Abhayraj
                <br />
                <span className="text-accent">Singh</span>
              </h1>
            </div>

            <p className="max-w-lg text-base md:text-lg text-muted-foreground leading-relaxed animate-slide-up animate-delay-200">
              MS Data Science student at University of Maryland, crafting
              intelligent solutions through data pipelines, machine learning, and
              cloud engineering.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-6 text-sm text-muted-foreground animate-slide-up animate-delay-300">
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

            <div className="pt-6 md:pt-12 animate-slide-up animate-delay-400">
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

          {/* Right side - Animated figure */}
          <div className="hidden md:flex items-center justify-center animate-slide-up animate-delay-300">
            <div className="relative">
              <div className="animate-float-figure">
                <video 
                  src={heroAnimation} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-80 lg:w-96 opacity-90"
                />
              </div>
              {/* Decorative elements around figure */}
              <div className="absolute -top-4 -right-4 w-20 h-20 border border-accent/30 rounded-full animate-pulse" />
              <div className="absolute -bottom-8 -left-8 w-16 h-16 border border-foreground/10 rounded-full" />
              <div className="absolute top-1/2 -right-12 w-3 h-3 bg-accent/40 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
