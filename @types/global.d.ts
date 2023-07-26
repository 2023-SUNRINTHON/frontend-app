import { LoginCompleteProps, status } from "../screens/Login/Complete";

declare global {
  type RootStackParams = {
    Screens: undefined;
    Login: undefined;
    LoginComplete: LoginCompleteProps;
    Detail: {
      title: string;
      time: string;
      content: string;
    };
    Alert: undefined;
    Notice: undefined;
  };

  type RootTabParams = {
    Main: undefined;
    List: undefined;
    Account: undefined;
  };
}

export {};
