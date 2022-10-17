import React from "react";

import { IconBrandTelegram } from "@tabler/icons";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const recaptchaRef = React.createRef();

  const formData = {};

  async function handleOnSubmit(e) {
    e.preventDefault();

    Array.from(e.currentTarget.elements).forEach((field) => {
      if (!field.name) return;
      formData[field.name] = field.value;
    });

    recaptchaRef.current.execute();
  }

  async function sendMail() {
    fetch("/api/mail", {
      method: "post",
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.status === 200) {
        setName("");
        setMail("");
        setMessage("");
        setStatus("success");
        setTimeout(() => {
          setStatus("");
        }, 15000);
      } else {
        setStatus("error");
        setTimeout(() => {
          setStatus("");
        }, 15000);
      }
    });
  }

  const onReCAPTCHAChange = async (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    try {
      const response = await fetch("/api/recaptcha", {
        method: "POST",
        body: JSON.stringify({ mail, captcha: captchaCode }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // If the response is ok than show the success alert
        //alert("Email registered successfully");
        fetch("/api/mail", {
          method: "post",
          body: JSON.stringify(formData),
        }).then((res) => {
          if (res.status === 200) {
            setName("");
            setMail("");
            setMessage("");
            setStatus("success");
            setTimeout(() => {
              setStatus("");
            }, 15000);
          } else {
            setStatus("error");
            setTimeout(() => {
              setStatus("");
            }, 15000);
          }
        });
      } else {
        // Else throw an error with the message returned
        // from the API
        setStatus("error");

        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      //      alert(error?.message || "Something went wrong");
      setStatus("error");
    } finally {
      // Reset the reCAPTCHA when the request has failed or succeeeded
      // so that it can be executed again if user submits another email.
      recaptchaRef.current.reset();
    }
  };

  return (
    <div className="col-lg-5 me-lg-auto ms-lg-0 ms-auto">
      <h2 className="h3 mb-4">Contact form</h2>

      <form onSubmit={handleOnSubmit} className="row g-4">
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={onReCAPTCHAChange}
        />
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Your name here"
            name="name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="col-md-12">
          <input
            type="email"
            className="form-control"
            placeholder="Email address"
            name="mail"
            required
            value={mail}
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
        </div>
        <div className="col-md-12">
          <textarea
            className="form-control"
            placeholder="Ask question or just say Hi"
            rows="4"
            name="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            required
          ></textarea>
        </div>
        <div className="col-12 message">
          {status === "success" ? (
            <div className="alert alert-success">
              <strong>Thank You!</strong> Your message was sent.
            </div>
          ) : status === "error" ? (
            <div className="alert alert-danger">
              <strong>Oups!</strong> There was a problem, please try again or
              contact us
            </div>
          ) : null}
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            aria-label="Send Message"
          >
            Send{" "}
            <i className="ms-1">
              <IconBrandTelegram size={18} />
            </i>
          </button>
        </div>
      </form>
    </div>
  );
}
