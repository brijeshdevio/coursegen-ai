import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function CoursePagination({ 
  currentPage, 
  totalPages 
}: { 
  currentPage: number; 
  totalPages: number 
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center justify-between sm:justify-center w-full gap-2 sm:gap-6 py-8 sm:py-12">
      <Button
        variant="outline"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="rounded-full px-3 sm:px-6 h-10 sm:h-12 text-sm sm:text-base font-bold border-2"
      >
        <ChevronLeft className="mr-1 sm:mr-2 size-4 sm:size-5 shrink-0" />
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </Button>
      
      <span className="text-sm sm:text-base font-bold text-foreground whitespace-nowrap">
        Page {currentPage} <span className="hidden sm:inline">of {totalPages}</span>
        <span className="sm:hidden">/ {totalPages}</span>
      </span>
      
      <Button
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="rounded-full px-3 sm:px-6 h-10 sm:h-12 text-sm sm:text-base font-bold border-2"
      >
        <span className="hidden sm:inline">Next</span>
        <span className="sm:hidden">Next</span>
        <ChevronRight className="ml-1 sm:ml-2 size-4 sm:size-5 shrink-0" />
      </Button>
    </div>
  );
}
