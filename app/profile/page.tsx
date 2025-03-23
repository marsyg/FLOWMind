"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Brain, Calendar, Edit, User } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAppContext } from "@/components/providers/app-provider"
import { ProfileForm } from "@/components/profile/profile-form"
import { MbtiProfile } from "@/components/profile/mbti-profile"
import { GoalsProfile } from "@/components/profile/goals-profile"

export default function ProfilePage() {
  const { user } = useAppContext()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

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
    <div className="container py-10">
      <motion.div variants={container} initial="hidden" animate={isLoaded ? "show" : "hidden"} className="space-y-8">
        <motion.div variants={item} className="flex justify-between items-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to dashboard
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 border-none">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <Avatar className="w-24 h-24 border-4 border-background">
                  <AvatarImage src="/placeholder-user.jpg" alt={user?.name || "User"} />
                  <AvatarFallback className="text-2xl">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>

                <div className="space-y-2 text-center md:text-left">
                  <h1 className="text-3xl font-bold">{user?.name || "Guest User"}</h1>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge className="bg-primary/80">{user?.mbtiType || "INFJ"}</Badge>
                    <Badge className="bg-secondary/80">{user?.chronotype || "Night Owl"}</Badge>
                    <Badge variant="outline">{user?.occupation || "Designer"}</Badge>
                  </div>
                </div>

                <Button className="md:ml-auto" variant="outline" asChild>
                  <Link href="/profile/edit">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="personality">
                <Brain className="h-4 w-4 mr-2" />
                Personality
              </TabsTrigger>
              <TabsTrigger value="goals">
                <Calendar className="h-4 w-4 mr-2" />
                Goals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your basic profile information</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="personality">
              <Card>
                <CardHeader>
                  <CardTitle>Personality & Preferences</CardTitle>
                  <CardDescription>Your MBTI type and energy patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <MbtiProfile />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals">
              <Card>
                <CardHeader>
                  <CardTitle>Your Goals</CardTitle>
                  <CardDescription>Manage your short-term, long-term, and ongoing goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <GoalsProfile />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}

