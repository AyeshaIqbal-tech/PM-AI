"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Settings, 
  User, 
  Bell,
  Shield,
  Palette,
  Database,
  Globe,
  Mail,
  Key,
  Users,
  Server,
  Zap,
  Download,
  Upload,
  Trash2,
  Edit,
  Save,
  X
} from 'lucide-react'

const userSettings = {
  name: 'John Doe',
  email: 'john.doe@company.com',
  role: 'Administrator',
  department: 'Engineering',
  timezone: 'UTC-5 (EST)',
  language: 'English',
  avatar: 'JD'
}

const notificationSettings = [
  { type: 'Email Alerts', category: 'System', enabled: true, description: 'Critical system alerts and downtime notifications' },
  { type: 'Push Notifications', category: 'Performance', enabled: true, description: 'Performance threshold breaches and anomalies' },
  { type: 'Slack Integration', category: 'Team', enabled: false, description: 'Team notifications and project updates' },
  { type: 'SMS Alerts', category: 'Emergency', enabled: true, description: 'Emergency incidents and critical failures' },
  { type: 'Weekly Reports', category: 'Analytics', enabled: true, description: 'Weekly performance and analytics summaries' },
]

const securitySettings = [
  { setting: 'Two-Factor Authentication', status: 'enabled', description: 'Additional security layer for account access' },
  { setting: 'Session Timeout', value: '30 minutes', description: 'Automatic logout after inactivity' },
  { setting: 'Password Policy', status: 'enforced', description: 'Strong password requirements' },
  { setting: 'Login Notifications', status: 'enabled', description: 'Email alerts for new device logins' },
  { setting: 'API Key Management', count: 3, description: 'Active API keys for integrations' },
]

const systemSettings = [
  { category: 'Data Retention', value: '12 months', description: 'How long to keep dashboard data' },
  { category: 'Backup Frequency', value: 'Daily', description: 'Automated backup schedule' },
  { category: 'Cache Duration', value: '1 hour', description: 'Dashboard cache refresh interval' },
  { category: 'Rate Limiting', value: '1000 req/min', description: 'API request rate limits' },
  { category: 'Log Level', value: 'INFO', description: 'System logging verbosity' },
]

const integrations = [
  { name: 'Slack', status: 'connected', description: 'Team notifications and alerts', lastSync: '2 mins ago' },
  { name: 'Microsoft Teams', status: 'disconnected', description: 'Team collaboration and updates', lastSync: 'Never' },
  { name: 'PagerDuty', status: 'connected', description: 'Incident management and escalation', lastSync: '15 mins ago' },
  { name: 'Jira', status: 'connected', description: 'Issue tracking and project management', lastSync: '1 hour ago' },
  { name: 'GitHub', status: 'connected', description: 'Code repository integration', lastSync: '5 mins ago' },
  { name: 'Grafana', status: 'pending', description: 'Advanced monitoring and visualization', lastSync: 'Pending' },
]

const apiKeys = [
  { name: 'Production API', key: 'pk_prod_...7f2a', created: '2024-01-15', lastUsed: '2 hours ago', permissions: 'Read/Write' },
  { name: 'Monitoring Service', key: 'pk_mon_...3b8e', created: '2024-02-20', lastUsed: '15 mins ago', permissions: 'Read Only' },
  { name: 'Analytics Dashboard', key: 'pk_analytics_...9c4d', created: '2024-03-10', lastUsed: '1 day ago', permissions: 'Read Only' },
]

const themeSettings = {
  currentTheme: 'Light',
  accentColor: 'Blue',
  sidebarCollapsed: false,
  animations: true,
  fontSize: 'Medium'
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'connected':
    case 'enabled':
    case 'enforced': return 'bg-green-500 text-green-50'
    case 'pending': return 'bg-yellow-500 text-yellow-50'
    case 'disconnected':
    case 'disabled': return 'bg-gray-500 text-gray-50'
    default: return 'bg-blue-500 text-blue-50'
  }
}

