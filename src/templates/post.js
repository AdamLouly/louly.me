import React, { useContext } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import SEO from "components/SEO";
import { css } from "@emotion/core";
import Container from "components/Container";
import Layout from "../components/Layout";
import { fonts } from "../lib/typography";
import Share from "../components/Share";
import config from "../../config/website";
import { bpMaxSM } from "../lib/breakpoints";
import Subscribe from "../components/Subscribe";

export default function Post({
  data: { site, mdx },
  pageContext: { next, prev }
}) {
  const author = mdx.frontmatter.author || config.author;
  const date = mdx.frontmatter.date;
  const title = mdx.frontmatter.title;
  const banner = mdx.frontmatter.banner;
  const postImage = banner ? banner.childImageSharp.fluid.src : null;
  const postUrl = mdx.fields.slug;

  return (
    <Layout site={site} frontmatter={mdx.frontmatter}>
      <SEO
        frontmatter={mdx.frontmatter}
        description={mdx.excerpt}
        isBlogPost
        postImage={postImage}
        postUrl={postUrl}
      />
      <article
        css={css`
          width: 100%;
          display: flex;
          twitter-widget {
            margin-left: auto;
            margin-right: auto;
          }
        `}
      >
        <Container>
          <h1
            css={css`
              text-align: center;
              margin-bottom: 20px;
            `}
          >
            {title}
          </h1>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-bottom: 20px;
              h3,
              span {
                text-align: center;
                font-size: 15px;
                opacity: 0.6;
                font-family: ${fonts.regular}, sans-serif;
                font-weight: normal;
                margin: 0 5px;
              }
            `}
          >
            {author && <h3>{author}</h3>}
            {author && <span>—</span>}
            {date && <h3>{date}</h3>}
          </div>
          {banner && (
            <div
              css={css`
                padding: 30px;
                ${bpMaxSM} {
                  padding: 0;
                }
              `}
            >
              <Img
                sizes={banner.childImageSharp.fluid}
                alt={site.siteMetadata.keywords.join(", ")}
              />
            </div>
          )}
          <br />
          <div
            css={css`
              img {
                margin-top: 20px !important;
                margin-bottom: 20px !important;
                width: 100% !important;
              }
            `}
          >
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </div>
        </Container>

        {/* <SubscribeForm /> */}
      </article>
      <Container noVerticalPadding>
        <Share
          url={`${config.siteUrl}/${mdx.fields.slug}/`}
          title={title}
          twitterHandle={config.twitterHandle}
        />
        <br />
      </Container>
    </Layout>
  );
}
