"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HintProps {
  children: React.ReactNode;
  description: string;
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
}

export const Hint = ({
  children,
  description,
  sideOffset = 0,
  side = "bottom",
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={sideOffset}
          side={side}
          className="text-xs max-w-[200px] break-words "
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
