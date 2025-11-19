import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Image, FileText, Users, TrendingUp, Star } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { title: "Total Services", value: "5", icon: Briefcase, color: "text-primary" },
    { title: "Portfolio Items", value: "5", icon: Image, color: "text-accent" },
    { title: "Blog Posts", value: "5", icon: FileText, color: "text-success" },
    { title: "Team Members", value: "5", icon: Users, color: "text-warning" },
  ];

  const recentActivity = [
    { action: "New blog post published", time: "2 hours ago", icon: FileText },
    { action: "Portfolio item added", time: "5 hours ago", icon: Image },
    { action: "Team member updated", time: "1 day ago", icon: Users },
    { action: "Service activated", time: "2 days ago", icon: Briefcase },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-aos="fade-up">
        {stats.map((stat, index) => (
          <Card key={stat.title} data-aos="fade-up" data-aos-delay={index * 100}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-sm text-success mt-1">
                <TrendingUp className="w-4 h-4" />
                <span>+12% from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card data-aos="fade-right">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <activity.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card data-aos="fade-left">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Projects</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Featured Items</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Published Posts</span>
                <span className="font-semibold">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg. Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="font-semibold">4.9</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
