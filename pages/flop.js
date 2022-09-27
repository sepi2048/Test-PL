import Layout from "@/components/Layout";
import PageHeaderBlock from "@/components/PageHeader";

import MultiStepForm from "@/components/Flop/MultiStepForm";

export default function Flop() {
  return (
    <Layout metaTitle="Flop">
      <PageHeaderBlock title="Preflop" />

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
