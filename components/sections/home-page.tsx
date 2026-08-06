import { HeroSection } from "@/components/sections/hero";
import { FeaturedCategories } from "@/components/sections/featured-categories";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { AboutSection } from "@/components/sections/about";
import { Bestsellers } from "@/components/sections/bestsellers";
import { Testimonials } from "@/components/sections/testimonials";
import { Gallery } from "@/components/sections/gallery";
import { FAQSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";
import { Newsletter } from "@/components/sections/newsletter";
import {
  ValueBar,
  WhatsAppOrder,
} from "@/components/sections/value-bar";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ValueBar />
      <FeaturedCategories />
      <FeaturedProducts />
      <WhyChooseUs />
      <AboutSection />
      <Bestsellers />
      <WhatsAppOrder />
      <Testimonials />
      <Gallery />
      <FAQSection />
      <ContactSection />
      <Newsletter />
    </>
  );
}
