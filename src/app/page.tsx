import { Section } from "./_components/section";
import { HeroSection } from "./_components/heroSection";

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <Section title="Popular" endpoint="popular" />
      <Section title="Top rated" endpoint="top_rated" />
      <Section title="Upcoming" endpoint="upcoming" />
    </div>
  );
}
