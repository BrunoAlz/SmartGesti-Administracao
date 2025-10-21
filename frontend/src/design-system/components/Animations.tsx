import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "../theme/classes";

// ================================
// TIPOS
// ================================

export interface AnimationProps {
  children: React.ReactNode;
  animation?: "fadeIn" | "fadeOut" | "slideIn" | "slideOut" | "scaleIn" | "scaleOut" | "bounce" | "shake" | "pulse" | "wiggle";
  duration?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  trigger?: "mount" | "hover" | "click" | "scroll";
  threshold?: number;
  once?: boolean;
}

export interface TransitionProps {
  children: React.ReactNode;
  show: boolean;
  animation?: "fade" | "slide" | "scale" | "flip";
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export interface StaggerProps {
  children: React.ReactNode[];
  stagger?: number;
  animation?: "fadeIn" | "slideIn" | "scaleIn";
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

// ================================
// COMPONENTE ANIMATION
// ================================

export const Animation: React.FC<AnimationProps> = ({
  children,
  animation = "fadeIn",
  duration = 300,
  delay = 0,
  direction = "up",
  className,
  trigger = "mount",
  threshold = 0.1,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(trigger === "mount");
  const elementRef = useRef<HTMLDivElement>(null);

  // Classes de animação
  const animationClasses = {
    fadeIn: "opacity-0",
    fadeOut: "opacity-100",
    slideIn: direction === "up" ? "translate-y-8" : direction === "down" ? "-translate-y-8" : direction === "left" ? "translate-x-8" : "-translate-x-8",
    slideOut: "translate-y-0 translate-x-0",
    scaleIn: "scale-0",
    scaleOut: "scale-100",
    bounce: "animate-bounce",
    shake: "animate-shake",
    pulse: "animate-pulse",
    wiggle: "animate-wiggle",
  };

  const activeClasses = {
    fadeIn: "opacity-100",
    fadeOut: "opacity-0",
    slideIn: "translate-y-0 translate-x-0",
    slideOut: direction === "up" ? "translate-y-8" : direction === "down" ? "-translate-y-8" : direction === "left" ? "translate-x-8" : "-translate-x-8",
    scaleIn: "scale-100",
    scaleOut: "scale-0",
    bounce: "animate-bounce",
    shake: "animate-shake",
    pulse: "animate-pulse",
    wiggle: "animate-wiggle",
  };

  // Intersection Observer para scroll trigger
  useEffect(() => {
    if (trigger !== "scroll" || !elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [trigger, threshold, once]);

  // Handlers para hover e click
  const handleMouseEnter = () => {
    if (trigger === "hover") {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    if (trigger === "click") {
      setIsVisible(!isVisible);
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        "transition-all ease-out",
        animationClasses[animation],
        isVisible && activeClasses[animation],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

// ================================
// COMPONENTE TRANSITION
// ================================

const Transition: React.FC<TransitionProps> = ({
  children,
  show,
  animation = "fade",
  duration = 300,
  direction = "up",
  className,
}) => {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    } else {
      // Aguardar a animação terminar antes de remover do DOM
      setTimeout(() => setShouldRender(false), duration);
    }
  }, [show, duration]);

  if (!shouldRender) return null;

  const animationClasses = {
    fade: show ? "opacity-100" : "opacity-0",
    slide: show 
      ? "translate-y-0 translate-x-0" 
      : direction === "up" 
        ? "translate-y-8" 
        : direction === "down" 
          ? "-translate-y-8" 
          : direction === "left" 
            ? "translate-x-8" 
            : "-translate-x-8",
    scale: show ? "scale-100" : "scale-0",
    flip: show ? "rotate-y-0" : "rotate-y-180",
  };

  return (
    <div
      className={cn(
        "transition-all ease-out",
        animationClasses[animation],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ================================
// COMPONENTE STAGGER
// ================================

const Stagger: React.FC<StaggerProps> = ({
  children,
  stagger = 100,
  animation = "fadeIn",
  direction = "up",
  className,
}) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <Animation
          key={index}
          animation={animation}
          delay={index * stagger}
          direction={direction}
        >
          {child}
        </Animation>
      ))}
    </div>
  );
};

// ================================
// COMPONENTE FADE IN
// ================================

interface FadeInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 300,
  delay = 0,
  className,
}) => {
  return (
    <Animation
      animation="fadeIn"
      duration={duration}
      delay={delay}
      className={className}
    >
      {children}
    </Animation>
  );
};

// ================================
// COMPONENTE SLIDE IN
// ================================

interface SlideInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  className?: string;
}

const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = "up",
  duration = 300,
  delay = 0,
  className,
}) => {
  return (
    <Animation
      animation="slideIn"
      direction={direction}
      duration={duration}
      delay={delay}
      className={className}
    >
      {children}
    </Animation>
  );
};

