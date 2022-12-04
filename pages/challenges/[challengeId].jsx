import { useRouter } from 'next/router';

function ChallengeDetailPage() {
  const router = useRouter();

  const { challengeId } = router.query;

  return (
    <div>
      Challenge #
      {challengeId}
    </div>
  );
}

export default ChallengeDetailPage;
