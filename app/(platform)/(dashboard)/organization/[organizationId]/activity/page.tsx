import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import { Suspense } from "react";
import { ActivityList } from "../_components/activity-list";

const ActivityPage = () => {
  return (
    <div className="w-full">
      <Info className="w-4 h-4" />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};
export default ActivityPage;