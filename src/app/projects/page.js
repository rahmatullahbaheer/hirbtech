import { Suspense } from 'react';
import ProjectsClient from './ProjectsClient';

export const metadata = {
  title: 'Projects | Web & Mobile App Portfolio',
  description: "Browse RB-Tech's portfolio of delivered web platforms and mobile applications. Download full project PDFs with technical details, outcomes, and case studies.",
  keywords: ['web projects', 'mobile app portfolio', 'case studies', 'RB-Tech projects', 'download project PDF'],
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        <p className="text-zinc-400 text-sm">Loading projects...</p>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProjectsClient />
    </Suspense>
  );
}
