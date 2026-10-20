// Fallback for requests that never reach a locale (the middleware prefixes almost
// every path, so localized 404s are handled by app/[locale]/not-found.tsx).
import Link from "next/link";
import "./globals.css";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="grid min-h-dvh place-items-center p-6">
        <div className="flex flex-col items-start gap-6">
          <p className="label-mono text-muted">[ 404 ] Not found</p>
          <h1 className="text-h2">Page not found.</h1>
          <Link href="/en" className="font-semibold underline underline-offset-4">
            StarLink Components →
          </Link>
        </div>
      </body>
    </html>
  );
}
