"use client";
import { useEffect, useState } from "react";

export default function ThemeButton(){
  const [theme, setTheme] = useState("theme-dark");
  useEffect(() => {
    const saved = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'theme-dark' : 'theme-light');
    setTheme(saved);
    document.body.classList.remove('theme-light','theme-dark');
    document.body.classList.add(saved);
  }, []);
  const toggle = () => {
    const next = theme === 'theme-dark' ? 'theme-light' : 'theme-dark';
    setTheme(next);
    document.body.classList.remove('theme-light','theme-dark');
    document.body.classList.add(next);
    localStorage.setItem('theme', next);
  };
  return <button onClick={toggle} className="btn-primary text-sm" type="button">🌙/☀️</button>;
}
