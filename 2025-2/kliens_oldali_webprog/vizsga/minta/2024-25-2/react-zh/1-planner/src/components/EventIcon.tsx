// react-zh/1-planner/src/components/EventIcon.tsx
// Ezt a komponenst ne változtasd meg!
interface EventIconProps {
  handleClick: () => void;
  icon: string | undefined;
}

export function EventIcon({ handleClick, icon }: EventIconProps) {
  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer size-14 text-4xl hover:shadow-lg hover:scale-105 transition-shadow transition-translate active:scale-[103%] select-none active:bg-indigo-300 rounded-md items-center justify-center p-4 bg-indigo-200"
    >
      {icon}
    </div>
  );
}
