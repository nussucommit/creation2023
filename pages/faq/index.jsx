import faqs from './faq.json';

function FAQPage() {
  return (
    <>
      <h1>Frequently Asked Questions</h1>
      <ol>
        {faqs.map((faq) => (
          <li key={faq.question}>
            <h3>{faq.question}</h3>
            {faq.answers.map((answer) => <p key={answer}>{answer}</p>)}
          </li>
        ))}
      </ol>
    </>
  );
}

export default FAQPage;
