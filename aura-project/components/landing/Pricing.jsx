import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: "رایگان",
    price: "۰",
    description: "برای مدیران فردی و تیم‌های کوچک",
    features: [
      "تا ۱۰ تصمیم در ماه",
      "۱ شبیه‌سازی تصمیم",
      "مدیریت اهداف پایه",
      "پشتیبانی از طریق ایمیل"
    ],
    cta: "شروع رایگان",
    primary: false,
  },
  {
    name: "حرفه‌ای",
    price: "۴۹",
    unit: "هزار تومان / ماه",
    description: "برای مدیران و تیم‌های در حال رشد",
    features: [
      "تمام ویژگی‌های پلن رایگان",
      "تصمیمات و شبیه‌سازی نامحدود",
      "داشبورد تحلیلی پیشرفته",
      "یکپارچه‌سازی با ابزارهای دیگر",
      "پشتیبانی اولویت‌دار"
    ],
    cta: "انتخاب پلن حرفه‌ای",
    primary: true,
  },
  {
    name: "سازمانی",
    price: "تماس بگیرید",
    description: "برای سازمان‌های بزرگ با نیازهای خاص",
    features: [
      "تمام ویژگی‌های پلن حرفه‌ای",
      "کوچ اختصاصی هوش مصنوعی",
      "امنیت و انطباق سازمانی (SSO)",
      "مدیر حساب اختصاصی",
      "گزارش‌های سفارشی"
    ],
    cta: "تماس با فروش",
    primary: false,
  }
];

export default function Pricing() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {tiers.map((tier) => (
        <div 
          key={tier.name}
          className={`rounded-2xl p-8 border ${
            tier.primary 
              ? 'bg-slate-800 border-indigo-500 transform scale-105' 
              : 'bg-slate-800/50 border-slate-700'
          }`}
        >
          <h3 className="text-2xl font-bold">{tier.name}</h3>
          <p className="mt-2 text-slate-400">{tier.description}</p>
          <div className="mt-8">
            <span className="text-5xl font-extrabold">{tier.price}</span>
            {tier.unit && <span className="text-slate-400 ml-1">{tier.unit}</span>}
          </div>
          <ul className="mt-8 space-y-4">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-400" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button 
            size="lg" 
            className={`w-full mt-10 h-12 ${
              tier.primary 
                ? 'bg-indigo-500 hover:bg-indigo-600'
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            {tier.cta}
          </Button>
        </div>
      ))}
    </div>
  );
}