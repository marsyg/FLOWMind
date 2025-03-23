import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Create a new goal
export async function createGoal(userId: string, goal: string) {
	try {
		const user = await prisma.user.update({
			where: { id: userId },
			data: { goals: { push: goal } },
		});
		return NextResponse.json(user);
	} catch (error:any) {
        console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Update goals
export async function updateGoals(userId: string, goals: string[]) {
	try {
		const user = await prisma.user.update({
			where: { id: userId },
			data: { goals },
		});
		return NextResponse.json(user);
	} catch (error:any) {
        console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Get goals
export async function getGoals(userId: string) {
	try {
		const user = await prisma.user.findUnique({ where: { id: userId } });
		return NextResponse.json(user?.goals || []);
	} catch (error:any) {
        console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
