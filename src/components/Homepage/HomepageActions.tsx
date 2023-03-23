import React from "react";
import { useNavigate } from "react-router-dom";
import { HomepageButtonLinks, HomepageButtonValues } from "./HomepageHelpers";

const HomepageActions = () => {
  const navigate = useNavigate();
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.currentTarget.name === HomepageButtonLinks.CREATE_POLL)
      navigate(HomepageButtonLinks.CREATE_POLL);
    if (e.currentTarget.name === HomepageButtonLinks.JOIN_POLL)
      navigate(HomepageButtonLinks.JOIN_POLL);
  };
  return (
    <div className="my-12 flex flex-col justify-center">
      <button
        className="box btn-orange my-2"
        onClick={onClick}
        name={HomepageButtonLinks.CREATE_POLL}
      >
        {HomepageButtonValues.CREATE_POLL}
      </button>
      <button
        className="box btn-purple my-2"
        onClick={onClick}
        name={HomepageButtonLinks.JOIN_POLL}
      >
        {HomepageButtonValues.JOIN_POLL}
      </button>
    </div>
  );
};

export default HomepageActions;
