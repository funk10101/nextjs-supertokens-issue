import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";
import Router from "next/router";
import { useEffect } from "react";

export const frontendConfig = () => {
  const PHONE_NUM_LENGTH = 10;
  const errMsg = "This format please: (123)456-7890";

  function validatePhone(value) {
    if (value.match(/[a-z!@#$%^&*_+={}|\[\]\<,>.?/]/gi)) {
      return errMsg;
    } else if (value.replace(/\D/g, "").length !== PHONE_NUM_LENGTH) {
      return errMsg + " with NO country code.";
    } else {
      /**
       * for debugging
       * const _num = value.replace(/\D/g, "").match(/(\d{3})(\d{3})(\d{4})/);
       * const phoneNumber = `(${_num[1]})${_num[2]}-${_num[3]}`;
       * return phoneNumber;
       */
      // if valid numbers return undefined
      return undefined;
    }
  }

  function inputMask(value) {
    const _num = value.replace(/\D/g, "").match(/(\d{3})(\d{3})(\d{4})/);
    const phoneNumber = `(${_num[1]})${_num[2]}-${_num[3]}`;
    return phoneNumber;
  }

  return {
    appInfo,
    recipeList: [
      EmailPasswordReact.init({
        getRedirectionURL: async (context) => {
          if (context.action === "SUCCESS") {
            if (context.redirectToPath !== undefined) {
              // navigate back to where the user was before authenticated
              return context.redirectToPath;
            }
            return "/about-us";
          }
          return undefined;
        },
        override: {
          functions: (oI) => {
            return {
              ...oI,
              signUp: async function (input) {
                input.formFields = input.formFields.map((f) => {
                  if (f.id === "phone") {
                    return {
                      ...f,
                      value: inputMask(f.value),
                    };
                  }
                  return f;
                });
                // call the original implementation
                return oI.signUp(input);
              },
            };
          },
          components: {
            EmailPasswordSignUp_Override: ({ DefaultComponent, ...props }) => {
              useEffect(() => {
                const phoneInput = document
                  .querySelector("#supertokens-root")
                  .shadowRoot.querySelector(
                    "form > div:nth-child(5) > div:nth-child(2) > div > input"
                  );

                function onBlur() {
                  const phoneNumber = phoneInput.value;
                  const result = validatePhone(phoneNumber);

                  if (result !== undefined) {
                    // reset input value
                    phoneInput.value = "";
                    return result;
                  }
                  const normalisedPhoneNumber = inputMask(phoneNumber);
                  phoneInput.value = normalisedPhoneNumber;
                }
                phoneInput.addEventListener("blur", onBlur);
                return () => {
                  phoneInput.removeEventListener("blur", onBlur);
                };
              }, []);
              return <DefaultComponent {...props} />;
            },
          },
        },
        signInAndUpFeature: {
          signUpForm: {
            formFields: [
              {
                id: "firstname",
                label: "First Name",
                placeholder: "Jane",
              },
              {
                id: "lastname",
                label: "Last Name",
                placeholder: "Doe",
              },
              {
                id: "phone",
                label: "Phone",
                placeholder: "(123)456-7890",
                validate: (value) => {
                  const result = validatePhone(value);
                  return result;
                },
              },
            ],
          },
        },
      }),
      SessionReact.init(),
    ],
    windowHandler: (oI) => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: (href) => {
            Router.push(href);
          },
        },
      };
    },
  };
};
