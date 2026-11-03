"use client"

import { useState, type ReactNode } from "react"

import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import {
  ProjectDialogsProvider,
  useProjectDialogs,
} from "@/components/editor/use-project-dialogs"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface EditorShellProps {
  children: ReactNode
}

function EditorShellContent({ children }: EditorShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const {
    activeDialog,
    closeDialog,
    createName,
    createSlug,
    isSubmitting,
    openCreateDialog,
    openDeleteDialog,
    openRenameDialog,
    projects,
    renameName,
    selectedProject,
    setCreateName,
    setRenameName,
    submitCreate,
    submitDelete,
    submitRename,
  } = useProjectDialogs()

  return (
    <>
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((isOpen) => !isOpen)}
      />
      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        projects={projects}
        onCreateProject={openCreateDialog}
        onRenameProject={openRenameDialog}
        onDeleteProject={openDeleteDialog}
      />
      <main className="pt-12">{children}</main>

      {activeDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-3xl border border-border-default bg-surface p-6 shadow-2xl">
            {activeDialog === "create" && (
              <>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-copy-primary">Create Project</h2>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Close create project dialog"
                    onClick={closeDialog}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-copy-secondary">Project name</span>
                  <input
                    value={createName}
                    onChange={(event) => setCreateName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && createName.trim()) {
                        void submitCreate()
                      }
                    }}
                    autoFocus
                    className="w-full rounded-xl border border-border-default bg-base px-3 py-2.5 text-sm text-copy-primary outline-none transition focus:border-brand"
                    placeholder="My architecture project"
                  />
                </label>

                <div className="mt-4 rounded-xl border border-border-default bg-base px-3 py-2 text-sm text-copy-secondary">
                  <span className="text-copy-muted">Slug preview:</span>{" "}
                  <span className="font-medium text-copy-primary">{createSlug}</span>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={closeDialog}>
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() => void submitCreate()}
                    disabled={!createName.trim() || isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create project"}
                  </Button>
                </div>
              </>
            )}

            {activeDialog === "rename" && selectedProject && (
              <>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-copy-primary">Rename Project</h2>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Close rename project dialog"
                    onClick={closeDialog}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>

                <p className="mb-3 text-sm text-copy-secondary">
                  Current name: <span className="font-medium text-copy-primary">{selectedProject.name}</span>
                </p>

                <label className="block">
                  <span className="sr-only">Project name</span>
                  <input
                    value={renameName}
                    onChange={(event) => setRenameName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && renameName.trim()) {
                        void submitRename()
                      }
                    }}
                    autoFocus
                    className="w-full rounded-xl border border-border-default bg-base px-3 py-2.5 text-sm text-copy-primary outline-none transition focus:border-brand"
                    placeholder="Project name"
                  />
                </label>

                <div className="mt-6 flex justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={closeDialog}>
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() => void submitRename()}
                    disabled={!renameName.trim() || isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </>
            )}

            {activeDialog === "delete" && selectedProject && (
              <>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-copy-primary">Delete Project</h2>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Close delete project dialog"
                    onClick={closeDialog}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>

                <p className="text-sm leading-6 text-copy-secondary">
                  This will permanently delete <span className="font-medium text-copy-primary">{selectedProject.name}</span>.
                  This action cannot be undone.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={closeDialog}>
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => void submitDelete()}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Deleting..." : "Delete project"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export function EditorShell({ children }: EditorShellProps) {
  return (
    <ProjectDialogsProvider>
      <EditorShellContent>{children}</EditorShellContent>
    </ProjectDialogsProvider>
  )
}
