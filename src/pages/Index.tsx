import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <Footer />
    </main>
  );
};

export default Index;