import { Skeleton } from "../ui/skeleton";

const CourseOverviewCardSkeleton = () => {
    return (
        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm w-full max-w-sm animate-in fade-in-50">
            {/* Header */}
            <div className="mb-3 space-y-2">
                <Skeleton className="h-4 w-20" /> {/* courseTerm */}
                <Skeleton className="h-6 w-40" /> {/* courseName */}
            </div>

            {/* Instructor */}
            <Skeleton className="h-4 w-32 mb-3" /> {/* instructor */}

            {/* Class Code and Avatars */}
            <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-4 w-20" /> {/* class code */}
                <div className="flex items-center -space-x-2">
                    {[...Array(4)].map((_, index) => (
                        <Skeleton
                            key={index}
                            className="w-8 h-8 rounded-full border-2 border-white"
                        />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-gray-600 pt-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
            </div>
        </div>
    );
};

export default CourseOverviewCardSkeleton;
