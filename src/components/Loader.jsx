import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed inset-0 w-dvw h-dvh bg-brand-500 flex justify-center items-center">
      <div className="animate-spin">
        <LoaderCircle stroke="#fff" size={120} />
      </div>
    </div>
  );
};

export default Loader;
