import Shimmer from "./Shimmer";
import SkeletonBaseElement from "./SkeletonBaseElement";

function SearchBarSkeleton() {
    return (
        <div className="skeleton-wrapper">
            <SkeletonBaseElement type="search" />
            <Shimmer />
        </div>
    );
}

export default SearchBarSkeleton;
