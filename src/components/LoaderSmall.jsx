import { LoaderCircle } from "lucide-react";

const LoaderSmall = () => {
  return (
    <div className="flex justify-center">
      <LoaderCircle stroke="#20c997" size={48} className="animate-spin" />
    </div>
  );
};

export default LoaderSmall;
