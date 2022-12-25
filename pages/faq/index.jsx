import Image from 'next/image';

import { kavoon } from '../../helper/font-loader';
import FAQDecoration from '../../public/decorations/flower_orange.png';
import QuestionDecoration from '../../public/decorations/question.png';
import faqs from './faq.json';
import PageContainer from '../../components/layout/PageContainer';
import styles from '../../styles/FAQPage.module.scss';

function FAQPage() {
  return (
    <PageContainer
      sectionContents={[
        <div>
          <div className={styles['title-container']}>
            <Image
              id={styles['faq-decoration']}
              src={FAQDecoration}
              alt="orange flower"
            />
            <h1 className={kavoon.className}>Frequently Asked Questions</h1>
          </div>
          {faqs.map((faq) => (
            <div key={faq.question} className={styles['faq-item']}>
              <div className={styles['faq-question']}>
                <Image src={QuestionDecoration} alt="qustion" />
                <div>
                  <h2>{faq.question}</h2>
                  {faq.answers.map((answer) => (
                    <p key={answer}>{answer}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>,
      ]}
    />
  );
}

export default FAQPage;
