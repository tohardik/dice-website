import { graphql } from 'gatsby';
import React from 'react';
import CollaboratorsNav from '../../components/collabnav';
import Layout from '../../components/layout';
import Partner from '../../components/partner';
import SEO from '../../components/seo';

export default function Partners({
  data: {
    allRdf: { edges },
  },
}) {
  const data = edges.sort((a, b) =>
    a.node.data.name.localeCompare(b.node.data.name)
  );

  return (
    <Layout withContainer={false}>
      <SEO title="Partners" />
      <CollaboratorsNav activeLink="/collaborators/partners/" />

      <section className="section">
        <div className="container content">
          <h1>Partners</h1>

          <div className="columns is-multiline is-5 is-variable">
            {data.map(({ node }) => (
              <div className="column is-one-third" key={node.id}>
                <Partner partner={node} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allRdf(
      filter: {
        data: {
          rdf_type: {
            elemMatch: {
              id: { eq: "https://schema.dice-research.org/Partner" }
            }
          }
        }
      }
    ) {
      edges {
        node {
          id
          data {
            name
            country
            url
            logo
          }
        }
      }
    }
  }
`;
