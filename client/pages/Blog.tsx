import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Search } from "lucide-react";
import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "Scuba Diving Basics: What Every Beginner Should Know",
    excerpt: "Learn the fundamental principles of scuba diving, from breathing techniques to underwater communication signals.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=600",
    category: "Scuba Diving 101",
    date: "Dec 20, 2024",
    author: "Captain Mike",
    readTime: "8 min read",
    featured: true
  },
  {
    id: 2,
    title: "Essential Scuba Diving Equipment Guide",
    excerpt: "A comprehensive guide to all the gear you need for safe and enjoyable scuba diving experiences.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=600",
    category: "Scuba Diving 101",
    date: "Dec 18, 2024",
    author: "Sarah Johnson",
    readTime: "10 min read",
    featured: false
  },
  {
    id: 3,
    title: "Understanding Dive Tables and Safety Stops",
    excerpt: "Master the science behind decompression and learn how to plan safe dives using dive tables.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=600",
    category: "Scuba Diving 101",
    date: "Dec 16, 2024",
    author: "Dr. Elena Martinez",
    readTime: "12 min read",
    featured: false
  },
  {
    id: 4,
    title: "Underwater Hand Signals Every Diver Must Know",
    excerpt: "Essential communication signals for safe underwater exploration and emergency situations.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=600",
    category: "Scuba Diving 101",
    date: "Dec 15, 2024",
    author: "Captain Mike",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 5,
    title: "Best Snorkeling Spots in the Florida Keys",
    excerpt: "Discover the top underwater destinations for an unforgettable snorkeling experience.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=600",
    category: "Snorkeling Guide",
    date: "Dec 15, 2024",
    author: "Captain Mike",
    readTime: "5 min read",
    featured: false
  },
  {
    id: 6,
    title: "Marine Life Photography Tips",
    excerpt: "Learn how to capture stunning underwater photos of tropical fish and coral reefs.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=600",
    category: "Photography",
    date: "Dec 12, 2024",
    author: "Sarah Johnson",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 7,
    title: "Conservation Efforts in John Pennekamp",
    excerpt: "How we're protecting the coral reef ecosystem for future generations.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=600",
    category: "Conservation",
    date: "Dec 8, 2024",
    author: "Dr. Elena Martinez",
    readTime: "4 min read",
    featured: false
  },
  {
    id: 8,
    title: "Diving Certifications: Open Water to Advanced",
    excerpt: "Everything you need to know about PADI certifications and advancing your diving skills.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=600",
    category: "Scuba Diving 101",
    date: "Dec 5, 2024",
    author: "Captain Mike",
    readTime: "9 min read",
    featured: false
  }
];

const categories = [
  "All Categories",
  "Scuba Diving 101",
  "Snorkeling Guide", 
  "Photography",
  "Conservation",
  "Safety"
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All Categories" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Diving Knowledge Center
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100">
              Your complete guide to scuba diving, snorkeling, and underwater adventures
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && selectedCategory === "All Categories" && !searchTerm && (
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                Featured Article
              </span>
            </div>
          </div>
          
          <Card className="overflow-hidden border-none shadow-xl">
            <CardContent className="p-0">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <Badge className="mb-4 bg-blue-100 text-blue-800">
                    {featuredPost.category}
                  </Badge>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Articles Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-none shadow-md overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={`${
                      post.category === "Scuba Diving 101" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-white/90 text-gray-800"
                    } hover:bg-white`}>
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Button
                    size="sm"
                    className="bg-black text-white hover:bg-gray-800 font-semibold text-xs px-6 py-2"
                  >
                    READ MORE
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No articles found for "{searchTerm}" in {selectedCategory}.
            </p>
          </div>
        )}
      </section>

      {/* Newsletter Signup */}
      <section className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated with Diving Tips
            </h2>
            <p className="text-blue-100 mb-8">
              Get the latest diving guides, safety tips, and exclusive content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="bg-white text-blue-900 hover:bg-gray-100 px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
