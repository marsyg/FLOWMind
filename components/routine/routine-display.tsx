"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Edit,
  Moon,
  MoreHorizontal,
  Pin,
  SkipForward,
  Sun,
  Sunrise,
  Sunset,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type TaskStatus = "pending" | "completed" | "skipped" | "in-progress"

interface RoutineTask {
  id: string
  title: string
  time: string
  duration: number
  priority: "high" | "medium" | "low"
  isFixed: boolean
  status: TaskStatus
}

interface TimeBlock {
  title: string
  icon: React.ReactNode
  tasks: RoutineTask[]
}

export function RoutineDisplay() {
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([
    {
      title: "Morning",
      icon: <Sunrise className="h-5 w-5 text-warning" />,
      tasks: [
        {
          id: "m1",
          title: "Morning meditation",
          time: "06:30",
          duration: 10,
          priority: "high",
          isFixed: true,
          status: "completed",
        },
        {
          id: "m2",
          title: "Breakfast",
          time: "07:00",
          duration: 20,
          priority: "medium",
          isFixed: true,
          status: "completed",
        },
        {
          id: "m3",
          title: "Check emails",
          time: "07:30",
          duration: 30,
          priority: "medium",
          isFixed: false,
          status: "in-progress",
        },
        {
          id: "m4",
          title: "Project planning",
          time: "08:15",
          duration: 45,
          priority: "high",
          isFixed: false,
          status: "pending",
        },
      ],
    },
    {
      title: "Afternoon",
      icon: <Sun className="h-5 w-5 text-warning" />,
      tasks: [
        {
          id: "a1",
          title: "Lunch break",
          time: "12:00",
          duration: 45,
          priority: "medium",
          isFixed: true,
          status: "pending",
        },
        {
          id: "a2",
          title: "Exercise",
          time: "13:00",
          duration: 30,
          priority: "high",
          isFixed: false,
          status: "pending",
        },
        {
          id: "a3",
          title: "Team meeting",
          time: "14:00",
          duration: 60,
          priority: "high",
          isFixed: true,
          status: "pending",
        },
      ],
    },
    {
      title: "Evening",
      icon: <Sunset className="h-5 w-5 text-primary" />,
      tasks: [
        {
          id: "e1",
          title: "Dinner",
          time: "18:00",
          duration: 45,
          priority: "medium",
          isFixed: true,
          status: "pending",
        },
        {
          id: "e2",
          title: "Spanish practice",
          time: "19:00",
          duration: 15,
          priority: "medium",
          isFixed: false,
          status: "pending",
        },
        {
          id: "e3",
          title: "Reading",
          time: "20:00",
          duration: 30,
          priority: "low",
          isFixed: false,
          status: "pending",
        },
      ],
    },
    {
      title: "Night",
      icon: <Moon className="h-5 w-5 text-primary" />,
      tasks: [
        {
          id: "n1",
          title: "Evening routine",
          time: "21:30",
          duration: 20,
          priority: "medium",
          isFixed: true,
          status: "pending",
        },
        {
          id: "n2",
          title: "Sleep",
          time: "22:30",
          duration: 480,
          priority: "high",
          isFixed: true,
          status: "pending",
        },
      ],
    },
  ])

  const updateTaskStatus = (blockIndex: number, taskIndex: number, status: TaskStatus) => {
    const newTimeBlocks = [...timeBlocks]
    newTimeBlocks[blockIndex].tasks[taskIndex].status = status
    setTimeBlocks(newTimeBlocks)

    const task = newTimeBlocks[blockIndex].tasks[taskIndex]

    if (status === "completed") {
      toast.success(`${task.title} completed!`, {
        description: "Great job! Keep up the good work.",
      })
    } else if (status === "skipped") {
      toast.info(`${task.title} skipped`, {
        description: "This task has been skipped for today.",
      })
    } else if (status === "in-progress") {
      toast.info(`Started: ${task.title}`, {
        description: `You're now working on this task.`,
      })
    }
  }

  const extendTaskDuration = (blockIndex: number, taskIndex: number, additionalMinutes: number) => {
    const newTimeBlocks = [...timeBlocks]
    newTimeBlocks[blockIndex].tasks[taskIndex].duration += additionalMinutes
    setTimeBlocks(newTimeBlocks)

    toast.info("Task extended", {
      description: `Added ${additionalMinutes} minutes to this task.`,
    })
  }

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "skipped":
        return <SkipForward className="h-4 w-4 text-muted-foreground" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-primary animate-pulse" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-muted-foreground/50" />
    }
  }

  const getStatusClass = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return "border-success/30 bg-success/10"
      case "skipped":
        return "border-muted-foreground/30 bg-muted/10 opacity-60"
      case "in-progress":
        return "border-primary/30 bg-primary/10"
      case "pending":
        return "border-muted"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/80 text-destructive-foreground"
      case "medium":
        return "bg-warning/80 text-warning-foreground"
      case "low":
        return "bg-secondary/80 text-secondary-foreground"
      default:
        return ""
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const blockVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const taskVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {timeBlocks.map((block, blockIndex) => (
        <motion.div key={block.title} variants={blockVariants} className="space-y-3">
          <div className="flex items-center gap-2">
            {block.icon}
            <h3 className="font-medium">{block.title}</h3>
          </div>

          <div className="space-y-3">
            {block.tasks.map((task, taskIndex) => (
              <motion.div key={task.id} variants={taskVariants}>
                <Card className={`border-2 ${getStatusClass(task.status)} transition-all duration-200 hover:shadow-md`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-sm">{task.time}</span>
                          <Separator orientation="vertical" className="h-4" />
                          <span className="text-sm text-muted-foreground">{task.duration} min</span>
                          {task.isFixed && (
                            <Badge variant="outline" className="gap-1">
                              <Pin className="h-3 w-3" /> Fixed
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {getStatusIcon(task.status)}
                          <h4
                            className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                          >
                            {task.title}
                          </h4>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => updateTaskStatus(blockIndex, taskIndex, "in-progress")}
                            disabled={task.status === "in-progress"}
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            Start task
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateTaskStatus(blockIndex, taskIndex, "completed")}
                            disabled={task.status === "completed"}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as completed
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateTaskStatus(blockIndex, taskIndex, "skipped")}
                            disabled={task.status === "skipped"}
                          >
                            <SkipForward className="mr-2 h-4 w-4" />
                            Skip task
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => extendTaskDuration(blockIndex, taskIndex, 10)}>
                            <Clock className="mr-2 h-4 w-4" />
                            Add 10 minutes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => extendTaskDuration(blockIndex, taskIndex, 30)}>
                            <Clock className="mr-2 h-4 w-4" />
                            Add 30 minutes
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit task
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

