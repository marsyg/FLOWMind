import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Update task status and reschedule
export async function updateTaskStatus(taskId: string, isComplete: boolean) {
	try {
		const task = await prisma.task.update({
			where: { id: taskId },
			data: { isComplete },
		});
		return NextResponse.json(task);
	} catch (error : any) {
        console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Reschedule tasks (adjust duration)
export async function rescheduleTask(taskId: string, newDuration: number) {
	try {
		const task = await prisma.task.update({
			where: { id: taskId },
			data: { duration: newDuration },
		});
		return NextResponse.json(task);
	} catch (error: any) {
        console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
