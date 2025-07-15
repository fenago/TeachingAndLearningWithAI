import { cn } from "@/lib/utils";
import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  children,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl",
        "border border-gray-200 dark:border-gray-800",
        "bg-white dark:bg-gray-900",
        "hover:shadow-xl transition-all duration-300",
        "p-4 md:p-6",
        className
      )}
    >
      {header && <div className="mb-4">{header}</div>}
      <div className="flex flex-col space-y-2">
        {icon && <div className="mb-2">{icon}</div>}
        {title && (
          <div className="font-bold text-lg md:text-xl text-gray-900 dark:text-gray-100">
            {title}
          </div>
        )}
        {description && (
          <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            {description}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
