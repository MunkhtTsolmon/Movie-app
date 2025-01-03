import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-[20px] h-[20px]" />
        <input
          type={type}
          className={cn(
            "flex h-10 w-[18rem] rounded-md  bg-background px-3 pl-10 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
          placeholder="Search"
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
