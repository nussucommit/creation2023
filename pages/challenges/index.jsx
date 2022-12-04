import Link from 'next/link';

function ChallengePage() {
  return (
    <>
      <h1>Challenges</h1>
      <ul>
        <li>
          <Link href="/challenges/1">Challenge statement #1</Link>
        </li>
        <li>
          <Link href="/challenges/2">Challenge statement #2</Link>
        </li>
        <li>
          <Link href="/challenges/3">Challenge statement #3</Link>
        </li>
        <li>
          <Link href="/challenges/4">Challenge statement #4</Link>
        </li>
      </ul>
    </>
  );
}
export default ChallengePage;
