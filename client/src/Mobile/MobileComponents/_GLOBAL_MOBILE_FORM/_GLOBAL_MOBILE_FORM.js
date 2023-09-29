import React, { useEffect } from "react";
import "./_GLOBAL_MOBILE_FORM.css";

// File
import _GLOBAL_MOBILE_INPUTS from "../_GLOBAL_MOBILE_INPUTS/_GLOBAL_MOBILE_INPUTS";
import _GLOBAL_MOBILE_BUTTON from "../_GLOBAL_MOBILE_BUTTON/_GLOBAL_MOBILE_BUTTON";
import _GLOBAL_LINK_PAGE from "../_GLOBAL_LINK_PAGE/_GLOBAL_LINK_PAGE";
import { nanoid } from "nanoid";
import Input from "../../../Components/Inputs/Inputs";

const _GLOBAL_MOBILE_FORM = ({
  MainTaskMessage,
  SubTaskMessage,
  NumberofInputs,
  ArrayInputTitles,
  ArrayInputTypes,
  ArrayPlaceHolder,
  ArrayStateChange,
  HandleFormControl,
  linkPages,
  passedTitle,
}) => {
  const renderInputs = [];
  for (let i = 0; i < NumberofInputs; i++) {
    renderInputs.push(
      <_GLOBAL_MOBILE_INPUTS
        InputTitle={ArrayInputTitles[i]}
        InputPlaceholder={ArrayPlaceHolder[i]}
        InputType={ArrayInputTypes[i]}
        setInputChange={ArrayStateChange[i]}
      />
    );
  }

  return (
    <div className="_GLOBAL_MOBILE_FORM_CONTAINER">
      <div className="_GLOBAL_MOBILE_FORM_CONTAINER_INNER">
        <div className="_GLOBAL_MOBILE_FORM_CONTAINER_INNER__ContentMessage">
          <div className="_FORM_HEADER">{MainTaskMessage}</div>
          <div className="_FORM_SUB_HEADER">{SubTaskMessage}</div>
        </div>
        <div className="_GLOBAL_MOBILE_FORM_CONTAINER_INNER__InputsHolder">
          {renderInputs}
        </div>

        <div className="_GLOBAL_MOBILE_FORM_CONTAINER_INNER__BottomMessage _BottomMessageBold">
          By continuing, you agree to Musicart privacy notice and conditions of
          use.
        </div>

        <_GLOBAL_MOBILE_BUTTON
          buttonTitle="Continue"
          buttonHeight="50px"
          buttonWidth="100%"
          background="#2E0052"
          fontColor="white"
          outline="none"
          borderRadius="7px"
          fontSize="18px"
          marginTop="7%"
          addFunctionality={HandleFormControl}
        />

        <div className="_GLOBAL_MOBILE_FORM_CONTAINER_INNER__BottomMessage">
          By continuing, you agree to Musicart privacy notice and conditions of
          use.
        </div>
      </div>

      <_GLOBAL_LINK_PAGE linkPages={linkPages} title={passedTitle} />
    </div>
  );
};

export default _GLOBAL_MOBILE_FORM;
