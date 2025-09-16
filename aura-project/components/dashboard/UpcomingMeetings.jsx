import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, Users, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const meetingTypeConfig = {
  strategy: { label: "استراتژیک", color: "bg-purple-100 text-purple-800" },
  operational: { label: "عملیاتی", color: "bg-blue-100 text-blue-800" },
  team: { label: "تیمی", color: "bg-green-100 text-green-800" },
  review: { label: "بازنگری", color: "bg-orange-100 text-orange-800" },
  planning: { label: "برنامه‌ریزی", color: "bg-indigo-100 text-indigo-800" },
  other: { label: "سایر", color: "bg-gray-100 text-gray-800" }
};

export default function UpcomingMeetings({ meetings, isLoading }) {
  const upcomingMeetings = meetings
    .filter(m => new Date(m.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <Card className="aura-card aura-shadow border-0">
      <CardHeader className="p-6 border-b border-slate-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold text-slate-800">
            جلسات آینده
          </CardTitle>
          <Link to={createPageUrl("Meetings")} className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium">
            مشاهده همه
            <ArrowLeft className="w-4 h-4 mr-1" />
          </Link>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {isLoading ? (
          <div className="space-y-4 p-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-slate-100 rounded-lg p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2 mb-3" />
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : upcomingMeetings.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500">جلسه‌ای برنامه‌ریزی نشده است</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {upcomingMeetings.slice(0, 4).map((meeting) => (
              <div key={meeting.id} className="border border-slate-100 rounded-xl p-4 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-slate-800 line-clamp-1">
                    {meeting.title}
                  </h4>
                  <Badge className={meetingTypeConfig[meeting.type]?.color || "bg-gray-100"}>
                    {meetingTypeConfig[meeting.type]?.label || meeting.type}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {format(new Date(meeting.date), 'EEEE, dd MMMM yyyy', { locale: ar })}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {format(new Date(meeting.date), 'HH:mm')} - {meeting.duration} دقیقه
                    </span>
                  </div>
                  
                  {meeting.participants && meeting.participants.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{meeting.participants.length} شرکت‌کننده</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}