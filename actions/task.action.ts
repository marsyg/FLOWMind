'use server';
import prisma from '@/lib/prisma';

function validateTaskData(data: any): {
  isValid: boolean;
  errorMessage?: string;
} {
  const requiredFields = [
    'title',
    'duration',
    'timeWindow',
    'priority',
    'date',
  ];

  for (const field of requiredFields) {
    if (
      data[field] === null ||
      data[field] === undefined ||
      data[field] === ''
    ) {
      return {
        isValid: false,
        errorMessage: `Missing required field: ${field}`,
      };
    }
  }

  // Additional type validations
  if (isNaN(Number(data.duration))) {
    return { isValid: false, errorMessage: 'Duration must be a number' };
  }

  // Check if date is valid
  try {
    new Date(data.date);
  } catch (e) {
    return { isValid: false, errorMessage: 'Invalid date format' };
  }

  return { isValid: true };
}

// ✅ Create Fixed Task
export async function createFixedTask(taskData: {
  title: string;
  description: string;
  duration: string;
  timeWindow: string;
  priority: string;
  // isFixed: boolean;
  // date: string;
}) {
  const validation = validateTaskData(taskData);
  if (!validation.isValid) {
    return {
      success: false,
      message: validation.errorMessage || 'Invalid task data',
    };
  } else console.log('Task data is valid');
  try {
    // const data = {
    //   title: taskData.title,
    //   description: taskData.description,
    //   duration: Number(taskData.duration),
    //   timeWindow: taskData.timeWindow,
    //   priority: taskData.priority,
    //   isFixed: taskData.isFixed,
    //   date: taskData.date,
    // };
    // console.log(data);

    const data = {
      title: 'Grocery Shopping',
      description: 'Buy groceries for the week at the local supermarket.',
      duration: 6, // Duration in minutes (as a string, as expected by the function)
      timeWindow: 'Evening',
      priority: 'High',
      // isFixed: true,
      // date: '2025-03-28', // Example date in YYYY-MM-DD format
    };
    console.log(data);
    // const uploadTaskData = {
    //   title: data.title,
    //   description: data.description,
    //   duration: data.duration,
    //   timeWindow: data.timeWindow,
    //   priority: data.priority,
    //   repeat: data.isFixed,
    //   createdAt: new Date(data.date),
    //   userId: 'auth-user-id', // Replace with actual authenticated user ID
    //   routineId: null, // Set routineId if applicable
    //   feedbackId: null,
    // };

    const task = await prisma.fixedTask.create({
			data: {
				...data,
				repeat: true,
				// createdAt: new Date(data.date),
				userId: "3a162515-ef34-4525-85bc-2525a47e7e00", // Replace this with an actual authenticated user ID
				// routineId: 'obe',
				// feedbackId: 'two',
			},
		});

    return { success: true, task };
  } catch (error) {
    console.error('Error creating task:', error?.stack);
    return {
      success: false,
      message: error instanceof Error ? error.stack : 'Failed to create task',
    };
  }
}

// ✅ Update Task Status and Reschedule
export async function updateTaskStatus(taskId: string, isComplete: boolean) {
  'use server'; // Add 'use server' directive for each function
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

    return { success: true, task };
  } catch (error) {
    console.error('Error updating task status:', error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to update task status',
    };
  }
}

// ✅ Reschedule Task Duration
export async function rescheduleTask(taskId: string, newDuration: number) {
  'use server'; // Add 'use server' directive for each function
  try {
    const task = await prisma.fixedTask.update({
      where: { id: taskId },
      data: { duration: newDuration },
    });

    return { success: true, task };
  } catch (error) {
    console.error('Error rescheduling task:', error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to reschedule task',
    };
  }
}
