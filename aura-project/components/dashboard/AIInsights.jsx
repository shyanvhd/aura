import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Lightbulb, TrendingUp, AlertCircle, Sparkles, RefreshCw } from "lucide-react";
import { InvokeLLM } from "@/integrations/Core";
import { Decision, Goal, Meeting } from "@/entities/all";

export default function AIInsights() {
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    generateInsights();
  }, []);

  const generateInsights = async () => {
    setIsLoading(true);
    try {
      // Get recent data for context
      const [recentDecisions, activeGoals, upcomingMeetings] = await Promise.all([
        Decision.list("-created_date", 5),
        Goal.filter({ status: "in_progress" }, "-created_date", 3),
        Meeting.filter({ status: "scheduled" }, "date", 3)
      ]);

      const contextData = {
        decisions: recentDecisions.length,
        goals: activeGoals.length,
        meetings: upcomingMeetings.length,
        completedGoals: activeGoals.filter(g => g.status === "completed").length
      };

      const response = await InvokeLLM({
        prompt: `شما یک مشاور مدیریت هوشمند هستید. بر اساس داده‌های زیر، 3 بینش کلیدی و پیشنهاد عملی برای بهبود عملکرد مدیریتی ارائه دهید:
        
        داده‌های فعلی:
        - تصمیمات اخیر: ${contextData.decisions}
        - اهداف فعال: ${contextData.goals}
        - جلسات برنامه‌ریزی شده: ${contextData.meetings}
        
        هر بینش باید شامل:
        - عنوان کوتاه و جذاب
        - توضیح مختصر (حداکثر 50 کلمه)
        - یک اقدام پیشنهادی عملی
        
        لطفاً به فارسی و با لحن حرفه‌ای پاسخ دهید.`,
        response_json_schema: {
          type: "object",
          properties: {
            insights: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  action: { type: "string" },
                  type: { type: "string", enum: ["warning", "success", "info", "tip"] }
                }
              }
            }
          }
        }
      });

      if (response.insights && Array.isArray(response.insights)) {
        setInsights(response.insights.slice(0, 3));
      } else {
        // Fallback insights
        setInsights([
          {
            title: "تمرکز بر اولویت‌ها",
            description: "نکته: بررسی و اولویت‌بندی مجدد تصمیمات در انتظار می‌تواند کارایی را بهبود دهد.",
            action: "فهرست تصمیمات خود را بازنگری کنید",
            type: "tip"
          },
          {
            title: "پیگیری اهداف",
            description: "هشدار: برخی اهداف به‌روزرسانی نیاز دارند تا پیشرفت واقعی نمایش داده شود.",
            action: "وضعیت اهداف فعلی را به‌روزرسانی کنید",
            type: "warning"
          },
          {
            title: "بهینه‌سازی جلسات",
            description: "پیشنهاد: آماده‌سازی دستور کار دقیق می‌تواند کارایی جلسات را افزایش دهد.",
            action: "برای جلسات آینده دستور کار تهیه کنید",
            type: "info"
          }
        ]);
      }
    } catch (error) {
      console.error("خطا در تولید بینش‌ها:", error);
      setInsights([
        {
          title: "آماده برای شروع",
          description: "سیستم آماده است تا شما را در مدیریت بهتر یاری کند.",
          action: "اولین هدف خود را تعریف کنید",
          type: "success"
        }
      ]);
    }
    setIsLoading(false);
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case "warning": return AlertCircle;
      case "success": return TrendingUp;
      case "tip": return Lightbulb;
      default: return Brain;
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case "warning": return "bg-amber-100 text-amber-800 border-amber-200";
      case "success": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "tip": return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default: return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <Card className="aura-card aura-shadow border-0">
      <CardHeader className="p-6 border-b border-slate-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            بینش‌های هوشمند
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={generateInsights}
            disabled={isLoading}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2 text-slate-500">
              <Brain className="w-5 h-5 animate-pulse" />
              <span>در حال تجزیه و تحلیل...</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, index) => {
              const Icon = getInsightIcon(insight.type);
              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border ${getInsightColor(insight.type)} bg-opacity-50`}
                >
                  <div className="flex gap-3">
                    <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{insight.title}</h4>
                      <p className="text-sm mb-2">{insight.description}</p>
                      <p className="text-xs font-medium opacity-80">
                        💡 {insight.action}
                      </p>
                    </div>
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