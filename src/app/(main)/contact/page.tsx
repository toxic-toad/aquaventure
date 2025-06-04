
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | AquaVenture',
  description: 'Get in touch with AquaVenture. Find our address, phone number, email, and opening hours.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <Mail className="mx-auto h-12 w-12 mb-4 text-accent" />
          <CardTitle className="text-3xl font-bold text-primary">Get In Touch</CardTitle>
          <CardDescription className="text-lg mt-2">
            We're here to help! Reach out to us with any questions or inquiries.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="p-6 md:p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2 flex items-center">
                  <MapPin size={24} className="mr-3 text-accent" /> Our Location
                </h3>
                <address className="not-italic text-foreground/80 space-y-1">
                  <p>AquaVenture Headquarters</p>
                  <p>123 Aquatic Avenue</p>
                  <p>Ocean City, OC 45678</p>
                  <p>United States</p>
                </address>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2 flex items-center">
                  <Clock size={24} className="mr-3 text-accent" /> Business Hours
                </h3>
                <div className="text-foreground/80 space-y-1">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2 flex items-center">
                  <Phone size={24} className="mr-3 text-accent" /> Call Us
                </h3>
                <Link href="tel:+1234567890" className="text-accent hover:underline text-lg">
                  +1 (234) 567-890
                </Link>
                <p className="text-sm text-muted-foreground mt-1">Our team is available during business hours.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2 flex items-center">
                  <Mail size={24} className="mr-3 text-accent" /> Email Us
                </h3>
                <Link href="mailto:support@aquaventure.example.com" className="text-accent hover:underline text-lg">
                  support@aquaventure.example.com
                </Link>
                <p className="text-sm text-muted-foreground mt-1">We typically respond within 24 hours.</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />

          <div className="text-center">
            <h3 className="text-xl font-semibold text-primary mb-3">Have a specific question?</h3>
            <p className="text-foreground/80 mb-6 max-w-md mx-auto">
              Consider checking our FAQ page or reaching out via email for detailed inquiries. For urgent matters, please call us.
            </p>
            {/* You can add a link to an FAQ page here if you have one */}
            {/* <Button asChild variant="outline">
              <Link href="/faq">View FAQs</Link>
            </Button> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
