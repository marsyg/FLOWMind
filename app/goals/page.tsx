import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, CheckCircle, Target } from "lucide-react"
import Link from "next/link"
import { GoalForm } from "@/components/goals/goal-form"
import { TaskForm } from "@/components/goals/task-form"

export default function GoalsPage() {
  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <div className="container max-w-5xl flex-1 py-10">
        <div className="mb-8">
          <Link
            href="/onboarding"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to onboarding
          </Link>
        </div>

        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold">Set Your Goals & Tasks</h1>
          <p className="text-muted-foreground">Define what you want to achieve and the tasks that will get you there</p>
        </div>

        <Tabs defaultValue="goals" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="goals">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Your Goals
                </CardTitle>
                <CardDescription>Set meaningful goals that your routine will help you achieve</CardDescription>
              </CardHeader>
              <CardContent>
                <GoalForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Your Tasks
                </CardTitle>
                <CardDescription>Add tasks that will be scheduled in your daily routine</CardDescription>
              </CardHeader>
              <CardContent>
                <TaskForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button asChild size="lg" className="rounded-full px-8 gap-2">
            <Link href="/routine">
              Generate Routine <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

