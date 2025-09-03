import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Star,
  Calendar,
  Waves,
  Award,
  Send
} from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sage/5 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-ocean to-ocean/80 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-coral/20 text-coral border-coral/30 text-lg px-4 py-2">
              Let's Dive Together
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Contact
              <span className="block text-coral">Key Largo Scuba</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Ready to explore the underwater world? Get in touch with our friendly team 
              to plan your perfect diving adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-coral hover:bg-coral/90 text-white font-semibold text-lg px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ocean text-lg px-8 py-4">
                <Calendar className="w-5 h-5 mr-2" />
                Book Online
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-8">Get In Touch</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ocean rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground mb-2">Call us for immediate assistance</p>
                    <a href="tel:+13053914040" className="text-ocean font-semibold hover:underline text-lg">
                      (305) 391-4040
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground mb-2">Send us a message anytime</p>
                    <a href="mailto:info@keylargoscubadiving.com" className="text-ocean font-semibold hover:underline">
                      info@keylargoscubadiving.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground mb-2">Visit our dive center</p>
                    <address className="text-ocean font-semibold not-italic">
                      102900 Overseas Highway #6<br />
                      Key Largo, FL 33037
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ocean rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">Hours</h3>
                    <p className="text-muted-foreground mb-2">We're open every day</p>
                    <div className="text-ocean font-semibold">
                      <p>Daily: 7:30 AM - 11:00 PM</p>
                      <p className="text-sm text-muted-foreground mt-1">3 tours daily • Book in advance</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center border-sage/20">
                  <CardContent className="p-0">
                    <Star className="w-8 h-8 text-coral mx-auto mb-2" />
                    <h4 className="text-2xl font-bold text-foreground">4.9★</h4>
                    <p className="text-sm text-muted-foreground">500+ Reviews</p>
                  </CardContent>
                </Card>
                <Card className="p-4 text-center border-ocean/20">
                  <CardContent className="p-0">
                    <Award className="w-8 h-8 text-ocean mx-auto mb-2" />
                    <h4 className="text-2xl font-bold text-foreground">25+</h4>
                    <p className="text-sm text-muted-foreground">Years Experience</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="shadow-xl border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h3>
                  
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean"
                          placeholder="Your first name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean"
                          placeholder="Your last name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Interest *
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean" required>
                        <option value="">Select your interest</option>
                        <option value="snorkeling">Snorkeling Tours</option>
                        <option value="diving">Scuba Diving</option>
                        <option value="certification">Certification Courses</option>
                        <option value="equipment">Equipment Purchase</option>
                        <option value="private">Private Charter</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean"
                        placeholder="Tell us about your diving experience and what you're looking for..."
                        required
                      ></textarea>
                    </div>

                    <Button type="submit" className="w-full bg-ocean hover:bg-ocean/90 text-white font-semibold py-3">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      * Required fields. We'll respond within 24 hours.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-sage/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Find Us</h2>
            <p className="text-xl text-muted-foreground">
              Located in the heart of Key Largo, gateway to the Florida Keys
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="w-16 h-16 text-ocean mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Interactive Map</h3>
                <p className="text-muted-foreground mb-4">
                  102900 Overseas Highway #6, Key Largo, FL 33037
                </p>
                <Button className="bg-ocean hover:bg-ocean/90 text-white">
                  <MapPin className="w-4 h-4 mr-2" />
                  Open in Google Maps
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-coral to-coral/80 text-white border-0">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Emergency Contact</h2>
              <p className="text-xl mb-6 opacity-90">
                For diving emergencies, contact us immediately or call DAN Emergency Hotline
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-coral">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Our Emergency Line
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-coral">
                  <Phone className="w-5 h-5 mr-2" />
                  DAN Emergency: +1-919-684-9111
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
