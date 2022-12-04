import { Fragment } from 'react';
import rules from './rules.json';

function RulePage() {
  return (
    <>
      <h1>Rules and Regulations</h1>
      <ul>
        {rules.map((rule) => {
          const { details } = rule;

          // Rule title
          return (
            <Fragment key={rule.title}>
              <h3>{rule.title}</h3>
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
            </Fragment>
          );
        })}
      </ul>
    </>
  );
}

export default RulePage;
