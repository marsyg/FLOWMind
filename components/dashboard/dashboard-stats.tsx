"use client"

import { motion } from "framer-motion"
import { CheckCircle, Flame, Target, Zap } from "lucide-react"

type DashboardStatsProps = {
  stats: {
    tasksCompleted: number
    tasksTotal: number
    completionRate: number
    streak: number
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-card rounded-xl p-4 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-full bg-primary/20">
            <CheckCircle className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium">Tasks Completed</span>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold">{stats.tasksCompleted}</span>
          <span className="text-sm text-muted-foreground">of {stats.tasksTotal}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card rounded-xl p-4 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-full bg-secondary/20">
            <Target className="h-4 w-4 text-secondary" />
          </div>
          <span className="text-sm font-medium">Completion Rate</span>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold">{stats.completionRate}%</span>
          <span className="text-sm text-muted-foreground">this week</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card rounded-xl p-4 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-full bg-accent/20">
            <Flame className="h-4 w-4 text-accent" />
          </div>
          <span className="text-sm font-medium">Current Streak</span>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold">{stats.streak}</span>
          <span className="text-sm text-muted-foreground">days</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-card rounded-xl p-4 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-full bg-warning/20">
            <Zap className="h-4 w-4 text-warning" />
          </div>
          <span className="text-sm font-medium">Productivity Score</span>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold">8.5</span>
          <span className="text-sm text-muted-foreground">out of 10</span>
        </div>
      </motion.div>
    </div>
  )
}

