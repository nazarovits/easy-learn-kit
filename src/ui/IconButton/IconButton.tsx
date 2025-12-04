import { FiRefreshCw, FiSettings, FiCheck } from "react-icons/fi";
import { Button, ButtonProps } from "react-bootstrap";
import { joinClassNames } from "@/utils/classNames";
import styles from "./IconButton.module.css";

type IconButtonSize = "sm" | "lg";

const iconComponentMap = {
  refresh: FiRefreshCw,
  check: FiCheck,
  settings: FiSettings,
};

interface IconButtonProps extends ButtonProps {
  size?: IconButtonSize;
  iconType: keyof typeof iconComponentMap;
  btnSize?: "sm" | "lg";
}

const iconSizeMap: Record<IconButtonSize, number> = {
  sm: 16,
  lg: 24,
};

const buttonSizeClassMap: Record<IconButtonSize, string> = {
  sm: styles.squareButtonSm,
  lg: styles.squareButtonLg,
};

export function IconButton(props: IconButtonProps) {
  const { size = "lg", btnSize, iconType, children, ...restProps } = props;
  const iconSize = iconSizeMap[size];
  const cls = joinClassNames(
    styles.IconButton,
    styles.squareButton,
    buttonSizeClassMap[size],
    props.className
  );

  const Icon = iconComponentMap[props.iconType];

  if (!children) {
    return (
      <Button className={cls} {...restProps}>
        <Icon size={iconSize} />
      </Button>
    );
  }

  const clsWithText = joinClassNames(
    styles.IconButton,
    styles.IconButtonWithText,
    props.className
  );

  return (
    <Button className={clsWithText} {...restProps} size={btnSize}>
      <Icon size={iconSize} />
      <span className="ms-2">{children}</span>
    </Button>
  );
}

IconButton.dispalyName = "IconButton";

export default IconButton;
