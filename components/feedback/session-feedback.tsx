"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Clock, Frown, Meh, Smile, Star } from "lucide-react"

interface SessionTask {
  id: string
  title: string
  time: string
  completed: boolean
}

interface Session {
  id: string
  title: string
  tasks: SessionTask[]
  rating: number
  mood: string
  comment: string
}

export function SessionFeedback() {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      title: "Morning Session",
      tasks: [
        { id: "m1", title: "Morning meditation", time: "06:30", completed: true },
        { id: "m2", title: "Breakfast", time: "07:00", completed: true },
        { id: "m3", title: "Check emails", time: "07:30", completed: true },
      ],
      rating: 0,
      mood: "",
      comment: "",
    },
    {
      id: "2",
      title: "Work Session 1",
      tasks: [
        { id: "w1", title: "Project planning", time: "08:15", completed: true },
        { id: "w2", title: "Team meeting", time: "09:30", completed: false },
      ],
      rating: 0,
      mood: "",
      comment: "",
    },
  ])

  const setRating = (sessionId: string, rating: number) => {
    setSessions(sessions.map((session) => (session.id === sessionId ? { ...session, rating } : session)))
  }

  const setMood = (sessionId: string, mood: string) => {
    setSessions(sessions.map((session) => (session.id === sessionId ? { ...session, mood } : session)))
  }

  const setComment = (sessionId: string, comment: string) => {
    setSessions(sessions.map((session) => (session.id === sessionId ? { ...session, comment } : session)))
  }

  const submitFeedback = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId)
    if (!session) return

    if (session.rating === 0) {
      toast.error("Please provide a rating", {
        description: "Star rating is required for feedback submission.",
      })
      return
    }

    toast.success("Session feedback submitted", {
      description: "Thank you for your feedback on this session!",
    })

    console.log("Feedback for session:", session)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {sessions.map((session) => (
        <motion.div key={session.id} variants={item}>
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{session.title}</h3>
                  <div className="mt-2 space-y-2">
                    {session.tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${task.completed ? "bg-success" : "bg-muted"}`}></div>
                          <span className={task.completed ? "" : "text-muted-foreground"}>{task.title}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{task.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">How would you rate this session?</h4>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(session.id, star)}
                          className={`p-1 rounded-full transition-colors ${
                            session.rating >= star ? "text-warning" : "text-muted"
                          }`}
                        >
                          <Star className="h-6 w-6" fill={session.rating >= star ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">How did you feel during this session?</h4>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setMood(session.id, "happy")}
                        className={`p-2 rounded-full transition-colors ${
                          session.mood === "happy" ? "bg-success/20 text-success" : "text-muted-foreground"
                        }`}
                      >
                        <Smile className="h-8 w-8" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setMood(session.id, "neutral")}
                        className={`p-2 rounded-full transition-colors ${
                          session.mood === "neutral" ? "bg-warning/20 text-warning" : "text-muted-foreground"
                        }`}
                      >
                        <Meh className="h-8 w-8" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setMood(session.id, "unhappy")}
                        className={`p-2 rounded-full transition-colors ${
                          session.mood === "unhappy" ? "bg-destructive/20 text-destructive" : "text-muted-foreground"
                        }`}
                      >
                        <Frown className="h-8 w-8" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Additional Comments (Optional)</h4>
                    <Textarea
                      placeholder="What went well or could be improved in this session?"
                      value={session.comment}
                      onChange={(e) => setComment(session.id, e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>

                  <Button onClick={() => submitFeedback(session.id)} className="w-full">
                    Submit Feedback
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

