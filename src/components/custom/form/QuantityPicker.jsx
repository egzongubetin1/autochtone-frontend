import { Minus, Plus } from "lucide-react";
import { ReactNode } from "react";

export default function QuantityPicker({
  value = 0,
  changeValue,
}) {
  function decreaseValue() {
    if (value > 1) changeValue(value - 1);
  }

  function increaseValue() {
    changeValue(value + 1);
  }

  return (
    <div className="grid grid-cols-4 bg-secondary text-white w-fit p-2 rounded-xl gap-2 items-center w-[120px]">
      <div
        className="cursor-pointer h-full w-full flex items-center select-none"
        onClick={decreaseValue}
      >
        <Minus size={12} />
      </div>
      <div className="col-span-2 text-center">{value}</div>
      <div
        className="cursor-pointer h-full w-full flex items-center select-none"
        onClick={increaseValue}
      >
        <Plus size={12} />
      </div>
    </div>
  );
}
