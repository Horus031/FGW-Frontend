import { Skeleton } from "../ui/skeleton";

type SkeletonLoadingProps = {
  skeletonNum: number;
};

const SkeletonDemo = (props: SkeletonLoadingProps) => {
  const { skeletonNum } = props;

  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < skeletonNum; i++) {
      skeletons.push(<Skeleton key={i} className="h-4" />);
    }
    return skeletons;
  };

  return (
    <div className="flex items-center space-x-4 w-full">
      <div className="space-y-2 w-full">
        {renderSkeletons()}
      </div>
    </div>
  );
};

export default SkeletonDemo;
