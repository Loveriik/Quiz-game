import classes from "./CategoryItem.module.css";
import { useContext } from "react";
import { GameContext } from "../store/gameContext";

import { CategoryProps } from "../devDependencies/dependencies";

const CategoryItem: React.FC<CategoryProps> = (props) => {
  const ctx = useContext(GameContext);

  return (
    <li
      className={classes.listItem}
      onClick={ctx.changeGameType.bind(null, props.item.name)}
    >
      <div>
        <h3>{props.item.name}</h3>
        <span>10 questions</span>
      </div>

      <img className={classes.logo} src={props.item.src} alt={props.item.alt} />
    </li>
  );
};

export default CategoryItem;
