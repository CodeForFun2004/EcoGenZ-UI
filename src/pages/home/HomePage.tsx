



import './Home.css'




import LastestActivities from '../../component/home/LastestActivities';
import PopularCauses from '../../component/home/PopularCauses';
import OurVolunteer from '../../component/home/OurVolunteer';
import Counter from '../../component/home/Counter';
import SliderSection from '../../component/home/SliderSection';
import ReasonSection from '../../component/home/ReasonSection';


const HomePage = () => {
  return (
    <>
      <SliderSection/>
      <ReasonSection/>
      <LastestActivities/>
      <PopularCauses/>
      <Counter/>
      <OurVolunteer/>
    </>
  );
};

export default HomePage;
