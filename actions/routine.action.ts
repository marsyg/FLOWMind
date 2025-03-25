"use server";
import prisma from "@/lib/prisma";

// Create a new routine
export async function createRoutine(
	userId: string
	// tasks: { name: string; duration: number }[]
) {
	try {
		// fetching tasks with userId
		const fixedTasks = await prisma.fixedTask.findMany({
			where: { userId },
		});

		// creating routine with fetched tasks

		// const routine = await prisma.routine.create({
		//   data: {
		//     userId,
		//     date: new Date(),
		//     tasks: tasks,
		//     status: 'pending',
		//   },
		// });

		return {
			status: 200,
			body: { fixedTasks },
		};
	} catch (error: any) {
		console.error(error);
		return {
			status: 500,
			body: { error: error.message },
		};
	}
}

// Get routine for a user
export async function getRoutinesByUserId(routineId: string) {
	try {
		const routine = await prisma.routine.findUnique({
			where: { id: routineId },
			include: { fixedTasks: true, feedback: true },
		});
		return {
			status: 200,
			body: { routine },
		};
	} catch (error: any) {
		console.error(error);
		return {
			status: 500,
			body: { error: error.message },
		};
	}
}

// Update a routine (add/remove tasks)
export async function updateTasksInRoutine(
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
		return {
			status: 200,
			body: { routine: updatedRoutine },
		};
	} catch (error: any) {
		console.error(error);
		return {
			status: 500,
			body: { error: error.message },
		};
	}
}
