import Layout from "@/components/Layout";
import PageHeaderBlock from "@/components/PageHeader";

import MultiStepForm from "@/components/PokerBot/MultiStepForm";

export default function PokerBot() {
  return (
    <Layout metaTitle="PokerBot">
      <PageHeaderBlock title="PokerBot" />

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
