import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 bg-white rounded-lg shadow-md p-4">
      <Button
        onClick={() => onPageChange(1)}
        disabled={currentPage <= 1}
        variant="outline"
        size="icon"
        className="hidden sm:flex"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        variant="outline"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Sebelumnya</span>
        <span className="sm:hidden">Prev</span>
      </Button>

      <div className="flex gap-1">
        {getPageNumbers().map((page, idx) => 
          typeof page === 'number' ? (
            <Button
              key={idx}
              onClick={() => onPageChange(page)}
              variant={currentPage === page ? 'default' : 'outline'}
              size="icon"
              className="w-10"
            >
              {page}
            </Button>
          ) : (
            <span key={idx} className="px-2 flex items-center text-gray-400">
              {page}
            </span>
          )
        )}
      </div>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        variant="outline"
      >
        <span className="hidden sm:inline">Selanjutnya</span>
        <span className="sm:hidden">Next</span>
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
      
      <Button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage >= totalPages}
        variant="outline"
        size="icon"
        className="hidden sm:flex"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
