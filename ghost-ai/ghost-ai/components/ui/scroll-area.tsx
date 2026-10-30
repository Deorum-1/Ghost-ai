import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-xl border border-border-subtle bg-surface">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.ScrollBar
      orientation="horizontal"
      className="absolute left-0 top-0 flex w-full touch-none select-none transition-colors ease-in-out duration-200"
    >
      <ScrollAreaPrimitive.ScrollBarThumb className="flex-1 rounded-xl bg-accent-primary-dim" />
    </ScrollAreaPrimitive.ScrollBar>
    <ScrollAreaPrimitive.ScrollBar
      orientation="vertical"
      className="absolute right-0 top-0 flex h-full flex-col touch-none select-none transition-colors ease-in-out duration-200"
    >
      <ScrollAreaPrimitive.ScrollBarThumb className="flex-1 rounded-xl bg-accent-primary-dim" />
    </ScrollAreaPrimitive.ScrollBar>
    <ScrollAreaPrimitive.Corner className="bg-accent-primary-dim" />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

export { ScrollArea }
