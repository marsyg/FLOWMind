'use client';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Filter,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function HistoryPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

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

  // Sample data for past routines
  const pastRoutines = [
    {
      date: '2023-11-20',
      completionRate: 85,
      tasksCompleted: 12,
      tasksTotal: 14,
      productivityScore: 8.5,
    },
    {
      date: '2023-11-19',
      completionRate: 70,
      tasksCompleted: 7,
      tasksTotal: 10,
      productivityScore: 7.2,
    },
    {
      date: '2023-11-18',
      completionRate: 90,
      tasksCompleted: 9,
      tasksTotal: 10,
      productivityScore: 9.0,
    },
    {
      date: '2023-11-17',
      completionRate: 60,
      tasksCompleted: 6,
      tasksTotal: 10,
      productivityScore: 6.5,
    },
    {
      date: '2023-11-16',
      completionRate: 80,
      tasksCompleted: 8,
      tasksTotal: 10,
      productivityScore: 8.0,
    },
  ];

  return (
    <>
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

          <Button variant='outline' size='sm' className='gap-1'>
            <Download className='h-4 w-4' />
            Export Data
          </Button>
        </motion.div>

        <motion.div variants={item}>
          <div className='space-y-2 mb-8'>
            <h1 className='text-3xl font-bold'>Previous Routines</h1>
            <p className='text-muted-foreground'>
              Review your past routines and track your progress over time
            </p>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <Tabs defaultValue='daily' className='w-full'>
            <div className='flex justify-between items-center mb-4'>
              <TabsList>
                <TabsTrigger value='daily'>Daily</TabsTrigger>
                <TabsTrigger value='weekly'>Weekly</TabsTrigger>
                <TabsTrigger value='monthly'>Monthly</TabsTrigger>
              </TabsList>

              <div className='flex items-center gap-2'>
                <Filter className='h-4 w-4 text-muted-foreground' />
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Filter by' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Routines</SelectItem>
                    <SelectItem value='high'>High Completion (80%)</SelectItem>
                    <SelectItem value='medium'>
                      Medium Completion (50-80%)
                    </SelectItem>
                    <SelectItem value='low'>Low Completion (50%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value='daily' className='mt-0'>
              <div className='space-y-4'>
                {pastRoutines.map((routine, index) => (
                  <motion.div
                    key={routine.date}
                    variants={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className='hover:shadow-md transition-shadow'>
                      <CardHeader className='pb-2'>
                        <div className='flex justify-between items-center'>
                          <CardTitle className='text-lg flex items-center gap-2'>
                            <Calendar className='h-5 w-5 text-primary' />
                            {new Date(routine.date).toLocaleDateString(
                              'en-US',
                              {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                              }
                            )}
                          </CardTitle>
                          <Badge
                            className={
                              routine.completionRate > 80
                                ? 'bg-success'
                                : routine.completionRate > 50
                                ? 'bg-warning'
                                : 'bg-destructive'
                            }
                          >
                            {routine.completionRate}% Completed
                          </Badge>
                        </div>
                        <CardDescription>
                          Productivity Score: {routine.productivityScore}/10
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='space-y-4'>
                          <div className='grid grid-cols-2 gap-4'>
                            <div className='space-y-1'>
                              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                <CheckCircle className='h-4 w-4' />
                                <span>Tasks Completed</span>
                              </div>
                              <p className='font-medium'>
                                {routine.tasksCompleted} of {routine.tasksTotal}
                              </p>
                            </div>

                            <div className='space-y-1'>
                              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                <Clock className='h-4 w-4' />
                                <span>Completion Rate</span>
                              </div>
                              <div className='space-y-1'>
                                <Progress
                                  value={routine.completionRate}
                                  className='h-2'
                                />
                              </div>
                            </div>
                          </div>

                          <div className='flex justify-end'>
                            <Button variant='outline' size='sm' asChild>
                              <Link href={`/routine/${routine.date}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value='weekly' className='mt-0'>
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Summary</CardTitle>
                  <CardDescription>
                    Your routine performance over the past weeks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='h-[300px] flex items-center justify-center'>
                    <p className='text-muted-foreground'>
                      Weekly charts will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='monthly' className='mt-0'>
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Summary</CardTitle>
                  <CardDescription>
                    Your routine performance over the past months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='h-[300px] flex items-center justify-center'>
                    <p className='text-muted-foreground'>
                      Monthly charts will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </>
  );
}
