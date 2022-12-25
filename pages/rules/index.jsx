import Head from 'next/head';
import Image from 'next/image';

import { kavoon } from '../../helper/font-loader';
import RuleDecoration from '../../public/decorations/butterfly_orange.png';
import rules from './rules.json';
import PageContainer from '../../components/layout/PageContainer';
import styles from '../../styles/RulePage.module.scss';

function RulePage() {
  return (
    <>
      <Head>
        <title>Rules - CREATION 2023 | NUSSU commIT</title>
        <link
          rel="canonical"
          href="https://creation2023.nussucommit.com/rules"
          key="canonical"
        />
        <meta
          name="description"
          content="Here's the rules and regulations of CREATION 2023!"
          key="description"
        />
      </Head>
      <PageContainer
        sectionContents={[
          <div>
            <div className={styles['title-container']}>
              <h1 className={kavoon.className}>Rules and Regulations</h1>
              <Image
                id={styles['rule-decoration']}
                src={RuleDecoration}
                alt="orange butterfly"
              />
            </div>
            {rules.map((rule) => {
              const { details } = rule;
              // Rule title
              return (
                <div key={rule.title} className={styles['rule-item']}>
                  <h2>{rule.title}</h2>
                  <hr />
                  <ul>
                    {details.map((detail) => {
                      if (typeof detail === 'object') {
                        const detailTitle = detail.title;
                        const { subdetails } = detail;

                        // Rule detail, with subdetails
                        return (
                          <li key={detailTitle}>
                            <p>{detailTitle}</p>
                            {subdetails.map((subdetail) => (
                              <ul key={subdetail}>
                                <li>{subdetail}</li>
                              </ul>
                            ))}
                          </li>
                        );
                      }

                      // Rule detail, without subdetails
                      return (
                        <li key={detail}>
                          <p>{detail}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>,
        ]}
      />
    </>
  );
}

export default RulePage;
