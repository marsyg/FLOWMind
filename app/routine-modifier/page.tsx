"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Edit, Plus, Save, Trash } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

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
  tasks: RoutineTask[]
}

export default function RoutineModifierPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([
    {
      title: "Morning",
      tasks: [
        {
          id: "m1",
          title: "Morning meditation",
          time: "06:30",
          duration: 10,
          priority: "high",
          isFixed: true,
          status: "pending",
        },
        {
          id: "m2",
          title: "Breakfast",
          time: "07:00",
          duration: 20,
          priority: "medium",
          isFixed: true,
          status: "pending",
        },
        {
          id: "m3",
          title: "Check emails",
          time: "07:30",
          duration: 30,
          priority: "medium",
          isFixed: false,
          status: "pending",
        },
      ],
    },
    {
      title: "Afternoon",
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
      ],
    },
    {
      title: "Evening",
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
          title: "Reading",
          time: "20:00",
          duration: 30,
          priority: "low",
          isFixed: false,
          status: "pending",
        },
      ],
    },
  ])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const [editForm, setEditForm] = useState<{
    title: string
    time: string
    duration: string
    priority: "high" | "medium" | "low"
    isFixed: boolean
  }>({
    title: "",
    time: "",
    duration: "",
    priority: "medium",
    isFixed: false,
  })

  const startEditing = (blockIndex: number, taskIndex: number) => {
    const task = timeBlocks[blockIndex].tasks[taskIndex]
    setEditForm({
      title: task.title,
      time: task.time,
      duration: task.duration.toString(),
      priority: task.priority,
      isFixed: task.isFixed,
    })
    setIsEditing(`${blockIndex}-${taskIndex}`)
  }

  const cancelEditing = () => {
    setIsEditing(null)
  }

  const saveEditing = () => {
    if (!isEditing) return

    const [blockIndex, taskIndex] = isEditing.split("-").map(Number)
    const newTimeBlocks = [...timeBlocks]

    newTimeBlocks[blockIndex].tasks[taskIndex] = {
      ...newTimeBlocks[blockIndex].tasks[taskIndex],
      title: editForm.title,
      time: editForm.time,
      duration: Number.parseInt(editForm.duration),
      priority: editForm.priority,
      isFixed: editForm.isFixed,
    }

    setTimeBlocks(newTimeBlocks)
    setIsEditing(null)

    toast.success("Task updated", {
      description: "Your task has been updated successfully.",
    })
  }

  const deleteTask = (blockIndex: number, taskIndex: number) => {
    const newTimeBlocks = [...timeBlocks]
    newTimeBlocks[blockIndex].tasks.splice(taskIndex, 1)
    setTimeBlocks(newTimeBlocks)

    toast.success("Task deleted", {
      description: "Your task has been removed from the routine.",
    })
  }

  const saveRoutine = () => {
    toast.success("Routine saved", {
      description: "Your modified routine has been saved successfully.",
    })

    setTimeout(() => {
      router.push("/routine")
    }, 1500)
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
            <h1 className="text-3xl font-bold">Modify Routine</h1>
            <p className="text-muted-foreground">Adjust your routine by editing, adding, or removing tasks</p>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Today's Routine
              </CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {timeBlocks.map((block, blockIndex) => (
                <div key={block.title} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg">{block.title}</h3>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link href={`/add-task?timeWindow=${block.title.toLowerCase()}`}>
                        <Plus className="h-4 w-4" />
                        Add Task
                      </Link>
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {block.tasks.map((task, taskIndex) => {
                      const isEditingThis = isEditing === `${blockIndex}-${taskIndex}`

                      return (
                        <Card key={task.id} className="border-2 border-muted">
                          <CardContent className="p-4">
                            {isEditingThis ? (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium mb-1 block">Title</label>
                                    <Input
                                      value={editForm.title}
                                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium mb-1 block">Time</label>
                                    <Input
                                      type="time"
                                      value={editForm.time}
                                      onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium mb-1 block">Duration (minutes)</label>
                                    <Input
                                      type="number"
                                      min="1"
                                      value={editForm.duration}
                                      onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium mb-1 block">Priority</label>
                                    <Select
                                      value={editForm.priority}
                                      onValueChange={(value: "high" | "medium" | "low") =>
                                        setEditForm({ ...editForm, priority: value })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                  <Switch
                                    checked={editForm.isFixed}
                                    onCheckedChange={(checked) => setEditForm({ ...editForm, isFixed: checked })}
                                  />
                                  <label className="text-sm font-medium">Fixed task (cannot be rescheduled)</label>
                                </div>

                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" size="sm" onClick={cancelEditing}>
                                    Cancel
                                  </Button>
                                  <Button size="sm" onClick={saveEditing}>
                                    Save Changes
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="font-medium text-sm">{task.time}</span>
                                    <Separator orientation="vertical" className="h-4" />
                                    <span className="text-sm text-muted-foreground">{task.duration} min</span>
                                    {task.isFixed && (
                                      <Badge variant="outline" className="text-xs">
                                        Fixed
                                      </Badge>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium">{task.title}</h4>
                                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                  </div>
                                </div>

                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => startEditing(blockIndex, taskIndex)}
                                  >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => deleteTask(blockIndex, taskIndex)}>
                                    <Trash className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )
                    })}

                    {block.tasks.length === 0 && (
                      <div className="text-center py-6 text-muted-foreground">
                        <p>No tasks in this time block</p>
                        <Button variant="outline" size="sm" className="mt-2 gap-1" asChild>
                          <Link href={`/add-task?timeWindow=${block.title.toLowerCase()}`}>
                            <Plus className="h-4 w-4" />
                            Add Task
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" asChild>
                  <Link href="/routine">Cancel</Link>
                </Button>
                <Button onClick={saveRoutine} className="gap-1">
                  <Save className="h-4 w-4" />
                  Save Routine
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

