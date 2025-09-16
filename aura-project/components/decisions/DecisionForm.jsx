import React, { useState } from 'react';
import { Decision } from '@/entities/Decision';
import { InvokeLLM } from '@/integrations/Core';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Brain, Sparkles, Loader2 } from 'lucide-react';

const categories = ["strategic", "operational", "financial", "hr", "marketing", "product"];
const priorities = ["low", "medium", "high", "critical"];

export default function DecisionForm({ isOpen, onOpenChange, onSubmitted }) {
  const [decision, setDecision] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setDecision(prev => ({ ...prev, [field]: value }));
  };

  const getAiHelp = async () => {
    if (!decision.title || !decision.description) {
        alert("لطفاً عنوان و شرح تصمیم را برای دریافت تحلیل وارد کنید.");
        return;
    }
    setIsAiLoading(true);
    try {
        const prompt = `من در حال اتخاذ یک تصمیم مدیریتی هستم. عنوان: "${decision.title}". شرح: "${decision.description}". لطفاً یک ارزیابی ریسک مختصر و یک پیشنهاد عملی برای این تصمیم ارائه دهید.`;
        const response = await InvokeLLM({
            prompt,
            response_json_schema: {
                type: "object",
                properties: {
                    risk_assessment: { type: "string" },
                    recommendation: { type: "string" }
                }
            }
        });
        if(response.risk_assessment && response.recommendation) {
            handleInputChange('risk_assessment', response.risk_assessment);
            handleInputChange('ai_recommendation', response.recommendation);
        }
    } catch(error) {
        console.error("AI help failed:", error);
    } finally {
        setIsAiLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await Decision.create(decision);
      setDecision({});
      onSubmitted();
    } catch (error) {
      console.error("Failed to create decision:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle>ثبت تصمیم جدید</DialogTitle>
          <DialogDescription>
            جزئیات تصمیم خود را وارد کنید. می‌توانید از هوش مصنوعی برای تحلیل کمک بگیرید.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="md:col-span-2">
            <Label htmlFor="title">عنوان تصمیم</Label>
            <Input id="title" value={decision.title || ''} onChange={(e) => handleInputChange('title', e.target.value)} required />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="description">شرح کامل</Label>
            <Textarea id="description" value={decision.description || ''} onChange={(e) => handleInputChange('description', e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="category">دسته‌بندی</Label>
            <Select onValueChange={(value) => handleInputChange('category', value)} value={decision.category}>
              <SelectTrigger><SelectValue placeholder="انتخاب کنید..." /></SelectTrigger>
              <SelectContent>
                {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="priority">اولویت</Label>
            <Select onValueChange={(value) => handleInputChange('priority', value)} value={decision.priority}>
              <SelectTrigger><SelectValue placeholder="انتخاب کنید..." /></SelectTrigger>
              <SelectContent>
                {priorities.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Button type="button" variant="outline" onClick={getAiHelp} disabled={isAiLoading} className="w-full">
              {isAiLoading ? <Loader2 className="w-4 h-4 ml-2 animate-spin" /> : <Sparkles className="w-4 h-4 ml-2" />}
              دریافت تحلیل و پیشنهاد هوشمند
            </Button>
          </div>
          {decision.risk_assessment && (
             <div className="md:col-span-2 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-2">ارزیابی ریسک</h4>
                <p className="text-sm text-amber-700">{decision.risk_assessment}</p>
             </div>
          )}
          {decision.ai_recommendation && (
             <div className="md:col-span-2 bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-indigo-800 mb-2">پیشنهاد Aura</h4>
                <p className="text-sm text-indigo-700">{decision.ai_recommendation}</p>
             </div>
          )}
        </form>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "ذخیره تصمیم"}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>لغو</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}