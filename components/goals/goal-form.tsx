"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Edit, Trash } from "lucide-react"
import { useState } from "react"

const goalSchema = z.object({
  title: z.string().min(2, {
    message: "Goal title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  type: z.enum(["short-term", "long-term", "ongoing"]),
  deadline: z.string().optional(),
})

type Goal = z.infer<typeof goalSchema> & { id: string }

export function GoalForm() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Complete project presentation",
      description: "Finish slides and practice delivery",
      type: "short-term",
      deadline: "2023-12-15",
    },
    {
      id: "2",
      title: "Learn Spanish",
      description: "Practice 15 minutes daily",
      type: "long-term",
      deadline: "",
    },
    {
      id: "3",
      title: "Stay hydrated",
      description: "Drink at least 2 liters of water daily",
      type: "ongoing",
      deadline: "",
    },
  ])

  const [editingGoalId, setEditingGoalId] = useState<string | null>(null)

  const form = useForm<z.infer<typeof goalSchema>>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "short-term",
      deadline: "",
    },
  })

  function onSubmit(values: z.infer<typeof goalSchema>) {
    if (editingGoalId) {
      // Update existing goal
      setGoals(goals.map((goal) => (goal.id === editingGoalId ? { ...values, id: goal.id } : goal)))
      toast.success("Goal updated", {
        description: "Your goal has been updated successfully.",
      })
      setEditingGoalId(null)
    } else {
      // Add new goal
      const newGoal = {
        ...values,
        id: Math.random().toString(36).substring(2, 9),
      }
      setGoals([...goals, newGoal])
      toast.success("Goal added", {
        description: "Your new goal has been added successfully.",
      })
    }

    form.reset({
      title: "",
      description: "",
      type: "short-term",
      deadline: "",
    })
  }

  function editGoal(goal: Goal) {
    form.reset({
      title: goal.title,
      description: goal.description || "",
      type: goal.type,
      deadline: goal.deadline || "",
    })
    setEditingGoalId(goal.id)
  }

  function deleteGoal(id: string) {
    setGoals(goals.filter((goal) => goal.id !== id))
    if (editingGoalId === id) {
      setEditingGoalId(null)
      form.reset({
        title: "",
        description: "",
        type: "short-term",
        deadline: "",
      })
    }
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
        return "bg-accent text-accent-foreground hover:bg-accent/80"
      case "long-term":
        return "bg-primary text-primary-foreground hover:bg-primary/80"
      case "ongoing":
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80"
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
                <FormLabel>Goal Title</FormLabel>
                <FormControl>
                  <Input placeholder="What do you want to achieve?" {...field} />
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
                  <Textarea placeholder="Add more details about your goal" className="min-h-[80px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal Type</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {["short-term", "long-term", "ongoing"].map((type) => (
                      <Badge
                        key={type}
                        variant="outline"
                        className={`cursor-pointer px-3 py-1 capitalize ${
                          field.value === type ? getBadgeColor(type) : ""
                        }`}
                        onClick={() => form.setValue("type", type as any)}
                      >
                        {type.replace("-", " ")}
                      </Badge>
                    ))}
                  </div>
                  <FormDescription>
                    {field.value === "short-term" && "Goals you want to achieve soon (days to weeks)"}
                    {field.value === "long-term" && "Goals that take longer to achieve (months to years)"}
                    {field.value === "ongoing" && "Continuous habits or practices"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline (Optional)</FormLabel>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <input
                        type="date"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    {form.getValues("type") === "ongoing" && "Ongoing goals typically don't have deadlines"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            {editingGoalId ? "Update Goal" : "Add Goal"}
          </Button>
        </form>
      </Form>

      <div className="space-y-4">
        <h3 className="font-medium text-lg">Your Goals</h3>

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
                    <div key={goal.id} className="flex items-start justify-between p-3 rounded-md bg-muted/50">
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
                        <Button variant="ghost" size="icon" onClick={() => editGoal(goal)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteGoal(goal.id)}>
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
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
                    <div key={goal.id} className="flex items-start justify-between p-3 rounded-md bg-muted/50">
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
                        <Button variant="ghost" size="icon" onClick={() => editGoal(goal)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteGoal(goal.id)}>
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
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
                    <div key={goal.id} className="flex items-start justify-between p-3 rounded-md bg-muted/50">
                      <div>
                        <h4 className="font-medium">{goal.title}</h4>
                        {goal.description && <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>}
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => editGoal(goal)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteGoal(goal.id)}>
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

