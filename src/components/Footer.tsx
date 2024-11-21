import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 bg-black/10 backdrop-blur-lg mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Me</h3>
            <p className="text-muted-foreground">
              Web Developer | App Developer (Learner) passionate about creating innovative solutions
              and learning new technologies.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <a href="mailto:mdjakirkhan4928@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Mail size={20} />
              mdjakirkhan4928@gmail.com
            </a>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Me</h3>
            <div className="flex gap-4">
              <a href="https://github.com/jakir-hossen-4928" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/jakir-hossen-36b26b244/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://x.com/jakir_hossen_28" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Jakir Hossen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};