import React, { useState, useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Goal } from '@/entities/Goal';
import GoalProgress from '../components/dashboard/GoalProgress';
import GoalForm from '../components/goals/GoalForm';

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    setIsLoading(true);
    try {
      const data = await Goal.list("-created_date");
      setGoals(data);
    } catch (error) {
      console.error("Failed to load goals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = () => {
    setIsFormOpen(false);
    loadGoals();
  };

  return (
    <div>
      <PageHeader title="اهداف" subtitle="اهداف استراتژیک خود را تعریف و پیشرفت آن‌ها را دنبال کنید" helpTopic="goals" />
      <div className="flex justify-end mb-6">
        <Button onClick={() => setIsFormOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4 ml-2" />
          تعریف هدف جدید
        </Button>
      </div>
      <GoalProgress goals={goals} isLoading={isLoading} />
      <GoalForm isOpen={isFormOpen} onOpenChange={setIsFormOpen} onSubmitted={handleFormSubmit} />
    </div>
  );
}