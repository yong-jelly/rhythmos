import type { Preview } from "@storybook/react";
import "../src/app/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "375px",
            height: "812px",
          },
        },
        mobileLarge: {
          name: "Mobile Large",
          styles: {
            width: "414px",
            height: "896px",
          },
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
      },
      defaultViewport: "mobile",
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "oklch(0.97 0.008 85)" },
        { name: "dark", value: "oklch(0.14 0.008 60)" },
      ],
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.backgrounds?.value === "oklch(0.14 0.008 60)";
      return (
        <div className={isDark ? "dark" : ""}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;


