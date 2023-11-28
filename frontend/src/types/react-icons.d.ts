import { IconType } from "react-icons/lib";

interface IIcon {
  className?: string;
  onClick?: () => void;
}

declare module "react-icons" {
  export interface IconBaseProps extends IIcon {}
}
