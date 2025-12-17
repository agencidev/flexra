import { Button } from "./button";
import { ChevronRight, Loader2 } from "lucide-react";

export function GetStartedButton({
  children = "Get Started",
  className = "",
  dark = false,
  loading = false,
  loadingText = "Skickar...",
  ...props
}) {
  const baseClasses = dark
    ? "bg-gray-950 text-white hover:bg-gray-900"
    : "bg-white text-gray-900 hover:bg-white/95";

  const iconBg = dark ? "bg-white/10" : "bg-black/10";

  return (
    <Button
      className={`group relative overflow-hidden ${baseClasses} ${className}`}
      size="lg"
      disabled={loading || props.disabled}
      {...props}
    >
      <span className={`mr-8 transition-opacity duration-500 ${loading ? "" : "group-hover:opacity-0"}`}>
        {loading ? loadingText : children}
      </span>
      <i className={`absolute right-1 top-1 bottom-1 rounded-[100px] z-10 grid w-1/4 place-items-center transition-all duration-500 ${iconBg} ${loading ? "" : "group-hover:w-[calc(100%-0.5rem)]"} group-active:scale-95`}>
        {loading ? (
          <Loader2 size={16} strokeWidth={2} className="animate-spin" aria-hidden="true" />
        ) : (
          <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
        )}
      </i>
    </Button>
  );
}
