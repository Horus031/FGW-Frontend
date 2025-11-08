import { useEffect } from "react";

type Props = {
  visible: boolean;
  title: string;
  subtitle?: string;
  duration?: number; // ms
  onClose?: () => void;
};

const Toast = ({ visible, title, subtitle, duration = 3000, onClose }: Props) => {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(t);
  }, [visible, duration, onClose]);

  return (
    // fixed bottom-right container
    <div
      aria-hidden={!visible}
      className={`fixed right-6 bottom-6 z-50 transform transition-transform duration-300 ease-out ${
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="flex items-start gap-3 w-96 p-4 border-2 border-blue-400 bg-white rounded-md shadow-lg">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
          ✓
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm">{title}</div>
          {subtitle && <div className="text-xs text-gray-600 mt-1">{subtitle}</div>}
        </div>
      </div>
    </div>
  );
};

export default Toast;
