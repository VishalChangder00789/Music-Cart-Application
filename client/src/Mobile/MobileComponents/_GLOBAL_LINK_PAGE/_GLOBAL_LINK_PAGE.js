import React from "react";
import "./_GLOBAL_LINK_PAGE.css";

import _GLOBAL_MOBILE_BUTTON from "../_GLOBAL_MOBILE_BUTTON/_GLOBAL_MOBILE_BUTTON";

const _GLOBAL_LINK_PAGE = ({ linkPages, title }) => {
  return (
    <div className="_GLOBAL_LINK_PAGE_Container">
      __________{` ${title} `} __________
      <_GLOBAL_MOBILE_BUTTON
        buttonTitle="Continue"
        buttonHeight="50px"
        buttonWidth="100%"
        background="#white"
        fontColor="#000000"
        outline="none"
        borderRadius="7px"
        fontSize="18px"
        marginTop="7%"
        border="2px solid #BDBDBD"
        addFunctionality={linkPages}
      />
    </div>
  );
};

export default _GLOBAL_LINK_PAGE;
