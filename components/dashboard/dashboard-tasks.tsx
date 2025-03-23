"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, MoreHorizontal, SkipForward } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

type Task = {
  id: string
  title: string
  time: string
  duration: number
  priority: "high" | "medium" | "low"
  status: "pending" | "completed" | "skipped" | "in-progress"
}

export function DashboardTasks() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Morning meditation",
      time: "06:30",
      duration: 10,
      priority: "high",
      status: "completed",
    },
    {
      id: "2",
      title: "Check emails",
      time: "07:30",
      duration: 30,
      priority: "medium",
      status: "in-progress",
    },
    {
      id: "3",
      title: "Team meeting",
      time: "10:00",
      duration: 60,
      priority: "high",
      status: "pending",
    },
    {
      id: "4",
      title: "Lunch break",
      time: "12:00",
      duration: 45,
      priority: "medium",
      status: "pending",
    },
  ])

  const updateTaskStatus = (taskId: string, status: Task["status"]) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status } : task)))

    const task = tasks.find((t) => t.id === taskId)

    if (status === "completed") {
      toast.success(`${task?.title} completed!`, {
        description: "Great job! Keep up the good work.",
      })
    } else if (status === "skipped") {
      toast.info(`${task?.title} skipped`, {
        description: "This task has been skipped for today.",
      })
    } else if (status === "in-progress") {
      toast.info(`Started: ${task?.title}`, {
        description: `You're now working on this task.`,
      })
    }
  }

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "skipped":
        return <SkipForward className="h-4 w-4 text-muted-foreground" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-primary animate-pulse" />
      case "pending":
        return null
    }
  }

  const getStatusClass = (status: Task["status"]) => {
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

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-destructive/80 text-destructive-foreground"
      case "medium":
        return "bg-warning/80 text-warning-foreground"
      case "low":
        return "bg-secondary/80 text-secondary-foreground"
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
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          variants={item}
          className={`task-card flex items-center justify-between p-3 rounded-md border-2 ${getStatusClass(task.status)}`}
        >
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={() =>
                updateTaskStatus(
                  task.id,
                  task.status === "pending"
                    ? "in-progress"
                    : task.status === "in-progress"
                      ? "completed"
                      : task.status === "completed"
                        ? "pending"
                        : "pending",
                )
              }
            >
              {getStatusIcon(task.status) || (
                <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/50" />
              )}
              <span className="sr-only">Toggle status</span>
            </Button>

            <div>
              <div className="flex items-center gap-2">
                <span className={task.status === "completed" ? "line-through text-muted-foreground" : ""}>
                  {task.title}
                </span>
                <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{task.time}</span>
                <span>•</span>
                <span>{task.duration} min</span>
              </div>
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
                onClick={() => updateTaskStatus(task.id, "in-progress")}
                disabled={task.status === "in-progress"}
              >
                <Clock className="mr-2 h-4 w-4" />
                <span>Start task</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateTaskStatus(task.id, "completed")}
                disabled={task.status === "completed"}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                <span>Mark as completed</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateTaskStatus(task.id, "skipped")}
                disabled={task.status === "skipped"}
              >
                <SkipForward className="mr-2 h-4 w-4" />
                <span>Skip task</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Edit task</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      ))}
    </motion.div>
  )
}

