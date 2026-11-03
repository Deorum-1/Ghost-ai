import { Pencil, Plus, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Project } from "@/components/editor/use-project-dialogs"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  onCreateProject: () => void
  onRenameProject: (project: Project) => void
  onDeleteProject: (project: Project) => void
  projects: Project[]
}

function ProjectList({
  projects,
  onRenameProject,
  onDeleteProject,
}: {
  projects: Project[]
  onRenameProject: (project: Project) => void
  onDeleteProject: (project: Project) => void
}) {
  if (projects.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-copy-muted">
        No projects yet
      </div>
    )
  }

  return (
    <ul className="space-y-2">
      {projects.map((project) => (
        <li
          key={project.id}
          className="group flex items-center justify-between gap-2 rounded-xl border border-border-default bg-base px-3 py-2.5"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-copy-primary">{project.name}</p>
            <p className="truncate text-xs text-copy-muted">{project.slug}</p>
          </div>
          {project.isOwner && (
            <div className="flex shrink-0 items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Rename ${project.name}`}
                onClick={() => onRenameProject(project)}
              >
                <Pencil aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Delete ${project.name}`}
                onClick={() => onDeleteProject(project)}
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export function ProjectSidebar({
  isOpen,
  onClose,
  onCreateProject,
  onRenameProject,
  onDeleteProject,
  projects,
}: ProjectSidebarProps) {
  const ownedProjects = projects.filter((project) => project.isOwner)
  const sharedProjects = projects.filter((project) => !project.isOwner)

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close project sidebar backdrop"
          className="fixed inset-0 z-30 bg-black/55 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        aria-label="Projects"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col overflow-hidden border-r border-border-default bg-surface transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border-default p-4">
          <h2 className="text-lg font-semibold text-copy-primary">Projects</h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close project sidebar"
            onClick={onClose}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>

        <Tabs defaultValue="my-projects" className="flex min-h-0 flex-1 flex-col px-4 pt-4">
          <TabsList className="grid w-full shrink-0 grid-cols-2 bg-base">
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>
          <TabsContent value="my-projects" className="min-h-0 flex-1 overflow-y-auto pt-4">
            <ProjectList
              projects={ownedProjects}
              onRenameProject={onRenameProject}
              onDeleteProject={onDeleteProject}
            />
          </TabsContent>
          <TabsContent value="shared" className="min-h-0 flex-1 overflow-y-auto pt-4">
            <ProjectList
              projects={sharedProjects}
              onRenameProject={onRenameProject}
              onDeleteProject={onDeleteProject}
            />
          </TabsContent>
        </Tabs>

        <div className="shrink-0 border-t border-border-default p-4">
          <Button type="button" className="w-full" onClick={onCreateProject}>
            <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}