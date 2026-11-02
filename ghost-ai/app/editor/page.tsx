import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

async function EditorGate() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <section className="flex min-h-[calc(100dvh-3rem)] items-center justify-center bg-base px-6 text-center">
      <div className="max-w-md">
        <h1 className="text-2xl font-semibold text-copy-primary">
          Welcome to Ghost AI
        </h1>
        <p className="mt-3 text-copy-muted">
          Your architecture workspace will appear here.
        </p>
      </div>
    </section>
  )
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditorGate />
    </Suspense>
  )
}