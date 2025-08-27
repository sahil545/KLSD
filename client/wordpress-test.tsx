import React from "react";
import { createRoot } from "react-dom/client";

function TestApp() {
  console.log("=== KLSD DEBUG TEST APP ===");
  console.log("WordPress Data Available:", !!window.klsdData);
  console.log("Current Page:", window.klsdData?.currentPage);
  console.log("Full WordPress Data:", window.klsdData);

  return React.createElement(
    "div",
    {
      style: {
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        background: "#f0f9ff",
        border: "2px solid #0ea5e9",
        borderRadius: "8px",
        margin: "1rem",
      },
    },
    React.createElement(
      "h1",
      {
        style: { color: "#0369a1", marginBottom: "1rem" },
      },
      "🧪 KLSD React Test - SUCCESS!",
    ),

    React.createElement(
      "div",
      {
        style: {
          background: "white",
          padding: "1rem",
          borderRadius: "4px",
          marginBottom: "1rem",
        },
      },
      React.createElement("h3", null, "Debug Information:"),
      React.createElement(
        "p",
        null,
        React.createElement("strong", null, "WordPress Data Available: "),
        window.klsdData ? "✅ YES" : "❌ NO",
      ),
      React.createElement(
        "p",
        null,
        React.createElement("strong", null, "Current Page: "),
        window.klsdData?.currentPage || "Not Set",
      ),
      React.createElement(
        "p",
        null,
        React.createElement("strong", null, "Site URL: "),
        window.klsdData?.siteUrl || "Not Available",
      ),
      React.createElement(
        "p",
        null,
        React.createElement("strong", null, "API URL: "),
        window.klsdData?.apiUrl || "Not Available",
      ),
    ),

    React.createElement(
      "div",
      {
        style: {
          background: "#fef3c7",
          padding: "1rem",
          borderRadius: "4px",
          border: "1px solid #f59e0b",
        },
      },
      React.createElement("strong", null, "Next Steps:"),
      React.createElement(
        "ol",
        null,
        React.createElement(
          "li",
          null,
          "If you see this message - React is working! ✅",
        ),
        React.createElement("li", null, "Check the debug info above"),
        React.createElement("li", null, "Report back what you see"),
      ),
    ),

    React.createElement(
      "pre",
      {
        style: {
          background: "#1f2937",
          color: "#10b981",
          padding: "1rem",
          borderRadius: "4px",
          fontSize: "12px",
          overflow: "auto",
        },
      },
      JSON.stringify(window.klsdData, null, 2),
    ),
  );
}

function initTestApp() {
  console.log("=== KLSD DEBUGGING TEST ===");
  console.log("DOM Ready State:", document.readyState);
  console.log("WordPress Data:", window.klsdData);

  const rootElement = document.getElementById("klsd-react-root");

  if (!rootElement) {
    console.error("❌ Root element #klsd-react-root not found!");
    return;
  }

  console.log("✅ Root element found, mounting test app...");

  try {
    const root = createRoot(rootElement);
    root.render(React.createElement(TestApp));
    console.log("✅ Test app mounted successfully!");

    // Remove loading state
    setTimeout(() => {
      const loadingElement = rootElement.querySelector(".klsd-loading");
      if (loadingElement) {
        loadingElement.remove();
        console.log("✅ Loading state removed");
      }
    }, 500);
  } catch (error) {
    console.error("❌ Failed to mount test app:", error);
  }
}

// Initialize immediately if DOM is ready, otherwise wait
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTestApp);
} else {
  initTestApp();
}

export { TestApp, initTestApp };
