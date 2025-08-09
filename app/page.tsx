"use client"

import { StatsCard } from '@/components/dashboard/stats-card'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { ProjectStatus } from '@/components/dashboard/project-status'
import { TeamPerformance } from '@/components/dashboard/team-performance'
import { ClientSatisfaction } from '@/components/dashboard/client-satisfaction'
import { DepartmentMetrics } from '@/components/dashboard/department-metrics'
import { 
  DollarSign, 
  Users, 
  FolderKanban, 
  TrendingUp,
  Target,
  Award,
  Activity,
  Briefcase
} from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time insights and comprehensive overview of your organization
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={4827500}
          change={12.5}
          changeLabel="from last month"
          icon={DollarSign}
          gradient="from-emerald-500 to-teal-600"
          prefix="$"
          animate
        />
        <StatsCard
          title="Active Projects"
          value={24}
          change={8.3}
          changeLabel="from last quarter"
          icon={FolderKanban}
          gradient="from-blue-500 to-indigo-600"
          animate
        />
        <StatsCard
          title="Team Members"
          value={142}
          change={5.2}
          changeLabel="growth this year"
          icon={Users}
          gradient="from-purple-500 to-pink-600"
          animate
        />
        <StatsCard
          title="Client Satisfaction"
          value="94.8%"
          change={2.1}
          changeLabel="improvement"
          icon={Award}
          gradient="from-amber-500 to-orange-600"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <RevenueChart />
        <ClientSatisfaction />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ProjectStatus />
        <TeamPerformance />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <DepartmentMetrics />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Profit Margin"
          value="32.4%"
          change={3.2}
          changeLabel="increase"
          icon={TrendingUp}
          gradient="from-green-500 to-emerald-600"
        />
        <StatsCard
          title="Conversion Rate"
          value="68.3%"
          change={-1.2}
          changeLabel="from last month"
          icon={Target}
          gradient="from-red-500 to-rose-600"
        />
        <StatsCard
          title="Productivity Score"
          value={87}
          change={4.5}
          changeLabel="improvement"
          icon={Activity}
          gradient="from-cyan-500 to-blue-600"
          suffix="/100"
          animate
        />
        <StatsCard
          title="Active Clients"
          value={73}
          change={12.8}
          changeLabel="new this quarter"
          icon={Briefcase}
          gradient="from-violet-500 to-purple-600"
          animate
        />
      </div>
    </div>
  )
}