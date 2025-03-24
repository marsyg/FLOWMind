import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Update task status and reschedule
export async function updateTaskStatus(taskId: string, isComplete: boolean) {
  try {
    const task = await prisma.fixedTask.update({
      where: { id: taskId },
      data: {
        feedback: {
          update: {
            taskCompletion: isComplete,
          },
        },
      },
      include: { feedback: true },
    });
    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Reschedule task duration
export async function rescheduleTask(taskId :string, newDuration : number) {
	try {
		const task = await prisma.fixedTask.update({
			where: { id: taskId },
			data: { duration: newDuration }
		});
		return NextResponse.json(task);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}


