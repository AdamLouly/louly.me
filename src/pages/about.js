import React from "react";
import { css } from "@emotion/core";
import Layout from "../components/Layout";

import Container from "components/Container";
import { Twitter, GitHub, LinkedIn, Kaggle } from "components/Social";
import { bpMaxSM } from "../lib/breakpoints";
import Subscribe from "../components/Subscribe";

export default ({ data: { site } }) => {
  return (
    <Layout site={site}>
      <Container
        css={css`
          padding-bottom: 0;
        `}
      >
        <div
          css={css`
            margin-bottom: 60px;
          `}
        >
          <h1
            css={css`
              text-align: center;
            `}
          >
            Adam Louly
          </h1>
          <p
            css={css`
              text-align: center;
            `}
          >
            AI / ML Engineer.
            <br />

          </p>
          <div
            css={css`
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              margin-top: 20px;
            `}
          >
            <Kaggle height={30} width={30} />
            <Twitter height={36} width={28} />
            <LinkedIn height={30} width={30} />
            <GitHub height={30} width={30} />
          </div>

          <br />
          <br />
          <p>
            As a Machine Learning Engineer, I specialize in AI model optimizations, focusing primarily on efficient training processes.
            <br />
            I write about artificial intelligence, LLMs, and techniques for optimizing model training, sharing insights and practical advice for enhancing performance and reducing costs. My articles aim to demystify complex concepts and are available on prominent tech publications.
            <br />
            <br />
            In addition to my writing, I offer consulting services aimed at reducing the cost of ML training for businesses, leveraging my expertise to deliver value and innovation.
            <br />
            Beyond my professional pursuits, I enjoy soccer and gaming, with a particular fondness for League of Legends.
            <br />
            <br />
          </p>
          <p>
            The best way to contact me for quick questions is through my <a href="https://twitter.com/LoulyAdam" target="_blank">Twitter page</a>. For more detailed inquiries, including speaking opportunities, consulting services, or partnerships, feel free to email me at <a href="mailto:adamlouly3@gmail.com">adamlouly3@gmail.com</a>.
            <br />
            <br />
            To stay updated on my latest work and insights, make sure to follow me on <a href="https://twitter.com/LoulyAdam" target="_blank">Twitter</a>.
            <br />
          </p>
        </div>
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
  }
`;
