import React from "react";

import classes from "./WelcomePage.module.css";

import { categoryArray } from "../utility/utility";
import CategoryItem from "../components/CategoryItem";

const WelcomePage: React.FC = () => {
  return (
    <>
      <h1 className={classes.header1}>Welcome to our quiz game!</h1>
      <h2 className={classes.header2}>Choose the category: </h2>
      <ul className={classes.list}>
        {categoryArray.map((item, index) => {
          return <CategoryItem item={item} key={index} />;
        })}
      </ul>
    </>
  );
};

export default WelcomePage;
