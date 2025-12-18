import { getReviews } from '@/app/actions/review.actions';
import DashReviewManagement from '@/components/dashboard/review/DashReviewManagement';

const DashReviewManagementViews = async () => {
  const initialReviews = await getReviews();
  return (
    <>
      <DashReviewManagement initialReviews={initialReviews} />
    </>
  );
};

export default DashReviewManagementViews;
