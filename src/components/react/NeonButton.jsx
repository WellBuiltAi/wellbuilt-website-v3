import React from 'react'
import { cn } from '../../lib/utils'
import { cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group text-foreground text-center rounded-full font-bold tracking-widest uppercase transition-all overflow-hidden",
    {
        variants: {
            variant: {
                default: "bg-[#B2851B] hover:bg-[#c29624] text-[#050505] border border-[#B2851B]/50 shadow-[0_0_20px_rgba(178,133,27,0.3)] hover:shadow-[0_0_40px_rgba(178,133,27,0.6)]",
                solid: "bg-[#B2851B] hover:bg-[#c29624] text-[#050505] border-transparent transition-all duration-200",
                ghost: "border-transparent bg-transparent hover:border-zinc-600 hover:bg-white/10 text-white",
            },
            size: {
                default: "px-9 py-4 text-sm",
                sm: "px-5 py-2.5 text-xs",
                lg: "px-12 py-5 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(
    ({ className, neon = true, size, variant, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size }), className)}
                ref={ref}
                {...props}
            >
                <span className={cn("absolute h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 top-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-white to-transparent hidden", neon && "block")} />
                <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
                <span className={cn("absolute group-hover:opacity-50 transition-all duration-500 ease-in-out inset-x-0 h-[2px] bottom-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-[#FFD700] to-transparent hidden", neon && "block")} />
            </button>
        );
    }
)

Button.displayName = 'Button';

export { Button, buttonVariants };
