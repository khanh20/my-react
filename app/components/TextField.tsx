type Props = {
  height?: string;
  width?: string;
  placeHolder: string;
  value?: string;
  onChange?: (value: string) => void;
};
const TextField = ({
  height = "40px",
  width = "40%",
  placeHolder,
  value,
  onChange,
}: Props) => {
  return (
    <>
      <input
        className="p-2 border border-gray-300 rounded-sm bg-gray-100"
        style={{ height, width }}
        placeholder={placeHolder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </>
  );
};

export default TextField;
