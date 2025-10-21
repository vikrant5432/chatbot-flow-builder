import type { Config } from "tailwindcss";
import plugin from "tailwindcss-animate";

export default {
  content: ["**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "var(--shadow-soft)",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-accent": "var(--gradient-accent)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
      },
    },
  },
  plugins: [plugin],
} satisfies Config;
