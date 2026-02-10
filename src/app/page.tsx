import Hero from '@/components/sections/Hero';
import HowItWorks from '@/components/sections/HowItWorks';
import Formules from '@/components/sections/Formules';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import GalleryPreview from '@/components/sections/GalleryPreview';
import CTA from '@/components/sections/CTA';
import { formulesEte, formulesHiver, testimonials } from '@/data/site-config';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* How It Works */}
      <HowItWorks />

      {/* Formulas with Season Toggle */}
      <Formules
        formulasEte={formulesEte}
        formulasHiver={formulesHiver}
      />

      {/* About the Pilot */}
      <About />

      {/* Testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* Gallery Preview */}
      <GalleryPreview />
    </>
  );
}
