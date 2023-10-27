import { getMonth, months } from "@/utils/getMonth";
import AlertIcon from "@/assets/icons/alert.svg";
import DotsIcon from "@/assets/icons/dots.png";


interface MonthProps {
  className?: string;
  label: string;
  value: any;
  onChange: (value: any) => void;
  required?: boolean;
}

export function MonthInput({
  className,
  label,
  value,
  onChange,
  required = false,
}: MonthProps) {
  return (
    <label
      className={`${className} flex flex-col font-medium text-slate-900 text-base cursor-pointer capitalize`}
    >
      <span className="flex gap-[5px]">
        {required ? (
          <img className="mb-[1px]" src={AlertIcon} />
        ) : (
          <img className="w-[15px] h-[17px] mt-[2px]" src={DotsIcon} />
        )}
        {label}
      </span>
      <select
        className="h-10 font-normal rounded p-2.5 bg-slate-200 capitalize"
        onChange={e => onChange(getMonth(+e.target.value))}
        value={getMonth(value)}
        required={required}
      >
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
    </label>
  );
}
