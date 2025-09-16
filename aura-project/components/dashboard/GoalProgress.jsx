import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Target, TrendingUp, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const statusConfig = {
  not_started: { label: "شروع نشده", color: "bg-gray-100 text-gray-800" },
  in_progress: { label: "در حال انجام", color: "bg-blue-100 text-blue-800" },
  completed: { label: "تکمیل شده", color: "bg-green-100 text-green-800" },
  paused: { label: "متوقف", color: "bg-yellow-100 text-yellow-800" },
  cancelled: { label: "لغو شده", color: "bg-red-100 text-red-800" }
};

export default function GoalProgress({ goals, isLoading }) {
  const calculateProgress = (goal) => {
    if (!goal.target_value || goal.target_value === 0) return 0;
    return Math.min(100, Math.round((goal.current_value / goal.target_value) * 100));
  };

  return (
    <Card className="aura-card aura-shadow border-0">
      <CardHeader className="p-6 border-b border-slate-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-slate-800">
            پیشرفت اهداف
          </CardTitle>
          <Link to={createPageUrl("Goals")} className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium">
            مشاهده همه
            <ArrowLeft className="w-4 h-4 mr-1" />
          </Link>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {isLoading ? (
          <div className="space-y-6 p-6">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-2 w-full mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        ) : goals.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <Target className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500">هنوز هدفی تعریف نشده است</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {goals.slice(0, 4).map((goal) => {
              const progress = calculateProgress(goal);
              const isOverdue = new Date(goal.deadline) < new Date() && goal.status !== "completed";
              
              return (
                <div key={goal.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 ml-4">
                      <h3 className="font-semibold text-slate-800 mb-1">{goal.title}</h3>
                      <p className="text-sm text-slate-600">
                        {goal.current_value?.toLocaleString('fa-IR') || 0} از {goal.target_value?.toLocaleString('fa-IR')} {goal.unit}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={statusConfig[goal.status]?.color || "bg-gray-100"}>
                        {statusConfig[goal.status]?.label || goal.status}
                      </Badge>
                      {isOverdue && (
                        <Badge className="bg-red-100 text-red-800">
                          تاخیر دارد
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <Progress 
                      value={progress} 
                      className={`h-2 ${progress === 100 ? 'bg-green-100' : 'bg-slate-100'}`} 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {progress}% تکمیل شده
                    </span>
                    <span>
                      مهلت: {format(new Date(goal.deadline), 'dd MMM yyyy', { locale: ar })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}