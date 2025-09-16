import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Calendar, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatsOverview({ decisions, goals, meetings, isLoading }) {
  const completedGoals = goals.filter(g => g.status === "completed").length;
  const activeDecisions = decisions.filter(d => d.status === "in_progress").length;
  const upcomingMeetings = meetings.filter(m => new Date(m.date) > new Date()).length;
  const goalProgress = goals.length > 0 
    ? Math.round((completedGoals / goals.length) * 100)
    : 0;

  const stats = [
    {
      title: "تصمیمات در حال اجرا",
      value: activeDecisions,
      icon: Clock,
      color: "bg-blue-500",
      trend: "+12% این هفته"
    },
    {
      title: "اهداف تکمیل شده", 
      value: `${completedGoals}/${goals.length}`,
      icon: Target,
      color: "bg-emerald-500",
      trend: `${goalProgress}% پیشرفت`
    },
    {
      title: "جلسات آینده",
      value: upcomingMeetings,
      icon: Calendar, 
      color: "bg-purple-500",
      trend: "این هفته"
    },
    {
      title: "عملکرد کلی",
      value: "عالی",
      icon: TrendingUp,
      color: "bg-orange-500", 
      trend: "+8% بهبود"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="aura-card aura-shadow border-0 overflow-hidden relative">
          <div className={`absolute top-0 left-0 w-full h-1 ${stat.color}`} />
          <CardHeader className="p-6 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <CardTitle className="text-2xl font-bold text-slate-800">
                    {stat.value}
                  </CardTitle>
                )}
              </div>
              <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 mr-1 text-emerald-500" />
              <span className="text-emerald-600 font-medium">{stat.trend}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}