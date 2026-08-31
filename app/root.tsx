import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { SITE } from "./config";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,700;1,9..144,600&family=Inter:wght@400;500;600&display=swap",
  },
  {
    rel: "icon",
    href: `${import.meta.env.BASE_URL}logowebico.png`,
    type: "image/png",
  },
];

export function meta({}: Route.MetaArgs) {
  const tags: Route.MetaDescriptors = [
    { title: SITE.name },
    { name: "description", content: SITE.tagline },
  ];
  if (SITE.noindex) {
    tags.push({ name: "robots", content: "noindex, nofollow" });
  }
  return tags;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <div className="hydrate-fallback shelf-shell">
      <p className="font-display text-4xl italic">{SITE.name}</p>
      <p className="text-sm text-[#b8a890]">opening the shelf…</p>
    </div>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "that page wandered off the shelf."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="shelf-shell grid min-h-dvh place-items-center p-8 text-center">
      <div>
        <h1 className="font-display text-4xl italic">{message}</h1>
        <p className="mt-3 text-[#b8a890]">{details}</p>
        {stack && (
          <pre className="mt-6 max-w-xl overflow-x-auto p-4 text-left text-xs">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
