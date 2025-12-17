import DashBannerManagement from '@/components/dashboard/banner/DashBannerManagement';
import { getBanners } from '@/app/actions/banner.action';

const DashboardBannerViews = async () => {
  const banners = await getBanners();

  return <DashBannerManagement initialBanners={banners} />;
};

export default DashboardBannerViews;
