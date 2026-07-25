import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";
import { Award } from "lucide-react";

const baseUrl = import.meta.env.BASE_URL || "/";

const certificates = [
  {
    title: "Java Internship (Training)",
    issuer: "Internship Studio",
    date: "August 31, 2024",
    image: `${baseUrl}java-certificate.pdf`,
    link: `${baseUrl}java-certificate.pdf`,
    credentialId: "ISJVAT814142",
  },
  {
    title: "Full Stack Web Development",
    issuer: "Bootcamp / Platform",
    date: "2023",
    image: null,
    link: "#",
    credentialId: "",
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn("right")}
        >
          <Award className="text-electricBlue" size={40} />
          <h2 className="text-3xl md:text-4xl font-bold">Certifications</h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-electricBlue/50 to-transparent ml-4"></div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificates.map((cert, index) => (
            <motion.a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              variants={fadeIn("up", index * 0.1)}
              className="group relative rounded-2xl p-1 glassmorphism overflow-hidden cursor-pointer block"
            >
              {/* Holographic Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-electricBlue via-neonPurple to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              <div className="relative h-full bg-backgroundPrimary/90 backdrop-blur-xl rounded-xl p-6 flex flex-col z-10 border border-white/5">
                <div className="w-full h-40 bg-backgroundSecondary rounded-lg mb-6 overflow-hidden relative flex items-center justify-center border border-white/10 group-hover:border-electricBlue/30 transition-colors">
                  {cert.title.includes("Java") ? (
                    <div className="flex flex-col items-center gap-2">
                      <Award
                        size={48}
                        className="text-neonPurple opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                      />
                      <span className="text-xs text-electricBlue/80 font-medium tracking-widest uppercase">
                        View Certificate PDF
                      </span>
                    </div>
                  ) : (
                    <span className="text-textSecondary/50 text-sm">
                      IMAGE PLACEHOLDER
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-backgroundPrimary/80 to-transparent pointer-events-none"></div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-electricBlue transition-colors">
                  {cert.title}
                </h3>
                <p className="text-textSecondary text-sm mb-4">{cert.issuer}</p>

                {cert.credentialId && (
                  <p className="text-xs text-textSecondary/70 font-mono mb-4">
                    ID: {cert.credentialId}
                  </p>
                )}

                <div className="mt-auto inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-electricBlue w-max border border-white/5 group-hover:bg-electricBlue/10 transition-colors">
                  Issued: {cert.date}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
