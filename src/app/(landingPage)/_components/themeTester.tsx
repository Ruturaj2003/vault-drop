"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeTester() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="p-4 rounded-md border">
      <div className="mb-2">theme: {String(theme)}</div>
      <div className="mb-2">resolvedTheme: {String(resolvedTheme)}</div>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 border rounded"
          onClick={() => setTheme("light")}
        >
          Light
        </button>
        <button
          className="px-3 py-1 border rounded"
          onClick={() => setTheme("dark")}
        >
          Dark
        </button>
        <button
          className="px-3 py-1 border rounded"
          onClick={() => setTheme("system")}
        >
          System
        </button>
      </div>
    </div>
  );
}
