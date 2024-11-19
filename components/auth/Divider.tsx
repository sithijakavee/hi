
type Props = {};

const Divider = (props: Props) => {
  return (
    <div className="flex items-center justify-between w-full gap-2">
      <div className="w-full h-px bg-black" />
      <span className="font-semibold text-sm">OR</span>
      <div className="w-full h-px bg-black" />
    </div>
  );
};

export default Divider;
