import { Github, Mail, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/components/theme-provider";

export const Hero = () => {
  const { theme, setTheme } = useTheme();

  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center max-w-5xl mx-auto px-6 animate-fade-up relative">
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <img 
          src="https://i.ibb.co/Xb5q8JS/photo-1.jpg" 
          alt="Jakir Hossen"
          className="w-48 h-48 rounded-full object-cover border-4 border-primary"
        />
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hi 👋, I'm <span className="text-primary">Jakir Hossen</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-400 mb-4">
            Web Developer | App Developer (Learner)
          </h2>
          <p className="text-lg text-gray-400 mb-6">
            🌱 Currently learning React Native App Development
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Button className="flex items-center gap-2" asChild>
          <a href="mailto:mdjakirkhan4928@gmail.com">
            <Mail size={20} />
            Contact Me
          </a>
        </Button>
        <Button variant="outline" className="flex items-center gap-2" asChild>
          <a href="https://github.com/jakir-hossen-4928" target="_blank" rel="noopener noreferrer">
            <Github size={20} />
            GitHub
          </a>
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {["JavaScript", "React", "React Native", "Node.js", "MongoDB", "Appwrite"].map((skill) => (
          <span key={skill} className="px-4 py-2 rounded-full bg-primary/10 text-primary">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};