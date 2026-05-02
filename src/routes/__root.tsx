import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { ChatBot } from "@/components/ChatBot";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-navy">404</h1>
        <h2 className="mt-4 font-display text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-saffron px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MyFirstVote — From Confused to Confident in 10 Minutes" },
      { name: "description", content: "Interactive learning platform for India's first-time voters. Quiz, process guide, virtual ballot, and shareable progress." },
      { name: "author", content: "MyFirstVote" },
      { property: "og:title", content: "MyFirstVote — From Confused to Confident in 10 Minutes" },
      { property: "og:description", content: "Interactive learning platform for India's first-time voters. Quiz, process guide, virtual ballot, and shareable progress." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MyFirstVote — From Confused to Confident in 10 Minutes" },
      { name: "twitter:description", content: "Interactive learning platform for India's first-time voters. Quiz, process guide, virtual ballot, and shareable progress." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/QCBmYFcPivOrLJVrhaqu0XTWXBH3/social-images/social-1777719712369-ChatGPT_Image_May_2,_2026,_04_31_09_PM.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/QCBmYFcPivOrLJVrhaqu0XTWXBH3/social-images/social-1777719712369-ChatGPT_Image_May_2,_2026,_04_31_09_PM.webp" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <ChatBot />
    </>
  );
}
