import { Heading } from "../../components/Heading/Heading";
import { TextColors } from "../../constants/colorNames";
import styles from "./Home.module.css";

export const HomePage = () => {
  const classNames = [
    "row justify-content-center align-content-center h-100",
    styles.homePage,
  ].join(" ");

  return (
    <div className={classNames}>
      <div className="row">
        <Heading title="Easy Learn Kit" color={TextColors.WHITE} />
      </div>
    </div>
  );
};
