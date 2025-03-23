"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Clock, Edit, Pin, Trash } from "lucide-react"
import { useState } from "react"

const taskSchema = z.object({
  title: z.string().min(2, {
    message: "Task title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  duration: z.string().min(1, {
    message: "Duration is required",
  }),
  timeWindow: z.string(),
  priority: z.enum(["high", "medium", "low"]),
  isFixed: z.boolean().default(false),
})

type Task = z.infer<typeof taskSchema> & { id: string }

export function TaskForm() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Morning meditation",
      description: "10 minutes of mindfulness practice",
      duration: "10",
      timeWindow: "morning",
      priority: "high",
      isFixed: true,
    },
    {
      id: "2",
      title: "Check emails",
      description: "Respond to important messages",
      duration: "30",
      timeWindow: "morning",
      priority: "medium",
      isFixed: false,
    },
    {
      id: "3",
      title: "Exercise",
      description: "30 minutes of cardio or strength training",
      duration: "30",
      timeWindow: "afternoon",
      priority: "high",
      isFixed: false,
    },
  ])

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: "",
      timeWindow: "morning",
      priority: "medium",
      isFixed: false,
    },
  })

  function onSubmit(values: z.infer<typeof taskSchema>) {
    if (editingTaskId) {
      // Update existing task
      setTasks(tasks.map((task) => (task.id === editingTaskId ? { ...values, id: task.id } : task)))
      toast.success("Task updated", {
        description: "Your task has been updated successfully.",
      })
      setEditingTaskId(null)
    } else {
      // Add new task
      const newTask = {
        ...values,
        id: Math.random().toString(36).substring(2, 9),
      }
      setTasks([...tasks, newTask])
      toast.success("Task added", {
        description: "Your new task has been added successfully.",
      })
    }

    form.reset({
      title: "",
      description: "",
      duration: "",
      timeWindow: "morning",
      priority: "medium",
      isFixed: false,
    })
  }

  function editTask(task: Task) {
    form.reset({
      title: task.title,
      description: task.description || "",
      duration: task.duration,
      timeWindow: task.timeWindow,
      priority: task.priority,
      isFixed: task.isFixed,
    })
    setEditingTaskId(task.id)
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id))
    if (editingTaskId === id) {
      setEditingTaskId(null)
      form.reset({
        title: "",
        description: "",
        duration: "",
        timeWindow: "morning",
        priority: "medium",
        isFixed: false,
      })
    }
    toast.success("Task deleted", {
      description: "Your task has been removed.",
    })
  }

  const getTasksByTimeWindow = (timeWindow: string) => {
    return tasks.filter((task) => task.timeWindow === timeWindow)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/80 text-destructive-foreground hover:bg-destructive/70"
      case "medium":
        return "bg-warning/80 text-warning-foreground hover:bg-warning/70"
      case "low":
        return "bg-secondary/80 text-secondary-foreground hover:bg-secondary/70"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 border-b pb-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Title</FormLabel>
                <FormControl>
                  <Input placeholder="What do you need to do?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Add more details about your task" className="min-h-[80px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input type="number" min="1" placeholder="30" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeWindow"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Time</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time window" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="morning">Morning (6am - 12pm)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                      <SelectItem value="evening">Evening (5pm - 9pm)</SelectItem>
                      <SelectItem value="night">Night (9pm - 12am)</SelectItem>
                      <SelectItem value="anytime">Anytime</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority Level</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {["high", "medium", "low"].map((priority) => (
                      <Badge
                        key={priority}
                        variant="outline"
                        className={`cursor-pointer px-3 py-1 capitalize ${
                          field.value === priority ? getPriorityColor(priority) : ""
                        }`}
                        onClick={() => form.setValue("priority", priority as any)}
                      >
                        {priority}
                      </Badge>
                    ))}
                  </div>
                  <FormDescription>This helps us prioritize tasks in your routine</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFixed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Fixed Task</FormLabel>
                    <FormDescription>Fixed tasks cannot be rescheduled automatically</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            {editingTaskId ? "Update Task" : "Add Task"}
          </Button>
        </form>
      </Form>

      <div className="space-y-4">
        <h3 className="font-medium text-lg">Your Tasks</h3>

        <div className="space-y-6">
          {["morning", "afternoon", "evening", "night", "anytime"].map((timeWindow) => (
            <div key={timeWindow} className="space-y-3">
              <h4 className="font-medium capitalize">{timeWindow}</h4>

              {getTasksByTimeWindow(timeWindow).length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No tasks scheduled for this time window</p>
              ) : (
                <div className="space-y-2">
                  {getTasksByTimeWindow(timeWindow).map((task) => (
                    <div key={task.id} className="flex items-start justify-between p-3 rounded-md bg-muted/50">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{task.title}</h4>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                          {task.isFixed && (
                            <Badge variant="outline" className="gap-1">
                              <Pin className="h-3 w-3" /> Fixed
                            </Badge>
                          )}
                        </div>
                        {task.description && <p className="text-sm text-muted-foreground mt-1">{task.description}</p>}
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{task.duration} minutes</span>
                        </div>
                      </div>
                      <div className="flex gap-1 ml-4">
                        <Button variant="ghost" size="icon" onClick={() => editTask(task)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

