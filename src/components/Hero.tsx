import { Github, Mail } from "lucide-react";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-start max-w-5xl mx-auto px-6 animate-fade-up">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Hi, I'm <span className="text-primary">Your Name</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl">
        I'm a software developer passionate about building beautiful and functional web applications.
      </p>
      <div className="flex gap-4">
        <Button className="flex items-center gap-2">
          <Mail size={20} />
          Contact Me
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Github size={20} />
          GitHub
        </Button>
      </div>
    </section>
  );
};