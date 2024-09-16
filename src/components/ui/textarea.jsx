import { cn } from "@/lib/utils";
import React from "react";

const Textarea = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...otherProps}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };

