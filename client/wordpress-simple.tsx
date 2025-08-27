import React from "react";
import ReactDOM from "react-dom/client";

function SimpleBlogPage() {
  return React.createElement(
    "div",
    {
      style: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      },
    },
    React.createElement(
      "header",
      {
        style: {
          background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
          color: "white",
          padding: "3rem 2rem",
          borderRadius: "12px",
          marginBottom: "3rem",
          textAlign: "center",
        },
      },
      React.createElement(
        "h1",
        {
          style: { fontSize: "3rem", marginBottom: "1rem", fontWeight: "bold" },
        },
        "Key Largo Scuba Diving Blog",
      ),
      React.createElement(
        "p",
        {
          style: { fontSize: "1.2rem", opacity: 0.9 },
        },
        "Your complete guide to scuba diving, snorkeling, and underwater adventures",
      ),
    ),

    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        },
      },
      // Blog Post 1
      React.createElement(
        "article",
        {
          style: {
            background: "white",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s",
            cursor: "pointer",
          },
        },
        React.createElement("img", {
          src: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=600",
          alt: "Scuba diving basics",
          style: { width: "100%", height: "200px", objectFit: "cover" },
        }),
        React.createElement(
          "div",
          { style: { padding: "1.5rem" } },
          React.createElement(
            "h3",
            {
              style: {
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                color: "#1f2937",
              },
            },
            "Scuba Diving Basics: What Every Beginner Should Know",
          ),
          React.createElement(
            "p",
            {
              style: {
                color: "#6b7280",
                marginBottom: "1rem",
                lineHeight: 1.6,
              },
            },
            "Learn the fundamental principles of scuba diving, from breathing techniques to underwater communication signals.",
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              },
            },
            React.createElement(
              "span",
              {
                style: {
                  background: "#dbeafe",
                  color: "#1e40af",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                },
              },
              "Scuba Diving 101",
            ),
            React.createElement(
              "button",
              {
                style: {
                  background: "#1e40af",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                },
              },
              "Read More",
            ),
          ),
        ),
      ),

      // Blog Post 2
      React.createElement(
        "article",
        {
          style: {
            background: "white",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s",
            cursor: "pointer",
          },
        },
        React.createElement("img", {
          src: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=600",
          alt: "Essential scuba equipment",
          style: { width: "100%", height: "200px", objectFit: "cover" },
        }),
        React.createElement(
          "div",
          { style: { padding: "1.5rem" } },
          React.createElement(
            "h3",
            {
              style: {
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                color: "#1f2937",
              },
            },
            "Essential Scuba Diving Equipment Guide",
          ),
          React.createElement(
            "p",
            {
              style: {
                color: "#6b7280",
                marginBottom: "1rem",
                lineHeight: 1.6,
              },
            },
            "A comprehensive guide to all the gear you need for safe and enjoyable scuba diving experiences.",
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              },
            },
            React.createElement(
              "span",
              {
                style: {
                  background: "#dcfce7",
                  color: "#166534",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                },
              },
              "Equipment Guide",
            ),
            React.createElement(
              "button",
              {
                style: {
                  background: "#1e40af",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                },
              },
              "Read More",
            ),
          ),
        ),
      ),

      // Blog Post 3
      React.createElement(
        "article",
        {
          style: {
            background: "white",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s",
            cursor: "pointer",
          },
        },
        React.createElement("img", {
          src: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=600",
          alt: "Christ of the Abyss tour",
          style: { width: "100%", height: "200px", objectFit: "cover" },
        }),
        React.createElement(
          "div",
          { style: { padding: "1.5rem" } },
          React.createElement(
            "h3",
            {
              style: {
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                color: "#1f2937",
              },
            },
            "Christ of the Abyss Snorkeling Adventure",
          ),
          React.createElement(
            "p",
            {
              style: {
                color: "#6b7280",
                marginBottom: "1rem",
                lineHeight: 1.6,
              },
            },
            "Experience the famous underwater Christ statue on our guided snorkeling tour in John Pennekamp Coral Reef State Park.",
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              },
            },
            React.createElement(
              "span",
              {
                style: {
                  background: "#fef3c7",
                  color: "#92400e",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                },
              },
              "Tours & Adventures",
            ),
            React.createElement(
              "button",
              {
                style: {
                  background: "#1e40af",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                },
                onClick: () => (window.location.href = "/christ-statue-tour"),
              },
              "Book Now",
            ),
          ),
        ),
      ),
    ),

    React.createElement(
      "footer",
      {
        style: {
          textAlign: "center",
          marginTop: "4rem",
          padding: "2rem",
          background: "#f9fafb",
          borderRadius: "8px",
        },
      },
      React.createElement(
        "h3",
        {
          style: {
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            color: "#1f2937",
          },
        },
        "Ready to Dive?",
      ),
      React.createElement(
        "p",
        {
          style: { color: "#6b7280", marginBottom: "1.5rem" },
        },
        "Book your scuba diving adventure in Key Largo today!",
      ),
      React.createElement(
        "button",
        {
          style: {
            background: "#059669",
            color: "white",
            border: "none",
            padding: "1rem 2rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1.1rem",
          },
        },
        "Contact Us: (305) 451-6322",
      ),
    ),
  );
}

