import { useState, useRef } from "react";
import { createPortal } from "react-dom";

interface UnderDevelopmentTooltipProps {
    children: React.ReactNode;
    message?: string;
    position?: "above" | "below"; // 👈 same prop
}

const UnderDevelopmentTooltip = ({
    children,
    message = "🚧 This feature is still under development",
    position = "below",
}: UnderDevelopmentTooltipProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const targetRef = useRef<HTMLDivElement>(null);

    const isAbove = position === "above";

    const handleMouseEnter = () => {
        if (targetRef.current) {
            const rect = targetRef.current.getBoundingClientRect();
            setCoords({
                x: rect.left + rect.width / 2,
                y: isAbove ? rect.top : rect.bottom,
            });
            setIsHovered(true);
        }
    };

    return (
        <div
            ref={targetRef}
            className="inline-block" // remove relative; portal handles positioning
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
            {isHovered &&
                createPortal(
                    <div
                        className={`
              bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-md
              whitespace-nowrap z-[9999] animate-fadeIn
            `}
                        style={{
                            position: "absolute",
                            top: isAbove
                                ? coords.y + window.scrollY - 32 // small upward offset
                                : coords.y + window.scrollY + 8,
                            left: coords.x,
                            transform: "translateX(-50%)",
                        }}
                    >
                        {message}
                        <div
                            className={`
                absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45
                ${isAbove ? "top-full" : "-top-1"}
              `}
                        />
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default UnderDevelopmentTooltip;
