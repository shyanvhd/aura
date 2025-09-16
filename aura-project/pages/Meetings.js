import React, { useState, useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Meeting } from '@/entities/Meeting';
import UpcomingMeetings from '../components/dashboard/UpcomingMeetings';
import MeetingForm from '../components/meetings/MeetingForm';

export default function MeetingsPage() {
    const [meetings, setMeetings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        loadMeetings();
    }, []);

    const loadMeetings = async () => {
        setIsLoading(true);
        try {
            const data = await Meeting.list("-date");
            setMeetings(data);
        } catch (error) {
            console.error("Failed to load meetings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = () => {
        setIsFormOpen(false);
        loadMeetings();
    };

    return (
        <div>
            <PageHeader title="جلسات" subtitle="جلسات خود را برنامه‌ریزی، مدیریت و بهینه کنید" helpTopic="meetings" />
            <div className="flex justify-end mb-6">
                <Button onClick={() => setIsFormOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="w-4 h-4 ml-2" />
                    جلسه جدید
                </Button>
            </div>
            <UpcomingMeetings meetings={meetings} isLoading={isLoading} />
            <MeetingForm isOpen={isFormOpen} onOpenChange={setIsFormOpen} onSubmitted={handleFormSubmit} />
        </div>
    );
}