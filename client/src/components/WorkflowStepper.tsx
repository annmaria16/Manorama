import React from 'react';
import { FileText, Cpu, Sparkles, ShieldCheck, Edit3, Eye, Check } from 'lucide-react';

export type WorkflowStage = 'source' | 'analysis' | 'generate' | 'factguard' | 'editor' | 'preview';

interface WorkflowStepperProps {
  currentStage: WorkflowStage;
  onSelectStage: (stage: WorkflowStage) => void;
  hasAnalysis: boolean;
  hasArticle: boolean;
  hasFactCheck: boolean;
}

export const WorkflowStepper: React.FC<WorkflowStepperProps> = ({
  currentStage,
  onSelectStage,
  hasAnalysis,
  hasArticle,
  hasFactCheck
}) => {
  const steps: { id: WorkflowStage; label: string; icon: any; enabled: boolean }[] = [
    { id: 'source', label: '1. Source Material', icon: FileText, enabled: true },
    { id: 'analysis', label: '2. Story Intelligence', icon: Cpu, enabled: hasAnalysis },
    { id: 'generate', label: '3. AI Generation', icon: Sparkles, enabled: hasAnalysis || hasArticle },
    { id: 'factguard', label: '4. Source Fact Guard', icon: ShieldCheck, enabled: hasArticle },
    { id: 'editor', label: '5. Editorial Studio', icon: Edit3, enabled: hasArticle },
    { id: 'preview', label: '6. Publication Preview', icon: Eye, enabled: hasArticle }
  ];

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2.5 no-scrollbar">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = currentStage === step.id;
            const isCompleted =
              (step.id === 'source' && hasAnalysis) ||
              (step.id === 'analysis' && hasArticle) ||
              (step.id === 'generate' && hasArticle) ||
              (step.id === 'factguard' && hasFactCheck);

            return (
              <button
                key={step.id}
                onClick={() => step.enabled && onSelectStage(step.id)}
                disabled={!step.enabled}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-sm ring-2 ring-red-600/20'
                    : step.enabled
                    ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    : 'text-slate-400 opacity-60 cursor-not-allowed'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-700 font-bold'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                </div>
                <span>{step.label.replace(/^\d+\.\s*/, '')}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
