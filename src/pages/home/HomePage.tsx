import "./Home.css";

import LastestActivities from "../../component/home/LastestActivities";
import PopularCauses from "../../component/home/PopularCauses";
import OurVolunteer from "../../component/home/OurVolunteer";
import Counter from "../../component/home/Counter";
import SliderSection from "../../component/home/SliderSection";
import ReasonSection from "../../component/home/ReasonSection";
import ActivityMap from "../../component/map/ActivityMap";

const HomePage = () => {
  return (
    <>
      <SliderSection />
      <ReasonSection />
      <LastestActivities />
      <PopularCauses />
      <div className="container">
        <ActivityMap />
      </div>
      <Counter />
      <OurVolunteer />
    </>
  );
};

export default HomePage;