function SimpleChristStatuePage() {
  return React.createElement(
    "div",
    {
      style: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      },
    },
    React.createElement(
      "header",
      {
        style: {
          background: "linear-gradient(135deg, #065f46 0%, #059669 100%)",
          color: "white",
          padding: "4rem 2rem",
          borderRadius: "12px",
          marginBottom: "3rem",
          textAlign: "center",
        },
      },
      React.createElement(
        "h1",
        {
          style: {
            fontSize: "3.5rem",
            marginBottom: "1rem",
            fontWeight: "bold",
          },
        },
        "Christ of the Abyss",
      ),
      React.createElement(
        "p",
        {
          style: { fontSize: "1.3rem", opacity: 0.9, marginBottom: "2rem" },
        },
        "Snorkeling Tour to the Famous Underwater Statue",
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          },
        },
        React.createElement(
          "button",
          {
            style: {
              background: "#fbbf24",
              color: "#92400e",
              border: "none",
              padding: "1rem 2rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.1rem",
            },
          },
          "Book Now - $75",
        ),
        React.createElement(
          "button",
          {
            style: {
              background: "transparent",
              color: "white",
              border: "2px solid white",
              padding: "1rem 2rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.1rem",
            },
          },
          "Learn More",
        ),
      ),
    ),

    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "3rem",
          marginBottom: "3rem",
        },
      },
      React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          {
            style: {
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "#1f2937",
            },
          },
          "Experience the Iconic Underwater Statue",
        ),
        React.createElement(
          "p",
          {
            style: {
              color: "#6b7280",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            },
          },
          "Join us for an unforgettable snorkeling adventure to see the famous Christ of the Abyss statue, a 9-foot tall bronze sculpture submerged in 25 feet of crystal-clear water in John Pennekamp Coral Reef State Park.",
        ),
        React.createElement(
          "p",
          {
            style: { color: "#6b7280", lineHeight: 1.8, marginBottom: "2rem" },
          },
          "This guided tour includes all snorkeling equipment, transportation to the reef, and expert instruction perfect for beginners and experienced snorkelers alike.",
        ),

        React.createElement(
          "h3",
          {
            style: {
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "#1f2937",
            },
          },
          "What's Included:",
        ),
        React.createElement(
          "ul",
          {
            style: { color: "#6b7280", lineHeight: 1.8, paddingLeft: "1.5rem" },
          },
          React.createElement(
            "li",
            null,
            "• Professional snorkeling equipment",
          ),
          React.createElement(
            "li",
            null,
            "• Boat transportation to Christ statue",
          ),
          React.createElement("li", null, "• Expert guide and safety briefing"),
          React.createElement("li", null, "• Underwater photography tips"),
          React.createElement("li", null, "• Light refreshments onboard"),
        ),
      ),

      React.createElement(
        "div",
        {
          style: {
            background: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
            height: "fit-content",
          },
        },
        React.createElement(
          "h3",
          {
            style: {
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              color: "#1f2937",
            },
          },
          "Book Your Adventure",
        ),
        React.createElement(
          "div",
          {
            style: { marginBottom: "1.5rem" },
          },
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              },
            },
            React.createElement(
              "span",
              { style: { fontWeight: "bold" } },
              "Adults:",
            ),
            React.createElement(
              "span",
              { style: { fontSize: "1.25rem", color: "#059669" } },
              "$75",
            ),
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              },
            },
            React.createElement(
              "span",
              { style: { fontWeight: "bold" } },
              "Children (6-12):",
            ),
            React.createElement(
              "span",
              { style: { fontSize: "1.25rem", color: "#059669" } },
              "$55",
            ),
          ),
          React.createElement(
            "div",
            {
              style: { display: "flex", justifyContent: "space-between" },
            },
            React.createElement(
              "span",
              { style: { fontWeight: "bold" } },
              "Duration:",
            ),
            React.createElement("span", null, "4 hours"),
          ),
        ),
        React.createElement(
          "button",
          {
            style: {
              width: "100%",
              background: "#059669",
              color: "white",
              border: "none",
              padding: "1rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.1rem",
              marginBottom: "1rem",
            },
          },
          "Reserve Your Spot",
        ),
        React.createElement(
          "p",
          {
            style: {
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#6b7280",
            },
          },
          "Call (305) 451-6322 for immediate booking",
        ),
      ),
    ),
  );
}

function WordPressApp() {
  const currentPage = window.klsdData?.currentPage || "blog";
  console.log("Simple WordPress App - Current Page:", currentPage);

  if (currentPage === "christ-statue-tour") {
    return SimpleChristStatuePage();
  }

  return SimpleBlogPage();
}

function initWordPressApp() {
  console.log("=== SIMPLE WORDPRESS REACT APP ===");
  console.log("Current Page:", window.klsdData?.currentPage);

  const rootElement = document.getElementById("klsd-react-root");

  if (!rootElement) {
    console.error("Root element not found");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(React.createElement(WordPressApp));
    console.log("Simple React app mounted successfully!");

    setTimeout(() => {
      const loadingElement = rootElement.querySelector(".klsd-loading");
      if (loadingElement) {
        loadingElement.remove();
      }
    }, 1000);
  } catch (error) {
    console.error("Failed to mount simple app:", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWordPressApp);
} else {
  initWordPressApp();
}
