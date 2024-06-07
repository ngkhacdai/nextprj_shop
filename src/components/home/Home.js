import { getShopInfor, getanalysis, getoverview } from "@/api/Shop";
import OverView from "./OverView";

const Home = async () => {
  const profile = await getShopInfor();
  let overViewData = [];
  let analysisData = [];
  if (profile) {
    const thisYear = new Date().getFullYear();
    overViewData = await getoverview(thisYear);
    analysisData = await getanalysis(thisYear);
  }
  return (
    <div>
      <OverView
        profile={profile}
        analysisData={analysisData}
        overViewData={overViewData}
      />
    </div>
  );
};

export default Home;
