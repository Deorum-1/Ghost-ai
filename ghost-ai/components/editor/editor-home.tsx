"use client"

import { Plus } from "lucide-react"

import { useProjectDialogs } from "@/components/editor/use-project-dialogs"
import { Button } from "@/components/ui/button"

function EditorHomeContent() {
  const { openCreateDialog } = useProjectDialogs()

  return (
    <section className="flex min-h-[calc(100dvh-3rem)] items-center justify-center bg-base px-6 text-center">
      <div className="max-w-xl">
        <h1 className="text-3xl font-semibold tracking-tight text-copy-primary">
          Create a project or open an existing one
        </h1>
        <p className="mt-4 text-base text-copy-muted">
          Start a new architecture workspace, or choose a project from the sidebar.
        </p>

        <div className="mt-8 flex justify-center">
          <Button type="button" onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
            New Project
          </Button>
        </div>
      </div>
    </section>
  )
}

export function EditorHome() {
  return <EditorHomeContent />
}
