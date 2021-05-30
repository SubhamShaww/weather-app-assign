import Shimmer from "./Shimmer";
import SkeletonBaseElement from "./SkeletonBaseElement";

function TodaySkeleton() {
    return (
        <div className="flex-grow w-full card-big flex flex-col space-y-8">
            <div className="skeleton-wrapper">
                <SkeletonBaseElement type="title" />
                <Shimmer />
            </div>
            <div className="flex-grow skeleton-wrapper">
                <SkeletonBaseElement type="thumbnail" />
                <Shimmer />
            </div>
            <div className="flex space-x-6 h-12 skeleton-wrapper">
                <div className="w-1/2">
                    <SkeletonBaseElement type="thumbnail" />
                    <Shimmer />
                </div>
                <div className="w-1/2 skeleton-wrapper">
                    <SkeletonBaseElement type="thumbnail" />
                    <Shimmer />
                </div>
            </div>
            <div className="flex-grow skeleton-wrapper">
                <SkeletonBaseElement type="thumbnail" />
                <Shimmer />
            </div>
        </div>
    );
}

export default TodaySkeleton;
