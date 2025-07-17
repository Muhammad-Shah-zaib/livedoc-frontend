import { Loader2 } from "lucide-react";

type SpinnerProps = {
  spinnerColorClass?: string;
  opacity?: number;
};

function Spinner({
  spinnerColorClass = "text-blue-600",
  opacity = 0.4,
}: SpinnerProps) {
  return (
    <>
      <div
        className={`absolute inset-0 rounded-sm w-full h-full bg-black z-50`}
        style={{ opacity }}
      ></div>
      <div className="absolute inset-0 w-full h-full flex items-center justify-center z-50">
        <Loader2
          className={`h-10 w-10 animate-spin ${spinnerColorClass}`}
          absoluteStrokeWidth
        />
      </div>
    </>
  );
}

export default Spinner;
