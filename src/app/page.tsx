"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import emailjs from '@emailjs/browser';
import { 
  Github, Linkedin, Mail, ExternalLink, 
  ChevronDown, Code2, Sparkles, Zap, Database, 
  Globe, Server, GitBranch, GitCommit, Calendar,
  MapPin, Award, Users, Send, ArrowRight, Copy,
  CheckCircle2, Star, GitFork, Layers, Box, Volume2, VolumeX,
  Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// ============================================
// GHIBLI DARK: Starry Night Background
// ============================================
const StarryNight = () => {
  // Fixed positions to avoid hydration mismatch
  const stars = [
    { left: 10, top: 15, size: 2, delay: 0 },
    { left: 25, top: 8, size: 1.5, delay: 0.5 },
    { left: 40, top: 20, size: 2.5, delay: 1 },
    { left: 55, top: 5, size: 1, delay: 1.5 },
    { left: 70, top: 25, size: 2, delay: 2 },
    { left: 85, top: 12, size: 1.5, delay: 0.3 },
    { left: 15, top: 35, size: 1, delay: 0.8 },
    { left: 30, top: 45, size: 2, delay: 1.2 },
    { left: 50, top: 40, size: 1.5, delay: 0.2 },
    { left: 65, top: 50, size: 2.5, delay: 1.8 },
    { left: 80, top: 38, size: 1, delay: 2.2 },
    { left: 5, top: 55, size: 2, delay: 0.6 },
    { left: 20, top: 65, size: 1.5, delay: 1.4 },
    { left: 45, top: 70, size: 2, delay: 0.9 },
    { left: 75, top: 60, size: 1, delay: 1.1 },
  ];

  const fireflies = [
    { left: 20, top: 30, delay: 0 },
    { left: 50, top: 50, delay: 2 },
    { left: 80, top: 25, delay: 4 },
    { left: 35, top: 65, delay: 1 },
    { left: 65, top: 40, delay: 3 },
    { left: 10, top: 55, delay: 5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Night sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-950" />
      
      {/* Moon glow */}
      <div className="absolute top-16 right-24 w-32 h-32 rounded-full bg-gradient-radial from-amber-100/30 via-amber-50/10 to-transparent blur-2xl" />
      <Moon className="absolute top-12 right-20 w-16 h-16 text-amber-100/40" />
      
      {/* Stars */}
      {stars.map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + (i % 3),
            delay: star.delay,
            repeat: Infinity,
          }}
        />
      ))}
      
      {/* Fireflies */}
      {fireflies.map((firefly, i) => (
        <motion.div
          key={`firefly-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${firefly.left}%`,
            top: `${firefly.top}%`,
            background: "radial-gradient(circle, rgba(134,239,172,0.8) 0%, rgba(134,239,172,0) 70%)",
            boxShadow: "0 0 10px rgba(134,239,172,0.6)",
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [-20, 0, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 4,
            delay: firefly.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Mist effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-900/80 to-transparent" />
    </div>
  );
};

// ============================================
// GHIBLI DARK: Soft Glow Cursor
// ============================================
const GlowCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  
  const springConfig = { damping: 30, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(true);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(false);
      }
    };
    
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);
  
  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
        width: isHovering ? "40px" : "16px",
        height: isHovering ? "40px" : "16px",
        background: "radial-gradient(circle, rgba(134,239,172,0.8) 0%, rgba(134,239,172,0.3) 50%, transparent 100%)",
        boxShadow: "0 0 20px rgba(134,239,172,0.5)",
      }}
    />
  );
};

