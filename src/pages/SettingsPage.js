import React from "react";
import { SettingsForm, HeaderLinksPage } from "../components";
import transition from "../LogicComp/Transition";

const SettingsPage = () => {
  return (
    <>
      <HeaderLinksPage />
      <SettingsForm />

    </>
  );


};

export default transition(SettingsPage);
