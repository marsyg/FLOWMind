import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Create a new routine
export async function createRoutine(userId :string, tasks : { name: string; duration: number }[]) {
  try {
    const routine = await prisma.routine.create({
      data: {
        userId,
        date: new Date(),
        tasks: tasks,
        status: 'pending',
      },
    });
    return NextResponse.json(routine, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// Get routines for a user
export async function getRoutinesByUserId(userId: string) {
	try {
		const routines = await prisma.routine.findMany({
      where: { userId },
      include: { fixedTasks: true, feedback: true },
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
