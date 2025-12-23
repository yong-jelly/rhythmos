import index from "./index.html";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const processor = postcss([tailwindcss, autoprefixer]);

Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    // CSS 파일 처리 - PostCSS로 처리
    if (url.pathname.endsWith(".css")) {
      const cssPath = `./src${url.pathname}`;
      const file = Bun.file(cssPath);
      if (await file.exists()) {
        const css = await file.text();
        try {
          const result = await processor.process(css, { from: cssPath });
          return new Response(result.css, {
            headers: {
              "Content-Type": "text/css",
            },
          });
        } catch (error) {
          console.error("CSS 처리 오류:", error);
          return new Response(css, {
            headers: {
              "Content-Type": "text/css",
            },
          });
        }
      }
    }

    // HTML 파일 처리
    if (url.pathname === "/" || !url.pathname.includes(".")) {
      return new Response(index, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    }

    // 기타 정적 파일
    const file = Bun.file(`./src${url.pathname}`);
    if (await file.exists()) {
      return new Response(file);
    }

    // SPA fallback
    return new Response(index, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
  development: {
    hmr: true,
    console: true,
  },
});

console.log("🎵 Rhythm OS 개발 서버 시작: http://localhost:3000");

