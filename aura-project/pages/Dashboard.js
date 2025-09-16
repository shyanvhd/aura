
import React, { useState, useEffect } from "react";
import { Decision, Goal, Meeting } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Target, 
  Calendar,
  Brain,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

import PageHeader from "../components/shared/PageHeader";
import StatsOverview from "../components/dashboard/StatsOverview";
import RecentDecisions from "../components/dashboard/RecentDecisions";
import GoalProgress from "../components/dashboard/GoalProgress";
import UpcomingMeetings from "../components/dashboard/UpcomingMeetings";
import AIInsights from "../components/dashboard/AIInsights";

export default function Dashboard() {
  const [decisions, setDecisions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [decisionsData, goalsData, meetingsData] = await Promise.all([
        Decision.list("-created_date", 10),
        Goal.list("-created_date", 8),
        Meeting.filter({ status: "scheduled" }, "date", 5)
      ]);
      
      setDecisions(decisionsData);
      setGoals(goalsData);
      setMeetings(meetingsData);
    } catch (error) {
      console.error("خطا در بارگیری داده‌ها:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="داشبورد مدیریت"
        subtitle="نمای کلی از وضعیت فعلی و اولویت‌های شما"
        helpTopic="dashboard"
      />
      
      <div className="flex gap-3">
          <Link to={createPageUrl("AIAssistant")}>
            <Button className="bg-indigo-600 text-white hover:bg-indigo-700 transition-opacity shadow-lg">
              <Sparkles className="w-4 h-4 ml-2" />
              مشاوره هوشمند
            </Button>
          </Link>
          <Link to={createPageUrl("DecisionTools")}>
            <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
              <Brain className="w-4 h-4 ml-2" />
              ابزار تصمیم
            </Button>
          </Link>
        </div>

      <StatsOverview 
        decisions={decisions}
        goals={goals} 
        meetings={meetings}
        isLoading={isLoading}
      />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RecentDecisions decisions={decisions} isLoading={isLoading} />
          <GoalProgress goals={goals} isLoading={isLoading} />
        </div>
        
        <div className="space-y-8">
          <AIInsights />
          <UpcomingMeetings meetings={meetings} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
