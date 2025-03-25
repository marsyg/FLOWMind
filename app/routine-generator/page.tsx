'use client';
import generateRoutineSectionsFromTasks from '@/lib/openai';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function RoutineGeneratorPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStep, setGenerationStep] = useState('');
  const userId = '3a162515-ef34-4525-85bc-2525a47e7e00';
  const exampleFixedTasks = [
    {
      userId: userId,
      title: 'Morning meditation',
      duration: 10,
      repeat: true,
    },
    { userId: userId, title: 'Breakfast', duration: 20, repeat: true },
    { userId: userId, title: 'Lunch break', duration: 45, repeat: true },
    { userId: userId, title: 'Team meeting', duration: 60, repeat: false },
    { userId: userId, title: 'Dinner', duration: 45, repeat: true },
    { userId: userId, title: 'Evening routine', duration: 20, repeat: true },
    { userId: userId, title: 'Sleep', duration: 480, repeat: true },
    { userId: userId, title: 'Exercise', duration: 30, repeat: true },
  ];
   

  // Example regular tasks (in the format of your Task schema)
  const exampleRegularTasks = [
    { userId: userId, title: 'Check emails', duration: 30, repeat: false },
    { userId: userId, title: 'Project planning', duration: 45, repeat: false },
    { userId: userId, title: 'Spanish practice', duration: 15, repeat: false },
    { userId: userId, title: 'Reading', duration: 30, repeat: false },
  ];

  // Generate routine sections from tasks
  const handleGenerateRoutine = async () => {
    
    const generatedRoutine = await generateRoutineSectionsFromTasks(
      userId,
      exampleFixedTasks,
      exampleRegularTasks
    );
    console.log(generatedRoutine);
  };
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const generateRoutine = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationStep('Analyzing your profile and preferences...');

    // Simulate generation process
    const steps = [
      { progress: 20, message: 'Analyzing your profile and preferences...' },
      { progress: 40, message: 'Considering your energy patterns...' },
      { progress: 60, message: 'Optimizing task scheduling...' },
      { progress: 80, message: 'Balancing productivity and well-being...' },
      { progress: 100, message: 'Finalizing your personalized routine...' },
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setGenerationProgress(steps[currentStep].progress);
        setGenerationStep(steps[currentStep].message);
        currentStep++;
      } else {
        clearInterval(interval);
        toast.success('Routine generated successfully!', {
          description: 'Your new routine is ready to view.',
        });
        setTimeout(() => {
          router.push('/routine');
        }, 1000);
      }
    }, 1500);

    return () => clearInterval(interval);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className='container py-10'>
      <motion.div
        variants={container}
        initial='hidden'
        animate={isLoaded ? 'show' : 'hidden'}
        className='space-y-8'
      >
        <motion.div
          variants={item}
          className='flex justify-between items-center'
        >
          <Link
            href='/dashboard'
            className='inline-flex items-center text-sm text-muted-foreground hover:text-foreground'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to dashboard
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <div className='space-y-2 mb-8'>
            <h1 className='text-3xl font-bold'>Routine Generator</h1>
            <p className='text-muted-foreground'>
              Create a new personalized routine based on your preferences and
              goals
            </p>
          </div>
        </motion.div>

        <motion.div variants={item}>
          {isGenerating ? (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Sparkles className='h-5 w-5 text-primary' />
                  Generating Your Routine
                </CardTitle>
                <CardDescription>
                  Please wait while we create your personalized routine
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='flex flex-col items-center justify-center py-8'>
                  <div className='relative h-32 w-32'>
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <Loader2 className='h-12 w-12 text-primary animate-spin' />
                    </div>
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <span className='text-lg font-bold'>
                        {generationProgress}%
                      </span>
                    </div>
                    <svg className='h-32 w-32' viewBox='0 0 100 100'>
                      <circle
                        className='text-muted stroke-current'
                        strokeWidth='6'
                        fill='transparent'
                        r='44'
                        cx='50'
                        cy='50'
                      />
                      <circle
                        className='text-primary stroke-current'
                        strokeWidth='6'
                        strokeLinecap='round'
                        fill='transparent'
                        r='44'
                        cx='50'
                        cy='50'
                        style={{
                          strokeDasharray: 276.46,
                          strokeDashoffset:
                            276.46 - (276.46 * generationProgress) / 100,
                          transformOrigin: '50% 50%',
                          transform: 'rotate(-90deg)',
                        }}
                      />
                    </svg>
                  </div>
                  <p className='mt-4 text-center text-muted-foreground'>
                    {generationStep}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Calendar className='h-5 w-5 text-primary' />
                  Generate New Routine
                </CardTitle>
                <CardDescription>
                  Choose options for your new routine
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Card className='bg-muted/50'>
                    <CardHeader className='pb-2'>
                      <CardTitle className='text-base'>
                        Today's Routine
                      </CardTitle>
                      <CardDescription>
                        Generate a routine for today based on your current tasks
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='pt-2'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <Clock className='h-4 w-4 text-muted-foreground' />
                          <span className='text-sm text-muted-foreground'>
                            {new Date().toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <Button size='sm' onClick={generateRoutine}>
                          Generate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className='bg-muted/50'>
                    <CardHeader className='pb-2'>
                      <CardTitle className='text-base'>Custom Date</CardTitle>
                      <CardDescription>
                        Generate a routine for a specific date
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='pt-2'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <Calendar className='h-4 w-4 text-muted-foreground' />
                          <input
                            type='date'
                            className='bg-transparent border-none text-sm text-muted-foreground focus:outline-none'
                            defaultValue={
                              new Date().toISOString().split('T')[0]
                            }
                          />
                        </div>
                        <Button size='sm' onClick={generateRoutine}>
                          Generate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className='bg-primary/10 border-primary/20'>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-base flex items-center gap-2'>
                      <Sparkles className='h-4 w-4 text-primary' />
                      AI-Optimized Routine
                    </CardTitle>
                    <CardDescription>
                      Let our AI create the perfect routine based on your past
                      performance and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='pt-2'>
                    <div className='flex items-center justify-between'>
                      <p className='text-sm text-muted-foreground'>
                        Optimized for your productivity patterns and energy
                        levels
                      </p>
                      <Button onClick={generateRoutine} className='gap-1'>
                        <Sparkles className='h-4 w-4' />
                        Generate Optimized Routine
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
