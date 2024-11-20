import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run//cloudflare";

import Header from "~/components/Header";

import "./tailwind.css";

export const links: LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    as: "style",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const error = useRouteError();

  return (
    <html lang="tr" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta
          content="width=device-width, initial-scale=1, viewport-fit=cover"
          name="viewport"
        />

        {process.env.NODE_ENV === "production" && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=G-8WWHJQF7LJ`}
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8WWHJQF7LJ', {
            page_path: window.location.pathname,
            });
        `,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `     (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "p14r71tw8k");`,
              }}
            ></script>
          </>
        )}
        <Meta />
        <Links />
      </head>
      <body
        style={{ paddingTop: "80px" }}
        className="relative min-h-screen flex flex-col"
      >
        <Header />
        {isRouteErrorResponse(error)
          ? `${error.status} ${error.statusText}`
          : error instanceof Error
          ? error.message
          : null}
        <main className="flex-grow">
          <div className="max-w-screen-xl mx-auto px-6">{children}</div>
        </main>

        <footer className="mt-auto bg-primary/5 border-t">
          <div className="max-w-screen-xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">Para Birikim</h3>
                <p className="text-sm text-muted-foreground">
                  Güncel döviz kurları, altın fiyatları ve borsa verilerini
                  takip edebileceğiniz finansal bilgi platformu.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Hızlı Erişim</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="/"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Ana Sayfa
                    </a>
                  </li>
                  <li>
                    <a
                      href="/doviz/usd"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Döviz Kurları
                    </a>
                  </li>
                  <li>
                    <a
                      href="/altin"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Altın Fiyatları
                    </a>
                  </li>
                  <li>
                    <a
                      href="/borsa"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Borsa Verileri
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">İletişim</h3>
                <ul className="space-y-2 text-sm">
                  <li className="text-muted-foreground">
                    Email: info@parabirik.im
                  </li>
                  <li className="text-muted-foreground">
                    Twitter: @parabirikim
                  </li>
                  <li className="text-muted-foreground">
                    Instagram: @parabirikim
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              <p>
                &copy; {new Date().getFullYear()} Para Birikim. Tüm hakları
                saklıdır.
              </p>
            </div>
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