// ============================================
// GHIBLI DARK: Ambient Music Player
// ============================================
const AmbientMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const toggleMusic = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.35;
      // Ghibli-style ambient music
      audioRef.current.src = "/audio/ghibli-music.mp4";
    }
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Audio playback error:", error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };
  
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.button
        onClick={toggleMusic}
        disabled={isLoading}
        className="w-14 h-14 rounded-full bg-slate-800/80 backdrop-blur-md border border-green-400/20 flex items-center justify-center hover:border-green-400/40 transition-all group shadow-lg shadow-green-900/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-cursor-hover
      >
        {isLoading ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
            <Sparkles className="w-5 h-5 text-green-400" />
          </motion.div>
        ) : isPlaying ? (
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
            <Volume2 className="w-5 h-5 text-green-400" />
          </motion.div>
        ) : (
          <VolumeX className="w-5 h-5 text-slate-500 group-hover:text-green-400 transition-colors" />
        )}
      </motion.button>
      
      {isPlaying && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-end gap-1 h-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 bg-gradient-to-t from-green-500 to-emerald-300 rounded-full"
              animate={{ height: ["10px", "25px", "10px"] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

// ============================================
// GHIBLI DARK: Title
// ============================================
const GhibliTitle = ({ text }: { text: string }) => {
  return (
    <motion.h1
      className="text-4xl md:text-6xl font-bold"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <span className="bg-gradient-to-r from-green-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent">
        {text}
      </span>
    </motion.h1>
  );
};

// ============================================
// GHIBLI DARK: Skill Card
// ============================================
const GhibliSkillCard = ({ skill, index }: { skill: { name: string; level: number; icon: React.ReactNode; category: string }; index: number }) => {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center text-green-400">
            {skill.icon}
          </div>
          <Badge variant="outline" className="bg-slate-700/30 border-slate-600 text-slate-300 text-xs font-medium">
            {skill.category}
          </Badge>
        </div>
        
        <h3 className="text-lg font-bold text-slate-100 mb-2">{skill.name}</h3>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Proficiency</span>
            <span className="font-medium text-green-400">{skill.level}%</span>
          </div>
          <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// GHIBLI DARK: Project Card
// ============================================
interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  watchers: number;
  issues: number;
  topics: string[];
  createdAt: string;
  pushedAt: string;
  updatedAt: string;
  visibility: string;
}

const GhibliProjectCard = ({ project, index }: { project: {
  name: string;
  description: string;
  tech: string[];
  year: string;
  stars: number;
  forks: number;
  url: string;
  language: string;
  topics: string[];
  image?: string;
}; index: number }) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(`git clone ${project.url}.git`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const languageColors: Record<string, string> = {
    Python: "bg-blue-400",
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-500",
    HTML: "bg-orange-400",
    CSS: "bg-purple-400",
    Java: "bg-red-400",
    "C++": "bg-pink-400",
    C: "bg-gray-400",
  };
  
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl overflow-hidden border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-900/20">
        {project.image && !imageError && (
          <div className="relative h-40 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-800/90 to-transparent" />
          </div>
        )}
        
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-green-300 transition-colors">
                {project.name.replace(/-/g, " ")}
              </h3>
              <div className="flex items-center gap-2 text-sm text-slate-500 font-mono">
                <GitBranch className="w-3 h-3 text-green-500" />
                <span>Anuraj-IND/{project.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-900/30 rounded-full">
              <Star className="w-4 h-4 text-amber-400 fill-amber-300" />
              <span className="text-sm font-medium text-amber-300">{project.stars}</span>
            </div>
          </div>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-900/30 text-green-300 border border-green-700/30"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              {project.language && (
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${languageColors[project.language] || "bg-gray-400"}`} />
                  <span>{project.language}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <GitFork className="w-3 h-3" />
                <span>{project.forks}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{project.year}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
                data-cursor-hover
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              </button>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-green-400"
                data-cursor-hover
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// GHIBLI DARK: Timeline
// ============================================
const GhibliTimeline = ({ experiences }: { experiences: { role: string; company: string; location: string; period: string; description: string[] }[] }) => {
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500/50 via-emerald-500/30 to-transparent" />
      
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="relative pl-12 md:pl-20"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="absolute left-2 md:left-6 top-4">
              <motion.div
                className="w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-5 border border-slate-700/50 hover:border-green-500/30 transition-colors">
              <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-slate-500 font-mono">
                <span className="text-green-400">commit {["a3f7b2c1", "d8e4f6a9"][index]}</span>
                <span>•</span>
                <span>{exp.period}</span>
              </div>
              
              <h4 className="text-lg font-bold text-slate-100 mb-1">{exp.role}</h4>
              <div className="flex items-center gap-2 text-green-400 text-sm mb-4">
                <span className="font-medium">{exp.company}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </span>
              </div>
              
              <div className="space-y-2">
                {exp.description.map((desc, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="text-green-400 mt-0.5">+</span>
                    <span>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// GHIBLI DARK: Contact Form
// ============================================
const GhibliContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<{ status: string; message: string } | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "demo_service";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "demo_template";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "demo_key";
      
      if (serviceId === "demo_service") {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setResponse({ status: "200 OK", message: "Demo mode: Configure EmailJS for real emails!" });
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitting(false);
        return;
      }
      
      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        to_email: "anuraj.m.11.04@gmail.com",
        message: formData.message,
      }, publicKey);
      
      setResponse({ status: "200 OK", message: "Message sent! I'll get back to you soon ✨" });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Email send error:", err);
      setResponse({ status: "Error", message: "Please email: anuraj.m.11.04@gmail.com" });
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 border border-slate-700/50">
      <div className="flex items-center gap-2 mb-6">
        <div className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm font-medium">
          POST
        </div>
        <span className="text-slate-500 text-sm font-mono">/api/v1/contact</span>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-slate-400 mb-2 font-medium">Your Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-700/50 border-slate-600 focus:border-green-500 focus:ring-green-500/20 rounded-xl text-slate-100 placeholder:text-slate-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2 font-medium">Your Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-700/50 border-slate-600 focus:border-green-500 focus:ring-green-500/20 rounded-xl text-slate-100 placeholder:text-slate-500"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-slate-400 mb-2 font-medium">Your Message</label>
          <Textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="bg-slate-700/50 border-slate-600 focus:border-green-500 focus:ring-green-500/20 rounded-xl min-h-[140px] text-slate-100 placeholder:text-slate-500"
            placeholder="Write your message here..."
            required
          />
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-6 rounded-xl shadow-lg shadow-green-900/30"
          data-cursor-hover
        >
          {isSubmitting ? (
            <motion.div className="flex items-center gap-2">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                <Sparkles className="w-5 h-5" />
              </motion.div>
              Sending...
            </motion.div>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Send Message
            </span>
          )}
        </Button>
      </form>
      
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-4 p-4 rounded-xl ${response.status === "200 OK" ? "bg-green-900/30 text-green-300 border border-green-700/30" : "bg-red-900/30 text-red-300 border border-red-700/30"}`}
          >
            {response.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-teal-400 origin-left z-[100]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

// ============================================
// PARALLAX SECTION WRAPPER
// ============================================
const ParallaxSection = ({ 
  children, 
  id, 
  className = "" 
}: { 
  children: React.ReactNode; 
  id?: string; 
  className?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  
  return (
    <motion.section 
      ref={ref} 
      id={id} 
      className={className}
      style={{ opacity }}
    >
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </motion.section>
  );
};

// ============================================
// FLOATING PARTICLES
// ============================================
const FloatingParticles = () => {
  // Fixed positions for hydration safety - all values are deterministic
  const particles = [
    { left: 5, top: 20, size: 3, duration: 15, delay: 0 },
    { left: 15, top: 60, size: 2, duration: 18, delay: 2 },
    { left: 25, top: 40, size: 4, duration: 20, delay: 4 },
    { left: 35, top: 80, size: 2, duration: 16, delay: 1 },
    { left: 45, top: 30, size: 3, duration: 22, delay: 3 },
    { left: 55, top: 70, size: 2, duration: 17, delay: 5 },
    { left: 65, top: 50, size: 3, duration: 19, delay: 2 },
    { left: 75, top: 25, size: 2, duration: 21, delay: 4 },
    { left: 85, top: 55, size: 4, duration: 14, delay: 1 },
    { left: 95, top: 35, size: 2, duration: 23, delay: 3 },
  ];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-green-400/10"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-15, 15, -15],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// ============================================
// MAIN PORTFOLIO
// ============================================
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [githubStats, setGithubStats] = useState<{ totalStars: number; totalForks: number; totalRepos: number } | null>(null);
  const [githubUser, setGithubUser] = useState<{ followers: number } | null>(null);
  
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch("/api/github");
        if (response.ok) {
          const data = await response.json();
          setGithubRepos(data.repos);
          setGithubStats(data.stats);
          setGithubUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
      }
    };
    fetchGitHubData();
  }, []);
  
  const skills = [
    { name: "Python", level: 90, icon: <Code2 className="w-5 h-5" />, category: "Languages" },
    { name: "JavaScript", level: 80, icon: <Globe className="w-5 h-5" />, category: "Languages" },
    { name: "C/C++", level: 75, icon: <Box className="w-5 h-5" />, category: "Languages" },
    { name: "Django", level: 85, icon: <Server className="w-5 h-5" />, category: "Backend" },
    { name: "FastAPI", level: 85, icon: <Zap className="w-5 h-5" />, category: "Backend" },
    { name: "React", level: 70, icon: <Layers className="w-5 h-5" />, category: "Frontend" },
    { name: "MySQL/SQLite", level: 80, icon: <Database className="w-5 h-5" />, category: "Database" },
    { name: "Git & DevOps", level: 75, icon: <GitBranch className="w-5 h-5" />, category: "Tools" },
  ];
  
  const featuredProjects = [
    { repoName: "OFFLINE-RAG-BASED-CODE-NAVIGATOR", customDescription: "Built a RAG-based AI system enabling natural-language queries over large multi-file codebases with Qwen2.5-3B.", tech: ["Qwen2.5-3B", "FastAPI", "Python", "RAG"], image: "/images/project-rag.png" },
    { repoName: "movie-review", customDescription: "A movie review application with sentiment analysis and interactive review system.", tech: ["Python", "FastAPI", "JavaScript"], image: "/images/project-alertnexa.png" },
    { repoName: "E-Commerce-Application", customDescription: "Full-stack e-commerce platform with secure authentication, payments, and inventory management.", tech: ["Django", "JavaScript", "MySQL"], image: "/images/project-ecommerce.png" },
  ];
  
  const projects = featuredProjects.map((featured) => {
    const ghRepo = githubRepos.find((r) => r.name === featured.repoName || r.name.toLowerCase() === featured.repoName.toLowerCase());
    return {
      name: ghRepo?.name || featured.repoName,
      description: featured.customDescription,
      tech: featured.tech,
      year: ghRepo ? new Date(ghRepo.pushedAt).getFullYear().toString() : "2024",
      stars: ghRepo?.stars || 0,
      forks: ghRepo?.forks || 0,
      url: ghRepo?.url || `https://github.com/Anuraj-IND/${featured.repoName}`,
      language: ghRepo?.language || "Python",
      topics: ghRepo?.topics || [],
      image: featured.image,
    };
  });
  
  const experiences = [{
    role: "Full Stack Development Intern",
    company: "UCER, Prayagraj",
    location: "India",
    period: "Aug 2023",
    description: ["Developed backend modules using Python and Django", "Handled frontend-backend communication via JSON APIs", "Worked with SQL databases and built responsive interfaces"]
  }];
  
  const achievements = [
    { title: "Hacktoberfest 2024", description: "Merged 4+ pull requests", icon: <Award className="w-5 h-5" /> },
    { title: "Smart India Hackathon 2025", description: "13th out of 90+ teams", icon: <Users className="w-5 h-5" /> },
    { title: "HackQuest 2025", description: "Presented AlertNexa project", icon: <Star className="w-5 h-5" /> },
    { title: "InnovateX 2025", description: "Project Design Lead", icon: <GitBranch className="w-5 h-5" /> },
  ];
  
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); },
      { threshold: 0.3 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  
  return (
    <div className="relative min-h-screen text-slate-100 overflow-x-hidden flex flex-col">
      <GlowCursor />
      <StarryNight />
      <FloatingParticles />
      <ScrollProgress />
      <AmbientMusicPlayer />
      
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
        {["home", "skills", "projects", "experience", "contact"].map((section) => (
          <a key={section} href={`#${section}`} className="group flex items-center gap-2" data-cursor-hover>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
              {section}
            </span>
            <div className={`w-2.5 h-2.5 rounded-full transition-all ${activeSection === section ? "bg-green-400 scale-125 shadow-lg shadow-green-400/50" : "bg-slate-600 group-hover:bg-green-500"}`} />
          </a>
        ))}
      </nav>
      
      <main className="relative z-10 flex-1">
        {/* HERO */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20 relative">
          <div className="max-w-5xl mx-auto w-full">
            <motion.div className="text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.div className="inline-block mb-6" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Badge className="bg-green-900/50 text-green-300 border border-green-700/50 px-4 py-1.5 text-sm">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Available for opportunities
                </Badge>
              </motion.div>
              
              <GhibliTitle text="Anuraj Maddheshiya" />
              
              <motion.p className="text-xl text-slate-400 mt-4 font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                Backend Developer • AI Systems • Open Source
              </motion.p>
              
              <motion.p className="text-slate-500 max-w-xl mx-auto mt-6 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                Computer Science undergraduate focused on building real-world solutions with backend development and applied AI systems.
              </motion.p>
              
              <motion.div className="flex flex-wrap justify-center gap-3 mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <Button asChild className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-full px-6 shadow-lg shadow-green-900/30" data-cursor-hover>
                  <a href="#projects">View Projects <ArrowRight className="w-4 h-4 ml-2" /></a>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-6 border-slate-600 hover:border-green-500 hover:bg-green-900/20 text-slate-300" data-cursor-hover>
                  <a href="#contact">Get in Touch</a>
                </Button>
              </motion.div>
              
              {githubStats && (
                <motion.div className="flex flex-wrap justify-center gap-4 mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50">
                    <Github className="w-4 h-4 text-green-400" />
                    <span className="font-bold text-slate-100">{githubStats.totalRepos}</span>
                    <span className="text-slate-400 text-sm">repos</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-300" />
                    <span className="font-bold text-slate-100">{githubStats.totalStars}</span>
                    <span className="text-slate-400 text-sm">stars</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50">
                    <GitFork className="w-4 h-4 text-green-400" />
                    <span className="font-bold text-slate-100">{githubStats.totalForks}</span>
                    <span className="text-slate-400 text-sm">forks</span>
                  </div>
                  {githubUser && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="font-bold text-slate-100">{githubUser.followers}</span>
                      <span className="text-slate-400 text-sm">followers</span>
                    </div>
                  )}
                </motion.div>
              )}
              
              <motion.div className="flex justify-center items-center gap-4 mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                <a href="https://github.com/Anuraj-IND" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-green-400 hover:bg-slate-700/50 transition-all border border-slate-700/50" data-cursor-hover>
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/anuraj-maddheshiya" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-green-400 hover:bg-slate-700/50 transition-all border border-slate-700/50" data-cursor-hover>
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:anuraj.m.11.04@gmail.com" className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-green-400 hover:bg-slate-700/50 transition-all border border-slate-700/50" data-cursor-hover>
                  <Mail className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>
            
            <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown className="w-6 h-6 text-green-400/50" />
            </motion.div>
          </div>
        </section>
        
        {/* SKILLS */}
        <section id="skills" className="py-20 px-4 relative">
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Badge className="bg-green-900/50 text-green-300 border border-green-700/50 mb-4">Technical Skills</Badge>
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                My Toolkit
              </motion.h2>
            </motion.div>
            <motion.div 
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1 }
                  }}
                >
                  <GhibliSkillCard skill={skill} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* PROJECTS */}
        <section id="projects" className="py-20 px-4 relative">
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Badge className="bg-blue-900/50 text-blue-300 border border-blue-700/50 mb-4">Featured Work</Badge>
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Projects
              </motion.h2>
            </motion.div>
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.name}
                  variants={{
                    hidden: { opacity: 0, y: 50, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1 }
                  }}
                >
                  <GhibliProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* EXPERIENCE */}
        <section id="experience" className="py-20 px-4 relative">
          <div className="max-w-3xl mx-auto">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Badge className="bg-purple-900/50 text-purple-300 border border-purple-700/50 mb-4">Experience</Badge>
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                My Journey
              </motion.h2>
            </motion.div>
            <GhibliTimeline experiences={experiences} />
            
            <motion.div className="mt-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Badge className="bg-amber-900/50 text-amber-300 border border-amber-700/50 mb-4">Achievements</Badge>
              <motion.h3 
                className="text-2xl font-bold text-slate-100 mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Recognition
              </motion.h3>
              <motion.div 
                className="grid sm:grid-cols-2 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
              >
                {achievements.map((achievement, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 hover:border-green-500/30 transition-colors" 
                    whileHover={{ y: -3, scale: 1.02 }}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-900/50 to-orange-900/50 flex items-center justify-center text-amber-400">
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-100">{achievement.title}</h4>
                        <p className="text-sm text-slate-400">{achievement.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* EDUCATION */}
        <section className="py-20 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Badge className="bg-teal-900/50 text-teal-300 border border-teal-700/50 mb-4">Education</Badge>
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Academic Background
              </motion.h2>
            </motion.div>
            <motion.div 
              className="grid md:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
            >
              <motion.div 
                className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-6 border border-slate-700/50 hover:border-green-500/30 transition-colors" 
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <Badge className="bg-green-900/50 text-green-300 border border-green-700/50 mb-3">2023 - Present</Badge>
                <h3 className="text-lg font-bold text-slate-100">B.Tech in Computer Science</h3>
                <p className="text-green-400 font-medium">United College of Engineering & Research</p>
                <p className="text-slate-500 text-sm">Prayagraj, India</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-400">6.9</span>
                  <span className="text-slate-400">SGPA</span>
                </div>
              </motion.div>
              <motion.div 
                className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-colors"
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <Badge className="bg-blue-900/50 text-blue-300 border border-blue-700/50 mb-3">2021 & 2023</Badge>
                <h3 className="text-lg font-bold text-slate-100">High School & Intermediate</h3>
                <p className="text-blue-400 font-medium">Sant Atulanand Residential Academy</p>
                <p className="text-slate-500 text-sm">Varanasi, India (CBSE)</p>
                <div className="mt-3 flex items-center gap-4">
                  <div><span className="text-2xl font-bold text-green-400">91.2%</span><span className="text-slate-400 text-sm ml-1">HS</span></div>
                  <div><span className="text-2xl font-bold text-blue-400">71.6%</span><span className="text-slate-400 text-sm ml-1">Inter</span></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* CONTACT */}
        <section id="contact" className="py-20 px-4 pb-32 relative">
          <div className="max-w-2xl mx-auto">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Badge className="bg-rose-900/50 text-rose-300 border border-rose-700/50 mb-4">Get in Touch</Badge>
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Contact Me
              </motion.h2>
              <motion.p 
                className="text-slate-400 mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Have a project in mind? Let&apos;s build something beautiful together.
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GhibliContactForm />
            </motion.div>
          </div>
        </section>
        
        {/* FOOTER */}
        <footer className="py-8 px-4 bg-slate-900/80 backdrop-blur-md border-t border-slate-700/50 mt-auto">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-sm">© 2025 Anuraj Maddheshiya</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <a href="https://github.com/Anuraj-IND" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/anuraj-maddheshiya" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">LinkedIn</a>
              <a href="https://leetcode.com/anuraj-ind" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">LeetCode</a>
            </div>
            <div className="text-xs text-slate-500">
              Made with <span className="text-green-400">Next.js</span> & <span className="text-blue-400">Framer Motion</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
