import { SignIn, SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/ui/themes'
import { Suspense } from 'react'

const featureList = [
  'Turn product ideas into clear design specifications',
  'Keep architecture decisions organized in one place',
  'Share live workspaces with your team',
]

const AuthForm = ({ mode }: { mode: 'sign-in' | 'sign-up' }) => {
  const isSignIn = mode === 'sign-in'
  const path = isSignIn ? '/sign-in' : '/sign-up'

  return (
    <div className="min-h-screen bg-base px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-border-default bg-surface shadow-[0_0_0_1px_rgba(255,255,255,0.02)] lg:grid-cols-[1.05fr_1.35fr]">
          <aside className="flex flex-col justify-between border-b border-border-default bg-surface p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-default bg-subtle text-sm font-semibold text-copy-primary">
                  G
                </div>
                <div>
                  <div className="text-sm font-medium uppercase tracking-[0.2em] text-copy-muted">
                    Ghost AI
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.22em] text-copy-muted">
                  {isSignIn ? 'Welcome back' : 'Start building'}
                </p>
                <h1 className="text-3xl font-semibold text-copy-primary">
                  {isSignIn ? 'Design with clarity.' : 'Bring your next idea to life.'}
                </h1>
              </div>
            </div>

            <ul className="mt-8 space-y-4 text-sm text-copy-secondary">
              {featureList.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-brand" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="flex items-center justify-center bg-base p-4 sm:p-8">
            <div className="w-full max-w-md">
              <Suspense fallback={<div className="text-center text-sm text-copy-muted">Loading...</div>}>
                {isSignIn ? (
                  <SignIn
                    path={path}
                    appearance={{ theme: dark }}
                    routing="path"
                    signUpUrl="/sign-up"
                  />
                ) : (
                  <SignUp
                    path={path}
                    appearance={{ theme: dark }}
                    routing="path"
                    signInUrl="/sign-in"
                  />
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm