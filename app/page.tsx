"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/components/providers/app-provider"
import { ArrowRight, Brain, Calendar, Clock, Sparkles } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const { isOnboarded } = useAppContext()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleGetStarted = () => {
    if (isOnboarded) {
      router.push("/dashboard")
    } else {
      router.push("/onboarding")
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const featureItem = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2 }}
          className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-40 right-[15%] w-72 h-72 rounded-full bg-secondary/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute bottom-20 left-[20%] w-80 h-80 rounded-full bg-accent/20 blur-3xl"
        />

        {/* Hero section */}
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate={isLoaded ? "show" : "hidden"}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={item} className="mb-6">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                Personalized Routine Generator
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                Discover Your Perfect Daily{" "}
                <span className="text-primary relative">
                  Flow
                  <motion.svg
                    width="100%"
                    height="8"
                    viewBox="0 0 100 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -bottom-2 left-0 w-full"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                  >
                    <path
                      d="M1 5.5C20 0.5 50 0.5 99 5.5"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mt-6">
                Create personalized routines that adapt to your unique personality, preferences, and goals. Let FlowMind
                help you achieve balance and productivity.
              </p>
            </motion.div>

            <motion.div variants={item} className="mt-10">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="rounded-full px-8 py-6 text-lg gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isOnboarded ? "Go to Dashboard" : "Get Started"}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="py-20 bg-background"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Designed for Your Unique Lifestyle</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              FlowMind adapts to your personality, energy patterns, and goals to create the perfect daily routine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={featureItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personality-Driven</h3>
              <p className="text-muted-foreground">
                Tailored to your MBTI personality type and preferences for a routine that feels natural.
              </p>
            </motion.div>

            <motion.div
              variants={featureItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Adaptive Scheduling</h3>
              <p className="text-muted-foreground">
                Adjusts in real-time based on your feedback and progress throughout the day.
              </p>
            </motion.div>

            <motion.div
              variants={featureItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-muted-foreground">
                Gain valuable insights about your productivity patterns and receive personalized recommendations.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-primary/10"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Daily Routine?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of users who have discovered their perfect flow with our adaptive routine generator.
          </p>
          <Button onClick={handleGetStarted} size="lg" className="rounded-full px-8 gap-2 shadow-lg">
            {isOnboarded ? "Go to Dashboard" : "Start Your Journey"}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-10 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <Calendar className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">FlowMind</span>
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} FlowMind. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

