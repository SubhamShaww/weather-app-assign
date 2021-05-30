import Shimmer from "./Shimmer";
import SkeletonBaseElement from "./SkeletonBaseElement";

function WeekSkeleton() {
    return (
        <div className="flex space-x-5 items-center px-4 py-3">
            {[1, 2, 3, 4, 5].map((each, index) => {
                return (
                    <div key={index} className="h-20 w-16 skeleton-wrapper">
                        <SkeletonBaseElement type="thumbnail" />
                        <Shimmer />
                    </div>
                );
            })}
        </div>
    );
}

export default WeekSkeleton;
