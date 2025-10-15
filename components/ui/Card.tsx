import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'outline';
  className?: string;
}

export function Card({ 
  children, 
  variant = 'default',
  className,
  ...props 
}: CardProps) {
  const baseStyles = 'rounded-2xl p-6 transition-all duration-300';
  
  const variants = {
    default: 'bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:shadow-lg',
    gradient: 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:shadow-xl',
    outline: 'border border-white/10 hover:border-white/20 hover:bg-white/5',
  };

  return (
    <div 
      className={cn(
        'card',
        baseStyles,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

Card.Header = function CardHeader({ 
  title, 
  description, 
  icon,
  className 
}: CardHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5 pb-4", className)}>
      <div className="flex items-center gap-3">
        {icon && <div className="text-indigo-400">{icon}</div>}
        <h3 className="text-xl font-semibold leading-none tracking-tight text-white">
          {title}
        </h3>
      </div>
      {description && (
        <p className="text-sm text-slate-400">{description}</p>
      )}
    </div>
  );
};

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

Card.Content = function CardContent({ 
  children, 
  className 
}: CardContentProps) {
  return (
    <div className={cn("text-slate-300", className)}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

Card.Footer = function CardFooter({ 
  children, 
  className 
}: CardFooterProps) {
  return (
    <div className={cn("flex items-center pt-4 mt-auto", className)}>
      {children}
    </div>
  );
};

export default Card;
