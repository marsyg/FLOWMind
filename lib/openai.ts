import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

// Zod schemas for FixedTask and Task (as defined previously)
const FixedTaskSchema = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  duration: z.number().int(),
  createdAt: z.string().datetime().optional(),
  repeat: z.boolean().optional(),
  routineId: z.string().optional(),
  feedbackId: z.string().optional(),
  feedback: z.any().optional(),
  notification: z.any().optional(),
});

const TaskSchema = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  duration: z.number().int(),
  createdAt: z.string().datetime().optional(),
  repeat: z.boolean().optional(),
  routineId: z.string().optional(),
  feedbackId: z.string().optional(),
  feedback: z.any().optional(),
  notification: z.any().optional(),
});

// Zod schemas for the desired output structure based on interfaces
const RoutineTaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  time: z.string(),
  duration: z.number().int(),
  priority: z.enum(['high', 'medium', 'low']),
  isFixed: z.boolean(),
  status: z.enum(['pending', 'completed', 'in-progress']), // Assuming TaskStatus is one of these
});

const TimeBlockSchema = z.object({
  title: z.string(),
  icon: z.string(), // We'll still use string placeholders for icons
  tasks: z.array(RoutineTaskSchema),
});

const DesiredRoutineOutputSchema = z.array(TimeBlockSchema);

const client = new OpenAI({
  baseURL: 'https://api.studio.nebius.com/v1/',
  apiKey: process.env.NEBIUS_API_KEY,
});

const generateRoutineSectionsFromTasks = async (
  userId: string,
  fixedTasks: any,
  tasks: any
) => {
  try {
    const fixedTasksString = JSON.stringify(fixedTasks, null, 2);
    const tasksString = JSON.stringify(tasks, null, 2);

    const response = await client.chat.completions.create({
      model: 'mistralai/Mistral-Nemo-Instruct-2407-fast',
      messages: [
        {
          role: 'system',
          content: `You will organize the provided lists of fixed tasks and regular tasks into an array of time blocks ('Morning', 'Afternoon', 'Evening', 'Night') according to the following structure:

\`\`\`typescript
interface RoutineTask {
  id: string
  title: string
  time: string
  duration: number
  priority: "high" | "medium" | "low"
  isFixed: boolean
  status: "pending" | "completed" | "in-progress"
}

interface TimeBlock {
  title: string
  icon: string // Use placeholder strings like "<Sunrise ... />"
  tasks: RoutineTask
}

type Routine = TimeBlock;
\`\`\``,
        },
        {
          role: 'user',
          content: `I have the following fixed tasks:
\`\`\`json
${fixedTasksString}
\`\`\`

And the following regular tasks:
\`\`\`json
${tasksString}
\`\`\`

Organize these tasks into a JSON array of TimeBlock objects. For each task, please include an 'id' (generate a unique ID), 'title', 'time' (assign a reasonable time), 'duration', 'priority' ('high', 'medium', or 'low'), 'isFixed' (true for fixed tasks, false otherwise), and 'status' ('pending' initially). Assign tasks to appropriate time blocks ('Morning', 'Afternoon', 'Evening', 'Night').`,
        },
      ],
      extra_body: {
        guided_json: zodResponseFormat(
          DesiredRoutineOutputSchema,
          'routineSections'
        ).json_schema.schema,
      },
    });

    const output = response.choices[0].message;
    if (output.refusal) {
      console.log('LLM Refusal:', output.refusal);
      return null;
    } else if (output.content) {
      try {
        const generatedTimeBlocks = JSON.parse(output.content);
        return generatedTimeBlocks;
      } catch (e) {
        console.error(
          'Error parsing JSON for generated time blocks:',
          e.message
        );
        console.error('Raw response:', output.content);
        return null;
      }
    } else {
      console.warn(
        'No valid response received from the API for the generated time blocks.'
      );
      return null;
    }
  } catch (error) {
    console.error(
      'An OpenAI API error occurred while trying to generate the time blocks:',
      error
    );
    return null;
  }
};

export default generateRoutineSectionsFromTasks;
// Example Usage:
