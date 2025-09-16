import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Lightbulb, Target, Brain, Calendar, BarChart3 } from 'lucide-react';

const helpTopics = {
  dashboard: {
    title: "راهنمای داشبورد",
    icon: BarChart3,
    content: [
      "داشبورد نقطه مرکزی کنترل پلتفرم Aura است",
      "می‌توانید آخرین تصمیمات، پیشرفت اهداف و جلسات آینده را مشاهده کنید",
      "بخش بینش‌های هوشمند پیشنهادات شخصی‌سازی شده ارائه می‌دهد",
      "از دکمه‌های میانبر برای دسترسی سریع به ابزارهای مختلف استفاده کنید"
    ]
  },
  decision_tools: {
    title: "راهنمای ابزارهای تصمیم",
    icon: Brain,
    content: [
      "تصمیمات مهم خود را ثبت و دسته‌بندی کنید",
      "از هوش مصنوعی برای ارزیابی ریسک و دریافت پیشنهاد استفاده کنید",
      "وضعیت اجرای تصمیمات را پیگیری کنید",
      "نتایج واقعی را با انتظارات اولیه مقایسه کنید"
    ]
  },
  goals: {
    title: "راهنمای مدیریت اهداف",
    icon: Target,
    content: [
      "اهداف SMART (قابل اندازه‌گیری، قابل دستیابی، مرتبط، زمان‌دار) تعریف کنید",
      "پیشرفت خود را به صورت منظم به‌روزرسانی کنید",
      "از نقاط عطف (Milestones) برای تقسیم اهداف بزرگ استفاده کنید",
      "اولویت‌بندی کنید تا روی مهم‌ترین اهداف متمرکز شوید"
    ]
  },
  meetings: {
    title: "راهنمای مدیریت جلسات",
    icon: Calendar,
    content: [
      "جلسات خود را از قبل برنامه‌ریزی و دستور کار تهیه کنید",
      "شرکت‌کنندگان ضروری را مشخص کنید",
      "زمان جلسه را محدود کنید و به آن پایبند باشید",
      "اقدامات پیگیری را مستند کنید و مسئول هر کدام را مشخص نمایید"
    ]
  }
};

export default function HelpGuide({ topic, isOpen, onOpenChange }) {
  const guide = helpTopics[topic];
  
  if (!guide) return null;
  
  const Icon = guide.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-indigo-600" />
            {guide.title}
          </DialogTitle>
          <DialogDescription>
            راهنمای استفاده از این بخش
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {guide.content.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <Lightbulb className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
              <p className="text-sm text-slate-600">{item}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}