import { FiRefreshCw, FiSettings } from "react-icons/fi";
import { Button, ButtonProps } from "react-bootstrap";
import styles from "./IconButton.module.css";

import { joinClassNames } from "@/utils/classNames";

type IconButtonSize = "sm" | "lg";

const iconComponentMap = {
  refresh: FiRefreshCw,
  settings: FiSettings,
};

interface IconButtonProps extends ButtonProps {
  size?: IconButtonSize;
  iconType: keyof typeof iconComponentMap;
}

const iconSizeMap: Record<IconButtonSize, number> = {
  sm: 16,
  lg: 24,
};

const buttonSizeClassMap: Record<IconButtonSize, string> = {
  sm: styles.squareButtonSm,
  lg: styles.squareButtonLg,
};

function IconButton(props: IconButtonProps) {
  const { size = "lg", iconType, ...restProps } = props;
  const iconSize = iconSizeMap[size];
  const cls = joinClassNames(
    styles.squareButton,
    buttonSizeClassMap[size],
    props.className
  );

  const Icon = iconComponentMap[props.iconType];

  return (
    <Button className={cls} {...restProps}>
      <Icon size={iconSize} />
    </Button>
  );
}

IconButton.dispalyName = "IconButton";

export default IconButton;
