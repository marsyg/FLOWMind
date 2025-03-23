import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Create a new user profile
export async function createUser(data: {
	name: string;
	age: number;
	occupation: string;
	mbtiType: string;
	goals: string[];
}) {	
	try {
		const user = await prisma.user.create({ data });
		return NextResponse.json(user, { status: 201 });
	} catch (error : any) {
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Get user profile data
export async function getUserById(userId: string) {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: { routines: true, tasks: true },
		});
		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}
		return NextResponse.json(user);
	} catch (error:any) {
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
