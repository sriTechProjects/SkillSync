import { type FC } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const QuickActions: FC = () => {
  return (
    <div className="flex gap-4">
      <Button variant="default" className="flex items-center gap-2">
        <Plus /> Offer a Skill
      </Button>
    </div>
  );
};

export default QuickActions;
