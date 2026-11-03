"use client";

import { useState, type ReactNode } from "react";

import { DialogPattern } from "@/components/editor/dialog-pattern";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import {
  ProjectDialogsProvider,
  useProjectDialogs,
} from "@/components/editor/use-project-dialogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditorShellProps {
  children: ReactNode;
}

function EditorShellContent({ children }: EditorShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
  } = useProjectDialogs();

  return (
    <>
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((isOpen) => !isOpen)}
      />
      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onCreateProject={openCreateDialog}
        onRenameProject={openRenameDialog}
        onDeleteProject={openDeleteDialog}
        projects={projects}
      />
      <main className="pt-12">{children}</main>
      <DialogPattern
        open={activeDialog === "create"}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
        title="Create Project"
        description="Choose a name for your new architecture workspace."
        footer={
          <>
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
          </>
        }
      >
        <label className="block space-y-2">
          <span className="text-sm font-medium text-copy-secondary">
            Project name
          </span>
          <Input
            autoFocus
            value={createName}
            onChange={(event) => setCreateName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && createName.trim() && !isSubmitting) {
                void submitCreate();
              }
            }}
            placeholder="My architecture project"
          />
        </label>
        <p className="mt-4 text-sm text-copy-muted">
          Slug preview: <span className="font-medium text-copy-primary">{createSlug}</span>
        </p>
      </DialogPattern>
      <DialogPattern
        open={activeDialog === "rename"}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
        title="Rename Project"
        description={`Current project name: ${selectedProject?.name ?? ""}`}
        footer={
          <>
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
          </>
        }
      >
        <Input
          autoFocus
          aria-label="Project name"
          value={renameName}
          onChange={(event) => setRenameName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && renameName.trim() && !isSubmitting) {
              event.preventDefault();
              void submitRename();
            }
          }}
          placeholder="Project name"
        />
      </DialogPattern>
      <DialogPattern
        open={activeDialog === "delete"}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
        title="Delete Project"
        description={`This will permanently delete "${selectedProject?.name ?? ""}". This action cannot be undone.`}
        footer={
          <>
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
          </>
        }
      >
        <p className="text-sm text-copy-secondary">
          Are you sure you want to delete this project?
        </p>
      </DialogPattern>
    </>
  );
}

export function EditorShell({ children }: EditorShellProps) {
  return (
    <ProjectDialogsProvider>
      <EditorShellContent>{children}</EditorShellContent>
    </ProjectDialogsProvider>
  );
}
