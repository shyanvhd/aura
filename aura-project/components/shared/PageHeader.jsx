import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import HelpGuide from './HelpGuide';

export default function PageHeader({ title, subtitle, helpTopic }) {
  const [isHelpOpen, setIsHelpOpen] = React.useState(false);
  
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
          {subtitle && <p className="mt-2 text-slate-500 text-lg">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3">
          {helpTopic && (
            <Button variant="outline" size="icon" onClick={() => setIsHelpOpen(true)} className="border-slate-200">
              <HelpCircle className="w-5 h-5 text-slate-500" />
            </Button>
          )}
        </div>
      </div>
      {helpTopic && <HelpGuide topic={helpTopic} isOpen={isHelpOpen} onOpenChange={setIsHelpOpen} />}
    </>
  );
}