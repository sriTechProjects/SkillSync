import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Assuming a UI library like Shadcn/ui
import { Calendar } from 'lucide-react';

interface Session {
  id: string;
  title: string;
  withUser: string;
  date: string;
  time: string;
}

interface UpcomingSessionsProps {
  sessions: Session[];
}

const UpcomingSessions = ({ sessions }: UpcomingSessionsProps) => {

  const navigate = useNavigate();

  const goToSkills=()=>{
    navigate("/skills");
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Upcoming Sessions</h2>
      {sessions.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-lg">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">You have no upcoming sessions.</p>
          <Button onClick={goToSkills} variant="outline" className="mt-4">Explore Marketplace</Button>
        </div>
      ) : (
        <ul className="space-y-4">
          {/* We would map over the sessions here */}
        </ul>
      )}
    </div>
  );
};

export default UpcomingSessions;