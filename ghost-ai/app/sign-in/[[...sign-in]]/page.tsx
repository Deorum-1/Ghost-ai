import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-dvh bg-base lg:grid lg:grid-cols-2">
      <section className="hidden border-r border-surface-border px-12 lg:flex lg:flex-col lg:justify-center">
        <div className="max-w-md">
          <p className="text-sm font-semibold tracking-wide text-brand">GHOST AI</p>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-copy-primary">
            Design systems together.
          </h1>
          <p className="mt-3 text-copy-secondary">
            A collaborative workspace for turning architecture ideas into clear designs.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-copy-muted">
            <li>Map services and their connections.</li>
            <li>Collaborate on a shared architecture canvas.</li>
            <li>Generate a technical specification from your design.</li>
          </ul>
        </div>
      </section>

      <section className="flex min-h-dvh items-center justify-center px-6 py-10">
        <SignIn
          path="/sign-in"
          routing="path"
          fallbackRedirectUrl="/editor"
          withSignUp={false}
        />
      </section>
    </main>
  );
}
