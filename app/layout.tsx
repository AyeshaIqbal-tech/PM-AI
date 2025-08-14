import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { ErrorBoundary } from "@/components/error-boundary"
import { ToastProvider } from "@/components/ui/toast"
import { AllStructuredData } from "@/components/seo/structured-data"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TechCorp Executive Dashboard - Real-time Business Analytics",
  description: "Premium CEO & Organizational Dashboard with Real-time Analytics, Performance Metrics, Project Management, and Business Intelligence for data-driven decision making.",
  keywords: [
    "executive dashboard",
    "business analytics",
    "real-time metrics",
    "CEO dashboard",
    "project management",
    "performance monitoring",
    "business intelligence",
    "organizational analytics",
    "KPI tracking",
    "data visualization",
    "enterprise dashboard",
    "business insights"
  ],
  authors: [{ name: "TechCorp Analytics Team", url: "https://techcorp.com/team" }],
  creator: "TechCorp Analytics Team",
  publisher: "TechCorp",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dashboard.techcorp.com",
    title: "TechCorp Executive Dashboard - Real-time Business Analytics",
    description: "Premium CEO & Organizational Dashboard with Real-time Analytics, Performance Metrics, Project Management, and Business Intelligence for data-driven decision making.",
    siteName: "TechCorp Executive Dashboard",
    images: [
      {
        url: "https://dashboard.techcorp.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TechCorp Executive Dashboard - Business Analytics Interface",
        type: "image/jpeg",
      },
      {
        url: "https://dashboard.techcorp.com/og-image-square.jpg",
        width: 600,
        height: 600,
        alt: "TechCorp Dashboard Logo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechCorp Executive Dashboard - Real-time Business Analytics",
    description: "Premium CEO & Organizational Dashboard with Real-time Analytics, Performance Metrics, and Business Intelligence.",
    creator: "@TechCorpAnalytics",
    site: "@TechCorp",
    images: [
      {
        url: "https://dashboard.techcorp.com/twitter-image.jpg",
        alt: "TechCorp Executive Dashboard - Business Analytics Interface",
      },
    ],
  },
  alternates: {
    canonical: "https://dashboard.techcorp.com",
  },
  category: "Business Analytics",
  classification: "Business Software",
  other: {
    "application-name": "TechCorp Executive Dashboard",
    "msapplication-TileColor": "#3b82f6",
    "msapplication-config": "/browserconfig.xml",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TechCorp Dashboard" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body className={inter.className}>
        {/* Skip navigation links for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <a
          href="#main-navigation"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to navigation
        </a>

        <AllStructuredData />
        <ToastProvider>
          <ErrorBoundary>
            <div className="flex h-screen overflow-hidden">
              <div id="main-navigation">
                <Sidebar />
              </div>
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main 
                  id="main-content"
                  className="flex-1 overflow-y-auto bg-muted/10 p-4 sm:p-6 focus:outline-none"
                  tabIndex={-1}
                  role="main"
                  aria-label="Main content"
                >
                  <ErrorBoundary>
                    {children}
                  </ErrorBoundary>
                </main>
              </div>
            </div>
          </ErrorBoundary>
        </ToastProvider>

        {/* Live region for screen reader announcements */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          role="status"
          id="live-region"
        />
      </body>
    </html>
  )
}