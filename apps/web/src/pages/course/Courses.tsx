import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseStats } from "@/features/course/components/CourseStats";
import { CourseFilters } from "@/features/course/components/CourseFilters";
import { CourseList } from "@/features/course/components/CourseList";

export default function Courses() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">
            Manage your generated courses and track your progress.
          </p>
        </div>
        <Link to="/courses/generate">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Generate Course
          </Button>
        </Link>
      </div>

      <CourseStats />

      <div className="space-y-6 pt-4">
        <CourseFilters />
        <CourseList />
      </div>
    </div>
  );
}
