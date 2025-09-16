import React, { useState, useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import RecentDecisions from '../components/dashboard/RecentDecisions';
import { Decision } from '@/entities/Decision';
import DecisionForm from '../components/decisions/DecisionForm';

export default function DecisionToolsPage() {
  const [decisions, setDecisions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadDecisions();
  }, []);

  const loadDecisions = async () => {
    setIsLoading(true);
    try {
      const data = await Decision.list("-created_date");
      setDecisions(data);
    } catch (error) {
      console.error("Failed to load decisions:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFormSubmit = () => {
    setIsFormOpen(false);
    loadDecisions();
  }

  return (
    <div>
      <PageHeader title="ابزارهای تصمیم" subtitle="تصمیمات خود را ثبت، تحلیل و مدیریت کنید" helpTopic="decision_tools" />
      <div className="flex justify-end mb-6">
        <Button onClick={() => setIsFormOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4 ml-2" />
          ثبت تصمیم جدید
        </Button>
      </div>
      <RecentDecisions decisions={decisions} isLoading={isLoading} />
      
      <DecisionForm isOpen={isFormOpen} onOpenChange={setIsFormOpen} onSubmitted={handleFormSubmit} />
    </div>
  );
}