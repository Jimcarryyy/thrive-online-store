import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FadeInSection from '@/components/FadeInSection';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  });

  const contactInfo = [
    { icon: Phone, title: 'Phone', details: '+1 (312) 555-0198', description: 'Mon–Fri, 9am–6pm CT' },
    { icon: Mail, title: 'Email', details: 'hello@thrivestore.demo', description: 'Reply within one business day' },
    { icon: MapPin, title: 'Address', details: '2847 W Fulton St', description: 'Chicago, IL 60612' },
    { icon: Clock, title: 'Hours', details: 'Mon–Fri: 9am–6pm', description: 'Sat: 10am–4pm CT' },
  ];

  const faqItems = [
    {
      question: 'How long does standard shipping take?',
      answer: 'Most orders arrive in 2–4 business days. Express (1–2 days) is available at checkout for $14.99.',
    },
    {
      question: 'What is your return window?',
      answer: 'You have 30 days from delivery to return unused items in original packaging. See our Returns page for details.',
    },
    {
      question: 'Do you ship outside the US?',
      answer: 'This demo store simulates US shipping only. A production version would support international zones.',
    },
    {
      question: 'How do I track my order?',
      answer: 'After checkout you will see a confirmation page with your order ID. Account holders can view order history under My Account.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent', {
      description: 'We will get back to you within one business day.',
    });
    setFormData({ name: '', email: '', subject: '', category: '', message: '' });
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <FadeInSection className="max-w-2xl mb-12">
          <h1 className="mb-4">Help & contact</h1>
          <p className="text-muted-foreground text-lg">
            Questions about an order, a product, or a return? Send us a message and we will respond promptly.
          </p>
        </FadeInSection>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="space-y-4">
            {contactInfo.map((info) => (
              <Card key={info.title} className="border-border">
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-0.5">{info.title}</h3>
                      <p className="font-medium">{info.details}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Send a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" required value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" name="subject" required value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                        <SelectTrigger><SelectValue placeholder="Select topic" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="order">Order support</SelectItem>
                          <SelectItem value="return">Returns</SelectItem>
                          <SelectItem value="product">Product question</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" required rows={5} value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <Button type="submit">
                    <Send className="w-4 h-4 mr-2" /> Send message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <FadeInSection id="faq">
          <h2 className="mb-8 flex items-center gap-2">
            <HelpCircle className="w-6 h-6" /> Frequently asked questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqItems.map((faq) => (
              <div key={faq.question} className="border-l-2 border-accent pl-4">
                <h3 className="font-medium mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Contact;
