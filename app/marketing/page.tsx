"use client"

import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Users, 
  Mail,
  MousePointer,
  DollarSign,
  Target,
  Eye,
  Share,
  Heart,
  MessageCircle,
  BarChart3,
  Globe
} from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  ComposedChart
} from 'recharts'

const campaignPerformance = [
  { month: 'Jan', leads: 1250, conversions: 187, spend: 15000, roas: 3.2 },
  { month: 'Feb', leads: 1480, conversions: 234, spend: 18000, roas: 3.8 },
  { month: 'Mar', leads: 1680, conversions: 289, spend: 21000, roas: 4.1 },
  { month: 'Apr', leads: 1920, conversions: 342, spend: 24000, roas: 4.5 },
  { month: 'May', leads: 2150, conversions: 398, spend: 27000, roas: 4.8 },
  { month: 'Jun', leads: 2380, conversions: 456, spend: 30000, roas: 5.2 },
]

const channelPerformance = [
  { channel: 'Google Ads', impressions: 2450000, clicks: 48500, ctr: 1.98, cost: 12000, conversions: 234 },
  { channel: 'Facebook Ads', impressions: 1890000, clicks: 35670, ctr: 1.89, cost: 8500, conversions: 189 },
  { channel: 'LinkedIn Ads', impressions: 890000, clicks: 15680, ctr: 1.76, cost: 6500, conversions: 98 },
  { channel: 'Instagram', impressions: 1560000, clicks: 28900, ctr: 1.85, cost: 5800, conversions: 145 },
  { channel: 'Email Marketing', impressions: 450000, clicks: 22500, ctr: 5.0, cost: 1200, conversions: 178 },
]

const socialMediaMetrics = [
  { platform: 'Facebook', followers: 125800, engagement: 4.2, reach: 89500, posts: 45 },
  { platform: 'Instagram', followers: 89200, engagement: 6.8, reach: 156800, posts: 52 },
  { platform: 'LinkedIn', followers: 34500, engagement: 3.1, reach: 45600, posts: 28 },
  { platform: 'Twitter', followers: 67800, engagement: 2.9, reach: 78900, posts: 38 },
]

const emailCampaigns = [
  { campaign: 'Weekly Newsletter', sent: 25800, opened: 6708, clicked: 872, bounced: 129, unsubscribed: 15 },
  { campaign: 'Product Launch', sent: 18500, opened: 5550, clicked: 1295, bounced: 74, unsubscribed: 8 },
  { campaign: 'Holiday Promotion', sent: 32000, opened: 9280, clicked: 1856, bounced: 160, unsubscribed: 24 },
  { campaign: 'Customer Survey', sent: 15600, opened: 4680, clicked: 936, bounced: 78, unsubscribed: 12 },
]

const audienceSegments = [
  { segment: 'New Visitors', size: 45200, conversion: 2.3, value: 125 },
  { segment: 'Returning Users', size: 28900, conversion: 8.7, value: 340 },
  { segment: 'Premium Customers', size: 12800, conversion: 15.2, value: 850 },
  { segment: 'Enterprise Leads', size: 3400, conversion: 28.5, value: 2150 },
]

const contentPerformance = [
  { type: 'Blog Posts', pieces: 24, views: 156800, shares: 2340, engagement: 4.2 },
  { type: 'Video Content', pieces: 12, views: 89500, shares: 4560, engagement: 8.7 },
  { type: 'Infographics', pieces: 8, views: 45600, shares: 1890, engagement: 6.1 },
  { type: 'Case Studies', pieces: 6, views: 23400, shares: 890, engagement: 12.5 },
]

const marketingFunnel = [
  { stage: 'Awareness', count: 100000, percentage: 100 },
  { stage: 'Interest', count: 35000, percentage: 35 },
  { stage: 'Consideration', count: 12500, percentage: 12.5 },
  { stage: 'Intent', count: 6250, percentage: 6.25 },
  { stage: 'Purchase', count: 2890, percentage: 2.89 },
  { stage: 'Retention', count: 2312, percentage: 2.31 },
]

const brandMentions = [
  { week: 'W1', mentions: 234, sentiment: 78 },
  { week: 'W2', mentions: 289, sentiment: 82 },
  { week: 'W3', mentions: 312, sentiment: 75 },
  { week: 'W4', mentions: 356, sentiment: 88 },
  { week: 'W5', mentions: 298, sentiment: 85 },
  { week: 'W6', mentions: 378, sentiment: 91 },
]

const getChannelColor = (index: number) => {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444']
  return colors[index % colors.length]
}

