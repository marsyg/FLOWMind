"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, Clock, Coffee, RefreshCw, Settings } from "lucide-react"
import Link from "next/link"
import { RoutineDisplay } from "@/components/routine/routine-display"
import { RoutineSettings } from "@/components/routine/routine-settings"
import { toast } from "sonner"

export default function RoutinePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleRegenerateRoutine = () => {
    toast.info("Regenerating routine", {
      description: "Please wait while we create a new routine for you.",
    })

    // Simulate regeneration
    setTimeout(() => {
      toast.success("Routine regenerated", {
        description: "Your new routine is ready!",
      })
    }, 1500)
  }

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
            href="/dashboard"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to dashboard
          </Link>

          <Button variant="outline" size="sm" onClick={handleRegenerateRoutine} className="gap-1">
            <RefreshCw className="h-4 w-4" />
            Regenerate
          </Button>
        </motion.div>

        <motion.div variants={item}>
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold">Today's Routine</h1>
            <p className="text-muted-foreground">
              Your personalized schedule for{" "}
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <Tabs defaultValue="routine" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="routine">Routine</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="routine">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Daily Schedule
                  </CardTitle>
                  <CardDescription>Drag and drop tasks to adjust your schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-6">
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => {
                        toast("Still working on previous task", {
                          description: "We'll adjust your schedule accordingly.",
                          action: {
                            label: "Undo",
                            onClick: () => toast.info("Schedule restored"),
                          },
                        })
                      }}
                    >
                      <Coffee className="h-4 w-4" />
                      I'm still doing previous task
                    </Button>
                  </div>

                  <RoutineDisplay />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Routine Settings
                  </CardTitle>
                  <CardDescription>Customize how your routine is generated</CardDescription>
                </CardHeader>
                <CardContent>
                  <RoutineSettings />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div variants={item} className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>

          <Button asChild>
            <Link href="/feedback" className="gap-1">
              Provide Feedback <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

