interface SEOPageConfig {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  twitterImage?: string
}

export const seoConfig: Record<string, SEOPageConfig> = {
  '/': {
    title: 'TechCorp Executive Dashboard - Real-time Business Analytics',
    description: 'Premium CEO & Organizational Dashboard with Real-time Analytics, Performance Metrics, Project Management, and Business Intelligence for data-driven decision making.',
    keywords: [
      'executive dashboard',
      'CEO dashboard',
      'business analytics',
      'real-time metrics',
      'project management',
      'performance monitoring',
      'KPI tracking',
      'enterprise dashboard'
    ],
    ogImage: 'https://dashboard.techcorp.com/og-image.jpg',
    twitterImage: 'https://dashboard.techcorp.com/twitter-image.jpg'
  },
  '/analytics': {
    title: 'Analytics Dashboard - TechCorp Executive Dashboard',
    description: 'Comprehensive analytics and business intelligence insights with traffic analysis, revenue metrics, user behavior tracking, and conversion funnel optimization.',
    keywords: [
      'analytics dashboard',
      'business intelligence',
      'traffic analysis',
      'revenue metrics',
      'conversion tracking',
      'user behavior',
      'data insights',
      'web analytics'
    ],
    ogImage: 'https://dashboard.techcorp.com/og-analytics.jpg',
    twitterImage: 'https://dashboard.techcorp.com/twitter-analytics.jpg'
  },
  '/projects': {
    title: 'Projects Dashboard - TechCorp Executive Dashboard',
    description: 'Comprehensive project management dashboard with real-time project tracking, team collaboration, milestone monitoring, and resource allocation insights.',
    keywords: [
      'project management',
      'project dashboard',
      'team collaboration',
      'milestone tracking',
      'resource allocation',
      'project analytics',
      'task management',
      'project insights'
    ],
    ogImage: 'https://dashboard.techcorp.com/og-projects.jpg',
    twitterImage: 'https://dashboard.techcorp.com/twitter-projects.jpg'
  },
  '/performance': {
    title: 'Performance Dashboard - TechCorp Executive Dashboard',
    description: 'Advanced performance monitoring and optimization dashboard with real-time metrics, system health monitoring, and performance analytics.',
    keywords: [
      'performance monitoring',
      'system metrics',
      'performance analytics',
      'optimization dashboard',
      'system health',
      'performance insights',
      'monitoring tools',
      'performance tracking'
    ],
    ogImage: 'https://dashboard.techcorp.com/og-performance.jpg',
    twitterImage: 'https://dashboard.techcorp.com/twitter-performance.jpg'
  },
  '/realtime': {
    title: 'Real-time Dashboard - TechCorp Executive Dashboard',
    description: 'Live real-time data monitoring and analytics dashboard with instant updates, live metrics, and real-time business intelligence.',
    keywords: [
      'real-time dashboard',
      'live data monitoring',
      'real-time analytics',
      'live metrics',
      'instant updates',
      'real-time intelligence',
      'live dashboard',
      'real-time insights'
    ],
    ogImage: 'https://dashboard.techcorp.com/og-realtime.jpg',
    twitterImage: 'https://dashboard.techcorp.com/twitter-realtime.jpg'
  },
  '/marketing': {
    title: 'Marketing Dashboard - TechCorp Executive Dashboard',
    description: 'Advanced marketing analytics and campaign management dashboard with ROI tracking, lead generation metrics, and marketing performance insights.',
    keywords: [
      'marketing dashboard',
      'marketing analytics',
      'campaign management',
      'ROI tracking',
      'lead generation',
      'marketing metrics',
      'campaign performance',
      'marketing insights'
    ],
    ogImage: 'https://dashboard.techcorp.com/og-marketing.jpg',
    twitterImage: 'https://dashboard.techcorp.com/twitter-marketing.jpg'
  },
  '/development': {
    title: 'Development Dashboard - TechCorp Executive Dashboard',
    description: 'Development team performance and project tracking dashboard with code metrics, deployment tracking, and development analytics.',
    keywords: [
      'development dashboard',
      'developer metrics',
      'code analytics',
      'deployment tracking',
      'development performance',
      'team productivity',
      'software metrics',
      'development insights'
    ],
    ogImage: 'https://dashboard.techcorp.com/og-development.jpg',
    twitterImage: 'https://dashboard.techcorp.com/twitter-development.jpg'
  },
  '/devops': {
    title: 'DevOps Dashboard - TechCorp Executive Dashboard',
    description: 'DevOps monitoring and infrastructure management dashboard with deployment metrics, system health, and operational insights.',
    keywords: [
      'devops dashboard',
      'infrastructure monitoring',
      'deployment metrics',
      'system health',
      'operational insights',
      'devops analytics',
      'infrastructure management',
      'operational performance'
    ],
    ogImage: 'https://dashboard.techcorp.com/og-devops.jpg',
    twitterImage: 'https://dashboard.techcorp.com/twitter-devops.jpg'
  },
  '/hr': {
    title: 'HR Dashboard - TechCorp Executive Dashboard',
    description: 'Human Resources management dashboard with employee metrics, performance tracking, recruitment analytics, and workforce insights.',
    keywords: [
      'HR dashboard',
      'human resources',
      'employee metrics',
      'performance tracking',
      'recruitment analytics',
      'workforce insights',
      'HR analytics',
      'employee management'
    ],
    ogImage: 'https://dashboard.techcorp.com/og-hr.jpg',
    twitterImage: 'https://dashboard.techcorp.com/twitter-hr.jpg'
  },
  '/security': {
    title: 'Security Dashboard - TechCorp Executive Dashboard',
    description: 'Security monitoring and threat intelligence dashboard with security metrics, vulnerability tracking, and security analytics.',
    keywords: [
      'security dashboard',
      'security monitoring',
      'threat intelligence',
      'vulnerability tracking',
      'security metrics',
      'security analytics',
      'cybersecurity',
      'security insights'
    ],
    ogImage: 'https://dashboard.techcorp.com/og-security.jpg',
    twitterImage: 'https://dashboard.techcorp.com/twitter-security.jpg'
  },
  '/infrastructure': {
    title: 'Infrastructure Dashboard - TechCorp Executive Dashboard',
    description: 'Infrastructure monitoring and management dashboard with server metrics, network performance, and infrastructure analytics.',
    keywords: [
      'infrastructure dashboard',
      'infrastructure monitoring',
      'server metrics',
      'network performance',
      'infrastructure analytics',
      'system monitoring',
      'infrastructure management',
      'infrastructure insights'
    ],
    ogImage: 'https://dashboard.techcorp.com/og-infrastructure.jpg',
    twitterImage: 'https://dashboard.techcorp.com/twitter-infrastructure.jpg'
  },
  '/qa': {
    title: 'QA Dashboard - TechCorp Executive Dashboard',
    description: 'Quality Assurance dashboard with testing metrics, bug tracking, quality analytics, and testing performance insights.',
    keywords: [
      'QA dashboard',
      'quality assurance',
      'testing metrics',
      'bug tracking',
      'quality analytics',
      'testing performance',
      'quality management',
      'QA insights'
    ],
    ogImage: 'https://dashboard.techcorp.com/og-qa.jpg',
    twitterImage: 'https://dashboard.techcorp.com/twitter-qa.jpg'
  },
  '/settings': {
    title: 'Settings - TechCorp Executive Dashboard',
    description: 'Dashboard settings and configuration panel for customizing your executive dashboard experience, preferences, and user management.',
    keywords: [
      'dashboard settings',
      'configuration',
      'user preferences',
      'dashboard customization',
      'user management',
      'settings panel',
      'dashboard configuration',
      'user settings'
    ],
    ogImage: 'https://dashboard.techcorp.com/og-settings.jpg',
    twitterImage: 'https://dashboard.techcorp.com/twitter-settings.jpg'
  }
}

export function getSEOConfig(pathname: string): SEOPageConfig & { canonicalUrl: string } {
  const baseUrl = 'https://dashboard.techcorp.com'
  const config = seoConfig[pathname] || seoConfig['/']
  
  return {
    ...config,
    canonicalUrl: `${baseUrl}${pathname === '/' ? '' : pathname}`
  }
}