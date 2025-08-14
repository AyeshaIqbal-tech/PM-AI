"use client"

import { StatsCard } from '@/components/dashboard/stats-card'
import { useSEO } from '@/hooks/use-seo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { 
  FolderOpen, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Users,
  Calendar,
  Target,
  TrendingUp,
  Plus,
  Filter,
  Search,
  MoreVertical
} from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

const projectData = [
  { month: 'Jan', completed: 12, active: 8, planned: 5 },
  { month: 'Feb', completed: 15, active: 10, planned: 7 },
  { month: 'Mar', completed: 18, active: 12, planned: 6 },
  { month: 'Apr', completed: 22, active: 14, planned: 8 },
  { month: 'May', completed: 25, active: 16, planned: 9 },
  { month: 'Jun', completed: 28, active: 18, planned: 11 },
]

const statusDistribution = [
  { name: 'Completed', value: 45, color: '#10b981' },
  { name: 'In Progress', value: 35, color: '#3b82f6' },
  { name: 'On Hold', value: 12, color: '#f59e0b' },
  { name: 'At Risk', value: 8, color: '#ef4444' },
]

const activeProjects = [
  {
    id: 'PRJ-001',
    name: 'Customer Portal Redesign',
    description: 'Complete overhaul of customer-facing portal',
    status: 'In Progress',
    priority: 'High',
    progress: 75,
    dueDate: '2024-07-15',
    budget: 85000,
    spent: 63750,
    team: ['John Doe', 'Sarah Wilson', 'Mike Chen', 'Lisa Park'],
    manager: 'Sarah Wilson',
    category: 'Frontend'
  },
  {
    id: 'PRJ-002',
    name: 'API Migration v2.0',
    description: 'Migrate all endpoints to new REST API structure',
    status: 'In Progress',
    priority: 'High',
    progress: 62,
    dueDate: '2024-07-30',
    budget: 120000,
    spent: 74400,
    team: ['David Kim', 'Alex Rodriguez', 'Emma Thompson'],
    manager: 'David Kim',
    category: 'Backend'
  },
  {
    id: 'PRJ-003',
    name: 'Mobile App Development',
    description: 'Native iOS and Android application',
    status: 'Planning',
    priority: 'Medium',
    progress: 25,
    dueDate: '2024-09-15',
    budget: 180000,
    spent: 45000,
    team: ['Maria Garcia', 'Tom Johnson', 'Steve Lee'],
    manager: 'Maria Garcia',
    category: 'Mobile'
  },
  {
    id: 'PRJ-004',
    name: 'Security Audit & Compliance',
    description: 'SOC 2 compliance and security improvements',
    status: 'At Risk',
    priority: 'Critical',
    progress: 40,
    dueDate: '2024-06-30',
    budget: 95000,
    spent: 76000,
    team: ['Robert Brown', 'Jennifer Davis'],
    manager: 'Robert Brown',
    category: 'Security'
  },
  {
    id: 'PRJ-005',
    name: 'Data Analytics Platform',
    description: 'Business intelligence and reporting system',
    status: 'In Progress',
    priority: 'Medium',
    progress: 55,
    dueDate: '2024-08-20',
    budget: 150000,
    spent: 82500,
    team: ['Chris Wilson', 'Amy Zhang', 'Daniel Taylor', 'Rachel Green'],
    manager: 'Chris Wilson',
    category: 'Analytics'
  },
]

const teamPerformance = [
  { team: 'Frontend', projects: 12, completed: 10, efficiency: 83.3 },
  { team: 'Backend', projects: 8, completed: 7, efficiency: 87.5 },
  { team: 'Mobile', projects: 6, completed: 4, efficiency: 66.7 },
  { team: 'DevOps', projects: 10, completed: 9, efficiency: 90.0 },
  { team: 'Security', projects: 4, completed: 3, efficiency: 75.0 },
]

