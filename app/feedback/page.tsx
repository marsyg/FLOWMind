"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BarChart, MessageSquare, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { RoutineFeedback } from "@/components/feedback/routine-feedback"
import { SessionFeedback } from "@/components/feedback/session-feedback"
import { ProgressDashboard } from "@/components/feedback/progress-dashboard"

export default function FeedbackPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

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
        <motion.div variants={item} className="flex justify-between items-center">
          <Link
            href="/routine"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to routine
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold">Feedback & Progress</h1>
            <p className="text-muted-foreground">Help us improve your routine and track your progress</p>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <Tabs defaultValue="routine-feedback" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="routine-feedback">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Routine Feedback
              </TabsTrigger>
              <TabsTrigger value="session-feedback">
                <MessageSquare className="h-4 w-4 mr-2" />
                Session Feedback
              </TabsTrigger>
              <TabsTrigger value="progress">
                <BarChart className="h-4 w-4 mr-2" />
                Progress
              </TabsTrigger>
            </TabsList>

            <TabsContent value="routine-feedback">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-primary" />
                    Routine Feedback
                  </CardTitle>
                  <CardDescription>Let us know how well your routine worked for you today</CardDescription>
                </CardHeader>
                <CardContent>
                  <RoutineFeedback />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="session-feedback">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Session Feedback
                  </CardTitle>
                  <CardDescription>Provide feedback on specific tasks and sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <SessionFeedback />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    Progress Dashboard
                  </CardTitle>
                  <CardDescription>Track your accomplishments and routine adherence</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProgressDashboard />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}

