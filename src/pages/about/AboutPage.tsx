import AboutBanner from "../../component/about/AboutBanner";
import Counter from "../../component/home/Counter";
import DonationSection from "../../component/home/DonationSection";
import LastestActivities from "../../component/home/LastestActivities";
import OurVolunteer from "../../component/home/OurVolunteer";
import ReasonSection from "../../component/home/ReasonSection";

const AboutPage = () => {
  return (
    <>
      <AboutBanner />

      <ReasonSection />

      <LastestActivities />

      <Counter />

      <OurVolunteer />

      <DonationSection />
    </>
  );
};

export default AboutPage;
