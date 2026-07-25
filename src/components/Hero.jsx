import { Download, Terminal } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background ambient lighting specific to hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electricBlue/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism mb-6">
            <span className="w-2 h-2 rounded-full bg-electricBlue animate-pulse"></span>
            <span className="text-sm font-medium text-electricBlue tracking-wider">
              SYSTEM ONLINE // STATUS: OPTIMAL
            </span>
          </div>

          {/* INSERT YOUR NAME HERE */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue to-neonPurple">
              Kunal
            </span>
          </h1>

          <div className="h-12 mb-6">
            {/* Typing roles using pure CSS or simple logic. For cinematic feel, a static text with glow works well, or a simple animation */}
            <h2 className="text-2xl md:text-3xl font-light text-textSecondary border-l-4 border-neonPurple pl-4">
              Creative Full Stack Developer
            </h2>
          </div>

          <p className="text-lg text-textSecondary max-w-lg mb-10 leading-relaxed">
            {/* INSERT YOUR TAGLINE HERE */}I build immersive digital
            experiences, bridging the gap between design and deep technical
            engineering. MERN stack learner, UI motion enthusiast.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch gap-6">
            <a
              href="#projects"
              className="group relative flex-1 min-w-0 overflow-hidden rounded-lg border border-electricBlue bg-transparent px-8 py-4 flex items-center justify-center gap-2 text-electricBlue font-semibold tracking-wide"
            >
              <div className="absolute inset-0 w-0 bg-electricBlue transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="relative flex items-center justify-center gap-2">
                <Terminal size={20} />
                Explore Projects
              </span>
            </a>

            <a
              href={`${import.meta.env.BASE_URL}Kunal-Resume.pdf`}
              target="_blank"
              rel="noreferrer"
              className="group relative flex-1 min-w-0 px-8 py-4 rounded-lg glassmorphism border-glow hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-white font-semibold tracking-wide"
            >
              <Download
                size={20}
                className="group-hover:text-neonPurple transition-colors"
              />
              Download Resume
            </a>
          </div>
        </div>

        {/* Profile Showcase Component / Image */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-64 h-80 md:w-72 md:h-[380px] rounded-2xl glassmorphism border-glow p-2 transform transition-transform duration-500 hover:rotate-2 hover:scale-[1.02]">
            <div className="absolute -inset-1 bg-gradient-to-r from-electricBlue to-neonPurple rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative h-full w-full bg-backgroundSecondary rounded-xl overflow-hidden flex items-center justify-center border border-white/10">
              <img
                src={`${import.meta.env.BASE_URL}profile-pic.png`}
                alt="Kunal"
                className="object-cover w-full h-full transition-all duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest text-textSecondary uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-electricBlue to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
