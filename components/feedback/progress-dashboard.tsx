"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, CheckCircle, Clock, Flame, Target, TrendingUp } from "lucide-react"

export function ProgressDashboard() {
  // Sample data - in a real app, this would come from your backend
  const progressData = {
    today: {
      tasksCompleted: 8,
      tasksPlanned: 12,
      completionRate: 67,
      productiveTime: 5.5,
      totalTime: 8,
      streakDays: 3,
    },
    weekly: {
      tasksCompleted: 42,
      tasksPlanned: 60,
      completionRate: 70,
      productiveTime: 28,
      totalTime: 40,
      streakDays: 3,
    },
    monthly: {
      tasksCompleted: 180,
      tasksPlanned: 240,
      completionRate: 75,
      productiveTime: 120,
      totalTime: 160,
      streakDays: 3,
    },
  }

  const recommendations = [
    "Try scheduling more breaks between focused work sessions",
    "Your productivity peaks in the morning - consider scheduling important tasks then",
    "You tend to skip evening tasks - consider adjusting your routine",
    "Adding 10 minutes of meditation improved your focus on subsequent tasks",
  ]

  const achievements = [
    {
      title: "Early Bird",
      description: "Completed all morning tasks for 3 days in a row",
      icon: <Flame className="h-5 w-5 text-warning" />,
    },
    {
      title: "Consistency Champion",
      description: "Maintained a 70%+ completion rate for a week",
      icon: <TrendingUp className="h-5 w-5 text-primary" />,
    },
    {
      title: "Goal Getter",
      description: "Completed tasks aligned with your top priority goal",
      icon: <Target className="h-5 w-5 text-accent" />,
    },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        {Object.entries(progressData).map(([period, data]) => (
          <TabsContent key={period} value={period} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Task Completion
                  </CardTitle>
                  <CardDescription>
                    {data.tasksCompleted} of {data.tasksPlanned} tasks completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion Rate</span>
                      <span className="font-medium">{data.completionRate}%</span>
                    </div>
                    <Progress value={data.completionRate} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Productive Time
                  </CardTitle>
                  <CardDescription>
                    {data.productiveTime} of {data.totalTime} hours spent productively
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Efficiency Rate</span>
                      <span className="font-medium">{Math.round((data.productiveTime / data.totalTime) * 100)}%</span>
                    </div>
                    <Progress value={(data.productiveTime / data.totalTime) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Flame className="h-4 w-4 text-warning" />
                  Current Streak
                </CardTitle>
                <CardDescription>You've been consistent for {data.streakDays} days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1 py-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-full h-8 rounded-md flex items-center justify-center text-xs font-medium ${
                        i < data.streakDays ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i < data.streakDays && <CheckCircle className="h-4 w-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              AI Recommendations
            </CardTitle>
            <CardDescription>Based on your patterns and feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              Achievements
            </CardTitle>
            <CardDescription>Milestones you've reached</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-md bg-muted/50">
                  <div className="mt-0.5">{achievement.icon}</div>
                  <div>
                    <h4 className="font-medium text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Goal Progress
          </CardTitle>
          <CardDescription>Track progress towards your goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge className="bg-accent text-accent-foreground">Short-term</Badge>
                  <h4 className="font-medium">Complete project presentation</h4>
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary text-primary-foreground">Long-term</Badge>
                  <h4 className="font-medium">Learn Spanish</h4>
                </div>
                <span className="text-sm font-medium">30%</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge className="bg-secondary text-secondary-foreground">Ongoing</Badge>
                  <h4 className="font-medium">Stay hydrated</h4>
                </div>
                <span className="text-sm font-medium">90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

