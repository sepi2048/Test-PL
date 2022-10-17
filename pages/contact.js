import { marked } from "marked";
import Layout from "@/components/Layout";
import PageHeaderBlock from "@/components/PageHeader";
import contactForm from "@/config/contactForm.json";
import { getSinglePage } from "@/libs/getSinglePage";
import { IconMailForward, IconPhone, IconBrandInstagram } from "@tabler/icons";
import ContactForm from "@/components/Contact";

export default function Contact({ contact: { frontMatter } }) {
  return (
    <Layout metaTitle={frontMatter.title}>
      <PageHeaderBlock title={frontMatter.title} />

      <section>
        <div className="container pb-5">
          <div className="row gy-5 justify-content-center">
            <div className="col-lg-5 col-md-10 ms-lg-auto me-lg-0 me-auto">
              <div className="mb-5">
                <h2 className="h3 mb-3">{frontMatter.contact.title}</h2>
                <p
                  className="mb-0"
                  dangerouslySetInnerHTML={{
                    __html: marked.parseInline(frontMatter.contact.content),
                  }}
                ></p>{" "}
              </div>
              <div>
                <h2
                  className="h4 mb-3"
                  dangerouslySetInnerHTML={{
                    __html: marked.parseInline(
                      frontMatter.contact.contact_info_title
                    ),
                  }}
                ></h2>
                <p className="mb-2 content">
                  <i className="me-2 d-inline-block mb-0">
                    <IconMailForward size={16} />
                  </i>{" "}
                  <a href={`mailto:${frontMatter.contact.email_address}`}>
                    {frontMatter.contact.email_address}
                  </a>
                </p>
                <p className="mb-0 content">
                  <i
                    className="me-2"
                    style={{ transform: "translateY(" + -2 + "px)" }}
                  >
                    <IconBrandInstagram size={17} />
                  </i>
                  <a
                    href={`https://instagram.com/${frontMatter.contact.instagram_account}`}
                  >
                    {frontMatter.contact.instagram_account}
                  </a>
                </p>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}
export async function getStaticProps() {
  return {
    props: {
      contact: getSinglePage("content/contact.md"),
    },
  };
}
