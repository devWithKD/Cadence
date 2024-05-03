import { colors } from "../utils/categories";

export default function ColorSelector({
  color,
  onChange,
}: {
  color: string;
  onChange: (col: string) => void;
}) {
  return (
    <div className="w-full flex flex-wrap gap-2 justify-center items-center z-50">
      {colors.map((colorOp) => (
        <div
          className={`w-5 h-5 m-1.5 cursor-pointer rounded-full ${colorOp}-bg ${
            color == colorOp ? "border border-slate-900" : "border-none"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onChange(colorOp);
          }}
          key={colorOp}
        >{" "}</div>
      ))}
    </div>
  );
}
