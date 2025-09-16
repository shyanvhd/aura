import React from 'react';
import PageHeader from '../components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
    return (
        <div>
            <PageHeader title="تحلیل و گزارش" subtitle="گزارش‌های جامع از عملکرد مدیریتی خود دریافت کنید" />
            <Card className="aura-card aura-shadow">
                <CardHeader>
                    <CardTitle>عملکرد کلی</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-96 flex items-center justify-center bg-slate-50 rounded-lg">
                        <div className="text-center text-slate-500">
                            <BarChart3 className="w-12 h-12 mx-auto mb-4"/>
                            <p>نمودارها و گزارشات تحلیلی در اینجا نمایش داده خواهند شد.</p>
                            <p className="text-sm">این بخش در حال توسعه است.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}