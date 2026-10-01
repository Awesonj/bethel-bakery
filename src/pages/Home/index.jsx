import Hero from "../../components/home/Hero";
import AvailableToday from "../../components/home/AvailableToday";
import Categories from "../../components/home/Categories";
import BespokeShowcase from "../../components/home/BespokeShowcase";
import WhyBethel from "../../components/home/WhyBethel";
import MeetTheBaker from "../../components/home/MeetTheBaker";
import Reviews from "../../components/home/Reviews";
import Gallery from "../../components/home/Gallery";
import CollectionContact from "../../components/home/CollectionContact";

export default function Home() {
  return (
    <>
      <Hero />
      <AvailableToday />
      <Categories />
      <BespokeShowcase />
      <WhyBethel />
      <MeetTheBaker />
      <Reviews />
      <Gallery />
      <CollectionContact />
    </>
  );
}