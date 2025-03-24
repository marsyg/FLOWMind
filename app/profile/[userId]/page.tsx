"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Brain, Calendar, Edit, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/components/providers/app-provider";
import { ProfileForm } from "@/components/profile/profile-form";
import { MbtiProfile } from "@/components/profile/mbti-profile";
import { GoalsProfile } from "@/components/profile/goals-profile";
import { getUserById } from "@/actions/user.action";
import { toast } from "sonner";

export default function ProfilePage({
	params,
}: {
	params: Promise<{ userId: string }>;
}) {
	// const { user } = useAppContext();
	const [user, setUser] = useState({
		name: "",
		email: "",
		ageRange: "",
		gender: "",
		occupation: "",
		interests: [],
		mbtiType: "",
		mbtiPercentages: {
			introvertExtrovert: 0,
			sensingIntuition: 0,
			thinkingFeeling: 0,
			judgingPerceiving: 0,
		},
		chronotype: {
			chronotype: "",
			productiveHours: [],
			sleepTime: "",
		},
	});
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			toast.info("Loading profile", {
				description: "Please wait while we fetch your profile.",
			});

			const { userId } = await params;
			if (!userId) {
				toast.error("User not found");
				return;
			}
			try {
				const response: any = await getUserById(userId);
				console.log(response);
				if (!response) {
					toast.error("User not found");
					return;
				}
				setUser(response.body.user);
				setIsLoaded(true);
				toast.success("Profile loaded");
			} catch {
				toast.error("Error loading profile");
				setIsLoaded(true);
			}
		};

		fetchUser();
	}, []);

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	return (
		<div className="container py-10">
			<motion.div
				variants={container}
				initial="hidden"
				animate={
					// "show"
					isLoaded ? "show" : "hidden"
				}
				className="space-y-8"
			>
				<motion.div
					variants={item}
					className="flex justify-between items-center"
				>
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
									<AvatarImage
										src="/placeholder-user.jpg"
										alt={user?.name || "User"}
									/>
									<AvatarFallback className="text-2xl">
										{user?.name?.charAt(0) || "U"}
									</AvatarFallback>
								</Avatar>

								<div className="space-y-2 text-center md:text-left">
									<h1 className="text-3xl font-bold">
										{user?.name || "Guest User"}
									</h1>
									<div className="flex flex-wrap gap-2 justify-center md:justify-start">
										<Badge className="bg-primary/80">
											{user?.mbtiType || "INFJ"}
										</Badge>
										<Badge className="bg-secondary/80">
											{user?.chronotype?.chronotype || "Night Owl"}
										</Badge>
										<Badge variant="outline">
											{user?.occupation || "Designer"}
										</Badge>
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
									<CardDescription>
										Your basic profile information
									</CardDescription>
								</CardHeader>
								<CardContent>
									{user.name && <ProfileForm user={user} />}
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="personality">
							<Card>
								<CardHeader>
									<CardTitle>Personality & Preferences</CardTitle>
									<CardDescription>
										Your MBTI type and energy patterns
									</CardDescription>
								</CardHeader>
								<CardContent>
									{user.name && (
										<MbtiProfile
											mbtiType={user.mbtiType}
											mbtiPercentages={user.mbtiPercentages}
											chronotype={user.chronotype.chronotype}
											productiveHours={user.chronotype.productiveHours}
											sleepTime={user.chronotype.sleepTime}
											wakeTime={user.chronotype.wakeTime}
										/>
									)}
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="goals">
							<Card>
								<CardHeader>
									<CardTitle>Your Goals</CardTitle>
									<CardDescription>
										Manage your short-term, long-term, and ongoing goals
									</CardDescription>
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
	);
}
