"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Brain, Upload } from "lucide-react"

const formSchema = z.object({
  mbtiType: z.string().min(1, {
    message: "Please select your MBTI type",
  }),
  introvertExtrovert: z.number().min(0).max(100),
  sensingIntuition: z.number().min(0).max(100),
  thinkingFeeling: z.number().min(0).max(100),
  judgingPerceiving: z.number().min(0).max(100),
})

type MbtiFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void
}

export function MbtiForm({ onSubmit }: MbtiFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mbtiType: "",
      introvertExtrovert: 50,
      sensingIntuition: 50,
      thinkingFeeling: 50,
      judgingPerceiving: 50,
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
            <Brain className="h-8 w-8 text-primary" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="mbtiType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your MBTI Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your MBTI type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="INTJ">INTJ - Architect</SelectItem>
                    <SelectItem value="INTP">INTP - Logician</SelectItem>
                    <SelectItem value="ENTJ">ENTJ - Commander</SelectItem>
                    <SelectItem value="ENTP">ENTP - Debater</SelectItem>
                    <SelectItem value="INFJ">INFJ - Advocate</SelectItem>
                    <SelectItem value="INFP">INFP - Mediator</SelectItem>
                    <SelectItem value="ENFJ">ENFJ - Protagonist</SelectItem>
                    <SelectItem value="ENFP">ENFP - Campaigner</SelectItem>
                    <SelectItem value="ISTJ">ISTJ - Logistician</SelectItem>
                    <SelectItem value="ISFJ">ISFJ - Defender</SelectItem>
                    <SelectItem value="ESTJ">ESTJ - Executive</SelectItem>
                    <SelectItem value="ESFJ">ESFJ - Consul</SelectItem>
                    <SelectItem value="ISTP">ISTP - Virtuoso</SelectItem>
                    <SelectItem value="ISFP">ISFP - Adventurer</SelectItem>
                    <SelectItem value="ESTP">ESTP - Entrepreneur</SelectItem>
                    <SelectItem value="ESFP">ESFP - Entertainer</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Don't know your MBTI type?{" "}
                  <a
                    href="https://www.16personalities.com/free-personality-test"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Take a test here
                  </a>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="p-4 bg-muted/50 rounded-lg">
          <h3 className="font-medium mb-4">MBTI Trait Percentages (Optional)</h3>
          <p className="text-sm text-muted-foreground mb-6">
            If you know your exact percentages from a test, you can adjust these sliders
          </p>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="introvertExtrovert"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between mb-2">
                    <FormLabel>Introvert</FormLabel>
                    <FormLabel>Extrovert</FormLabel>
                  </div>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  </FormControl>
                  <div className="flex justify-center mt-1">
                    <span className="text-xs text-muted-foreground">{field.value}%</span>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sensingIntuition"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between mb-2">
                    <FormLabel>Sensing</FormLabel>
                    <FormLabel>Intuition</FormLabel>
                  </div>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  </FormControl>
                  <div className="flex justify-center mt-1">
                    <span className="text-xs text-muted-foreground">{field.value}%</span>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thinkingFeeling"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between mb-2">
                    <FormLabel>Thinking</FormLabel>
                    <FormLabel>Feeling</FormLabel>
                  </div>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  </FormControl>
                  <div className="flex justify-center mt-1">
                    <span className="text-xs text-muted-foreground">{field.value}%</span>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="judgingPerceiving"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between mb-2">
                    <FormLabel>Judging</FormLabel>
                    <FormLabel>Perceiving</FormLabel>
                  </div>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  </FormControl>
                  <div className="flex justify-center mt-1">
                    <span className="text-xs text-muted-foreground">{field.value}%</span>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="border border-dashed border-muted-foreground/50 rounded-lg p-6 text-center"
        >
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <h3 className="font-medium mb-1">Upload MBTI Test Results</h3>
          <p className="text-sm text-muted-foreground mb-4">Optionally upload a screenshot of your test results</p>
          <Button variant="outline" size="sm">
            Choose File
          </Button>
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

