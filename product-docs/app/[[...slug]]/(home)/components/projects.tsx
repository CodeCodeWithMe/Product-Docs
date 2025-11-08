import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  url: string;
}

const ProjectCard = ({ title, description, url }: ProjectCardProps) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-accent transition-all hover:border-primary/50">
      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>

        {/* Technologies */}
        {/* <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-full">
              {tech}
            </Badge>
          ))}
        </div> */}

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          {url.length > 0 ? (
            <Button className="rounded-full shadow-none" asChild>
              <a href={url} target="_blank" rel="noopener noreferrer">
                Documentation
              </a>
            </Button>
          ) : (
            <Button
              className="rounded-full shadow-none"
              variant="secondary"
              disabled
            >
              Coming Soon
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = React.useState<ProjectCardProps[]>([]);

  useEffect(() => {
    const run = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const hasIdParam = urlParams.has("id");

      try {
        const resp = await fetch(`/data.json?t=${Date.now()}`);
        const data = ((await resp.json()) as ProjectCardProps[]) ?? [];

        // sort
        const sortData = data.sort((a, b) => a.title.localeCompare(b.title));

        setProjects(sortData);

        if (hasIdParam) {
          const productUrl = data.find(
            (item) => item.id === urlParams.get("id")
          )?.url;

          if (productUrl) {
            window.open(productUrl, "_self");
          }
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    run().catch(console.error);
  }, []);

  return (
    <>
      {projects.length > 0 && (
        <section id="projects" className="relative py-20 px-6">
          <div className="max-w-screen-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Product
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Our Products
              </h2>
              <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
                Explore our diverse range of products designed to meet your
                needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Projects;
