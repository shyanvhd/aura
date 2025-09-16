import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, User, Bot, Brain } from 'lucide-react';
import { InvokeLLM } from '@/integrations/Core';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'سلام! من Aura هستم. چطور می‌توانم امروز به شما در تصمیم‌گیری بهتر کمک کنم؟ می‌توانید درباره یک چالش، ایده یا گزارش از من بپرسید.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const prompt = `شما یک مشاور مدیریت هوشمند به نام Aura هستید. به سوال زیر به صورت حرفه‌ای، مختصر و کاربردی پاسخ دهید. سوال کاربر: "${input}"`;
      const response = await InvokeLLM({ prompt });
      const botMessage = { role: 'bot', content: response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling AI assistant:", error);
      const errorMessage = { role: 'bot', content: 'متاسفانه در حال حاضر امکان پاسخگویی وجود ندارد. لطفاً دقایقی دیگر دوباره تلاش کنید.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="دستیار هوشمند Aura" subtitle="مشاور شخصی شما برای تصمیم‌گیری‌های پیچیده" />
      <Card className="aura-card aura-shadow h-[70vh] flex flex-col">
        <CardContent className="p-6 flex-1 overflow-y-auto">
          <div className="space-y-6">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}
                >
                  {msg.role === 'bot' && (
                    <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-indigo-100">
                      <Bot className="w-6 h-6 text-indigo-600" />
                    </div>
                  )}
                  <div className={`p-4 rounded-lg max-w-lg ${msg.role === 'user' ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                    <p className={`text-sm ${msg.role === 'bot' ? 'text-slate-600' : ''}`}>{msg.content}</p>
                  </div>
                  {msg.role === 'user' && (
                     <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-slate-200">
                      <User className="w-5 h-5 text-slate-600" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-4"
              >
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-indigo-100">
                      <Bot className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="p-4 rounded-lg bg-slate-100">
                      <div className="flex items-center gap-2 text-slate-500">
                          <Brain className="w-4 h-4 animate-pulse" />
                          <span>در حال فکر کردن...</span>
                      </div>
                  </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white rounded-b-xl">
          <div className="flex items-center gap-3">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="پیام خود را تایپ کنید..." 
              className="h-12"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" className="h-12 w-12 bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}