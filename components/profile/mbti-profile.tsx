"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Edit, ExternalLink } from "lucide-react"
import Link from "next/link"

export function MbtiProfile() {
  const [mbtiData, setMbtiData] = useState({
    type: "INFJ",
    nickname: "Advocate",
    introvertExtrovert: 65,
    sensingIntuition: 78,
    thinkingFeeling: 82,
    judgingPerceiving: 60,
    chronotype: "Night Owl",
    productiveHours: ["evening", "night"],
    sleepTime: "23:30",
    wakeTime: "07:30",
  })

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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <div className="space-y-8">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/20">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-medium">MBTI Type: {mbtiData.type}</h3>
              <p className="text-muted-foreground">{mbtiData.nickname}</p>
            </div>
          </div>

          <Button variant="outline" size="sm" asChild>
            <Link href="https://www.16personalities.com/" target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              Take Test
            </Link>
          </Button>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Introvert</span>
                    <span className="font-medium">Extrovert</span>
                  </div>
                  <div className="relative">
                    <Progress value={mbtiData.introvertExtrovert} className="h-2" />
                    <div
                      className="absolute top-0 h-4 w-1 bg-primary -mt-1 rounded-full"
                      style={{ left: `${mbtiData.introvertExtrovert}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    {mbtiData.introvertExtrovert}% Introverted
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Sensing</span>
                    <span className="font-medium">Intuition</span>
                  </div>
                  <div className="relative">
                    <Progress value={mbtiData.sensingIntuition} className="h-2" />
                    <div
                      className="absolute top-0 h-4 w-1 bg-primary -mt-1 rounded-full"
                      style={{ left: `${mbtiData.sensingIntuition}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-muted-foreground">{mbtiData.sensingIntuition}% Intuitive</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Thinking</span>
                    <span className="font-medium">Feeling</span>
                  </div>
                  <div className="relative">
                    <Progress value={mbtiData.thinkingFeeling} className="h-2" />
                    <div
                      className="absolute top-0 h-4 w-1 bg-primary -mt-1 rounded-full"
                      style={{ left: `${mbtiData.thinkingFeeling}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-muted-foreground">{mbtiData.thinkingFeeling}% Feeling</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Judging</span>
                    <span className="font-medium">Perceiving</span>
                  </div>
                  <div className="relative">
                    <Progress value={mbtiData.judgingPerceiving} className="h-2" />
                    <div
                      className="absolute top-0 h-4 w-1 bg-primary -mt-1 rounded-full"
                      style={{ left: `${mbtiData.judgingPerceiving}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-muted-foreground">{mbtiData.judgingPerceiving}% Judging</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Energy Pattern</h3>
            <Badge>{mbtiData.chronotype}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Sleep Time</p>
              <p className="font-medium">{mbtiData.sleepTime}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Wake Time</p>
              <p className="font-medium">{mbtiData.wakeTime}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Most Productive Hours</p>
            <div className="flex flex-wrap gap-2">
              {["morning", "afternoon", "evening", "night"].map((time) => (
                <Badge
                  key={time}
                  variant={mbtiData.productiveHours.includes(time) ? "default" : "outline"}
                  className="capitalize"
                >
                  {time}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/profile/edit">
              <Edit className="mr-2 h-4 w-4" />
              Edit Personality & Preferences
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

