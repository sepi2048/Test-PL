import React from "react";
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import { useRouter } from "next/router";
import updateAction from "./updateAction";
import Layout from "@/components/Layout";

const Step2 = (props) => {
  const { register, handleSubmit } = useForm();
  const { actions, state } = useStateMachine({ updateAction });
  const router = useRouter();

  const onSubmit = (data) => {
    actions.updateAction(data);
    router.push("/preflop/result");
  };

  return (
    <Layout metaTitle={"Preflop Helper"}>
      <section className="section-sm pb-0">
        <div className="container pb-5">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h2>Step 2</h2>
                  <label>
                    Age:
                    <input {...register("age")} />
                  </label>
                  <label>
                    Years of experience:
                    <input
                      {...register("yearsOfExp")}
                      defaultValue={state.yearsOfExp}
                    />
                  </label>
                  <input type="submit" />
                </form>

                <pre>{JSON.stringify(state, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Step2;
