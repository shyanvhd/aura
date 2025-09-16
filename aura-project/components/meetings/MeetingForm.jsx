import React, { useState } from 'react';
import { Meeting } from '@/entities/Meeting';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Loader2 } from 'lucide-react';

const meetingTypes = ["strategy", "operational", "team", "review", "planning", "other"];

export default function MeetingForm({ isOpen, onOpenChange, onSubmitted }) {
  const [meeting, setMeeting] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setMeeting(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await Meeting.create(meeting);
      setMeeting({});
      onSubmitted();
    } catch (error) {
      console.error("Failed to create meeting:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle>برنامه‌ریزی جلسه جدید</DialogTitle>
          <DialogDescription>
            جزئیات جلسه خود را وارد کنید و شرکت‌کنندگان را مشخص نمایید.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="md:col-span-2">
            <Label htmlFor="title">عنوان جلسه</Label>
            <Input 
              id="title" 
              value={meeting.title || ''} 
              onChange={(e) => handleInputChange('title', e.target.value)} 
              required 
              placeholder="جلسه هفتگی تیم"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="description">توضیحات</Label>
            <Textarea 
              id="description" 
              value={meeting.description || ''} 
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="موضوعات قابل بحث و اهداف جلسه..."
            />
          </div>
          <div>
            <Label htmlFor="type">نوع جلسه</Label>
            <Select onValueChange={(value) => handleInputChange('type', value)} value={meeting.type}>
              <SelectTrigger><SelectValue placeholder="انتخاب کنید..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="strategy">استراتژیک</SelectItem>
                <SelectItem value="operational">عملیاتی</SelectItem>
                <SelectItem value="team">تیمی</SelectItem>
                <SelectItem value="review">بازنگری</SelectItem>
                <SelectItem value="planning">برنامه‌ریزی</SelectItem>
                <SelectItem value="other">سایر</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="duration">مدت زمان (دقیقه)</Label>
            <Input 
              id="duration" 
              type="number" 
              value={meeting.duration || ''} 
              onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 60)}
              placeholder="60"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="date">تاریخ و زمان</Label>
            <Input 
              id="date" 
              type="datetime-local" 
              value={meeting.date || ''} 
              onChange={(e) => handleInputChange('date', e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="participants">شرکت‌کنندگان (با کاما جدا کنید)</Label>
            <Input 
              id="participants" 
              value={meeting.participants?.join(', ') || ''} 
              onChange={(e) => handleInputChange('participants', e.target.value.split(',').map(p => p.trim()).filter(Boolean))}
              placeholder="احمد محمدی, فاطمه رضایی, ..."
            />
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "ذخیره جلسه"}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>لغو</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}