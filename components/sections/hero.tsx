"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-forest"
      aria-label="Hero"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80"
          alt="Golden sunlight over Hunza mountain peaks"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/85 to-forest/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-forest/30" />
        <div className="hero-grid absolute inset-0 opacity-40" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-24 pt-32 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pt-28"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-honey"
          >
            Pure Strength from the Highest Peaks
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl leading-[1.1] text-cream sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Hunza Organic{" "}
            <span className="text-honey">Shilajit</span>
          </motion.h1>

          <motion.p
            lang="ur"
            dir="rtl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-3 font-urdu text-xl text-honey sm:text-2xl"
          >
            {siteConfig.nameUrdu}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg"
          >
            Lab-tested, 100% pure &amp; natural—rich in essential minerals to
            boost energy, stamina, and wellness. Also explore our dry apricots,
            almonds, and Hunzai chocolate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button asChild size="lg">
              <Link href="/shop/hunza-organic-shilajit">Shop Shilajit</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/shop">Explore Collection</Link>
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium uppercase tracking-[0.12em] text-cream/70"
          >
            <li>Lab Tested</li>
            <li className="text-honey/50" aria-hidden>
              |
            </li>
            <li>No Additives</li>
            <li className="text-honey/50" aria-hidden>
              |
            </li>
            <li>Premium Quality</li>
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          <div className="animate-float relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-honey/30">
            <div className="absolute -inset-6 rounded-full bg-honey/15 blur-3xl" />
            <Image
              src="/images/hunza-shilajit.png"
              alt="Haniball Hunza Organic Shilajit — pure strength from the highest peaks"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover object-top"
            />
          </div>
        </motion.div>
      </motion.div>

      <a
        href="#categories"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/70 transition hover:text-honey"
        aria-label="Scroll to featured categories"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown className="animate-scroll-indicator h-5 w-5" />
      </a>
    </section>
  );
}
