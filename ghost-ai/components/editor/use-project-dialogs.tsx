"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

export interface Project {
  id: string
  name: string
  slug: string
  isOwner: boolean
}

export type DialogType = "create" | "rename" | "delete" | null

interface ProjectDialogsContextValue {
  projects: Project[]
  activeDialog: DialogType
  selectedProject: Project | null
  createName: string
  renameName: string
  isSubmitting: boolean
  createSlug: string
  openCreateDialog: () => void
  openRenameDialog: (project: Project) => void
  openDeleteDialog: (project: Project) => void
  closeDialog: () => void
  setCreateName: (value: string) => void
  setRenameName: (value: string) => void
  submitCreate: () => Promise<void>
  submitRename: () => Promise<void>
  submitDelete: () => Promise<void>
}

const initialProjects: Project[] = [
  { id: "proj-1", name: "System Architecture", slug: "system-architecture", isOwner: true },
  { id: "proj-2", name: "API Gateway", slug: "api-gateway", isOwner: true },
  { id: "proj-3", name: "Payments API", slug: "payments-api", isOwner: false },
  { id: "proj-4", name: "Mobile App Shell", slug: "mobile-app-shell", isOwner: false },
]

function slugify(value: string) {
  const normalized = value.trim().normalize("NFKC").toLowerCase()
  const slug = normalized
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, "-")
    .replace(/^-+|-+$/g, "")

  if (slug) {
    return slug
  }

  return [...normalized]
    .map((character) => character.codePointAt(0)?.toString(16))
    .filter((codePoint): codePoint is string => codePoint !== undefined)
    .join("-")
}

const ProjectDialogsContext = createContext<ProjectDialogsContextValue | undefined>(undefined)

export function ProjectDialogsProvider({ children }: { children: ReactNode }) {
  const value = useProjectDialogsState()

  return <ProjectDialogsContext.Provider value={value}>{children}</ProjectDialogsContext.Provider>
}

export function useProjectDialogs() {
  const context = useContext(ProjectDialogsContext)

  if (!context) {
    throw new Error("useProjectDialogs must be used within a ProjectDialogsProvider")
  }

  return context
}

function useProjectDialogsState(): ProjectDialogsContextValue {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [activeDialog, setActiveDialog] = useState<DialogType>(null)
  const [createName, setCreateName] = useState("")
  const [renameName, setRenameName] = useState("")
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const closeDialog = useCallback(() => {
    setActiveDialog(null)
    setSelectedProjectId(null)
    setRenameName("")
    setCreateName("")
    setIsSubmitting(false)
  }, [])

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [projects, selectedProjectId]
  )

  const openCreateDialog = useCallback(() => {
    setActiveDialog("create")
    setSelectedProjectId(null)
    setCreateName("")
    setRenameName("")
  }, [])

  const openRenameDialog = useCallback((project: Project) => {
    setSelectedProjectId(project.id)
    setRenameName(project.name)
    setActiveDialog("rename")
  }, [])

  const openDeleteDialog = useCallback((project: Project) => {
    setSelectedProjectId(project.id)
    setActiveDialog("delete")
  }, [])

  const createSlug = useMemo(() => slugify(createName) || "project-name", [createName])

  const submitCreate = useCallback(async () => {
    const normalizedName = createName.trim()

    if (!normalizedName) {
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 150))

    setProjects((currentProjects) => [
      ...currentProjects,
      {
        id: `project-${Date.now()}`,
        name: normalizedName,
        slug: slugify(normalizedName),
        isOwner: true,
      },
    ])

    closeDialog()
  }, [closeDialog, createName])

  const submitRename = useCallback(async () => {
    const normalizedName = renameName.trim()

    if (!selectedProjectId || !normalizedName) {
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 150))

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === selectedProjectId
          ? {
              ...project,
              name: normalizedName,
              slug: slugify(normalizedName),
            }
          : project
      )
    )

    closeDialog()
  }, [closeDialog, renameName, selectedProjectId])

  const submitDelete = useCallback(async () => {
    if (!selectedProjectId) {
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 150))

    setProjects((currentProjects) => currentProjects.filter((project) => project.id !== selectedProjectId))
    closeDialog()
  }, [closeDialog, selectedProjectId])

  return {
    projects,
    activeDialog,
    selectedProject,
    createName,
    renameName,
    isSubmitting,
    createSlug,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    setCreateName,
    setRenameName,
    submitCreate,
    submitRename,
    submitDelete,
  }
}
