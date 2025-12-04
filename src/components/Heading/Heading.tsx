import { TextColors } from "@/components/constants/colorNames";
import { joinClassNames } from "@/utils/classNames";

export interface HeadingProps {
  title: string;
  color?: TextColors;
}

export const Heading = (props: HeadingProps) => {
  const { title, color = TextColors.PRIMARY } = props;
  const classNames = joinClassNames(`text-${color}`);

  return <h1 className={classNames}>{title}</h1>;
};
