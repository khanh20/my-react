import { LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";
type Props = {
  loading?: boolean;
  textButton?: string;
  color?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};
const ButtonField = ({ loading, textButton, color, onClick, type = "button" }: Props) => {
  return (
    <button
      type={type}
      className={`${color || "bg-black"} flex items-center gap-3 p-2.5 px-6 text-amber-50 rounded-sm font-bold cursor-pointer`}
      onClick={onClick}
      disabled={loading}
    >
      {loading && <LoaderCircle className="w-5 h-5 animate-spin" />}
      {textButton}
    </button>
  );
};
export default ButtonField;
