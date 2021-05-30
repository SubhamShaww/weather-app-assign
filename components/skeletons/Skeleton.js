import SearchBarSkeleton from "./SearchBarSkeleton";
import TodaySkeleton from "./TodaySkeleton";
import WeekSkeleton from "./WeekSkeleton";

function Skeleton() {
    return (
        <div className="flex flex-col space-y-5 h-full w-full">
            <SearchBarSkeleton />
            <WeekSkeleton />
            <TodaySkeleton />
        </div>
    );
}

export default Skeleton;
