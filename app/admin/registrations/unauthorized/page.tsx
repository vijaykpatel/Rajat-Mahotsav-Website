import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-semibold text-preset-charcoal mb-2">
        Access denied
      </h1>
      <p className="text-preset-bluish-gray mb-6 text-center max-w-md">
        Admin access is restricted to @nj.sgadi.us accounts. You will be
        redirected to the home page.
      </p>
      <Link
        href="/"
        className="rounded-full px-6 py-3 font-semibold bg-preset-deep-navy text-white hover:opacity-90 transition-opacity"
      >
        Return home
      </Link>
    </div>
  )
}
