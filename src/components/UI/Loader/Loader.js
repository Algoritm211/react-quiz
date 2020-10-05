import React from "react";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
      <div className={classes.сenter}>
        <div className={classes.LoaderMainClass}>
            <div className={classes.loader}>
                <div></div>
                <div></div>
            </div>
        </div>
      </div>
  );
};

export default Loader;
