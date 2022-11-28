import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import SuperTokens from "supertokens-auth-react";
import { redirectToAuth } from "supertokens-auth-react";
import Layout from "@/components/layout";

const SuperTokensComponentNoSSR = dynamic(
  new Promise((res) => res(SuperTokens.getRoutingComponent)),
  { ssr: false }
);

export default function Auth() {
  // if the user visits a page that is not handled by us (like /auth/random), then we redirect them back to the auth page.
  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      SuperTokens.redirectToAuth({
        redirectBack: false,
      });
    }
  }, []);

  return <SuperTokensComponentNoSSR />;
}

// I'm using Layout from NextJS
Auth.getLayout = function getLayout(page) {
  return (
    <Layout
      pageTitle="L.A. Casting, Inc. - Auth"
      contentTitle=""
      metaDescription=""
      canonical="/auth"
    >
      <div>{page}</div>
    </Layout>
  );
};
