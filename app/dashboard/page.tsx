"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAppContext } from "@/components/providers/app-provider"
import { ArrowRight, Calendar, CheckCircle, Clock, Plus, RefreshCw, Sparkles, Target, Zap } from "lucide-react"
import Link from "next/link"
import { DashboardWelcome } from "@/components/dashboard/dashboard-welcome"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardTasks } from "@/components/dashboard/dashboard-tasks"

export default function DashboardPage() {
  const { user } = useAppContext()
  const [isLoaded, setIsLoaded] = useState(false)
  const [stats, setStats] = useState({
    tasksCompleted: 0,
    tasksTotal: 0,
    completionRate: 0,
    streak: 0,
  })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setStats({
        tasksCompleted: 18,
        tasksTotal: 25,
        completionRate: 72,
        streak: 5,
      })
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="container py-10">
      <motion.div variants={container} initial="hidden" animate={isLoaded ? "show" : "hidden"} className="space-y-8">
        <motion.div variants={item}>
          <DashboardWelcome user={user} />
        </motion.div>

        <motion.div variants={item}>
          <DashboardStats stats={stats} />
        </motion.div>

        <motion.div variants={item}>
          <Tabs defaultValue="today" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
              </TabsList>

              <Button variant="outline" size="sm" className="gap-1">
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh
              </Button>
            </div>

            <TabsContent value="today" className="mt-0">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Today's Routine
                  </CardTitle>
                  <CardDescription>Your personalized schedule for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <DashboardTasks />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/routine">View Full Routine</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/routine-modifier" className="gap-1">
                      Modify Routine <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-0">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Upcoming Tasks
                  </CardTitle>
                  <CardDescription>Tasks scheduled for the next few days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Tomorrow</h3>
                      <div className="grid gap-2">
                        {[
                          { title: "Team meeting", time: "10:00 AM", priority: "high" },
                          { title: "Project deadline", time: "05:00 PM", priority: "high" },
                          { title: "Gym session", time: "07:00 PM", priority: "medium" },
                        ].map((task, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  task.priority === "high"
                                    ? "bg-destructive/80"
                                    : task.priority === "medium"
                                      ? "bg-warning/80"
                                      : "bg-secondary/80"
                                }
                              >
                                {task.priority}
                              </Badge>
                              <span>{task.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{task.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Day After Tomorrow</h3>
                      <div className="grid gap-2">
                        {[
                          { title: "Doctor's appointment", time: "09:30 AM", priority: "high" },
                          { title: "Weekly review", time: "02:00 PM", priority: "medium" },
                        ].map((task, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  task.priority === "high"
                                    ? "bg-destructive/80"
                                    : task.priority === "medium"
                                      ? "bg-warning/80"
                                      : "bg-secondary/80"
                                }
                              >
                                {task.priority}
                              </Badge>
                              <span>{task.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{task.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full gap-1" asChild>
                    <Link href="/add-task">
                      <Plus className="h-4 w-4" /> Add New Task
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="mt-0">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Goal Progress
                  </CardTitle>
                  <CardDescription>Track your progress towards your goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
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
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/profile">Manage Goals</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Insights
              </CardTitle>
              <CardDescription>Personalized recommendations based on your patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "You're most productive in the morning - schedule important tasks then",
                  "Taking short breaks every 45 minutes improves your focus",
                  "You tend to skip evening tasks - consider adjusting your routine",
                ].map((insight, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="text-primary">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/add-task">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/routine-generator">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Generate Routine
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/feedback">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/history">
                    <Clock className="h-4 w-4 mr-2" />
                    View History
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

