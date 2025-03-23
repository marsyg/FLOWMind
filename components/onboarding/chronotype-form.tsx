"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlarmClock, Coffee, Moon, Sun } from "lucide-react"

const formSchema = z.object({
  chronotype: z.enum(["early-bird", "night-owl", "in-between"]),
  productiveHours: z.array(z.string()).min(1, {
    message: "Please select at least one productive time period",
  }),
  sleepTime: z.string(),
  wakeTime: z.string(),
})

type ChronotypeFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void
}

export function ChronotypeForm({ onSubmit }: ChronotypeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chronotype: "in-between",
      productiveHours: ["morning"],
      sleepTime: "22:00",
      wakeTime: "07:00",
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
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="chronotype"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>What best describes your natural energy pattern?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="early-bird" className="peer sr-only" />
                      </FormControl>
                      <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-muted/50 hover:border-primary [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10 cursor-pointer">
                        <Sun className="mb-3 h-6 w-6 text-warning" />
                        <div className="space-y-1 text-center">
                          <p className="font-medium leading-none">Early Bird</p>
                          <p className="text-sm text-muted-foreground">Most energetic in the morning</p>
                        </div>
                      </FormLabel>
                    </FormItem>

                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="night-owl" className="peer sr-only" />
                      </FormControl>
                      <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-muted/50 hover:border-primary [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10 cursor-pointer">
                        <Moon className="mb-3 h-6 w-6 text-primary" />
                        <div className="space-y-1 text-center">
                          <p className="font-medium leading-none">Night Owl</p>
                          <p className="text-sm text-muted-foreground">Most energetic in the evening</p>
                        </div>
                      </FormLabel>
                    </FormItem>

                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="in-between" className="peer sr-only" />
                      </FormControl>
                      <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-muted/50 hover:border-primary [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10 cursor-pointer">
                        <Coffee className="mb-3 h-6 w-6 text-accent" />
                        <div className="space-y-1 text-center">
                          <p className="font-medium leading-none">In Between</p>
                          <p className="text-sm text-muted-foreground">Energy varies throughout the day</p>
                        </div>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="sleepTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>When do you typically go to sleep?</FormLabel>
                <div className="flex items-center gap-2">
                  <AlarmClock className="h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <input
                      type="time"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wakeTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>When do you typically wake up?</FormLabel>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <input
                      type="time"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="productiveHours"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>When are you most productive?</FormLabel>
                  <FormDescription>Select all time periods when you feel most focused and energetic</FormDescription>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["morning", "afternoon", "evening", "night"].map((item) => (
                    <FormField
                      key={item}
                      control={form.control}
                      name="productiveHours"
                      render={({ field }) => {
                        return (
                          <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={field.value?.includes(item)}
                                onChange={(e) => {
                                  return e.target.checked
                                    ? field.onChange([...field.value, item])
                                    : field.onChange(field.value?.filter((value) => value !== item))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="w-full cursor-pointer rounded-md border-2 border-muted bg-card p-4 hover:bg-muted/50 peer-checked:border-primary peer-checked:bg-primary/10">
                              {item.charAt(0).toUpperCase() + item.slice(1)}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
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

