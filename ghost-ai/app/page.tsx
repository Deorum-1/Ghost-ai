import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

async function RedirectHome() {
  const { userId } = await auth()
  return redirect(userId ? '/editor' : '/sign-in')
}

export default async function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RedirectHome />
    </Suspense>
  )
}