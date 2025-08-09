"use client"

import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart3, 
  TrendingUp, 
  Users,
  DollarSign,
  MousePointer,
  Eye,
  Clock,
  Target,
  Globe,
  Smartphone,
  Monitor,
  Tablet
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

const trafficData = [
  { month: 'Jan', sessions: 12450, users: 8234, pageviews: 42150, bounceRate: 32.5 },
  { month: 'Feb', sessions: 15680, users: 10234, pageviews: 52340, bounceRate: 28.9 },
  { month: 'Mar', sessions: 18920, users: 12456, pageviews: 63280, bounceRate: 25.3 },
  { month: 'Apr', sessions: 22340, users: 14567, pageviews: 75120, bounceRate: 22.8 },
  { month: 'May', sessions: 26780, users: 17234, pageviews: 89560, bounceRate: 20.1 },
  { month: 'Jun', sessions: 31250, users: 20123, pageviews: 104230, bounceRate: 18.7 },
]

const revenueData = [
  { month: 'Jan', revenue: 125000, profit: 45000, expenses: 80000 },
  { month: 'Feb', revenue: 142000, profit: 58000, expenses: 84000 },
  { month: 'Mar', revenue: 158000, profit: 67000, expenses: 91000 },
  { month: 'Apr', revenue: 187000, profit: 82000, expenses: 105000 },
  { month: 'May', revenue: 201000, profit: 89000, expenses: 112000 },
  { month: 'Jun', revenue: 234000, profit: 108000, expenses: 126000 },
]

const deviceData = [
  { name: 'Desktop', value: 45.8, color: '#3b82f6' },
  { name: 'Mobile', value: 38.2, color: '#10b981' },
  { name: 'Tablet', value: 16.0, color: '#f59e0b' },
]

const topPages = [
  { page: '/dashboard', views: 23450, bounce: '18.5%', avgTime: '4:32' },
  { page: '/analytics', views: 18720, bounce: '22.1%', avgTime: '3:45' },
  { page: '/projects', views: 15680, bounce: '15.3%', avgTime: '5:12' },
  { page: '/reports', views: 12340, bounce: '28.7%', avgTime: '2:58' },
  { page: '/settings', views: 8920, bounce: '35.2%', avgTime: '2:15' },
]

const conversionFunnelData = [
  { stage: 'Visitors', count: 100000, percentage: 100 },
  { stage: 'Product Views', count: 45000, percentage: 45 },
  { stage: 'Add to Cart', count: 12500, percentage: 12.5 },
  { stage: 'Checkout', count: 8750, percentage: 8.75 },
  { stage: 'Purchase', count: 6250, percentage: 6.25 },
]

const geographicData = [
  { country: 'United States', sessions: 12450, percentage: 28.5 },
  { country: 'United Kingdom', sessions: 8920, percentage: 20.4 },
  { country: 'Germany', sessions: 6780, percentage: 15.5 },
  { country: 'France', sessions: 4520, percentage: 10.3 },
  { country: 'Canada', sessions: 3680, percentage: 8.4 },
  { country: 'Australia', sessions: 2890, percentage: 6.6 },
  { country: 'Others', sessions: 4560, percentage: 10.3 },
]

