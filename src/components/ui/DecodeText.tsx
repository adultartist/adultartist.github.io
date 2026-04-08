"use client";
import { useState, useEffect, useRef } from 'react';

export default function DecodeText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text.replace(/./g, '#'));
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}:<>?~`-=[]\\;',./01";

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { 
        setIsVisible(true); 
        observer.disconnect(); 
      }
    }, { threshold: 0.1 });
    
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let iteration = 0;
    const step = Math.max(1, text.length / 30);
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((letter, index) => {
          if (index < Math.floor(iteration)) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += step;
    }, 40);
    return () => clearInterval(interval);
  }, [text, isVisible]);

  return <span ref={elementRef} className="font-mono">{displayText}</span>;
}
