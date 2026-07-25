import { useState } from "react";
import { Github, Linkedin, Twitter, Instagram, Send, Mail } from "lucide-react";

const Contact = () => {
  const [status, setStatus] = useState("");

  const apiBaseUrl = import.meta.env.VITE_API_URL || "";
  const apiUrl = apiBaseUrl ? `${apiBaseUrl}/api/contact` : "/api/contact";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("Success! Message saved to Excel and email sent.");
        e.target.reset();
      } else {
        setStatus("Error: Failed to process request.");
      }
    } catch (error) {
      setStatus(
        "Error! Backend is not reachable. In production, the API must be hosted separately and VITE_API_URL set.",
      );
      console.error("Error!", error);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-electricBlue/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue to-neonPurple">
              Connect With Me
            </span>
          </h2>
          <p className="text-textSecondary">
            Let's build something extraordinary together.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-12 glassmorphism rounded-3xl p-8 md:p-12 border border-white/10 shadow-[0_0_50px_rgba(0,245,255,0.05)]">
          {/* Contact Info & Socials */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Get in Touch
              </h3>
              <p className="text-textSecondary font-light">
                Whether you have a question or just want to say hi, I'll try my
                best to get back to you!
              </p>
            </div>

            <div className="flex items-center gap-4 text-electricBlue">
              <div className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center border border-electricBlue/30">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-textSecondary uppercase tracking-widest mb-1">
                  Email
                </p>
                {/* INSERT YOUR EMAIL HERE */}
                <a
                  href="mailto:hello@example.com"
                  className="text-white hover:text-electricBlue transition-colors"
                >
                  hello@example.com
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm text-textSecondary uppercase tracking-widest mb-4">
                Social Network
              </p>
              <div className="flex gap-4">
                {/* INSERT YOUR SOCIAL LINKS HERE */}
                {[
                  { icon: Github, link: "#" },
                  { icon: Linkedin, link: "#" },
                  { icon: Twitter, link: "#" },
                  { icon: Instagram, link: "#" },
                ].map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-textSecondary hover:text-white hover:border-electricBlue hover:shadow-[0_0_15px_rgba(0,245,255,0.5)] transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-electricBlue transition-colors peer placeholder-transparent"
                    placeholder="Name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 top-3 text-textSecondary text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-electricBlue peer-valid:-top-4 peer-valid:text-xs"
                  >
                    Name
                  </label>
                </div>
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-electricBlue transition-colors peer placeholder-transparent"
                    placeholder="Email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 top-3 text-textSecondary text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-electricBlue peer-valid:-top-4 peer-valid:text-xs"
                  >
                    Email
                  </label>
                </div>
              </div>

              <div className="relative group pt-4">
                <textarea
                  name="message"
                  id="message"
                  required
                  rows="4"
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-electricBlue transition-colors peer placeholder-transparent resize-none"
                  placeholder="Message"
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute left-0 top-7 text-textSecondary text-sm transition-all peer-focus:-top-0 peer-focus:text-xs peer-focus:text-electricBlue peer-valid:-top-0 peer-valid:text-xs"
                >
                  Message
                </label>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <button
                  type="submit"
                  className="group relative w-full sm:w-auto px-8 py-4 bg-transparent overflow-hidden rounded-lg"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-electricBlue to-neonPurple opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative flex items-center justify-center gap-2 text-backgroundPrimary font-bold tracking-wide">
                    <span>Send Message</span>
                    <Send
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </span>
                </button>
                {status && (
                  <span
                    className={`text-sm ${status.includes("Success") ? "text-green-400" : "text-red-400"}`}
                  >
                    {status}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
