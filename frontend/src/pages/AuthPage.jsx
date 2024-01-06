// eslint-disable-next-line no-unused-vars
import React from "react";
import SignupCard from "../components/SignupCard";
import Login from "../components/Login";
import authScreenAtom from "../atoms/authAtom";
import { useRecoilValue } from "recoil";

function AuthPage() {
  const authScreenState = useRecoilValue(authScreenAtom);

  return <>{authScreenState === "login" ? <Login /> : <SignupCard />}</>;
}

export default AuthPage;
