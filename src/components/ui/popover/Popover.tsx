"use client";

import React, { useState, useRef, useEffect } from "react";

export interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  width?: number | string;
  arrow?: boolean;
  closeOnClickOutside?: boolean;
  triggerType?: "click" | "hover";
  className?: string;
  contentClassName?: string;
}

const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  position = "bottom",
  align = "center",
  width = "auto",
  arrow = true,
  closeOnClickOutside = true,
  triggerType = "click",
  className = "",
  contentClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Position styling
  const getPositionStyles = () => {
    const positionStyles = {
      top: { top: 0, left: 0, transform: "translateY(-100%)" },
      right: { top: 0, left: "100%" },
      bottom: { top: "100%", left: 0 },
      left: { top: 0, left: 0, transform: "translateX(-100%)" },
    };

    const alignStyles = {
      start: { transform: `${positionStyles[position].transform || ""}` },
      center: {
        transform: `${positionStyles[position].transform || ""} translateX(${
          position === "left" || position === "right" ? "0" : "-50%"
        })`,
        left: position === "top" || position === "bottom" ? "50%" : positionStyles[position].left,
      },
      end: {
        transform: `${positionStyles[position].transform || ""}`,
        left: position === "top" || position === "bottom" ? "auto" : positionStyles[position].left,
        right: position === "top" || position === "bottom" ? 0 : "auto",
      },
    };

    return {
      ...positionStyles[position],
      ...alignStyles[align],
    };
  };

  // Arrow position
  const getArrowStyles = () => {
    const baseStyles = "w-2 h-2 bg-white dark:bg-gray-800 transform rotate-45 absolute";
    const positionStyles = {
      top: "bottom-0 translate-y-1/2",
      right: "left-0 -translate-x-1/2",
      bottom: "top-0 -translate-y-1/2",
      left: "right-0 translate-x-1/2",
    };

    const alignStyles = {
      start: position === "left" || position === "right" ? "top-3" : "left-3",
      center:
        position === "left" || position === "right"
          ? "top-1/2 -translate-y-1/2"
          : "left-1/2 -translate-x-1/2",
      end: position === "left" || position === "right" ? "bottom-3" : "right-3",
    };

    return `${baseStyles} ${positionStyles[position]} ${alignStyles[align]}`;
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        closeOnClickOutside &&
        contentRef.current &&
        triggerRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeOnClickOutside]);

  // Handle hover events
  const handleMouseEnter = () => {
    if (triggerType === "hover") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerType === "hover") {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  };

  // Handle click event
  const handleClick = () => {
    if (triggerType === "click") {
      setIsOpen(!isOpen);
    }
  };

  // Handle content mouse events (for hover type)
  const handleContentMouseEnter = () => {
    if (triggerType === "hover" && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleContentMouseLeave = () => {
    if (triggerType === "hover") {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={handleClick} className={triggerType === "click" ? "cursor-pointer" : ""}>
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={contentRef}
          className={`absolute z-50 p-4 rounded-md shadow-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 ${contentClassName}`}
          style={{
            ...getPositionStyles(),
            width: typeof width === "number" ? `${width}px` : width,
            margin: position === "top" || position === "bottom" ? "8px 0" : "0 8px",
          }}
          onMouseEnter={handleContentMouseEnter}
          onMouseLeave={handleContentMouseLeave}
        >
          {arrow && <div className={getArrowStyles()} />}
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
