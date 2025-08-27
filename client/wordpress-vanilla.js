// Pure JavaScript React app - no JSX at all
(function () {
  "use strict";

  // Import React from globals (loaded by WordPress)
  const React = window.React;
  const ReactDOM = window.ReactDOM;

  if (!React || !ReactDOM) {
    console.error("React not found - make sure React is loaded");
    return;
  }

  const createElement = React.createElement;
  const createRoot = ReactDOM.createRoot;

  // Simple Blog Page Component
  function BlogPage() {
    return createElement(
      "div",
      {
        style: {
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#ffffff",
        },
      },
      [
        // Header
        createElement(
          "header",
          {
            key: "header",
            style: {
              background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
              color: "white",
              padding: "3rem 2rem",
              borderRadius: "12px",
              marginBottom: "3rem",
              textAlign: "center",
            },
          },
          [
            createElement(
              "h1",
              {
                key: "title",
                style: {
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                },
              },
              "Key Largo Scuba Diving Blog",
            ),
            createElement(
              "p",
              {
                key: "subtitle",
                style: { fontSize: "1.2rem", opacity: 0.9 },
              },
              "Your complete guide to scuba diving, snorkeling, and underwater adventures",
            ),
          ],
        ),

        // Blog Posts Grid
        createElement(
          "div",
          {
            key: "posts-grid",
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              marginBottom: "3rem",
            },
          },
          [
            // Blog Post 1
            createElement(
              "article",
              {
                key: "post-1",
                style: {
                  background: "white",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e5e7eb",
                },
              },
              [
                createElement("img", {
                  key: "img-1",
                  src: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                  alt: "Scuba diving basics",
                  style: { width: "100%", height: "200px", objectFit: "cover" },
                }),
                createElement(
                  "div",
                  {
                    key: "content-1",
                    style: { padding: "1.5rem" },
                  },
                  [
                    createElement(
                      "h3",
                      {
                        key: "title-1",
                        style: {
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          marginBottom: "0.5rem",
                          color: "#1f2937",
                        },
                      },
                      "Scuba Diving Basics: What Every Beginner Should Know",
                    ),
                    createElement(
                      "p",
                      {
                        key: "excerpt-1",
                        style: {
                          color: "#6b7280",
                          marginBottom: "1rem",
                          lineHeight: 1.6,
                        },
                      },
                      "Learn the fundamental principles of scuba diving, from breathing techniques to underwater communication signals.",
                    ),
                    createElement(
                      "div",
                      {
                        key: "meta-1",
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        },
                      },
                      [
                        createElement(
                          "span",
                          {
                            key: "category-1",
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
                        createElement(
                          "button",
                          {
                            key: "button-1",
                            style: {
                              background: "#1e40af",
                              color: "white",
                              border: "none",
                              padding: "0.5rem 1rem",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            },
                            onClick: function () {
                              window.location.href = "/scuba-diving-101";
                            },
                          },
                          "Read More",
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),

            // Blog Post 2
            createElement(
              "article",
              {
                key: "post-2",
                style: {
                  background: "white",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e5e7eb",
                },
              },
              [
                createElement("img", {
                  key: "img-2",
                  src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                  alt: "Essential scuba equipment",
                  style: { width: "100%", height: "200px", objectFit: "cover" },
                }),
                createElement(
                  "div",
                  {
                    key: "content-2",
                    style: { padding: "1.5rem" },
                  },
                  [
                    createElement(
                      "h3",
                      {
                        key: "title-2",
                        style: {
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          marginBottom: "0.5rem",
                          color: "#1f2937",
                        },
                      },
                      "Essential Scuba Diving Equipment Guide",
                    ),
                    createElement(
                      "p",
                      {
                        key: "excerpt-2",
                        style: {
                          color: "#6b7280",
                          marginBottom: "1rem",
                          lineHeight: 1.6,
                        },
                      },
                      "A comprehensive guide to all the gear you need for safe and enjoyable scuba diving experiences.",
                    ),
                    createElement(
                      "div",
                      {
                        key: "meta-2",
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        },
                      },
                      [
                        createElement(
                          "span",
                          {
                            key: "category-2",
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
                        createElement(
                          "button",
                          {
                            key: "button-2",
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
                      ],
                    ),
                  ],
                ),
              ],
            ),

            // Blog Post 3
            createElement(
              "article",
              {
                key: "post-3",
                style: {
                  background: "white",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e5e7eb",
                },
              },
              [
                createElement("img", {
                  key: "img-3",
                  src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                  alt: "Christ of the Abyss tour",
                  style: { width: "100%", height: "200px", objectFit: "cover" },
                }),
                createElement(
                  "div",
                  {
                    key: "content-3",
                    style: { padding: "1.5rem" },
                  },
                  [
                    createElement(
                      "h3",
                      {
                        key: "title-3",
                        style: {
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          marginBottom: "0.5rem",
                          color: "#1f2937",
                        },
                      },
                      "Christ of the Abyss Snorkeling Adventure",
                    ),
                    createElement(
                      "p",
                      {
                        key: "excerpt-3",
                        style: {
                          color: "#6b7280",
                          marginBottom: "1rem",
                          lineHeight: 1.6,
                        },
                      },
                      "Experience the famous underwater Christ statue on our guided snorkeling tour in John Pennekamp Coral Reef State Park.",
                    ),
                    createElement(
                      "div",
                      {
                        key: "meta-3",
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        },
                      },
                      [
                        createElement(
                          "span",
                          {
                            key: "category-3",
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
                        createElement(
                          "button",
                          {
                            key: "button-3",
                            style: {
                              background: "#059669",
                              color: "white",
                              border: "none",
                              padding: "0.5rem 1rem",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            },
                            onClick: function () {
                              window.location.href = "/christ-statue-tour";
                            },
                          },
                          "Book Tour",
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),

        // Footer CTA
        createElement(
          "footer",
          {
            key: "footer",
            style: {
              textAlign: "center",
              padding: "3rem 2rem",
              background: "#f9fafb",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            },
          },
          [
            createElement(
              "h3",
              {
                key: "footer-title",
                style: {
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  color: "#1f2937",
                },
              },
              "Ready to Explore the Underwater World?",
            ),
            createElement(
              "p",
              {
                key: "footer-text",
                style: {
                  color: "#6b7280",
                  marginBottom: "1.5rem",
                  fontSize: "1.1rem",
                },
              },
              "Book your scuba diving adventure in Key Largo today!",
            ),
            createElement(
              "div",
              {
                key: "footer-buttons",
                style: {
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                },
              },
              [
                createElement(
                  "button",
                  {
                    key: "phone-button",
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
                    onClick: function () {
                      window.location.href = "tel:+13054516322";
                    },
                  },
                  "Call: (305) 451-6322",
                ),
                createElement(
                  "button",
                  {
                    key: "contact-button",
                    style: {
                      background: "#1e40af",
                      color: "white",
                      border: "none",
                      padding: "1rem 2rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    },
                    onClick: function () {
                      window.location.href = "/contact";
                    },
                  },
                  "Contact Us",
                ),
              ],
            ),
          ],
        ),
      ],
    );
  }

  // Christ Statue Tour Page Component (matches actual ChristStatueTourNoSidebar design)
  function ChristStatueTourPage() {
    return createElement(
      "div",
      {
        style: { minHeight: "100vh", fontFamily: "Arial, sans-serif" },
      },
      [
        // Navigation (simplified)
        createElement(
          "nav",
          {
            key: "navigation",
            style: {
              background: "white",
              borderBottom: "1px solid #e5e7eb",
              padding: "1rem 0",
              position: "sticky",
              top: 0,
              zIndex: 50,
            },
          },
          [
            createElement(
              "div",
              {
                key: "nav-container",
                style: {
                  maxWidth: "1200px",
                  margin: "0 auto",
                  padding: "0 1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              },
              [
                createElement(
                  "div",
                  {
                    key: "logo",
                    style: {
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "#1e40af",
                    },
                  },
                  "Key Largo Scuba Diving",
                ),
                createElement(
                  "div",
                  {
                    key: "nav-links",
                    style: { display: "flex", gap: "2rem" },
                  },
                  [
                    createElement(
                      "a",
                      {
                        key: "link-1",
                        href: "/trips-tours",
                        style: {
                          color: "#374151",
                          textDecoration: "none",
                          fontWeight: "500",
                        },
                      },
                      "Trips & Tours",
                    ),
                    createElement(
                      "a",
                      {
                        key: "link-2",
                        href: "/certification",
                        style: {
                          color: "#374151",
                          textDecoration: "none",
                          fontWeight: "500",
                        },
                      },
                      "Certification",
                    ),
                    createElement(
                      "a",
                      {
                        key: "link-3",
                        href: "/blog",
                        style: {
                          color: "#374151",
                          textDecoration: "none",
                          fontWeight: "500",
                        },
                      },
                      "Blog",
                    ),
                    createElement(
                      "a",
                      {
                        key: "link-4",
                        href: "/contact",
                        style: {
                          color: "#374151",
                          textDecoration: "none",
                          fontWeight: "500",
                        },
                      },
                      "Contact",
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),

        // Tour Navigation
        createElement(
          "div",
          {
            key: "tour-nav",
            style: {
              background: "#f8fafc",
              padding: "0.75rem 0",
              borderBottom: "1px solid #e2e8f0",
            },
          },
          [
            createElement(
              "div",
              {
                key: "tour-nav-container",
                style: {
                  maxWidth: "1200px",
                  margin: "0 auto",
                  padding: "0 1rem",
                },
              },
              [
                createElement(
                  "nav",
                  {
                    key: "breadcrumb",
                    style: { fontSize: "0.875rem", color: "#64748b" },
                  },
                  "Snorkeling Tours / Christ of the Abyss",
                ),
              ],
            ),
          ],
        ),

        // Hero Section (matches WooCommerceHeroNoBooking)
        createElement(
          "section",
          {
            key: "hero",
            style: {
              position: "relative",
              background:
                "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0f766e 100%)",
              color: "white",
              minHeight: "70vh",
              display: "flex",
              alignItems: "center",
              backgroundImage:
                'url("https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=1200")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "overlay",
            },
          },
          [
            createElement("div", {
              key: "hero-overlay",
              style: {
                position: "absolute",
                inset: 0,
                background: "rgba(0, 0, 0, 0.4)",
              },
            }),
            createElement(
              "div",
              {
                key: "hero-container",
                style: {
                  position: "relative",
                  maxWidth: "1200px",
                  margin: "0 auto",
                  padding: "6rem 1rem 3rem",
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: "3rem",
                  alignItems: "center",
                },
              },
              [
                // Left Column - Content
                createElement(
                  "div",
                  {
                    key: "hero-content",
                  },
                  [
                    // Trust Badges
                    createElement(
                      "div",
                      {
                        key: "badges",
                        style: {
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                          marginBottom: "1.5rem",
                        },
                      },
                      [
                        createElement(
                          "span",
                          {
                            key: "badge-1",
                            style: {
                              background: "rgba(239, 68, 68, 0.2)",
                              color: "#fca5a5",
                              padding: "0.25rem 0.75rem",
                              borderRadius: "9999px",
                              fontSize: "0.875rem",
                              border: "1px solid rgba(239, 68, 68, 0.3)",
                            },
                          },
                          "⭐ Best of Florida Keys",
                        ),
                        createElement(
                          "span",
                          {
                            key: "badge-2",
                            style: {
                              background: "rgba(34, 197, 94, 0.2)",
                              color: "#86efac",
                              padding: "0.25rem 0.75rem",
                              borderRadius: "9999px",
                              fontSize: "0.875rem",
                              border: "1px solid rgba(34, 197, 94, 0.3)",
                            },
                          },
                          "🏆 #1 Rated Tour",
                        ),
                        createElement(
                          "span",
                          {
                            key: "badge-3",
                            style: {
                              background: "rgba(34, 197, 94, 0.2)",
                              color: "#86efac",
                              padding: "0.25rem 0.75rem",
                              borderRadius: "9999px",
                              fontSize: "0.875rem",
                              border: "1px solid rgba(34, 197, 94, 0.3)",
                            },
                          },
                          "✓ No Booking Fees",
                        ),
                      ],
                    ),

                    // Main Headline
                    createElement(
                      "h1",
                      {
                        key: "headline",
                        style: {
                          fontSize: "4rem",
                          fontWeight: "bold",
                          marginBottom: "1.5rem",
                          lineHeight: 1.1,
                        },
                      },
                      [
                        "Christ of the Abyss",
                        createElement(
                          "span",
                          {
                            key: "subtitle",
                            style: {
                              display: "block",
                              fontSize: "2.5rem",
                              marginTop: "0.5rem",
                            },
                          },
                          "Statue Snorkeling Tour",
                        ),
                      ],
                    ),

                    // Star Rating
                    createElement(
                      "div",
                      {
                        key: "rating",
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          marginBottom: "1.5rem",
                        },
                      },
                      [
                        createElement(
                          "div",
                          {
                            key: "stars",
                            style: { display: "flex", gap: "0.25rem" },
                          },
                          [
                            createElement(
                              "span",
                              { key: "s1", style: { color: "#fbbf24" } },
                              "★",
                            ),
                            createElement(
                              "span",
                              { key: "s2", style: { color: "#fbbf24" } },
                              "★",
                            ),
                            createElement(
                              "span",
                              { key: "s3", style: { color: "#fbbf24" } },
                              "★",
                            ),
                            createElement(
                              "span",
                              { key: "s4", style: { color: "#fbbf24" } },
                              "★",
                            ),
                            createElement(
                              "span",
                              { key: "s5", style: { color: "#fbbf24" } },
                              "★",
                            ),
                          ],
                        ),
                        createElement(
                          "span",
                          { key: "rating-text", style: { opacity: 0.9 } },
                          "4.9/5",
                        ),
                        createElement(
                          "span",
                          { key: "reviews", style: { opacity: 0.7 } },
                          "(487 reviews)",
                        ),
                      ],
                    ),

                    // Quick Info
                    createElement(
                      "div",
                      {
                        key: "quick-info",
                        style: {
                          display: "grid",
                          gridTemplateColumns: "repeat(4, 1fr)",
                          gap: "1rem",
                          marginBottom: "2rem",
                        },
                      },
                      [
                        createElement(
                          "div",
                          {
                            key: "info-1",
                            style: {
                              textAlign: "center",
                              background: "rgba(255, 255, 255, 0.1)",
                              borderRadius: "0.5rem",
                              padding: "0.75rem",
                              backdropFilter: "blur(4px)",
                            },
                          },
                          [
                            createElement(
                              "div",
                              {
                                key: "info-1-label",
                                style: {
                                  fontSize: "0.875rem",
                                  opacity: 0.9,
                                  marginBottom: "0.25rem",
                                },
                              },
                              "Duration",
                            ),
                            createElement(
                              "div",
                              {
                                key: "info-1-value",
                                style: { fontWeight: "600" },
                              },
                              "4 Hours",
                            ),
                          ],
                        ),
                        createElement(
                          "div",
                          {
                            key: "info-2",
                            style: {
                              textAlign: "center",
                              background: "rgba(255, 255, 255, 0.1)",
                              borderRadius: "0.5rem",
                              padding: "0.75rem",
                              backdropFilter: "blur(4px)",
                            },
                          },
                          [
                            createElement(
                              "div",
                              {
                                key: "info-2-label",
                                style: {
                                  fontSize: "0.875rem",
                                  opacity: 0.9,
                                  marginBottom: "0.25rem",
                                },
                              },
                              "Group Size",
                            ),
                            createElement(
                              "div",
                              {
                                key: "info-2-value",
                                style: { fontWeight: "600" },
                              },
                              "25 Max",
                            ),
                          ],
                        ),
                        createElement(
                          "div",
                          {
                            key: "info-3",
                            style: {
                              textAlign: "center",
                              background: "rgba(255, 255, 255, 0.1)",
                              borderRadius: "0.5rem",
                              padding: "0.75rem",
                              backdropFilter: "blur(4px)",
                            },
                          },
                          [
                            createElement(
                              "div",
                              {
                                key: "info-3-label",
                                style: {
                                  fontSize: "0.875rem",
                                  opacity: 0.9,
                                  marginBottom: "0.25rem",
                                },
                              },
                              "Location",
                            ),
                            createElement(
                              "div",
                              {
                                key: "info-3-value",
                                style: { fontWeight: "600" },
                              },
                              "Key Largo",
                            ),
                          ],
                        ),
                        createElement(
                          "div",
                          {
                            key: "info-4",
                            style: {
                              textAlign: "center",
                              background: "rgba(255, 255, 255, 0.1)",
                              borderRadius: "0.5rem",
                              padding: "0.75rem",
                              backdropFilter: "blur(4px)",
                            },
                          },
                          [
                            createElement(
                              "div",
                              {
                                key: "info-4-label",
                                style: {
                                  fontSize: "0.875rem",
                                  opacity: 0.9,
                                  marginBottom: "0.25rem",
                                },
                              },
                              "Price",
                            ),
                            createElement(
                              "div",
                              {
                                key: "info-4-value",
                                style: { fontWeight: "600" },
                              },
                              "From $70",
                            ),
                          ],
                        ),
                      ],
                    ),

                    // CTA Button
                    createElement(
                      "button",
                      {
                        key: "scroll-button",
                        style: {
                          background: "#f59e0b",
                          color: "#92400e",
                          border: "none",
                          padding: "1rem 2rem",
                          borderRadius: "0.5rem",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "1.125rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        },
                        onClick: function () {
                          const bookingSection =
                            document.getElementById("booking-section");
                          if (bookingSection) {
                            bookingSection.scrollIntoView({
                              behavior: "smooth",
                            });
                          }
                        },
                      },
                      [
                        "Book Your Adventure",
                        createElement(
                          "span",
                          { key: "arrow", style: { fontSize: "1.25rem" } },
                          "↓",
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),

        // Booking Section (matches SimpleBookingSection)
        createElement(
          "section",
          {
            key: "booking",
            id: "booking-section",
            style: {
              padding: "4rem 0",
              background: "white",
              borderTop: "1px solid #f3f4f6",
            },
          },
          [
            createElement(
              "div",
              {
                key: "booking-container",
                style: {
                  maxWidth: "1200px",
                  margin: "0 auto",
                  padding: "0 1rem",
                },
              },
              [
                // Header
                createElement(
                  "div",
                  {
                    key: "booking-header",
                    style: { textAlign: "center", marginBottom: "3rem" },
                  },
                  [
                    createElement(
                      "h2",
                      {
                        key: "booking-title",
                        style: {
                          fontSize: "2.25rem",
                          fontWeight: "bold",
                          color: "#111827",
                          marginBottom: "0.5rem",
                        },
                      },
                      "Book Your Experience",
                    ),
                    createElement(
                      "p",
                      {
                        key: "booking-subtitle",
                        style: { color: "#6b7280" },
                      },
                      "Starting at $70 per person • Free cancellation up to 24 hours",
                    ),
                  ],
                ),

                // Booking Grid
                createElement(
                  "div",
                  {
                    key: "booking-grid",
                    style: {
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr",
                      gap: "3rem",
                      maxWidth: "1000px",
                      margin: "0 auto",
                    },
                  },
                  [
                    // Left Side - Tour Details
                    createElement(
                      "div",
                      {
                        key: "tour-details",
                        style: {
                          background: "white",
                          padding: "2rem",
                          borderRadius: "0.75rem",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                          border: "1px solid #e5e7eb",
                        },
                      },
                      [
                        createElement(
                          "h3",
                          {
                            key: "details-title",
                            style: {
                              fontSize: "1.25rem",
                              fontWeight: "600",
                              color: "#111827",
                              marginBottom: "1.5rem",
                            },
                          },
                          "Tour Details",
                        ),
                        createElement(
                          "div",
                          {
                            key: "details-content",
                            style: { space: "1rem" },
                          },
                          [
                            createElement(
                              "p",
                              {
                                key: "description",
                                style: {
                                  color: "#6b7280",
                                  lineHeight: 1.6,
                                  marginBottom: "1rem",
                                },
                              },
                              "Experience the famous Christ of the Abyss statue, a 9-foot bronze sculpture submerged in John Pennekamp Coral Reef State Park.",
                            ),
                            createElement(
                              "div",
                              {
                                key: "includes-section",
                                style: { marginTop: "1.5rem" },
                              },
                              [
                                createElement(
                                  "h4",
                                  {
                                    key: "includes-title",
                                    style: {
                                      fontWeight: "600",
                                      color: "#111827",
                                      marginBottom: "0.75rem",
                                    },
                                  },
                                  "What's Included:",
                                ),
                                createElement(
                                  "ul",
                                  {
                                    key: "includes-list",
                                    style: {
                                      color: "#6b7280",
                                      lineHeight: 1.6,
                                    },
                                  },
                                  [
                                    createElement(
                                      "li",
                                      {
                                        key: "inc-1",
                                        style: { marginBottom: "0.25rem" },
                                      },
                                      "✓ All snorkeling equipment",
                                    ),
                                    createElement(
                                      "li",
                                      {
                                        key: "inc-2",
                                        style: { marginBottom: "0.25rem" },
                                      },
                                      "✓ Boat transportation",
                                    ),
                                    createElement(
                                      "li",
                                      {
                                        key: "inc-3",
                                        style: { marginBottom: "0.25rem" },
                                      },
                                      "✓ Expert guide & safety briefing",
                                    ),
                                    createElement(
                                      "li",
                                      {
                                        key: "inc-4",
                                        style: { marginBottom: "0.25rem" },
                                      },
                                      "✓ Underwater photos & tips",
                                    ),
                                    createElement(
                                      "li",
                                      {
                                        key: "inc-5",
                                        style: { marginBottom: "0.25rem" },
                                      },
                                      "✓ Light refreshments",
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),

                    // Right Side - Booking Card
                    createElement(
                      "div",
                      {
                        key: "booking-card",
                        style: {
                          background: "white",
                          padding: "2rem",
                          borderRadius: "0.75rem",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                          border: "1px solid #e5e7eb",
                          height: "fit-content",
                        },
                      },
                      [
                        createElement(
                          "h3",
                          {
                            key: "booking-card-title",
                            style: {
                              fontSize: "1.25rem",
                              fontWeight: "600",
                              color: "#111827",
                              marginBottom: "1.5rem",
                            },
                          },
                          "Reserve Your Spot",
                        ),

                        // Pricing
                        createElement(
                          "div",
                          {
                            key: "pricing",
                            style: {
                              marginBottom: "1.5rem",
                              padding: "1rem",
                              background: "#f9fafb",
                              borderRadius: "0.5rem",
                            },
                          },
                          [
                            createElement(
                              "div",
                              {
                                key: "adult-price",
                                style: {
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginBottom: "0.5rem",
                                },
                              },
                              [
                                createElement(
                                  "span",
                                  {
                                    key: "adult-label",
                                    style: { fontWeight: "500" },
                                  },
                                  "Adults:",
                                ),
                                createElement(
                                  "span",
                                  {
                                    key: "adult-amount",
                                    style: {
                                      fontSize: "1.125rem",
                                      color: "#059669",
                                      fontWeight: "600",
                                    },
                                  },
                                  "$70",
                                ),
                              ],
                            ),
                            createElement(
                              "div",
                              {
                                key: "child-price",
                                style: {
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginBottom: "0.5rem",
                                },
                              },
                              [
                                createElement(
                                  "span",
                                  {
                                    key: "child-label",
                                    style: { fontWeight: "500" },
                                  },
                                  "Children (6-12):",
                                ),
                                createElement(
                                  "span",
                                  {
                                    key: "child-amount",
                                    style: {
                                      fontSize: "1.125rem",
                                      color: "#059669",
                                      fontWeight: "600",
                                    },
                                  },
                                  "$50",
                                ),
                              ],
                            ),
                            createElement(
                              "div",
                              {
                                key: "duration-info",
                                style: {
                                  display: "flex",
                                  justifyContent: "space-between",
                                  borderTop: "1px solid #e5e7eb",
                                  paddingTop: "0.5rem",
                                  marginTop: "0.5rem",
                                },
                              },
                              [
                                createElement(
                                  "span",
                                  {
                                    key: "duration-label",
                                    style: { fontWeight: "500" },
                                  },
                                  "Duration:",
                                ),
                                createElement(
                                  "span",
                                  { key: "duration-value" },
                                  "4 hours",
                                ),
                              ],
                            ),
                          ],
                        ),

                        // Guest Count Selector (simplified)
                        createElement(
                          "div",
                          {
                            key: "guest-selector",
                            style: { marginBottom: "1.5rem" },
                          },
                          [
                            createElement(
                              "label",
                              {
                                key: "guest-label",
                                style: {
                                  display: "block",
                                  fontSize: "0.875rem",
                                  fontWeight: "500",
                                  color: "#374151",
                                  marginBottom: "0.5rem",
                                },
                              },
                              "Number of Guests:",
                            ),
                            createElement(
                              "div",
                              {
                                key: "guest-controls",
                                style: {
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "1rem",
                                  padding: "0.75rem",
                                  border: "1px solid #d1d5db",
                                  borderRadius: "0.375rem",
                                },
                              },
                              [
                                createElement(
                                  "button",
                                  {
                                    key: "minus-btn",
                                    style: {
                                      background: "#f3f4f6",
                                      border: "none",
                                      width: "2rem",
                                      height: "2rem",
                                      borderRadius: "0.25rem",
                                      cursor: "pointer",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    },
                                  },
                                  "−",
                                ),
                                createElement(
                                  "span",
                                  {
                                    key: "guest-count",
                                    style: {
                                      fontSize: "1.125rem",
                                      fontWeight: "500",
                                      minWidth: "2rem",
                                      textAlign: "center",
                                    },
                                  },
                                  "2",
                                ),
                                createElement(
                                  "button",
                                  {
                                    key: "plus-btn",
                                    style: {
                                      background: "#f3f4f6",
                                      border: "none",
                                      width: "2rem",
                                      height: "2rem",
                                      borderRadius: "0.25rem",
                                      cursor: "pointer",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    },
                                  },
                                  "+",
                                ),
                              ],
                            ),
                          ],
                        ),

                        // Total Price
                        createElement(
                          "div",
                          {
                            key: "total-price",
                            style: {
                              background: "#059669",
                              color: "white",
                              padding: "1rem",
                              borderRadius: "0.5rem",
                              marginBottom: "1rem",
                              textAlign: "center",
                            },
                          },
                          [
                            createElement(
                              "div",
                              {
                                key: "total-label",
                                style: {
                                  fontSize: "0.875rem",
                                  opacity: 0.9,
                                  marginBottom: "0.25rem",
                                },
                              },
                              "Total Price",
                            ),
                            createElement(
                              "div",
                              {
                                key: "total-amount",
                                style: {
                                  fontSize: "1.5rem",
                                  fontWeight: "bold",
                                },
                              },
                              "$140.00",
                            ),
                          ],
                        ),

                        // Reserve Button
                        createElement(
                          "button",
                          {
                            key: "reserve-btn",
                            style: {
                              width: "100%",
                              background: "#1e40af",
                              color: "white",
                              border: "none",
                              padding: "1rem",
                              borderRadius: "0.5rem",
                              cursor: "pointer",
                              fontWeight: "bold",
                              fontSize: "1.125rem",
                              marginBottom: "1rem",
                            },
                          },
                          "Reserve Your Spot",
                        ),

                        // Contact Info
                        createElement(
                          "p",
                          {
                            key: "contact-info",
                            style: {
                              textAlign: "center",
                              fontSize: "0.875rem",
                              color: "#6b7280",
                            },
                          },
                          "Call (305) 451-6322 for immediate booking",
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ],
    );
  }

  // EXACT ChristStatueTourNoSidebar Page Recreation - COMPLETE
  function ChristStatueTourNoSidebarPage() {
    return createElement(
      "div",
      {
        style: { minHeight: "100vh" },
      },
      [
        // Navigation Component - EXACT match
        createElement(
          "nav",
          {
            key: "navigation",
            style: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(59, 130, 246, 0.1)",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            },
          },
          [
            createElement(
              "div",
              {
                key: "nav-container",
                style: {
                  maxWidth: "1200px",
                  margin: "0 auto",
                  padding: "0 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "80px",
                },
              },
              [
                // Logo
                createElement(
                  "div",
                  {
                    key: "logo",
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    },
                  },
                  [
                    createElement("img", {
                      key: "logo-img",
                      src: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F078ec59be1b24e338d5a681cb34aad66?format=webp&width=800",
                      alt: "Key Largo Scuba Diving Logo",
                      style: { height: "48px", width: "auto" },
                    }),
                  ],
                ),

                // Desktop Navigation
                createElement(
                  "div",
                  {
                    key: "nav-menu",
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "2rem",
                      "@media (max-width: 1024px)": { display: "none" },
                    },
                  },
                  [
                    createElement(
                      "a",
                      {
                        key: "nav-1",
                        href: "/trips-tours",
                        style: {
                          color: "#374151",
                          textDecoration: "none",
                          fontWeight: "500",
                          transition: "color 0.2s",
                        },
                      },
                      "Trips & Tours",
                    ),
                    createElement(
                      "a",
                      {
                        key: "nav-2",
                        href: "/certification",
                        style: {
                          color: "#374151",
                          textDecoration: "none",
                          fontWeight: "500",
                          transition: "color 0.2s",
                        },
                      },
                      "Certification",
                    ),
                    createElement(
                      "a",
                      {
                        key: "nav-3",
                        href: "/dive-sites",
                        style: {
                          color: "#374151",
                          textDecoration: "none",
                          fontWeight: "500",
                          transition: "color 0.2s",
                        },
                      },
                      "Dive Sites",
                    ),
                    createElement(
                      "a",
                      {
                        key: "nav-4",
                        href: "/scuba-gear",
                        style: {
                          color: "#374151",
                          textDecoration: "none",
                          fontWeight: "500",
                          transition: "color 0.2s",
                        },
                      },
                      "Scuba Gear",
                    ),
                    createElement(
                      "a",
                      {
                        key: "nav-5",
                        href: "/contact",
                        style: {
                          color: "#374151",
                          textDecoration: "none",
                          fontWeight: "500",
                          transition: "color 0.2s",
                        },
                      },
                      "Contact",
                    ),
                  ],
                ),

                // Desktop CTA
                createElement(
                  "div",
                  {
                    key: "nav-cta",
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      "@media (max-width: 1024px)": { display: "none" },
                    },
                  },
                  [
                    createElement(
                      "div",
                      {
                        key: "nav-info",
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          fontSize: "0.875rem",
                          color: "#6b7280",
                        },
                      },
                      [
                        createElement(
                          "div",
                          {
                            key: "phone",
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: "0.25rem",
                            },
                          },
                          [
                            createElement("span", { key: "phone-icon" }, "📞"),
                            createElement(
                              "span",
                              { key: "phone-text" },
                              "(305) 555-DIVE",
                            ),
                          ],
                        ),
                        createElement(
                          "div",
                          {
                            key: "rating",
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: "0.25rem",
                            },
                          },
                          [
                            createElement(
                              "span",
                              { key: "star", style: { color: "#fb7185" } },
                              "★",
                            ),
                            createElement(
                              "span",
                              {
                                key: "rating-text",
                                style: { fontWeight: "500" },
                              },
                              "4.9/5",
                            ),
                          ],
                        ),
                      ],
                    ),
                    createElement(
                      "button",
                      {
                        key: "book-btn",
                        style: {
                          background: "#fb7185",
                          color: "white",
                          border: "none",
                          padding: "0.5rem 1rem",
                          borderRadius: "0.375rem",
                          fontWeight: "600",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          cursor: "pointer",
                        },
                      },
                      ["📅 Book Now"],
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
        // Hero Section - EXACT match to WooCommerceHeroNoBooking
        createElement(
          "section",
          {
            key: "hero",
            style: {
              position: "relative",
              background:
                "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0f766e 100%)",
              color: "white",
              overflow: "hidden",
            },
          },
          [
            // Background Image Layer
            createElement("div", {
              key: "bg-image",
              style: {
                position: "absolute",
                inset: 0,
                backgroundImage:
                  'url("https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=1200")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                opacity: 0.6,
              },
            }),

            // Background Overlay
            createElement("div", {
              key: "bg-overlay",
              style: {
                position: "absolute",
                inset: 0,
                background: "rgba(0, 0, 0, 0.4)",
              },
            }),

            // Background Effects
            createElement(
              "div",
              {
                key: "bg-effects",
                style: { position: "absolute", inset: 0 },
              },
              [
                createElement("div", {
                  key: "effect-1",
                  style: {
                    position: "absolute",
                    width: "384px",
                    height: "384px",
                    background: "rgba(94, 234, 212, 0.05)",
                    borderRadius: "50%",
                    top: "-192px",
                    right: "-192px",
                  },
                }),
                createElement("div", {
                  key: "effect-2",
                  style: {
                    position: "absolute",
                    width: "256px",
                    height: "256px",
                    background: "rgba(239, 68, 68, 0.1)",
                    borderRadius: "50%",
                    bottom: "-128px",
                    left: "-128px",
                  },
                }),
              ],
            ),

            // Main Content Container
            createElement(
              "div",
              {
                key: "hero-container",
                style: {
                  position: "relative",
                  maxWidth: "1200px",
                  margin: "0 auto",
                  padding: "8rem 1rem 4rem", // Increased top padding for fixed nav
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: "3rem",
                  alignItems: "center",
                },
              },
              [
                // Left Column - Content
                createElement(
                  "div",
                  {
                    key: "hero-content",
                  },
                  [
                    // Breadcrumb
                    createElement(
                      "nav",
                      {
                        key: "breadcrumb",
                        style: {
                          fontSize: "0.875rem",
                          color: "rgba(94, 234, 212, 0.7)",
                          marginBottom: "1rem",
                        },
                      },
                      [
                        createElement(
                          "span",
                          { key: "tours" },
                          "Snorkeling Tours",
                        ),
                        " / ",
                        createElement(
                          "span",
                          { key: "current", style: { color: "#5eead4" } },
                          "Christ of the Abyss",
                        ),
                      ],
                    ),

                    // Trust Badges
                    createElement(
                      "div",
                      {
                        key: "badges",
                        style: {
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                          marginBottom: "1.5rem",
                        },
                      },
                      [
                        createElement(
                          "span",
                          {
                            key: "badge-1",
                            style: {
                              background: "rgba(239, 68, 68, 0.2)",
                              color: "#f87171",
                              border: "1px solid rgba(239, 68, 68, 0.3)",
                              padding: "0.25rem 0.75rem",
                              borderRadius: "9999px",
                              fontSize: "0.875rem",
                            },
                          },
                          "⭐ Best of Florida Keys",
                        ),
                        createElement(
                          "span",
                          {
                            key: "badge-2",
                            style: {
                              background: "rgba(94, 234, 212, 0.2)",
                              color: "#5eead4",
                              border: "1px solid rgba(94, 234, 212, 0.3)",
                              padding: "0.25rem 0.75rem",
                              borderRadius: "9999px",
                              fontSize: "0.875rem",
                            },
                          },
                          "🏆 #1 Rated Tour",
                        ),
                        createElement(
                          "span",
                          {
                            key: "badge-3",
                            style: {
                              background: "rgba(34, 197, 94, 0.2)",
                              color: "#86efac",
                              border: "1px solid rgba(34, 197, 94, 0.3)",
                              padding: "0.25rem 0.75rem",
                              borderRadius: "9999px",
                              fontSize: "0.875rem",
                            },
                          },
                          "✓ No Booking Fees",
                        ),
                      ],
                    ),

                    // Main Headline - EXACT match
                    createElement(
                      "h1",
                      {
                        key: "headline",
                        style: {
                          fontSize: "4rem",
                          fontWeight: "bold",
                          marginBottom: "1.5rem",
                          lineHeight: 1.1,
                          color: "white",
                        },
                      },
                      [
                        "Christ of the Abyss",
                        createElement(
                          "span",
                          {
                            key: "subtitle",
                            style: {
                              display: "block",
                              fontSize: "2.5rem",
                              marginTop: "0.5rem",
                              color: "white",
                            },
                          },
                          "Statue Snorkeling Tour",
                        ),
                      ],
                    ),

                    // Star Rating - EXACT match
                    createElement(
                      "div",
                      {
                        key: "rating",
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          marginBottom: "1.5rem",
                        },
                      },
                      [
                        createElement(
                          "div",
                          {
                            key: "stars",
                            style: { display: "flex", gap: "0.25rem" },
                          },
                          [
                            createElement(
                              "span",
                              {
                                key: "s1",
                                style: {
                                  color: "#fbbf24",
                                  fontSize: "1.25rem",
                                },
                              },
                              "★",
                            ),
                            createElement(
                              "span",
                              {
                                key: "s2",
                                style: {
                                  color: "#fbbf24",
                                  fontSize: "1.25rem",
                                },
                              },
                              "★",
                            ),
                            createElement(
                              "span",
                              {
                                key: "s3",
                                style: {
                                  color: "#fbbf24",
                                  fontSize: "1.25rem",
                                },
                              },
                              "★",
                            ),
                            createElement(
                              "span",
                              {
                                key: "s4",
                                style: {
                                  color: "#fbbf24",
                                  fontSize: "1.25rem",
                                },
                              },
                              "★",
                            ),
                            createElement(
                              "span",
                              {
                                key: "s5",
                                style: {
                                  color: "#fbbf24",
                                  fontSize: "1.25rem",
                                },
                              },
                              "★",
                            ),
                          ],
                        ),
                        createElement(
                          "span",
                          {
                            key: "rating-text",
                            style: { color: "rgba(94, 234, 212, 0.9)" },
                          },
                          "4.9/5",
                        ),
                        createElement(
                          "span",
                          {
                            key: "reviews",
                            style: { color: "rgba(94, 234, 212, 0.7)" },
                          },
                          "(487 reviews)",
                        ),
                      ],
                    ),

                    // Quick Info Grid - EXACT match
                    createElement(
                      "div",
                      {
                        key: "quick-info",
                        style: {
                          display: "grid",
                          gridTemplateColumns: "repeat(4, 1fr)",
                          gap: "1rem",
                          marginBottom: "2rem",
                        },
                      },
                      [
                        createElement(
                          "div",
                          {
                            key: "info-1",
                            style: {
                              textAlign: "center",
                              background: "rgba(94, 234, 212, 0.1)",
                              borderRadius: "0.5rem",
                              padding: "0.75rem",
                              backdropFilter: "blur(4px)",
                            },
                          },
                          [
                            createElement(
                              "div",
                              {
                                key: "icon-1",
                                style: {
                                  fontSize: "1.25rem",
                                  color: "#fb7185",
                                  marginBottom: "0.5rem",
                                },
                              },
                              "🕐",
                            ),
                            createElement(
                              "div",
                              {
                                key: "label-1",
                                style: {
                                  fontSize: "0.875rem",
                                  color: "rgba(94, 234, 212, 0.9)",
                                  marginBottom: "0.25rem",
                                },
                              },
                              "Duration",
                            ),
                            createElement(
                              "div",
                              {
                                key: "value-1",
                                style: { fontWeight: "600" },
                              },
                              "4 Hours",
                            ),
                          ],
                        ),
                        createElement(
                          "div",
                          {
                            key: "info-2",
                            style: {
                              textAlign: "center",
                              background: "rgba(94, 234, 212, 0.1)",
                              borderRadius: "0.5rem",
                              padding: "0.75rem",
                              backdropFilter: "blur(4px)",
                            },
                          },
                          [
                            createElement(
                              "div",
                              {
                                key: "icon-2",
                                style: {
                                  fontSize: "1.25rem",
                                  color: "#fb7185",
                                  marginBottom: "0.5rem",
                                },
                              },
                              "👥",
                            ),
                            createElement(
                              "div",
                              {
                                key: "label-2",
                                style: {
                                  fontSize: "0.875rem",
                                  color: "rgba(94, 234, 212, 0.9)",
                                  marginBottom: "0.25rem",
                                },
                              },
                              "Group Size",
                            ),
                            createElement(
                              "div",
                              {
                                key: "value-2",
                                style: { fontWeight: "600" },
                              },
                              "25 Max",
                            ),
                          ],
                        ),
                        createElement(
                          "div",
                          {
                            key: "info-3",
                            style: {
                              textAlign: "center",
                              background: "rgba(94, 234, 212, 0.1)",
                              borderRadius: "0.5rem",
                              padding: "0.75rem",
                              backdropFilter: "blur(4px)",
                            },
                          },
                          [
                            createElement(
                              "div",
                              {
                                key: "icon-3",
                                style: {
                                  fontSize: "1.25rem",
                                  color: "#fb7185",
                                  marginBottom: "0.5rem",
                                },
                              },
                              "📍",
                            ),
                            createElement(
                              "div",
                              {
                                key: "label-3",
                                style: {
                                  fontSize: "0.875rem",
                                  color: "rgba(94, 234, 212, 0.9)",
                                  marginBottom: "0.25rem",
                                },
                              },
                              "Location",
                            ),
                            createElement(
                              "div",
                              {
                                key: "value-3",
                                style: { fontWeight: "600" },
                              },
                              "Key Largo",
                            ),
                          ],
                        ),
                        createElement(
                          "div",
                          {
                            key: "info-4",
                            style: {
                              textAlign: "center",
                              background: "rgba(94, 234, 212, 0.1)",
                              borderRadius: "0.5rem",
                              padding: "0.75rem",
                              backdropFilter: "blur(4px)",
                            },
                          },
                          [
                            createElement(
                              "div",
                              {
                                key: "icon-4",
                                style: {
                                  fontSize: "1.25rem",
                                  color: "#fb7185",
                                  marginBottom: "0.5rem",
                                },
                              },
                              "🛡️",
                            ),
                            createElement(
                              "div",
                              {
                                key: "label-4",
                                style: {
                                  fontSize: "0.875rem",
                                  color: "rgba(94, 234, 212, 0.9)",
                                  marginBottom: "0.25rem",
                                },
                              },
                              "Gear",
                            ),
                            createElement(
                              "div",
                              {
                                key: "value-4",
                                style: { fontWeight: "600" },
                              },
                              "Included",
                            ),
                          ],
                        ),
                      ],
                    ),

                    // Key Selling Points - EXACT match
                    createElement(
                      "div",
                      {
                        key: "selling-points",
                        style: { marginBottom: "2rem" },
                      },
                      [
                        createElement(
                          "div",
                          {
                            key: "point-1",
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                              marginBottom: "0.75rem",
                            },
                          },
                          [
                            createElement(
                              "span",
                              {
                                key: "check-1",
                                style: {
                                  color: "#fb7185",
                                  fontSize: "1.25rem",
                                  flexShrink: 0,
                                },
                              },
                              "✓",
                            ),
                            createElement(
                              "span",
                              {
                                key: "text-1",
                                style: { color: "rgba(94, 234, 212, 0.9)" },
                              },
                              "Famous 9-foot bronze Christ statue in 25 feet of crystal-clear water",
                            ),
                          ],
                        ),
                        createElement(
                          "div",
                          {
                            key: "point-2",
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                              marginBottom: "0.75rem",
                            },
                          },
                          [
                            createElement(
                              "span",
                              {
                                key: "check-2",
                                style: {
                                  color: "#fb7185",
                                  fontSize: "1.25rem",
                                  flexShrink: 0,
                                },
                              },
                              "✓",
                            ),
                            createElement(
                              "span",
                              {
                                key: "text-2",
                                style: { color: "rgba(94, 234, 212, 0.9)" },
                              },
                              "All snorkeling equipment included - mask, fins, snorkel, vest",
                            ),
                          ],
                        ),
                        createElement(
                          "div",
                          {
                            key: "point-3",
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                              marginBottom: "0.75rem",
                            },
                          },
                          [
                            createElement(
                              "span",
                              {
                                key: "check-3",
                                style: {
                                  color: "#fb7185",
                                  fontSize: "1.25rem",
                                  flexShrink: 0,
                                },
                              },
                              "✓",
                            ),
                            createElement(
                              "span",
                              {
                                key: "text-3",
                                style: { color: "rgba(94, 234, 212, 0.9)" },
                              },
                              "PADI certified guides & marine life education",
                            ),
                          ],
                        ),
                        createElement(
                          "div",
                          {
                            key: "point-4",
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                              marginBottom: "0.75rem",
                            },
                          },
                          [
                            createElement(
                              "span",
                              {
                                key: "check-4",
                                style: {
                                  color: "#fb7185",
                                  fontSize: "1.25rem",
                                  flexShrink: 0,
                                },
                              },
                              "✓",
                            ),
                            createElement(
                              "span",
                              {
                                key: "text-4",
                                style: { color: "rgba(94, 234, 212, 0.9)" },
                              },
                              "Free parking at John Pennekamp Coral Reef State Park",
                            ),
                          ],
                        ),
                      ],
                    ),

                    // Urgency Message - EXACT match
                    createElement(
                      "div",
                      {
                        key: "urgency",
                        style: { marginBottom: "1.5rem", fontSize: "0.875rem" },
                      },
                      [
                        createElement(
                          "div",
                          {
                            key: "urgency-header",
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginBottom: "0.25rem",
                            },
                          },
                          [
                            createElement(
                              "span",
                              {
                                key: "alert-icon",
                                style: { color: "#fdba74" },
                              },
                              "⚠️",
                            ),
                            createElement(
                              "span",
                              {
                                key: "urgency-text",
                                style: { fontWeight: "600", color: "white" },
                              },
                              "Trips Sell Out",
                            ),
                          ],
                        ),
                        createElement(
                          "div",
                          {
                            key: "urgency-sub",
                            style: {
                              color: "rgba(94, 234, 212, 0.8)",
                              marginLeft: "1.5rem",
                              marginBottom: "0.25rem",
                            },
                          },
                          "Book in advance to secure your spots",
                        ),
                        createElement(
                          "div",
                          {
                            key: "urgency-cancel",
                            style: { color: "#86efac", marginLeft: "1.5rem" },
                          },
                          "✓ Easy Cancellation & Reschedule",
                        ),
                      ],
                    ),

                    // CTA Button - EXACT match
                    createElement(
                      "button",
                      {
                        key: "cta-button",
                        style: {
                          background: "#f97316",
                          color: "white",
                          fontWeight: "bold",
                          padding: "1rem 2rem",
                          fontSize: "1.125rem",
                          borderRadius: "0.75rem",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        },
                        onClick: function () {
                          const bookingSection =
                            document.getElementById("booking-section");
                          if (bookingSection) {
                            bookingSection.scrollIntoView({
                              behavior: "smooth",
                            });
                          }
                        },
                      },
                      [
                        "Book Your Adventure Now",
                        createElement(
                          "span",
                          { key: "arrow", style: { fontSize: "1.25rem" } },
                          "↓",
                        ),
                      ],
                    ),
                  ],
                ),

                // Right Column - Empty (as per no sidebar design)
                createElement("div", {
                  key: "right-empty",
                  style: { display: "none" },
                }),
              ],
            ),
          ],
        ),

        // SimpleTourNavigation (sticky tour nav)
        createElement(
          "div",
          {
            key: "tour-nav",
            style: {
              position: "sticky",
              top: "80px",
              zIndex: 40,
              background: "rgba(248, 250, 252, 0.95)",
              backdropFilter: "blur(8px)",
              borderBottom: "1px solid #e2e8f0",
              padding: "0.75rem 0",
            },
          },
          [
            createElement(
              "div",
              {
                key: "tour-nav-container",
                style: {
                  maxWidth: "1200px",
                  margin: "0 auto",
                  padding: "0 1rem",
                  display: "flex",
                  gap: "1rem",
                  overflowX: "auto",
                },
              },
              [
                createElement(
                  "button",
                  {
                    key: "nav-overview",
                    style: {
                      background: "transparent",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.375rem",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      whiteSpace: "nowrap",
                    },
                    onClick: function () {
                      document
                        .getElementById("overview")
                        ?.scrollIntoView({ behavior: "smooth" });
                    },
                  },
                  "🗺️ Overview",
                ),
                createElement(
                  "button",
                  {
                    key: "nav-journey",
                    style: {
                      background: "transparent",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.375rem",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      whiteSpace: "nowrap",
                    },
                    onClick: function () {
                      document
                        .getElementById("journey")
                        ?.scrollIntoView({ behavior: "smooth" });
                    },
                  },
                  "➡️ Your Journey",
                ),
                createElement(
                  "button",
                  {
                    key: "nav-marine",
                    style: {
                      background: "transparent",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.375rem",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      whiteSpace: "nowrap",
                    },
                    onClick: function () {
                      document
                        .getElementById("marine-life")
                        ?.scrollIntoView({ behavior: "smooth" });
                    },
                  },
                  "🐠 Marine Life",
                ),
                createElement(
                  "button",
                  {
                    key: "nav-why",
                    style: {
                      background: "transparent",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.375rem",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      whiteSpace: "nowrap",
                    },
                    onClick: function () {
                      document
                        .getElementById("why-us")
                        ?.scrollIntoView({ behavior: "smooth" });
                    },
                  },
                  "🏆 Why Us",
                ),
                createElement(
                  "button",
                  {
                    key: "nav-book",
                    style: {
                      background: "#1e40af",
                      color: "white",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.375rem",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    },
                    onClick: function () {
                      document
                        .getElementById("booking-section")
                        ?.scrollIntoView({ behavior: "smooth" });
                    },
                  },
                  "📅 Book Now",
                ),
              ],
            ),
          ],
        ),

        // Modern Tour Content Sections
        createElement(
          "section",
          {
            key: "overview",
            id: "overview",
            style: {
              padding: "4rem 0",
              background: "white",
            },
          },
          [
            createElement(
              "div",
              {
                key: "overview-container",
                style: {
                  maxWidth: "1200px",
                  margin: "0 auto",
                  padding: "0 1rem",
                },
              },
              [
                createElement(
                  "div",
                  {
                    key: "overview-content",
                    style: {
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr",
                      gap: "3rem",
                      alignItems: "start",
                    },
                  },
                  [
                    createElement(
                      "div",
                      {
                        key: "overview-text",
                      },
                      [
                        createElement(
                          "h2",
                          {
                            key: "overview-title",
                            style: {
                              fontSize: "2.25rem",
                              fontWeight: "bold",
                              color: "#111827",
                              marginBottom: "1.5rem",
                            },
                          },
                          "About This Experience",
                        ),
                        createElement(
                          "p",
                          {
                            key: "overview-p1",
                            style: {
                              color: "#6b7280",
                              lineHeight: 1.7,
                              marginBottom: "1.5rem",
                              fontSize: "1.125rem",
                            },
                          },
                          "Discover the iconic Christ of the Abyss statue, a magnificent 9-foot bronze sculpture resting 25 feet beneath the crystal-clear waters of John Pennekamp Coral Reef State Park.",
                        ),
                        createElement(
                          "p",
                          {
                            key: "overview-p2",
                            style: {
                              color: "#6b7280",
                              lineHeight: 1.7,
                              marginBottom: "1.5rem",
                              fontSize: "1.125rem",
                            },
                          },
                          "This unforgettable snorkeling adventure combines spiritual wonder with marine exploration, perfect for beginners and experienced snorkelers alike.",
                        ),
                      ],
                    ),
                    createElement(
                      "div",
                      {
                        key: "overview-image",
                        style: {
                          background:
                            "linear-gradient(135deg, #1e40af, #0f766e)",
                          borderRadius: "1rem",
                          padding: "2rem",
                          textAlign: "center",
                          color: "white",
                        },
                      },
                      [
                        createElement(
                          "div",
                          {
                            key: "stat-1",
                            style: { marginBottom: "1rem" },
                          },
                          [
                            createElement(
                              "div",
                              {
                                key: "stat-1-number",
                                style: {
                                  fontSize: "2.5rem",
                                  fontWeight: "bold",
                                  marginBottom: "0.25rem",
                                },
                              },
                              "25ft",
                            ),
                            createElement(
                              "div",
                              {
                                key: "stat-1-label",
                                style: { opacity: 0.9 },
                              },
                              "Crystal Clear Water",
                            ),
                          ],
                        ),
                        createElement(
                          "div",
                          {
                            key: "stat-2",
                            style: { marginBottom: "1rem" },
                          },
                          [
                            createElement(
                              "div",
                              {
                                key: "stat-2-number",
                                style: {
                                  fontSize: "2.5rem",
                                  fontWeight: "bold",
                                  marginBottom: "0.25rem",
                                },
                              },
                              "9ft",
                            ),
                            createElement(
                              "div",
                              {
                                key: "stat-2-label",
                                style: { opacity: 0.9 },
                              },
                              "Bronze Statue Height",
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),

        // Booking Section - SimpleBookingSection match
        createElement(
          "section",
          {
            key: "booking",
            id: "booking-section",
            style: {
              padding: "4rem 0",
              background: "#f8fafc",
              borderTop: "1px solid #f3f4f6",
            },
          },
          [
            createElement(
              "div",
              {
                key: "booking-container",
                style: {
                  maxWidth: "1200px",
                  margin: "0 auto",
                  padding: "0 1rem",
                },
              },
              [
                // Header
                createElement(
                  "div",
                  {
                    key: "booking-header",
                    style: { textAlign: "center", marginBottom: "3rem" },
                  },
                  [
                    createElement(
                      "h2",
                      {
                        key: "booking-title",
                        style: {
                          fontSize: "2.25rem",
                          fontWeight: "bold",
                          color: "#111827",
                          marginBottom: "0.5rem",
                        },
                      },
                      "Book Your Experience",
                    ),
                    createElement(
                      "p",
                      {
                        key: "booking-subtitle",
                        style: { color: "#6b7280" },
                      },
                      "Starting at $70 per person • Free cancellation up to 24 hours",
                    ),
                  ],
                ),

                // Booking Content (simplified for now - matches what's visible)
                createElement(
                  "div",
                  {
                    key: "booking-content",
                    style: {
                      maxWidth: "800px",
                      margin: "0 auto",
                      background: "white",
                      padding: "2rem",
                      borderRadius: "1rem",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                      border: "1px solid #e5e7eb",
                    },
                  },
                  [
                    createElement(
                      "div",
                      {
                        key: "pricing-display",
                        style: {
                          textAlign: "center",
                          background: "#f8fafc",
                          padding: "2rem",
                          borderRadius: "0.5rem",
                          marginBottom: "2rem",
                        },
                      },
                      [
                        createElement(
                          "div",
                          {
                            key: "price-large",
                            style: {
                              fontSize: "3rem",
                              fontWeight: "bold",
                              color: "#059669",
                              marginBottom: "0.5rem",
                            },
                          },
                          "$70",
                        ),
                        createElement(
                          "div",
                          {
                            key: "price-label",
                            style: {
                              fontSize: "1.125rem",
                              color: "#374151",
                              marginBottom: "1rem",
                            },
                          },
                          "per person",
                        ),
                        createElement(
                          "div",
                          {
                            key: "total-example",
                            style: { fontSize: "0.875rem", color: "#6b7280" },
                          },
                          "Example: 2 guests = $149.80 (includes taxes)",
                        ),
                      ],
                    ),

                    createElement(
                      "div",
                      {
                        key: "booking-cta",
                        style: { textAlign: "center" },
                      },
                      [
                        createElement(
                          "button",
                          {
                            key: "reserve-button",
                            style: {
                              background: "#1e40af",
                              color: "white",
                              fontWeight: "bold",
                              padding: "1rem 3rem",
                              fontSize: "1.25rem",
                              borderRadius: "0.5rem",
                              border: "none",
                              cursor: "pointer",
                              marginBottom: "1rem",
                            },
                          },
                          "Reserve Your Spot",
                        ),
                        createElement(
                          "p",
                          {
                            key: "phone-contact",
                            style: { color: "#6b7280", fontSize: "0.875rem" },
                          },
                          "Or call (305) 451-6322 for immediate booking",
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ],
    );
  }

  // Main App Component
  function WordPressApp() {
    const currentPage = window.klsdData ? window.klsdData.currentPage : "blog";
    console.log("Vanilla WordPress App - Current Page:", currentPage);

    if (currentPage === "christ-statue-tour") {
      return ChristStatueTourNoSidebarPage();
    }

    return BlogPage();
  }

  // Initialize App
  function initWordPressApp() {
    console.log("=== VANILLA WORDPRESS REACT APP ===");
    console.log(
      "Current Page:",
      window.klsdData ? window.klsdData.currentPage : "unknown",
    );

    const rootElement = document.getElementById("klsd-react-root");

    if (!rootElement) {
      console.error("Root element not found");
      return;
    }

    try {
      const root = createRoot(rootElement);
      root.render(createElement(WordPressApp));
      console.log("Vanilla React app mounted successfully!");

      // Remove loading state
      setTimeout(function () {
        const loadingElement = rootElement.querySelector(".klsd-loading");
        if (loadingElement) {
          loadingElement.remove();
        }
      }, 1000);
    } catch (error) {
      console.error("Failed to mount vanilla app:", error);

      // Fallback
      rootElement.innerHTML =
        '<div style="padding: 2rem; text-align: center; font-family: Arial, sans-serif;">' +
        '<h2 style="color: #dc2626;">Loading Error</h2>' +
        "<p>Error: " +
        error.message +
        "</p>" +
        '<button onclick="location.reload()" style="padding: 0.5rem 1rem; background: #2563eb; color: white; border: none; border-radius: 0.25rem; cursor: pointer;">Refresh Page</button>' +
        "</div>";
    }
  }

  // Initialize when ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWordPressApp);
  } else {
    initWordPressApp();
  }
})();
