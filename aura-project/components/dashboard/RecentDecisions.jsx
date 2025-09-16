import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Clock, CheckCircle, XCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const statusConfig = {
  pending: { label: "در انتظار", icon: Clock, color: "bg-yellow-100 text-yellow-800" },
  in_progress: { label: "در حال اجرا", icon: AlertCircle, color: "bg-blue-100 text-blue-800" },
  implemented: { label: "اجرا شده", icon: CheckCircle, color: "bg-green-100 text-green-800" },
  cancelled: { label: "لغو شده", icon: XCircle, color: "bg-red-100 text-red-800" }
};

const priorityConfig = {
  low: { label: "کم", color: "bg-gray-100 text-gray-800" },
  medium: { label: "متوسط", color: "bg-blue-100 text-blue-800" },
  high: { label: "بالا", color: "bg-orange-100 text-orange-800" },
  critical: { label: "بحرانی", color: "bg-red-100 text-red-800" }
};

export default function RecentDecisions({ decisions, isLoading }) {
  return (
    <Card className="aura-card aura-shadow border-0">
      <CardHeader className="p-6 border-b border-slate-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-slate-800">
            تصمیمات اخیر
          </CardTitle>
          <Link to={createPageUrl("DecisionTools")} className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium">
            مشاهده همه
            <ArrowLeft className="w-4 h-4 mr-1" />
          </Link>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {isLoading ? (
          <div className="space-y-4 p-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between items-start">
                <div className="flex-1">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : decisions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500">هنوز تصمیمی ثبت نشده است</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {decisions.slice(0, 5).map((decision) => {
              const StatusIcon = statusConfig[decision.status]?.icon || Clock;
              return (
                <div key={decision.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 ml-4">
                      <h3 className="font-semibold text-slate-800 mb-1 line-clamp-1">
                        {decision.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-2 line-clamp-2">
                        {decision.description}
                      </p>
                      <p className="text-xs text-slate-400">
                        {format(new Date(decision.created_date), 'dd MMMM yyyy', { locale: ar })}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className={priorityConfig[decision.priority]?.color || "bg-gray-100"}>
                        {priorityConfig[decision.priority]?.label || decision.priority}
                      </Badge>
                      <Badge className={statusConfig[decision.status]?.color || "bg-gray-100"}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig[decision.status]?.label || decision.status}
                      </Badge>
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