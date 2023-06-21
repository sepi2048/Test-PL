import Layout from "@/components/Layout";
import PageHeaderBlock from "@/components/PageHeader";

import MultiStepForm from "@/components/PokerNav/MultiStepForm";

export default function PokerNavigator() {
  return (
    <Layout metaTitle="Poker Navigator">
      <PageHeaderBlock title="Poker Navigator" />

      <section>
        <div className="container pb-5">
          <div className="row justify-content-center">
            <MultiStepForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}
