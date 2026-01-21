"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  icon,
  iconPosition = "right",
  type = "button",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all gap-2";

  const variants = {
    primary: "bg-black text-white hover:bg-hover",
    secondary:
      "border-2 border-black text-black hover:bg-black hover:text-white",
    ghost: "text-black hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const combinedClassName = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${className}
  `.trim();

  const content = (
    <>
      {icon && iconPosition === "left" && <i className={icon} />}
      {children}
      {icon && iconPosition === "right" && <i className={icon} />}
    </>
  );

  if (href && !disabled) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={fullWidth ? "w-full" : "inline-block"}
      >
        <Link href={href} className={combinedClassName}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={combinedClassName}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {content}
    </motion.button>
  );
}
