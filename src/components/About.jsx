import { motion } from "framer-motion";
import { Code2, Cpu, Sparkles, Layers } from "lucide-react";

const chips = [
  { icon: Code2, label: "Problem Solver" },
  { icon: Layers, label: "MERN Learner" },
  { icon: Sparkles, label: "Creative Developer" },
  { icon: Cpu, label: "UI Explorer" },
];

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-textSecondary">
              Who I Am
            </span>
          </h2>
          <div className="w-24 h-1 bg-electricBlue mx-auto rounded-full shadow-[0_0_10px_#00F5FF]"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neonPurple/10 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Left: Text & Story */}
          <div className="space-y-6">
            {/* WRITE YOUR ABOUT TEXT HERE */}
            <p className="text-xl text-textPrimary font-light leading-relaxed">
              I'm an aspiring developer focused on building interactive,
              high-performance web applications that don't just look good, but
              feel{" "}
              <span className="text-electricBlue text-glow font-medium">
                alive
              </span>
              .
            </p>

            <p className="text-textSecondary leading-relaxed">
              My journey began with a curiosity for how things work on the
              internet. Since then, I've dived deep into modern web
              technologies, specifically the MERN stack. I believe that a great
              user interface is the bridge between complex logic and human
              intuition.
            </p>

            <p className="text-textSecondary leading-relaxed">
              When I'm not coding, I'm usually exploring new design trends,
              learning advanced animation libraries, or tinkering with
              open-source projects.
            </p>
          </div>

          {/* Right: Floating Highlight Cards */}
          <div className="grid grid-cols-2 gap-4">
            {chips.map((chip, index) => {
              const Icon = chip.icon;
              return (
                <div
                  key={index}
                  className="glassmorphism p-6 rounded-2xl border border-white/5 hover:border-electricBlue/50 transition-colors group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-electricBlue/0 to-electricBlue/5 group-hover:to-electricBlue/20 transition-all"></div>
                  <Icon
                    className="text-electricBlue mb-4 group-hover:scale-110 transition-transform duration-300"
                    size={32}
                  />
                  <h3 className="text-lg font-medium text-white">
                    {chip.label}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
