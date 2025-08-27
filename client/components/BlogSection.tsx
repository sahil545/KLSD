import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Best Snorkeling Spots in the Florida Keys",
    excerpt: "Discover the top underwater destinations for an unforgettable snorkeling experience.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=600",
    category: "Snorkeling Guide",
    date: "Dec 15, 2024",
    author: "Captain Mike",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Marine Life Photography Tips",
    excerpt: "Learn how to capture stunning underwater photos of tropical fish and coral reefs.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=600",
    category: "Photography",
    date: "Dec 12, 2024",
    author: "Sarah Johnson",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Planning Your First Scuba Adventure",
    excerpt: "Everything beginners need to know before taking their first dive in Key Largo.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=600",
    category: "Scuba Diving 101",
    date: "Dec 10, 2024",
    author: "Captain Mike",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Conservation Efforts in John Pennekamp",
    excerpt: "How we're protecting the coral reef ecosystem for future generations.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=600",
    category: "Conservation",
    date: "Dec 8, 2024",
    author: "Dr. Elena Martinez",
    readTime: "4 min read"
  }
];

export function BlogSection() {
  return (
    <section className="relative bg-gray-100">
      {/* Half-moon separator shape */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-20 text-white fill-current"
          preserveAspectRatio="none"
        >
          <path d="M0,120 C300,40 900,40 1200,120 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-28 pb-20">
        
        {/* Header - Inspired by the Ultimate Gorge Experience design */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              ONE DESTINATION, 100% EPIC.
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            The Ultimate Key Largo Experience
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get out, get wet, or just relax. All the adventure is in one place. 
            Spend more time vacationing, and less time traveling.
          </p>
        </div>

        {/* Blog Cards Grid - Desktop */}
        <div className="hidden md:grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-none shadow-md overflow-hidden bg-white">
              <CardContent className="p-0">

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-800 hover:bg-white">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                {/* Content Below Image */}
                <div className="p-6">

                  {/* Meta Info */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <span>{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Learn More Button */}
                  <a href={post.category === "Scuba Diving 101" ? "/scuba-diving-101" : "/blog"}>
                    <Button
                      size="sm"
                      className="bg-black text-white hover:bg-gray-800 font-semibold text-xs px-6 py-2"
                    >
                      LEARN MORE
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Blog Cards - Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto pb-4">
          <div className="flex gap-6 px-4" style={{ width: 'max-content' }}>
            {blogPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-none shadow-md overflow-hidden bg-white flex-shrink-0 w-80">
                <CardContent className="p-0">

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-800 hover:bg-white">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content Below Image */}
                  <div className="p-6">

                    {/* Meta Info */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <span>{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Learn More Button */}
                    <a href={post.category === "Scuba Diving 101" ? "/scuba-diving-101" : "/blog"}>
                      <Button
                        size="sm"
                        className="bg-black text-white hover:bg-gray-800 font-semibold text-xs px-6 py-2"
                      >
                        LEARN MORE
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a href="/blog">
            <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              View All Articles
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
