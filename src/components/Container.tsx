import { cn } from "@/utils/cn";

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full bg-white border py-4 rounded-lg shadow-sm",
        props.className
      )}
    />
  );
}
