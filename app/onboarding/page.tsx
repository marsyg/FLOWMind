"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { useAppContext } from "@/components/providers/app-provider"
import { UserProfileForm } from "@/components/onboarding/user-profile-form"
import { MbtiForm } from "@/components/onboarding/mbti-form"
import { ChronotypeForm } from "@/components/onboarding/chronotype-form"
import { GoalForm } from "@/components/onboarding/goal-form"
import { toast } from "sonner"

const steps = [
  { id: "welcome", title: "Welcome" },
  { id: "profile", title: "Profile" },
  { id: "mbti", title: "Personality" },
  { id: "chronotype", title: "Energy Pattern" },
  { id: "goals", title: "Goals" },
  { id: "complete", title: "Complete" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { setIsOnboarded } = useAppContext()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    profile: null,
    mbti: null,
    chronotype: null,
    goals: null,
  })

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFormSubmit = (step: string, data: any) => {
    setFormData({ ...formData, [step]: data })
    nextStep()
  }

  const handleComplete = () => {
    // In a real app, you would save all the data to your backend here
    console.log("Onboarding complete with data:", formData)
    setIsOnboarded(true)
    toast.success("Onboarding complete!", {
      description: "Your profile has been set up successfully.",
    })
    router.push("/dashboard")
  }

  const variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <div className="container max-w-4xl flex-1 py-10">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                } transition-colors duration-300`}
              >
                {index < currentStep ? <Check className="h-4 w-4" /> : <span className="text-xs">{index + 1}</span>}
              </div>
            ))}
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            {steps.map((step) => (
              <span key={step.id} className="w-16 text-center">
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            {currentStep === 0 && (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="pt-6 pb-8 px-8">
                  <div className="text-center space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto"
                    >
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="w-16 h-16 rounded-full bg-primary/40 flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Check className="h-5 w-5 text-primary-foreground" />
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold">Welcome to FlowMind</h1>
                      <p className="text-muted-foreground">
                        Let's set up your profile to create personalized routines that work for you. This will only take
                        a few minutes.
                      </p>
                    </div>

                    <div className="pt-4">
                      <Button onClick={nextStep} size="lg" className="rounded-full px-8 gap-2">
                        Get Started <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 1 && (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold">Tell us about yourself</h2>
                      <p className="text-muted-foreground">This information helps us personalize your experience</p>
                    </div>
                    <UserProfileForm onSubmit={(data) => handleFormSubmit("profile", data)} />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold">Your Personality Type</h2>
                      <p className="text-muted-foreground">
                        Your MBTI type helps us understand how you prefer to work and relax
                      </p>
                    </div>
                    <MbtiForm onSubmit={(data) => handleFormSubmit("mbti", data)} />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold">Your Energy Pattern</h2>
                      <p className="text-muted-foreground">
                        Understanding your natural energy patterns helps us schedule tasks at optimal times
                      </p>
                    </div>
                    <ChronotypeForm onSubmit={(data) => handleFormSubmit("chronotype", data)} />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 4 && (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold">Set Your Goals</h2>
                      <p className="text-muted-foreground">
                        Define what you want to achieve so we can help you get there
                      </p>
                    </div>
                    <GoalForm onSubmit={(data) => handleFormSubmit("goals", data)} />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 5 && (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="pt-6 pb-8 px-8">
                  <div className="text-center space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center mx-auto"
                    >
                      <Check className="h-12 w-12 text-success" />
                    </motion.div>

                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold">All Set!</h1>
                      <p className="text-muted-foreground">
                        Your profile is complete. We're ready to generate your personalized routines.
                      </p>
                    </div>

                    <div className="pt-4">
                      <Button onClick={handleComplete} size="lg" className="rounded-full px-8 gap-2">
                        Go to Dashboard <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between">
          {currentStep > 0 && currentStep < 5 && (
            <Button variant="outline" onClick={prevStep} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          )}
          {currentStep === 0 && <div></div>}
          {currentStep === 5 && <div></div>}
          {currentStep > 0 && currentStep < 5 && (
            <Button variant="outline" onClick={nextStep} className="gap-2">
              Skip <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

