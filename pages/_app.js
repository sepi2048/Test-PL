import "@/styles/bootstrap.scss";
import "@/styles/globals.scss";

import { useState, useEffect } from "react";
import { AppContext } from "@/components/UseContext";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import Footer from "@/components/Footer";
import siteConfig from "@/config/site.config.json";

import FirstLoad from "@/components/FirstLoad";

export default function PokerLighthouseApp({
  Component,
  pageProps,
  router,
  metaTitle,
  metaDescription,
  metaAuthor,
  metaKeyword,
  ogImage,
}) {
  const [searchOpen, setSearchOpen] = useState("");
  const url = `${router.route}`;

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <title>{metaTitle}</title>

        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="keyword" content={metaKeyword} />
        <meta name="author" content={metaAuthor} />
        <meta name="description" content={metaDescription} />

        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:width" content="1200" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={metaDescription} />

        <link
          rel="shortcut icon"
          href={siteConfig.favicon}
          type="image/x-icon"
        />
      </Head>

      <AppContext.Provider
        value={{
          toggleSearch: [searchOpen, setSearchOpen],
        }}
      >
        {/*         <AnimatePresence
          exitBeforeEnter
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        > */}
        <FirstLoad>
          <Component {...pageProps} canonical={url} key={url} />

          <Footer />
        </FirstLoad>
        {/* </AnimatePresence> */}
      </AppContext.Provider>
    </>
  );
}

PokerLighthouseApp.defaultProps = {
  metaTitle: siteConfig.metaData.title,
  metaDescription: siteConfig.metaData.description,
  metaAuthor: siteConfig.metaData.author,
  metaKeyword: siteConfig.metaData.keyword,
  ogImage: siteConfig.metaData.ogImage,
};