export default function MarketingDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Marketing Dashboard</h1>
        <p className="text-muted-foreground">
          Campaign performance, audience insights, and marketing ROI analytics
        </p>
      </div>

      {/* Marketing Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Marketing ROI"
          value="4.8x"
          change={18.2}
          changeLabel="improvement"
          icon={TrendingUp}
          gradient="from-green-500 to-emerald-600"
          animate
        />
        <StatsCard
          title="Lead Generation"
          value={2380}
          change={24.5}
          changeLabel="this month"
          icon={Users}
          gradient="from-blue-500 to-cyan-600"
          animate
        />
        <StatsCard
          title="Conversion Rate"
          value="3.85%"
          change={12.3}
          changeLabel="increase"
          icon={Target}
          gradient="from-purple-500 to-pink-600"
          animate
        />
        <StatsCard
          title="Cost per Lead"
          value={45}
          prefix="$"
          change={-15.8}
          changeLabel="reduction"
          icon={DollarSign}
          gradient="from-orange-500 to-red-600"
        />
      </div>

      {/* Campaign Performance and Channel Analysis */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance Trends</CardTitle>
            <CardDescription>Lead generation and conversion metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={campaignPerformance}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="leads" fill="#3b82f6" name="Leads" />
                <Bar yAxisId="left" dataKey="conversions" fill="#10b981" name="Conversions" />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="roas" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="ROAS"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
            <CardDescription>Marketing channel effectiveness and ROI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {channelPerformance.map((channel, index) => (
                <div key={channel.channel} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getChannelColor(index) }}
                      />
                      <span className="font-medium">{channel.channel}</span>
                    </div>
                    <Badge variant="outline">{channel.ctr}% CTR</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">Impressions</div>
                      <div className="font-medium">{(channel.impressions / 1000000).toFixed(1)}M</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Clicks</div>
                      <div className="font-medium">{channel.clicks.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Conversions</div>
                      <div className="font-medium">{channel.conversions}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social Media and Email Performance */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Social Media Performance</CardTitle>
            <CardDescription>Engagement and reach across social platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {socialMediaMetrics.map((platform, index) => (
                <div key={platform.platform} className="p-3 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                        {platform.platform[0]}
                      </div>
                      <span className="font-medium">{platform.platform}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{platform.engagement}%</div>
                      <div className="text-xs text-muted-foreground">Engagement</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">Followers</div>
                      <div className="font-medium">{(platform.followers / 1000).toFixed(0)}K</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Reach</div>
                      <div className="font-medium">{(platform.reach / 1000).toFixed(0)}K</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Posts</div>
                      <div className="font-medium">{platform.posts}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Campaign Performance</CardTitle>
            <CardDescription>Recent email marketing campaign results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emailCampaigns.map((campaign) => (
                <div key={campaign.campaign} className="p-3 rounded-lg border">
                  <div className="font-medium mb-2">{campaign.campaign}</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sent:</span>
                        <span className="font-medium">{campaign.sent.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Opened:</span>
                        <span className="font-medium text-green-600">
                          {((campaign.opened / campaign.sent) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Clicked:</span>
                        <span className="font-medium text-blue-600">
                          {((campaign.clicked / campaign.sent) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bounce:</span>
                        <span className="font-medium text-red-600">
                          {((campaign.bounced / campaign.sent) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Marketing Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Marketing Funnel Analysis</CardTitle>
          <CardDescription>Customer journey from awareness to retention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {marketingFunnel.map((stage, index) => (
                <div key={stage.stage} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{stage.stage}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold">{stage.count.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        ({stage.percentage}%)
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={stage.percentage} 
                      className={`h-6 ${
                        index === 0 ? '[&>div]:bg-blue-500' :
                        index === 1 ? '[&>div]:bg-cyan-500' :
                        index === 2 ? '[&>div]:bg-green-500' :
                        index === 3 ? '[&>div]:bg-yellow-500' :
                        index === 4 ? '[&>div]:bg-orange-500' :
                        '[&>div]:bg-purple-500'
                      }`}
                    />
                    {index < marketingFunnel.length - 1 && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-400"></div>
                      </div>
                    )}
                  </div>
                  {index > 0 && (
                    <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-xs text-red-600">
                      -{((marketingFunnel[index-1].percentage - stage.percentage)).toFixed(1)}%
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border">
                <div className="text-2xl font-bold text-green-700">2.89%</div>
                <div className="text-sm text-green-600">Overall Conversion</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border">
                <div className="text-2xl font-bold text-blue-700">80%</div>
                <div className="text-sm text-blue-600">Customer Retention</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border">
                <div className="text-2xl font-bold text-purple-700">$342</div>
                <div className="text-sm text-purple-600">Avg Customer LTV</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border">
                <div className="text-2xl font-bold text-orange-700">4.2 days</div>
                <div className="text-sm text-orange-600">Avg Sales Cycle</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audience Segments and Content Performance */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Audience Segments</CardTitle>
            <CardDescription>Customer segmentation and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {audienceSegments.map((segment, index) => (
                <div key={segment.segment} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{segment.segment}</span>
                    <div className="text-right">
                      <div className="text-sm font-medium">{segment.conversion}%</div>
                      <div className="text-xs text-muted-foreground">Conversion</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {segment.size.toLocaleString()} users
                    </span>
                    <span className="font-medium">${segment.value} LTV</span>
                  </div>
                  <Progress value={(segment.conversion / 30) * 100} className="h-2 mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Performance</CardTitle>
            <CardDescription>Content marketing effectiveness by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentPerformance.map((content) => (
                <div key={content.type} className="p-3 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{content.type}</span>
                    <Badge variant="outline">{content.engagement}% engagement</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">Pieces</div>
                      <div className="font-medium">{content.pieces}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Views</div>
                      <div className="font-medium">{(content.views / 1000).toFixed(0)}K</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Shares</div>
                      <div className="font-medium">{content.shares.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Brand Mentions and Marketing Insights */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Brand Mentions & Sentiment</CardTitle>
            <CardDescription>Social media mentions and sentiment analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart data={brandMentions}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="week" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="mentions" fill="#3b82f6" name="Mentions" />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="sentiment" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Sentiment %"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Marketing Insights</CardTitle>
            <CardDescription>Key performance indicators and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border">
                <Eye className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-blue-700">8.2M</div>
                <div className="text-sm text-blue-600">Total Impressions</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border">
                <MousePointer className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-700">2.1%</div>
                <div className="text-sm text-green-600">Avg Click-through Rate</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border">
                <Share className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-purple-700">12.8K</div>
                <div className="text-sm text-purple-600">Social Shares</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border">
                <Heart className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-orange-700">87%</div>
                <div className="text-sm text-orange-600">Brand Sentiment</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}