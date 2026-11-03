import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Suspense } from "react"

import { EditorHome } from "@/components/editor/editor-home"

async function EditorGate() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return <EditorHome />
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="p-6 text-copy-muted">Loading editor...</div>}>
      <EditorGate />
    </Suspense>
  )
}