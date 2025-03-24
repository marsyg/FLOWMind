"use server";

import prisma from "@/lib/prisma";

// Create a new user profile
export async function createUser(data: {
  name: string;
  email: string;
  ageRange: string;
  gender: string;
  occupation: string;
  interests: string[];
  mbtiType: string;
  mbtiPercentages: {
    introvertExtrovert: number;
    sensingIntuition: number;
    thinkingFeeling: number;
    judgingPerceiving: number;
  };
  chronotype: {
    chronotype: string;
    productiveHours: string[];
    sleepTime: string;
    wakeTime: string;
  };
}) {
	try {
		console.log("Validated Data:", data);

		const user = await prisma.user.create({ data });

		console.log(user);
		if (!user) {
			return {
				status: 500,
				body: { error: "Failed to create user" },
			};
		}
		return {
			status: 200,
			body: { user },
		};
	} catch (error: any) {
		console.error(error);
		return {
			status: 500,
			body: { error: error.message },
		};
	}
}

// Get user profile data
export async function getUserById(userId: string) {
 
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: { routines: true, fixedTasks: true },
		});
		console.log("user : ", user);
		if (!user || user === null || user === undefined) {
			return {
				status: 404,
				body: { error: "User not found" },
			};
		}
		return {
			status: 200,
			body: { user },
		};
	} catch (error: any) {
		console.error(error);
		return {
			status: 500,
			body: { error: error.message },
		};
	}
}
