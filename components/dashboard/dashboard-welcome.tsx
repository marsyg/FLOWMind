"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

type DashboardWelcomeProps = {
  user: any
}

export function DashboardWelcome({ user }: DashboardWelcomeProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
		<Card className="bg-gradient-to-r from-primary/20 to-secondary/20 border-none">
			<CardContent className="p-6">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
					<div className="space-y-2">
						<motion.h1
							className="text-2xl font-bold"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							{getGreeting()}, {user?.name || "there"}!
						</motion.h1>
						<motion.p
							className="text-muted-foreground"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							Here's an overview of your day and progress
						</motion.p>
					</div>
					<div className="flex flex-row justify-around sm:justify-end gap-5 w-full">
						<Button asChild>
							<Link
								href="/routine/3a162515-ef34-4525-85bc-2525a47e7e00"
								className="gap-1 w-44"
							>
								Today's Routine <ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
						<Button asChild>
							<Link
								href="/routine-generator/3a162515-ef34-4525-85bc-2525a47e7e00"
								className="gap-1 w-48"
							>
								Generate New Routine <ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

