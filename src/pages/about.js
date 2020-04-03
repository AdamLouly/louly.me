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
            I make models.
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
            I'm a Data Scientist and Machine Learning engineer
            <br />
            I blog from time to time about my journey as a Data Scientist. My blog
            posts have had over 9k reads and have been featured on Medium top 10 recommended stories. <br />
            <br />
            I'm actively involved in the Kaggle community
            <br />
            When I am not coding you can find me playing soccer or Playing League of legends
            <br />
            <br />
          </p>
          <p>
            The best way to contact me for a quick question is on my{" "}
            <a href="https://twitter.com/LoulyAdam" target="_blank">
              Twitter page
            </a>{" "}
            <br />
            <br />
            Feel free to reach out to me for speaking inquiries, blog
            partnerships, or if you have questions or comments feel free to
            email me at{" "}
            <a href="mailto:adamlouly3@gmail.com">
              adamlouly3@gmail.com
            </a>{" "}
            <br />
            <br />
            To get updates from me, Make sure to follow me on{" "}
            <a href="https://twitter.com/LoulyAdam" target="_blank">
              Twitter
            </a>{" "}
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
