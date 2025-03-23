"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Target } from "lucide-react"

const formSchema = z.object({
  shortTermGoals: z.string().optional(),
  longTermGoals: z.string().optional(),
  ongoingGoals: z.string().optional(),
})

type GoalFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void
}

export function GoalForm({ onSubmit }: GoalFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shortTermGoals: "",
      longTermGoals: "",
      ongoingGoals: "",
    },
  })

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
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-center mb-6">
          <div className="p-4 rounded-full bg-primary/20">
            <Target className="h-8 w-8 text-primary" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="shortTermGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Badge className="bg-accent text-accent-foreground">Short-term</Badge>
                  Short-term Goals
                </FormLabel>
                <FormDescription>Goals you want to achieve soon (days to weeks)</FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="Enter your short-term goals, one per line"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="longTermGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Badge className="bg-primary text-primary-foreground">Long-term</Badge>
                  Long-term Goals
                </FormLabel>
                <FormDescription>Goals that take longer to achieve (months to years)</FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="Enter your long-term goals, one per line"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="ongoingGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Badge className="bg-secondary text-secondary-foreground">Ongoing</Badge>
                  Ongoing Goals
                </FormLabel>
                <FormDescription>Continuous habits or practices you want to maintain</FormDescription>
                <FormControl>
                  <Textarea placeholder="Enter your ongoing goals, one per line" className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="pt-4">
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  )
}

