import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Submit feedback
export async function createFeedback(data: {
	userId: string;
	feedback: string;
	routineId?: string;
}) {
	try {
		const feedback = await prisma.feedback.create({ data });
		return NextResponse.json(feedback, { status: 201 });
	} catch (error : any) {
        console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Get feedback for analysis
export async function getFeedbackByUserId(userId: string) {
	try {
		const feedback = await prisma.feedback.findMany({ where: { userId } });
		return NextResponse.json(feedback);
	} catch (error:any) {
        console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
