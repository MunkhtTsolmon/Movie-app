import Image from "next/image";
import { Navigation } from "./navigation";
import { Section } from "./section";

export default async function Home() {
  return (
    <div>
      <Navigation />
      <Section title="Upcoming" endpoint="upcoming" />
      <Section title="Top rated" endpoint="top_rated" />
      <Section title="Popular" endpoint="popular" />
    </div>
  );
}
