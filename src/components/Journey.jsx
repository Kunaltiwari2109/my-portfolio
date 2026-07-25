const milestones = [
  {
    year: "2024 - Present",
    title: "Future Goals",
    description:
      "Exploring advanced UI/UX concepts, 3D web rendering with Three.js, and seeking full-stack opportunities.",
    status: "active",
  },
  {
    year: "2023 - 2024",
    title: "Building Projects",
    description:
      "Developed multiple full-stack applications. Mastered state management, API integration, and responsive design principles.",
    status: "completed",
  },
  {
    year: "2022 - 2023",
    title: "Learning MERN Stack",
    description:
      "Transitioned to backend technologies. Learned Node.js, Express, and database management with MongoDB and MySQL.",
    status: "completed",
  },
  {
    year: "2022",
    title: "Started Web Development",
    description:
      "Wrote my first lines of HTML/CSS. Discovered a passion for creating visual interfaces and interactive elements.",
    status: "completed",
  },
];

const Journey = () => {
  return (
    <section id="journey" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-textSecondary">
              Timeline of Evolution
            </span>
          </h2>
          <div className="w-24 h-1 bg-neonPurple mx-auto rounded-full shadow-[0_0_10px_#8B5CF6]"></div>
        </div>

        <div className="relative">
          {/* Main vertical line */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10"></div>

          {/* Animated glow on the line */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-electricBlue via-neonPurple to-transparent shadow-[0_0_15px_#00F5FF]"></div>

          <div className="space-y-12">
            {milestones.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-backgroundPrimary border-2 border-electricBlue z-10 shadow-[0_0_10px_#00F5FF]">
                  {item.status === "active" && (
                    <div className="absolute inset-0 rounded-full bg-electricBlue animate-ping opacity-50"></div>
                  )}
                </div>

                {/* Content Box */}
                <div className="w-full pl-12 md:pl-0 md:w-1/2 relative group">
                  <div
                    className={`md:w-[90%] glassmorphism p-6 rounded-2xl border border-white/5 group-hover:border-electricBlue/30 transition-colors ${
                      index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                    }`}
                  >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 text-electricBlue text-xs font-semibold tracking-wider mb-3 border border-electricBlue/20">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-textSecondary text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
