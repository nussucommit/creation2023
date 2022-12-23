import { useRouter } from 'next/router';
import PageContainer from '../../components/layout/PageContainer';

function ChallengeDetailPage() {
  const router = useRouter();

  const { challengeId } = router.query;

  return (
    <PageContainer sectionContents={[<h1>{`Challenge #${challengeId}`}</h1>]} />
  );
}

export default ChallengeDetailPage;
