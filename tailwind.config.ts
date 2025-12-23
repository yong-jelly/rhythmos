// Tailwind CSS v4에서는 CSS에서 직접 설정하는 것이 권장됩니다.
// 이 파일은 tailwindcss-animate 플러그인을 위해 최소한으로 유지됩니다.
// 대부분의 설정은 src/app/styles/globals.css의 @theme 인라인 블록에서 관리됩니다.
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // Tailwind CSS v4에서는 darkMode가 CSS에서 처리됩니다 (@custom-variant dark)
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

