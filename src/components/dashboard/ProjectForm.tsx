import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TechnologyInput } from "./project-form/TechnologyInput";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Please enter a valid image URL"),
  githubUrl: z.string().url("Please enter a valid GitHub URL"),
  features: z.string().min(10, "Please add at least one feature")
});

interface ProjectFormProps {
  onSubmit: (project: any) => void;
  initialData?: any;
  mode?: "add" | "edit";
}

export const ProjectForm = ({ onSubmit, initialData, mode = "add" }: ProjectFormProps) => {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    initialData?.technologies || []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      image: initialData?.image || "",
      githubUrl: initialData?.githubUrl || "",
      features: initialData?.features?.join("\n") || ""
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (selectedTechnologies.length === 0) {
      toast.error("Please add at least one technology");
      return;
    }

    const project = {
      ...values,
      technologies: selectedTechnologies,
      features: values.features.split("\n").filter(feature => feature.trim())
    };

    onSubmit(project);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="My Awesome Project" {...field} />
                </FormControl>
                <FormDescription>
                  Give your project a clear and descriptive title
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Image URL</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a URL for your project's preview image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="A brief description of your project..."
                  className="min-h-[100px] resize-y"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Explain what your project does and why it's useful
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Technologies</FormLabel>
          <TechnologyInput 
            selectedTechnologies={selectedTechnologies}
            setSelectedTechnologies={setSelectedTechnologies}
          />
        </div>

        <FormField
          control={form.control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub URL</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://github.com/username/project"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Link to your project's GitHub repository
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Features</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="- Feature 1&#10;- Feature 2&#10;- Feature 3"
                  className="min-h-[100px] resize-y"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                List the key features of your project, one per line
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {mode === "add" ? "Add Project" : "Update Project"}
        </Button>
      </form>
    </Form>
  );
};