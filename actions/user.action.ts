"use server";

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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
		if (
			!data ||
			Object.values(data).some((value) => value === null || value === undefined)
		) {
			throw new Error("Invalid data: Some fields are missing.");
		}

		console.log("Validated Data:", data);

		const user = await prisma.user.create({ data });
		console.log(user);
		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}
		return NextResponse.json({ user: JSON.stringify(user) }, { status: 201 });
	} catch (error: any) {
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Get user profile data
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { routines: true, fixedTasks: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: { routines: true, fixedTasks: true },
		});
		console.log(user);
		if (!user || user === null || user === undefined) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}
		return NextResponse.json({ user: JSON.parse(JSON.stringify(user)) }, { status: 200 });
	} catch (error: any) {
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
