import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import SessionNode from "supertokens-node/recipe/session";
import { appInfo } from "./appInfo";

export const backendConfig = () => {
  return {
    framework: "express",
    supertokens: {
      // These are the connection details of the app you created on supertokens.com
      connectionURI: process.env.SUPERTOKENS_CORE_CONNECTION_URI,
      apiKey: process.env.SUPERTOKENS_CORE_API_KEY,
    },
    appInfo,
    recipeList: [
      EmailPasswordNode.init({
        /*         disableDefaultUI: true, */
        signUpFeature: {
          formFields: [
            {
              id: "email",
            },
            {
              id: "firstname",
            },
            {
              id: "lastname",
            },
            {
              id: "phone",
            },
          ],
        },
      }),
      SessionNode.init(),
    ],
    isInServerlessEnv: true,
  };
};
