import AlertIcon from "@/assets/icons/alert.svg";
import DotsIcon from "@/assets/icons/dots.png";

interface FieldsDescProps {
  className?: string;
}

export function FieldsDesc({ className }: FieldsDescProps) {
  return (
    <div className={`${className} flex flex-col gap-[13px]`}>
      <span className="flex gap-[7px]">
        <img src={AlertIcon} alt="Alert icons" />
        <p className="text-sm">campo obrigatório</p>
      </span>
      <span className="flex gap-[7px] ml-[2px]">
        <img className="w-[15px] h-[17px]" src={DotsIcon} alt="Dots icons" />
        <p className="text-sm">campo optativo</p>
      </span>
    </div>
  );
}
