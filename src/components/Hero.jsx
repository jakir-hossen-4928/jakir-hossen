import { Github, Mail, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { LoginModal } from "./auth/LoginModal";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TECH_BADGES = [
  {
    name: "JavaScript",
    image: "https://img.shields.io/badge/Javascript-F0DB4F?style=for-the-badge&labelColor=black&logo=javascript&logoColor=F0DB4F"
  },
  {
    name: "React",
    image: "https://img.shields.io/badge/-React-61DBFB?style=for-the-badge&labelColor=black&logo=react&logoColor=61DBFB"
  },
  {
    name: "React Native",
    image: "https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"
  },
  {
    name: "Node.js",
    image: "https://img.shields.io/badge/Node.js-3C873A?style=for-the-badge&labelColor=black&logo=node.js&logoColor=3C873A"
  },
  {
    name: "Express.js",
    image: "https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"
  },
  {
    name: "MongoDB",
    image: "https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"
  },
  {
    name: "HTML",
    image: "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"
  },
  {
    name: "CSS3",
    image: "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"
  },
  {
    name: "Tailwind CSS",
    image: "https://img.shields.io/badge/Tailwind_CSS-092749?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4&labelColor=000000"
  },
  {
    name: "Bootstrap",
    image: "https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white"
  },
  {
    name: "Appwrite",
    image: "https://img.shields.io/badge/-Appwrite-FF4F4F?style=for-the-badge&logo=appwrite&logoColor=white"
  }
];

export const Hero = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const getDashboardPath = () => {
    return isAdmin ? "/admin" : "/user";
  };

  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center max-w-5xl mx-auto px-6 animate-fade-up relative pt-32">
      <div className="absolute top-4 right-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-6 w-6" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(getDashboardPath())}>
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="outline"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Dashboard Login
          </Button>
        )}
      </div>
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <img 
          src="https://i.ibb.co/Xb5q8JS/photo-1.jpg" 
          alt="Jakir Hossen"
          className="w-48 h-48 rounded-full object-cover border-4 border-primary mt-8"
        />
        <div className="text-center md:text-left">
          <div className="mb-4">
            <img src="https://komarev.com/ghpvc/?username=jakir-hossen-4928&color=red" alt="Profile views" className="mx-auto md:mx-0"/>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hi 👋, I'm <span className="text-primary">Jakir Hossen</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-4">
            Web Developer | App Developer (Learner)
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            🌱 Currently learning React Native App Development
          </p>
          <ul className="text-muted-foreground space-y-2 mb-6">
            <li>👨‍💻 All projects available at <a href="https://github.com/jakir-hossen-4928?tab=repositories" className="text-primary hover:underline">my GitHub</a></li>
            <li>💬 Ask me about HTML5, CSS3, JS, Bootstrap, Appwrite</li>
            <li>📫 Reach me at mdjakirkhan4928@gmail.com</li>
          </ul>
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

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
        {TECH_BADGES.map((tech) => (
          <img 
            key={tech.name}
            src={tech.image}
            alt={tech.name}
            className="h-8 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          />
        ))}
      </div>
    </section>
  );
};
