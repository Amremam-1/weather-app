import { cn } from "@/utils/cn";
import { ChangeEventHandler, FormEventHandler } from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
  className?: string;
  value: string;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
};

export default function SearchBox(props: Props) {
  return (
    <form
      onSubmit={props.onSubmit}
      className="flex items-center justify-between h-10"
    >
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search Location.."
        className={cn(
          "h-full px-3 text-sm py-2 w-[230px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-l-md",
          props.className
        )}
      />

      <button
        className="px-4 py-[9px] text-white focus:outline-none
                 bg-blue-500 hover:bg-blue-600 transition-all h-full rounded-r-md"
      >
        <IoSearch />
      </button>
    </form>
  );
}
