import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Create a new routine
export async function createRoutine(data: {
	userId: string;
	tasks: { name: string; duration: number }[];
}) {
	try {
		const routine = await prisma.routine.create({
			data: {
				userId: data.userId,
				tasks: {
					create: data.tasks.map((task) => ({
						name: task.name,
						duration: task.duration,
					})),
				},
			},
		});
		return NextResponse.json(routine, { status: 201 });
	} catch (error : any ) {
        console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Get routines for a user
export async function getRoutinesByUserId(userId: string) {
	try {
		const routines = await prisma.routine.findMany({
			where: { userId },
			include: { tasks: true },
		});
		return NextResponse.json(routines);
	} catch (error : any) {
        console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Update a routine (add/remove tasks)
export async function updateRoutine(
	routineId: string,
	tasks: { name: string; duration: number }[]
) {
	try {
		const updatedRoutine = await prisma.routine.update({
			where: { id: routineId },
			data: {
				tasks: {
					deleteMany: {}, // Delete existing tasks
					create: tasks, // Add new tasks
				},
			},
		});
		return NextResponse.json(updatedRoutine);
	} catch (error : any) {
        console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
