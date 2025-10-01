import { Heading } from "@/components/Heading/Heading";
import { TextColors } from "@/components//constants/colorNames";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const classNames = [
    "homepage row justify-content-center align-content-center h-100",
    styles.homePage,
  ].join(" ");

  return (
    <div className={classNames}>
      <div className="row">
        <Heading title="Easy Learn Kit" color={TextColors.WHITE} />
      </div>
    </div>
  );
}
