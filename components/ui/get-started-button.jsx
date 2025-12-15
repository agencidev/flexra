import { Button } from "./button";
import { ChevronRight } from "lucide-react";

export function GetStartedButton({ children = "Get Started", className = "", dark = false, ...props }) {
  const baseClasses = dark 
    ? "bg-gray-950 text-white hover:bg-gray-900" 
    : "bg-white text-gray-900 hover:bg-white/95";
  
  const iconBg = dark ? "bg-white/10" : "bg-black/10";
  
  return (
    <Button 
      className={`group relative overflow-hidden ${baseClasses} ${className}`} 
      size="lg" 
      {...props}
    >
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
        {children}
      </span>
      <i className={`absolute right-1 top-1 bottom-1 rounded-[100px] z-10 grid w-1/4 place-items-center transition-all duration-500 ${iconBg} group-hover:w-[calc(100%-0.5rem)] group-active:scale-95`}>
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      </i>
    </Button>
  );
}
