"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar, Clock, Edit, Plus, Target, Trash } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

type Goal = {
  id: string
  title: string
  description?: string
  type: "short-term" | "long-term" | "ongoing"
  deadline?: string
  progress: number
}

export function GoalsProfile() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Complete project presentation",
      description: "Finish slides and practice delivery",
      type: "short-term",
      deadline: "2023-12-15",
      progress: 75,
    },
    {
      id: "2",
      title: "Learn Spanish",
      description: "Practice 15 minutes daily",
      type: "long-term",
      progress: 30,
    },
    {
      id: "3",
      title: "Stay hydrated",
      description: "Drink at least 2 liters of water daily",
      type: "ongoing",
      progress: 90,
    },
    {
      id: "4",
      title: "Read 12 books this year",
      description: "Focus on non-fiction and personal development",
      type: "long-term",
      deadline: "2023-12-31",
      progress: 50,
    },
  ])

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
    toast.success("Goal deleted", {
      description: "Your goal has been removed.",
    })
  }

  const getGoalsByType = (type: string) => {
    return goals.filter((goal) => goal.type === type)
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "short-term":
        return "bg-accent text-accent-foreground"
      case "long-term":
        return "bg-primary text-primary-foreground"
      case "ongoing":
        return "bg-secondary text-secondary-foreground"
      default:
        return ""
    }
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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Your Goals
        </h3>
        <Button size="sm" asChild>
          <Link href="/add-goal">
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Link>
        </Button>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="short-term">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Badge className={getBadgeColor("short-term")}>Short-term</Badge>
                <span className="text-sm text-muted-foreground">{getGoalsByType("short-term").length} goals</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {getGoalsByType("short-term").length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">No short-term goals yet</p>
                ) : (
                  getGoalsByType("short-term").map((goal) => (
                    <motion.div key={goal.id} variants={item} className="space-y-2 p-3 rounded-md bg-muted/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{goal.title}</h4>
                          {goal.description && <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>}
                          {goal.deadline && (
                            <div className="flex items-center gap-1 mt-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Due: {goal.deadline}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/edit-goal/${goal.id}`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteGoal(goal.id)}>
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="long-term">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Badge className={getBadgeColor("long-term")}>Long-term</Badge>
                <span className="text-sm text-muted-foreground">{getGoalsByType("long-term").length} goals</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {getGoalsByType("long-term").length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">No long-term goals yet</p>
                ) : (
                  getGoalsByType("long-term").map((goal) => (
                    <motion.div key={goal.id} variants={item} className="space-y-2 p-3 rounded-md bg-muted/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{goal.title}</h4>
                          {goal.description && <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>}
                          {goal.deadline && (
                            <div className="flex items-center gap-1 mt-2">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Due: {goal.deadline}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/edit-goal/${goal.id}`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteGoal(goal.id)}>
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ongoing">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Badge className={getBadgeColor("ongoing")}>Ongoing</Badge>
                <span className="text-sm text-muted-foreground">{getGoalsByType("ongoing").length} goals</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {getGoalsByType("ongoing").length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">No ongoing goals yet</p>
                ) : (
                  getGoalsByType("ongoing").map((goal) => (
                    <motion.div key={goal.id} variants={item} className="space-y-2 p-3 rounded-md bg-muted/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{goal.title}</h4>
                          {goal.description && <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/edit-goal/${goal.id}`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteGoal(goal.id)}>
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Consistency</span>
                          <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      <Button variant="outline" className="w-full" asChild>
        <Link href="/goals">
          <Edit className="mr-2 h-4 w-4" />
          Manage Goals
        </Link>
      </Button>
    </div>
  )
}

