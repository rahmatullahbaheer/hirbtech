import ProjectsClient from './ProjectsClient';

export const metadata = {
  title: 'Projects | Web & Mobile App Portfolio',
  description: "Browse RB-Tech's portfolio of delivered web platforms and mobile applications. Download full project PDFs with technical details, outcomes, and case studies.",
  keywords: ['web projects', 'mobile app portfolio', 'case studies', 'RB-Tech projects', 'download project PDF'],
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