export default function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState('profile')
  const [notifications, setNotifications] = useState(notificationSettings)
  const [isEditing, setIsEditing] = useState(false)

  const toggleNotification = (index: number) => {
    const updated = [...notifications]
    updated[index].enabled = !updated[index].enabled
    setNotifications(updated)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, preferences, and system configuration
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>Manage your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                      {userSettings.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{userSettings.name}</h3>
                      <p className="text-sm text-muted-foreground">{userSettings.role}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    <div>
                      <label className="text-sm font-medium">Email Address</label>
                      <div className="mt-1 p-3 border rounded-lg bg-muted/30">{userSettings.email}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Department</label>
                      <div className="mt-1 p-3 border rounded-lg bg-muted/30">{userSettings.department}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Timezone</label>
                      <div className="mt-1 p-3 border rounded-lg bg-muted/30">{userSettings.timezone}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Language</label>
                      <div className="mt-1 p-3 border rounded-lg bg-muted/30">{userSettings.language}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Account Statistics</h4>
                  <div className="grid gap-3">
                    <div className="p-4 rounded-lg border bg-gradient-to-r from-blue-50 to-cyan-50">
                      <div className="text-2xl font-bold text-blue-700">127</div>
                      <div className="text-sm text-blue-600">Days Active</div>
                    </div>
                    <div className="p-4 rounded-lg border bg-gradient-to-r from-green-50 to-emerald-50">
                      <div className="text-2xl font-bold text-green-700">342</div>
                      <div className="text-sm text-green-600">Dashboards Viewed</div>
                    </div>
                    <div className="p-4 rounded-lg border bg-gradient-to-r from-purple-50 to-pink-50">
                      <div className="text-2xl font-bold text-purple-700">28</div>
                      <div className="text-sm text-purple-600">Reports Generated</div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div key={notification.type} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{notification.type}</h4>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{notification.category}</Badge>
                        <Button
                          variant={notification.enabled ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleNotification(index)}
                        >
                          {notification.enabled ? 'Enabled' : 'Disabled'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3">Notification Schedule</h4>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="p-3 border rounded-lg">
                    <label className="text-sm font-medium">Quiet Hours</label>
                    <div className="text-sm text-muted-foreground">10:00 PM - 8:00 AM</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <label className="text-sm font-medium">Weekend Notifications</label>
                    <div className="text-sm text-muted-foreground">Emergency Only</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>Manage your account security and access controls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securitySettings.map((setting) => (
                    <div key={setting.setting} className="p-3 rounded-lg border">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{setting.setting}</span>
                        {setting.status && (
                          <Badge className={getStatusColor(setting.status)}>
                            {setting.status}
                          </Badge>
                        )}
                        {setting.value && (
                          <span className="text-sm font-medium">{setting.value}</span>
                        )}
                        {setting.count && (
                          <span className="text-sm font-medium">{setting.count} active</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <Key className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage API keys for external integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {apiKeys.map((api) => (
                    <div key={api.key} className="p-3 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{api.name}</span>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>Key: {api.key}</div>
                        <div>Permissions: {api.permissions}</div>
                        <div>Last used: {api.lastUsed}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Button className="w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    Generate New API Key
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>External Integrations</span>
              </CardTitle>
              <CardDescription>Connect with external services and tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {integrations.map((integration) => (
                  <div key={integration.name} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{integration.name}</h4>
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{integration.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</span>
                      <Button 
                        variant={integration.status === 'connected' ? 'outline' : 'default'} 
                        size="sm"
                      >
                        {integration.status === 'connected' ? 'Disconnect' : 
                         integration.status === 'pending' ? 'Configure' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="h-5 w-5" />
                  <span>System Configuration</span>
                </CardTitle>
                <CardDescription>Configure system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemSettings.map((setting) => (
                    <div key={setting.category} className="p-3 rounded-lg border">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{setting.category}</span>
                        <span className="text-sm font-medium">{setting.value}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Backup, export, and manage your data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border bg-gradient-to-r from-blue-50 to-cyan-50">
                    <h4 className="font-semibold mb-2">Database Status</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-muted-foreground">Size</div>
                        <div className="font-medium">2.4 GB</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Last Backup</div>
                        <div className="font-medium">2 hours ago</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-3">
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Import Data
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Database className="h-4 w-4 mr-2" />
                      Backup Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Appearance & Theme</span>
              </CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Theme</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 bg-white">
                        <div className="w-full h-16 bg-gradient-to-br from-white to-gray-100 rounded border mb-2"></div>
                        <div className="text-sm font-medium text-center">Light</div>
                      </div>
                      <div className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <div className="w-full h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded border mb-2"></div>
                        <div className="text-sm font-medium text-center">Dark</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Accent Color</label>
                    <div className="flex space-x-2">
                      {['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'].map((color) => (
                        <div key={color} className={`w-8 h-8 rounded-full ${color} cursor-pointer hover:scale-110 transition-transform`}></div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Font Size</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Small', 'Medium', 'Large'].map((size) => (
                        <Button key={size} variant={size === 'Medium' ? 'default' : 'outline'} size="sm">
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-3 block">Layout Options</label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Sidebar Collapsed</span>
                        <Button variant="outline" size="sm">
                          {themeSettings.sidebarCollapsed ? 'Enabled' : 'Disabled'}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Smooth Animations</span>
                        <Button variant="default" size="sm">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Dense Layout</span>
                        <Button variant="outline" size="sm">
                          Disabled
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Apply Changes
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}