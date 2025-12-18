import { getCattles } from "@/app/actions/cattle.action";
import DashCattleManagement from "@/components/dashboard/cattle/DashCattleManagement";

const DashCattleManageViews = async () => {
  const cattles = await getCattles();

  return <DashCattleManagement initialCattles={cattles} />;
};

export default DashCattleManageViews;
