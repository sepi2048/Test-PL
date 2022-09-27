import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

import { IconUserPlus } from "@tabler/icons";
import subscription from "@/config/subscription.json";

const MailingListSendgrid = () => {
  const [isError, setIsError] = useState(true);
  const [shakeIt, setshakeIt] = useState(false);
  const [mail, setMail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const subscribe = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

    if (!regEx.test(mail) && mail !== "") {
      setIsError(true);
      setshakeIt(true);
      setMessage("Email is Not Valid");
      setTimeout(() => {
        setshakeIt(false);
      }, 1000);
    } else if (mail === "") {
      setIsError(false);
      setshakeIt(true);
      setMessage("Email is Empty");
      setTimeout(() => {
        setshakeIt(false);
      }, 1000);
    } else {
      setLoading(true);
      axios
        .put("api/mailingList", {
          mail,
        })
        .then((result) => {
          if (result.status === 200) {
            toast.success(result.data.message);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });

      setMessage(null);
      setIsError(true);
      setshakeIt(false);
    }

    // Success handelibg??
  };
  return (
    <div className="container">
      <div className="section">
        <div className="row justify-content-center align-items-center">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <div className="newsletter-block">
              <h2 className="section-title text-center mb-4">
                {subscription.title}
              </h2>

              <div className="input-group flex-column flex-sm-row flex-nowrap flex-sm-nowrap">
                <input
                  onChange={(e) => {
                    setMail(e.target.value);
                  }}
                  type="email"
                  className={`form-control required email w-auto text-center text-sm-start`}
                  placeholder={subscription.formPlaceholder}
                  required
                ></input>

                <button
                  type="submit"
                  name="subscribe"
                  onClick={subscribe}
                  className="input-group-text justify-content-center"
                >
                  <i className="me-2">
                    <IconUserPlus size={16} />
                  </i>
                  {subscription.formButtonLabel}
                </button>
              </div>

              <div className="message">
                <p
                  className={`${shakeIt ? "shakeit" : ""} ${
                    isError ? "error" : "warning"
                  }`}
                >
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailingListSendgrid;
