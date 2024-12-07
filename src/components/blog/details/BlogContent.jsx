import { cn } from "@/lib/utils";

export const BlogContent = ({ content, coverImage }) => {
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <div className="aspect-video relative overflow-hidden rounded-lg">
        <img
          src={coverImage}
          alt="Blog cover"
          className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
        />
      </div>
      
      <div 
        className={cn(
          "prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none",
          "prose-headings:font-bold prose-headings:tracking-tight",
          "prose-p:leading-relaxed",
          "prose-a:text-primary hover:prose-a:text-primary/80",
          "prose-img:rounded-lg prose-img:shadow-md",
          "prose-video:w-full prose-video:aspect-video",
          "prose-iframe:w-full prose-iframe:aspect-video"
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