const milestoneData = [
  { week: 'W1', planned: 8, completed: 7 },
  { week: 'W2', planned: 12, completed: 11 },
  { week: 'W3', planned: 10, completed: 9 },
  { week: 'W4', planned: 15, completed: 13 },
  { week: 'W5', planned: 14, completed: 16 },
  { week: 'W6', planned: 11, completed: 12 },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return 'bg-green-500 text-green-50'
    case 'In Progress': return 'bg-blue-500 text-blue-50'
    case 'Planning': return 'bg-purple-500 text-purple-50'
    case 'At Risk': return 'bg-red-500 text-red-50'
    case 'On Hold': return 'bg-yellow-500 text-yellow-50'
    default: return 'bg-gray-500 text-gray-50'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Critical': return 'destructive'
    case 'High': return 'destructive'
    case 'Medium': return 'default'
    case 'Low': return 'secondary'
    default: return 'outline'
  }
}

export default function ProjectsDashboard() {
  useSEO()

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Management</h1>
          <p className="text-muted-foreground">
            Track project progress, team performance, and deliverables
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Filter className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Project Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Projects"
          value={18}
          change={12.5}
          changeLabel="new this month"
          icon={FolderOpen}
          gradient="from-blue-500 to-cyan-600"
          animate
        />
        <StatsCard
          title="Completed This Month"
          value={28}
          change={16.7}
          changeLabel="vs last month"
          icon={CheckCircle}
          gradient="from-green-500 to-emerald-600"
          animate
        />
        <StatsCard
          title="On-time Delivery"
          value="87.5%"
          change={5.2}
          changeLabel="improvement"
          icon={Target}
          gradient="from-purple-500 to-pink-600"
          animate
        />
        <StatsCard
          title="Budget Utilization"
          value="73.2%"
          change={-8.1}
          changeLabel="optimization"
          icon={TrendingUp}
          gradient="from-orange-500 to-red-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
            <CardDescription>Project completion trends over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Bar dataKey="completed" fill="#10b981" name="Completed" />
                <Bar dataKey="active" fill="#3b82f6" name="Active" />
                <Bar dataKey="planned" fill="#8b5cf6" name="Planned" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
            <CardDescription>Current status of all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
          <CardDescription>Current projects and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <div key={project.id} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">{project.name}</h3>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      <Badge variant={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Due: {new Date(project.dueDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {project.team.length} members
                      </span>
                      <span>Manager: {project.manager}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <MoreVertical className="h-4 w-4 text-muted-foreground cursor-pointer" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Progress</div>
                    <div className="flex items-center space-x-2">
                      <Progress value={project.progress} className="flex-1" />
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Budget</div>
                    <div className="text-sm">
                      <span className="font-medium">${project.spent.toLocaleString()}</span>
                      <span className="text-muted-foreground"> / ${project.budget.toLocaleString()}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Category</div>
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">Team:</span>
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 4).map((member, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 border-2 border-background flex items-center justify-center text-white text-xs font-bold"
                          title={member}
                        >
                          {member.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                      {project.team.length > 4 && (
                        <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-background flex items-center justify-center text-gray-600 text-xs">
                          +{project.team.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ID: {project.id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Performance and Milestones */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Project completion efficiency by team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((team) => (
                <div key={team.team} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{team.team}</span>
                    <div className="text-right">
                      <span className="text-sm font-medium">{team.efficiency}%</span>
                      <div className="text-xs text-muted-foreground">
                        {team.completed}/{team.projects} completed
                      </div>
                    </div>
                  </div>
                  <Progress value={team.efficiency} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Milestone Tracking</CardTitle>
            <CardDescription>Weekly milestone completion vs planned</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={milestoneData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="planned" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Planned"
                  strokeDasharray="5 5"
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Completed"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resource Allocation */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Allocation Overview</CardTitle>
          <CardDescription>Budget and resource distribution across projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border">
              <div className="text-3xl font-bold text-blue-700">$630K</div>
              <div className="text-sm text-blue-600">Total Budget</div>
              <div className="text-xs text-blue-500 mt-1">Allocated across 18 projects</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border">
              <div className="text-3xl font-bold text-green-700">$461K</div>
              <div className="text-sm text-green-600">Spent</div>
              <div className="text-xs text-green-500 mt-1">73.2% utilization</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border">
              <div className="text-3xl font-bold text-purple-700">42</div>
              <div className="text-sm text-purple-600">Team Members</div>
              <div className="text-xs text-purple-500 mt-1">Across 5 teams</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border">
              <div className="text-3xl font-bold text-orange-700">156</div>
              <div className="text-sm text-orange-600">Milestones</div>
              <div className="text-xs text-orange-500 mt-1">87% completed on time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}