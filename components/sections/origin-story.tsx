import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function OriginStory() {
  return (
    <section className="relative overflow-hidden bg-forest text-ivory" aria-labelledby="origin-heading">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="relative min-h-[280px] sm:min-h-[380px] lg:min-h-[560px]">
          <Image
            src="/images/mountain-landscape.jpg"
            alt="Snow-capped mountains above a green valley"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="contours flex flex-col justify-center px-4 py-14 sm:px-10 lg:px-16 lg:py-20">
          <p className="eyebrow !text-sand">Our origin</p>
          <h2 id="origin-heading" className="mt-3 text-3xl leading-tight sm:text-[2.6rem]">
            Grown where the Karakoram meets the orchard
          </h2>
          <p className="mt-6 leading-relaxed text-ivory/75">
            Hunza&rsquo;s apricot and walnut trees grow on terraced slopes fed by
            glacier water, under long days of mountain sun. Families in the
            valley have dried their harvest on rooftops for generations—slowly,
            naturally, without shortcuts.
          </p>
          <p className="mt-4 leading-relaxed text-ivory/75">
            Haniball Hunza brings that harvest from Karimabad to homes and
            businesses across Pakistan, packed with the same care.
          </p>
          <div className="mt-8">
            <Button asChild variant="outline-light">
              <Link href="/about">Read our story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