const userEngagementData = [
  { hour: '00', sessions: 1250 },
  { hour: '02', sessions: 890 },
  { hour: '04', sessions: 650 },
  { hour: '06', sessions: 1120 },
  { hour: '08', sessions: 2340 },
  { hour: '10', sessions: 3450 },
  { hour: '12', sessions: 4120 },
  { hour: '14', sessions: 3890 },
  { hour: '16', sessions: 4250 },
  { hour: '18', sessions: 3680 },
  { hour: '20', sessions: 2890 },
  { hour: '22', sessions: 2150 },
]

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive analytics and business intelligence insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Sessions"
          value={126420}
          change={24.5}
          changeLabel="vs last month"
          icon={Users}
          gradient="from-blue-500 to-cyan-600"
          animate
        />
        <StatsCard
          title="Revenue"
          value={1247800}
          prefix="$"
          change={18.2}
          changeLabel="monthly growth"
          icon={DollarSign}
          gradient="from-green-500 to-emerald-600"
          animate
        />
        <StatsCard
          title="Conversion Rate"
          value="6.25%"
          change={12.3}
          changeLabel="improvement"
          icon={Target}
          gradient="from-purple-500 to-pink-600"
          animate
        />
        <StatsCard
          title="Avg Session Duration"
          value="4:32"
          change={8.7}
          changeLabel="increase"
          icon={Clock}
          gradient="from-orange-500 to-red-600"
          animate
        />
      </div>

      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="traffic">Traffic Analysis</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
          <TabsTrigger value="behavior">User Behavior</TabsTrigger>
          <TabsTrigger value="conversion">Conversion Funnel</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Sessions and users over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={trafficData}>
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
                    <Bar yAxisId="left" dataKey="sessions" fill="#3b82f6" name="Sessions" />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="bounceRate" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="Bounce Rate (%)"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
                <CardDescription>Traffic breakdown by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {deviceData.map((device) => (
                    <div key={device.name} className="text-center">
                      <div className="flex justify-center mb-2">
                        {device.name === 'Desktop' && <Monitor className="h-8 w-8 text-blue-500" />}
                        {device.name === 'Mobile' && <Smartphone className="h-8 w-8 text-green-500" />}
                        {device.name === 'Tablet' && <Tablet className="h-8 w-8 text-orange-500" />}
                      </div>
                      <div className="text-2xl font-bold">{device.value}%</div>
                      <div className="text-xs text-muted-foreground">{device.name}</div>
                    </div>
                  ))}
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPages.map((page, index) => (
                    <div key={page.page} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{page.page}</div>
                          <div className="text-xs text-muted-foreground">
                            {page.views.toLocaleString()} views
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{page.bounce}</Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          {page.avgTime}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hourly Activity</CardTitle>
                <CardDescription>User activity by hour of day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={userEngagementData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="sessions"
                      stroke="#8b5cf6"
                      fill="url(#hourlyGradient)"
                    />
                    <defs>
                      <linearGradient id="hourlyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Revenue, profit, and expenses over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, '']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                    <Bar dataKey="profit" fill="#3b82f6" name="Profit" />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Metrics</CardTitle>
                <CardDescription>Key financial performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center p-6 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                    <div className="text-3xl font-bold text-green-700">$234,000</div>
                    <div className="text-sm text-green-600">Monthly Revenue</div>
                    <div className="text-xs text-green-500 mt-1">+18.2% vs last month</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg border">
                      <div className="text-xl font-bold">$108,000</div>
                      <div className="text-sm text-muted-foreground">Net Profit</div>
                      <div className="text-xs text-green-600">+24.5%</div>
                    </div>
                    <div className="text-center p-4 rounded-lg border">
                      <div className="text-xl font-bold">46.2%</div>
                      <div className="text-sm text-muted-foreground">Profit Margin</div>
                      <div className="text-xs text-blue-600">+3.2%</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Revenue Growth</span>
                      <span className="text-sm font-medium">18.2%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cost Optimization</span>
                      <span className="text-sm font-medium">15.8%</span>
                    </div>
                    <Progress value={74} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">ROI</span>
                      <span className="text-sm font-medium">285%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Sessions by country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {geographicData.map((country, index) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium">{country.country}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-sm font-medium">{country.sessions.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">{country.percentage}%</div>
                        </div>
                        <Progress value={country.percentage} className="h-2 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>Engagement metrics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border">
                    <Eye className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">4.2</div>
                    <div className="text-sm text-muted-foreground">Pages/Session</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border">
                    <MousePointer className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold">68.5%</div>
                    <div className="text-sm text-muted-foreground">Click-through Rate</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New vs Returning</span>
                    <span className="text-sm font-medium">42% / 58%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Direct Traffic</span>
                    <span className="text-sm font-medium">35.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Organic Search</span>
                    <span className="text-sm font-medium">28.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Social Media</span>
                    <span className="text-sm font-medium">18.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Marketing</span>
                    <span className="text-sm font-medium">12.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>User journey from visitor to customer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionFunnelData.map((stage, index) => (
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
                        className={`h-8 ${
                          index === 0 ? '[&>div]:bg-green-500' :
                          index === 1 ? '[&>div]:bg-blue-500' :
                          index === 2 ? '[&>div]:bg-yellow-500' :
                          index === 3 ? '[&>div]:bg-orange-500' :
                          '[&>div]:bg-red-500'
                        }`}
                      />
                      {index < conversionFunnelData.length - 1 && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-400"></div>
                        </div>
                      )}
                    </div>
                    {index > 0 && (
                      <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
                        -{((conversionFunnelData[index-1].percentage - stage.percentage)).toFixed(1)}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border">
                  <div className="text-2xl font-bold text-green-700">6.25%</div>
                  <div className="text-sm text-green-600">Overall Conversion</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border">
                  <div className="text-2xl font-bold text-blue-700">$187.50</div>
                  <div className="text-sm text-blue-600">Avg Order Value</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border">
                  <div className="text-2xl font-bold text-purple-700">71.4%</div>
                  <div className="text-sm text-purple-600">Cart Completion</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}