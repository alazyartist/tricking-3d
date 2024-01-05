interface IIcon {
  className?: string;
  onClick?: () => void;
}

declare module "react-icons" {
  export interface IconType extends IIcon {}
}
