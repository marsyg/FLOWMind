"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { ThumbsDown, ThumbsUp } from "lucide-react"

const feedbackSchema = z.object({
  satisfaction: z.enum(["very-satisfied", "satisfied", "neutral", "dissatisfied", "very-dissatisfied"]),
  energyLevel: z.number().min(1).max(10),
  taskCompletion: z.number().min(0).max(100),
  efficiency: z.number().min(1).max(10),
  comments: z.string().optional(),
})

export function RoutineFeedback() {
  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      satisfaction: "neutral",
      energyLevel: 5,
      taskCompletion: 70,
      efficiency: 6,
      comments: "",
    },
  })

  function onSubmit(values: z.infer<typeof feedbackSchema>) {
    toast.success("Feedback submitted", {
      description: "Thank you for your feedback! We'll use it to improve your routine.",
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

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
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
        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="satisfaction"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>How satisfied are you with today's routine?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="very-satisfied" />
                      </FormControl>
                      <FormLabel className="font-normal flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4 text-success" />
                        Very Satisfied
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="satisfied" />
                      </FormControl>
                      <FormLabel className="font-normal">Satisfied</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="neutral" />
                      </FormControl>
                      <FormLabel className="font-normal">Neutral</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="dissatisfied" />
                      </FormControl>
                      <FormLabel className="font-normal">Dissatisfied</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="very-dissatisfied" />
                      </FormControl>
                      <FormLabel className="font-normal flex items-center gap-2">
                        <ThumbsDown className="h-4 w-4 text-destructive" />
                        Very Dissatisfied
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="energyLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How was your energy level today? (1-10)</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Low Energy (1)</span>
                      <span>{field.value}</span>
                      <span>High Energy (10)</span>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>This helps us understand if your routine matches your energy patterns</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="taskCompletion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Completion Rate (%)</FormLabel>
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
                      <span>0%</span>
                      <span>{field.value}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>Approximately what percentage of planned tasks did you complete?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="efficiency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How efficient was your workflow? (1-10)</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Not Efficient (1)</span>
                      <span>{field.value}</span>
                      <span>Very Efficient (10)</span>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>Did your routine help you work efficiently?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Comments (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any specific feedback about your routine? What worked well? What didn't?"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Your detailed feedback helps us make better adjustments</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button type="submit" className="w-full">
            Submit Feedback
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  )
}