// ================================
// COMPONENTE SCALE IN
// ================================

interface ScaleInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  duration = 300,
  delay = 0,
  className,
}) => {
  return (
    <Animation
      animation="scaleIn"
      duration={duration}
      delay={delay}
      className={className}
    >
      {children}
    </Animation>
  );
};

// ================================
// COMPONENTE BOUNCE IN
// ================================

interface BounceInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

const BounceIn: React.FC<BounceInProps> = ({
  children,
  duration = 300,
  delay = 0,
  className,
}) => {
  return (
    <Animation
      animation="bounce"
      duration={duration}
      delay={delay}
      className={className}
    >
      {children}
    </Animation>
  );
};

// ================================
// COMPONENTE HOVER LIFT
// ================================

interface HoverLiftProps {
  children: React.ReactNode;
  className?: string;
}

const HoverLift: React.FC<HoverLiftProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "transition-transform duration-200 ease-out hover:scale-105 hover:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

// ================================
// COMPONENTE HOVER GLOW
// ================================

interface HoverGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const HoverGlow: React.FC<HoverGlowProps> = ({
  children,
  className,
  glowColor = "blue",
}) => {
  const glowClasses = {
    blue: "hover:shadow-blue-500/50",
    green: "hover:shadow-green-500/50",
    red: "hover:shadow-red-500/50",
    yellow: "hover:shadow-yellow-500/50",
    purple: "hover:shadow-purple-500/50",
  };

  return (
    <div
      className={cn(
        "transition-shadow duration-200 ease-out hover:shadow-xl",
        glowClasses[glowColor as keyof typeof glowClasses],
        className
      )}
    >
      {children}
    </div>
  );
};

// ================================
// COMPONENTE TYPING ANIMATION
// ================================

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  speed = 100,
  className,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// ================================
// COMPONENTE COUNTER ANIMATION
// ================================

interface CounterAnimationProps {
  end: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

const CounterAnimation: React.FC<CounterAnimationProps> = ({
  end,
  duration = 2000,
  className,
  prefix = "",
  suffix = "",
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return (
    <span className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

// ================================
// HOOK PARA ANIMAÇÕES
// ================================

const useAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = useCallback((duration = 300) => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), duration);
  }, []);

  return {
    isAnimating,
    triggerAnimation,
  };
};

// ================================
// UTILITÁRIOS DE ANIMAÇÃO
// ================================

const animationUtils = {
  // Easing functions
  easeInOut: (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeIn: (t: number): number => t * t,
  easeOut: (t: number): number => t * (2 - t),
  
  // Delay calculator
  calculateDelay: (index: number, stagger: number): number => index * stagger,
  
  // Duration calculator
  calculateDuration: (distance: number, speed: number = 1): number => distance / speed * 1000,
  
  // Random animation
  randomAnimation: (): AnimationProps["animation"] => {
    const animations: AnimationProps["animation"][] = [
      "fadeIn", "slideIn", "scaleIn", "bounce", "pulse"
    ];
    return animations[Math.floor(Math.random() * animations.length)]!;
  },
};

// ================================
// EXPORTS
// ================================

export default Animation;
export {
  Transition,
  Stagger,
  FadeIn,
  SlideIn,
  ScaleIn,
  BounceIn,
  HoverLift,
  HoverGlow,
  TypingAnimation,
  CounterAnimation,
  useAnimation,
  animationUtils,
};
