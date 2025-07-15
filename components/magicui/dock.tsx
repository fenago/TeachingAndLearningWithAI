"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React, { createContext, useContext, useRef, useState } from "react";
import { HTMLMotionProps, motion, MotionProps, useMotionValue, useSpring, useTransform } from "framer-motion";

interface DockContextType {
  mouseX: any;
}

const DOCK_CONTEXT = createContext<DockContextType | null>(null);

// Remove React.HTMLAttributes to avoid type conflicts with MotionProps
interface DockProps {
  children: React.ReactNode;
  direction?: "top" | "bottom" | "left" | "right" | "middle";
  gap?: number;
  className?: string;
}

const Dock = React.forwardRef<HTMLDivElement, DockProps & Omit<HTMLMotionProps<"div">, "children">>(
  ({ className, children, ...props }, ref) => {
    const mouseX = useMotionValue(Infinity);
    return (
      <DOCK_CONTEXT.Provider value={{ mouseX }}>
        <motion.div
          ref={ref}
          onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
            mouseX.set(e.pageX);
          }}
          onMouseLeave={() => mouseX.set(Infinity)}
          className={cn(
            "mx-auto flex h-16 items-end gap-4 rounded-2xl border bg-background/50 p-2 shadow-lg backdrop-blur-md",
            className
          )}
          {...props}
        >
          {children}
        </motion.div>
      </DOCK_CONTEXT.Provider>
    );
  }
);

Dock.displayName = "Dock";

interface DockIconProps {
  children: React.ReactNode;
  className?: string;
}

const DockIcon = ({ className, children, ...props }: DockIconProps & Omit<HTMLMotionProps<"div">, "children" | "style">) => {
  const ref = useRef(null);
  const { mouseX } = useContext(DOCK_CONTEXT) ?? { mouseX: useMotionValue(Infinity) };

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square w-10 cursor-pointer items-center justify-center rounded-full bg-neutral-400/10",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon };
