import { getanalysis, getoverview } from "@/api/Shop";
import OverView from "./OverView";

const Home = async () => {
  const thisYear = new Date().getFullYear();
  const overViewData = await getoverview(thisYear);
  const analysisData = await getanalysis(thisYear);
  return (
    <div>
      <OverView analysisData={analysisData} overViewData={overViewData} />
    </div>
  );
};

export default Home;
