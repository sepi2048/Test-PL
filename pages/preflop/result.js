import React from "react";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import Layout from "@/components/Layout";

const Result = (props) => {
  const { state } = useStateMachine(updateAction);

  return (
    <>
      <Layout metaTitle={"Preflop Helper"}>
        <section className="section-sm pb-0">
          <div className="container pb-5">
            <div className="row">
              <div className="col-12">
                <div className="text-center">
                  <h2>Result:</h2>
                  <pre>{JSON.stringify(state, null, 2)}</pre>
                  {state.yourDetails.number * state.yourDetails.age}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Result;
