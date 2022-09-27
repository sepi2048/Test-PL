import Link from "next/link";
import Layout from "@/components/Layout";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function PageNotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 4000);
  }, []);

  return (
    <Layout metaTitle={"Page Not Found"}>
      <section className="section-sm pb-0">
        <div className="container pb-5">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h1 className="page-not-found-title">404</h1>
                <p className="mb-4">
                  Oops. The page you're looking for doesn't exist.
                </p>
                <Link href="/">
                  <a className="btn btn-primary">Back to home</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
