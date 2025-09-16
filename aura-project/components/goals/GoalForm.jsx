import React, { useState } from 'react';
import { Goal } from '@/entities/Goal';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Loader2 } from 'lucide-react';

const categories = ["revenue", "growth", "efficiency", "team", "personal", "strategic"];
const priorities = ["low", "medium", "high", "critical"];

export default function GoalForm({ isOpen, onOpenChange, onSubmitted }) {
  const [goal, setGoal] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setGoal(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await Goal.create(goal);
      setGoal({});
      onSubmitted();
    } catch (error) {
      console.error("Failed to create goal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle>تعریف هدف جدید</DialogTitle>
          <DialogDescription>
            اهداف استراتژیک خود را تعریف و مهلت زمانی آن‌ها را مشخص کنید.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="md:col-span-2">
            <Label htmlFor="title">عنوان هدف</Label>
            <Input 
              id="title" 
              value={goal.title || ''} 
              onChange={(e) => handleInputChange('title', e.target.value)} 
              required 
              placeholder="مثال: افزایش فروش به 100 میلیون تومان"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="description">شرح هدف</Label>
            <Textarea 
              id="description" 
              value={goal.description || ''} 
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="توضیح کاملی از هدف و راه‌های دستیابی به آن..."
            />
          </div>
          <div>
            <Label htmlFor="category">دسته‌بندی</Label>
            <Select onValueChange={(value) => handleInputChange('category', value)} value={goal.category}>
              <SelectTrigger><SelectValue placeholder="انتخاب کنید..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">درآمد</SelectItem>
                <SelectItem value="growth">رشد</SelectItem>
                <SelectItem value="efficiency">کارایی</SelectItem>
                <SelectItem value="team">تیم</SelectItem>
                <SelectItem value="personal">شخصی</SelectItem>
                <SelectItem value="strategic">استراتژیک</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="priority">اولویت</Label>
            <Select onValueChange={(value) => handleInputChange('priority', value)} value={goal.priority}>
              <SelectTrigger><SelectValue placeholder="انتخاب کنید..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low">کم</SelectItem>
                <SelectItem value="medium">متوسط</SelectItem>
                <SelectItem value="high">بالا</SelectItem>
                <SelectItem value="critical">بحرانی</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="target_value">مقدار هدف</Label>
            <Input 
              id="target_value" 
              type="number" 
              value={goal.target_value || ''} 
              onChange={(e) => handleInputChange('target_value', parseFloat(e.target.value) || 0)} 
              required 
              placeholder="100"
            />
          </div>
          <div>
            <Label htmlFor="unit">واحد اندازه‌گیری</Label>
            <Input 
              id="unit" 
              value={goal.unit || ''} 
              onChange={(e) => handleInputChange('unit', e.target.value)}
              placeholder="میلیون تومان، تعداد، درصد..."
            />
          </div>
          <div>
            <Label htmlFor="current_value">مقدار فعلی</Label>
            <Input 
              id="current_value" 
              type="number" 
              value={goal.current_value || 0} 
              onChange={(e) => handleInputChange('current_value', parseFloat(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="deadline">مهلت زمانی</Label>
            <Input 
              id="deadline" 
              type="date" 
              value={goal.deadline || ''} 
              onChange={(e) => handleInputChange('deadline', e.target.value)}
              required
            />
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "ذخیره هدف"}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>لغو</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}