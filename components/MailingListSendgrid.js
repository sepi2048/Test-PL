import axios from "axios";
import { useState } from "react";

import { IconUserPlus } from "@tabler/icons";
import subscription from "@/config/subscription.json";

import ReactLoading from "react-loading";

const MailingListSendgrid = (props) => {
  const [isError, setIsError] = useState(true);
  const [shakeIt, setshakeIt] = useState(false);
  const [mail, setMail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Used both as modal and regular component
  const PropsIsEmpty = Object.keys(props).length === 0;
  //console.log(PropsIsEmpty); // false

  const subscribe = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

    setMail("");

    if (!regEx.test(mail) && mail !== "") {
      setIsError(true);
      setshakeIt(true);
      setMessage("Email is Not Valid");
      setTimeout(() => {
        setshakeIt(false);
      }, 1000);
    } else if (mail === "") {
      setIsError(true);
      setshakeIt(true);
      setMessage("Email is Empty");
      setTimeout(() => {
        setshakeIt(false);
      }, 1000);
    } else {
      setLoading(true);

      axios
        .put("/api/MailingList", {
          mail,
        })
        .then((result) => {
          if (result.status === 200) {
            setIsError(false);
            setMessage(result.data.message);
            setLoading(false);
            PropsIsEmpty
              ? console.log("No Modal")
              : setTimeout(() => {
                  props.onSubmit();
                }, 4000);
          }
        })
        .catch((err) => {
          setIsError(true);
          setMessage(err.data.message);
          setLoading(false);
        });

      setIsError(false);
      setMessage(null);
      setshakeIt(false);
    }
  };
  return (
    <div className="container">
      <div className="section">
        <div className="row justify-content-center align-items-center">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <div className="newsletter-block">
              <div className="section-title text-center mb-4">
                <img
                  className="rounded rotated freebie"
                  src="/images/freebie-hardcover.png"
                  height="200"
                  width="150"
                />
              </div>
              <div className="section-title text-center newsletter-bg-primary">
                <br />
                <h2 className="section-title text-center m-4">
                  {subscription.title}
                </h2>
              </div>

              <div className="newsletter-bg-black">
                <div className="input-group flex-column flex-sm-row flex-nowrap flex-sm-nowrap">
                  <input
                    onChange={(e) => {
                      setMail(e.target.value);
                    }}
                    type="email"
                    className={`form-control required email w-auto text-center text-sm-start`}
                    placeholder={subscription.formPlaceholder}
                    value={mail}
                    autoComplete="email"
                    required
                  ></input>

                  <button
                    type="submit"
                    name="subscribe"
                    onClick={subscribe}
                    className="input-group-text justify-content-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <i className="pb-2 me-2">
                        <ReactLoading
                          type="spin"
                          color="#2d2d2d"
                          height={19}
                          width={19}
                        />
                      </i>
                    ) : (
                      <i className="me-2">
                        <IconUserPlus size={16} />
                      </i>
                    )}

                    {isLoading ? "Loading.." : subscription.formButtonLabel}
                  </button>
                </div>

                <div className="message">
                  <p
                    className={`${shakeIt ? "shakeit" : ""} ${
                      isError ? "error" : "success"
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
    </div>
  );
};

export default MailingListSendgrid;
