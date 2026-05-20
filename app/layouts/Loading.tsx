import { LoaderCircle } from "lucide-react";
import type { ReactElement } from "react";
import TextField from "~/components/TextField";

type Props = {
  loading?: boolean;
  children: ReactElement;
};
const LoadingLayout = ({ loading, children }: Props) => {
  return (
    <>
      {loading && (
        <div className="flex flex-1 justify-center items-center w-full">
          <LoaderCircle className="w-20 h-20 font-bold animate-spin" />
        </div>
      )}
      {!loading && children}
    </>
  );
};
export default LoadingLayout;
