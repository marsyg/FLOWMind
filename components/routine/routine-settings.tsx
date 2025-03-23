"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Brain, Coffee, Focus, Zap } from "lucide-react"

const settingsSchema = z.object({
  workFocusTime: z.number().min(15).max(120),
  breakTime: z.number().min(5).max(30),
  bufferBetweenTasks: z.number().min(0).max(30),
  notificationsEnabled: z.boolean().default(true),
  reminderTime: z.string(),
  adaptToFeedback: z.boolean().default(true),
  prioritizeWellBeing: z.boolean().default(true),
  balanceProductivityAndRest: z.number().min(0).max(100),
})

export function RoutineSettings() {
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      workFocusTime: 45,
      breakTime: 10,
      bufferBetweenTasks: 5,
      notificationsEnabled: true,
      reminderTime: "5",
      adaptToFeedback: true,
      prioritizeWellBeing: true,
      balanceProductivityAndRest: 50,
    },
  })

  function onSubmit(values: z.infer<typeof settingsSchema>) {
    toast.success("Settings saved", {
      description: "Your routine settings have been updated.",
    })
    console.log(values)
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <Form {...form}>
      <motion.form
        variants={formVariants}
        initial="hidden"
        animate="visible"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <motion.div variants={sectionVariants} className="space-y-4">
          <div className="flex items-center gap-2">
            <Focus className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Focus & Productivity</h3>
          </div>

          <FormField
            control={form.control}
            name="workFocusTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ideal Focus Session Length (minutes)</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Slider
                      min={15}
                      max={120}
                      step={5}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>15 min</span>
                      <span>{field.value} min</span>
                      <span>120 min</span>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>How long you can focus on a task before needing a break</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="breakTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ideal Break Length (minutes)</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Slider
                      min={5}
                      max={30}
                      step={5}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>5 min</span>
                      <span>{field.value} min</span>
                      <span>30 min</span>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>How long you need to recharge between focus sessions</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bufferBetweenTasks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Buffer Between Tasks (minutes)</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Slider
                      min={0}
                      max={30}
                      step={5}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0 min</span>
                      <span>{field.value} min</span>
                      <span>30 min</span>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>Extra time between tasks for transitions</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={sectionVariants} className="space-y-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Adaptive Learning</h3>
          </div>

          <FormField
            control={form.control}
            name="adaptToFeedback"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Adapt to Feedback</FormLabel>
                  <FormDescription>Automatically adjust your routine based on your feedback</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prioritizeWellBeing"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Prioritize Well-being</FormLabel>
                  <FormDescription>Ensure your routine includes breaks and self-care activities</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="balanceProductivityAndRest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Balance: Productivity vs. Rest</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Slider
                      min={0}
                      max={100}
                      step={5}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        <span>Productivity</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Coffee className="h-3 w-3" />
                        <span>Rest</span>
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>Adjust the balance between productivity and rest in your routine</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <Button type="submit" className="w-full">
            Save Settings
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  )
}

