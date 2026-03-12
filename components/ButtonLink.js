import Link from "next/link";
import { colors, sizes, style } from "./Button";

const ButtonLink = (props) => {
  const { href, text, icon, color, additionalClasses, size } = props;

  return (
    <Link
      href={href}
      className={` ${style} ${
        colors[color] || colors["green"]
      } ${sizes[size] || sizes["md"]} ${additionalClasses}`}
    >
      {icon && <span className="material-icons-round">{icon}</span>}
      <span>{text}</span>
    </Link>
  );
};

export default ButtonLink;
