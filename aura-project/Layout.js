
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  LayoutDashboard, 
  MessageCircle, 
  Target,
  Brain,
  Calendar,
  BarChart3,
  LogOut,
  Home,
  ChevronLeft
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter
} from "@/components/ui/sidebar";
import { User } from '@/entities/User';
import PageHeader from "../components/shared/PageHeader";

const navigationItems = [
  { title: "داشبورد", url: createPageUrl("Dashboard"), icon: LayoutDashboard },
  { title: "دستیار هوشمند", url: createPageUrl("AIAssistant"), icon: MessageCircle },
  { title: "ابزارهای تصمیم", url: createPageUrl("DecisionTools"), icon: Brain },
  { title: "اهداف", url: createPageUrl("Goals"), icon: Target },
  { title: "جلسات", url: createPageUrl("Meetings"), icon: Calendar },
  { title: "تحلیل و گزارش", url: createPageUrl("Analytics"), icon: BarChart3 }
];

export default function Layout({ children, currentPageName }) {
  if (currentPageName === 'Home') {
    return <>{children}</>;
  }

  // Moved useLocation inside the conditional block where the full layout is rendered
  // to ensure it's called unconditionally when the layout is in use.
  const location = useLocation();

  const handleLogout = () => {
    User.logout();
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50">
      <style>{`
        :root {
          --aura-primary: #1e293b;
          --aura-secondary: #475569;
          --aura-accent: #6366f1; /* Indigo 500 */
          --aura-accent-light: #a5b4fc; /* Indigo 300 */
          --aura-purple: #8b5cf6; /* Violet 500 */
          --aura-success: #10b981;
          --aura-warning: #f59e0b;
          --aura-surface: #ffffff;
          --aura-text-primary: #1e293b;
          --aura-text-secondary: #64748b;
        }
        
        .aura-text-gradient {
          background: linear-gradient(135deg, var(--aura-accent) 0%, var(--aura-purple) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent; /* For Firefox */
        }
        
        .aura-text-gradient-light {
           background: linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 100%);
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
           background-clip: text;
        }

        .aura-gradient-light-bg {
          background: linear-gradient(135deg, rgba(165, 180, 252, 0.1) 0%, rgba(196, 181, 253, 0.1) 100%);
        }

        .aura-shadow {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.03), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
        }
        
        .aura-card {
          background: var(--aura-surface);
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }
      `}</style>
      
      <SidebarProvider>
        <div className="flex w-full">
          <Sidebar className="border-l border-slate-200/80 bg-white/95 backdrop-blur-xl">
            <SidebarHeader className="border-b border-slate-200/80 p-6">
              <Link to={createPageUrl('Home')} className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl aura-text-gradient-light bg-slate-800">
                  <Brain className="w-6 h-6" />
                </div>
                <div data-collapsed="false">
                  <h2 className="font-bold text-xl aura-text-gradient">Aura</h2>
                </div>
              </Link>
            </SidebarHeader>
            
            <SidebarContent className="p-4 flex-1">
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 rounded-lg mb-1 ${
                        location.pathname === item.url 
                          ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                          : 'text-slate-600'
                      }`}
                    >
                      <Link to={item.url} className="flex items-center gap-3 px-3 py-2.5">
                        <item.icon className="w-5 h-5" />
                        <span data-collapsed="false">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-slate-200/80">
                <SidebarMenu>
                   <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleLogout} className="text-slate-600 hover:bg-red-50 hover:text-red-600 w-full rounded-lg">
                           <div className="flex items-center gap-3 px-3 py-2.5">
                                <LogOut className="w-5 h-5" />
                                <span data-collapsed="false">خروج از حساب</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          <main className="flex-1 flex flex-col min-w-0">
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-6 py-4 sticky top-0 z-40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="p-2 rounded-xl hover:bg-slate-100">
                    <ChevronLeft className="w-5 h-5 sidebar-trigger-icon" />
                  </SidebarTrigger>
                   <Link to={createPageUrl('Home')} className="flex items-center gap-3 md:hidden">
                      <h1 className="text-xl font-bold aura-text-gradient">Aura</h1>
                   </Link>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-auto p-6 md:p-8">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
