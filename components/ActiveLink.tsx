import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import React, { useState, useEffect } from "react";

type ActiveLinkProps = LinkProps & {
  children: React.ReactElement;
  activeClassName: string;
  activeOnExact?: boolean;
};

const ActiveLink: React.FC<ActiveLinkProps> = ({
  children,
  activeClassName,
  activeOnExact,
  ...props
}) => {
  const { asPath, isReady } = useRouter();

  const child = React.Children.only(children);
  const childClassName = child.props.className || "";
  const [className, setClassName] = useState(childClassName);

  useEffect(() => {
    if (isReady) {
      const linkPathname = new URL(
        (props.as || props.href) as string,
        location.href,
      ).pathname;

      const activePathname = new URL(asPath, location.href).pathname;
      const isActive = activeOnExact
        ? activePathname === linkPathname
        : activePathname.startsWith(linkPathname);

      const newClassName = isActive
        ? `${childClassName} ${activeClassName}`.trim()
        : childClassName;

      if (newClassName !== className) {
        setClassName(newClassName);
      }
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    childClassName,
    activeClassName,
    setClassName,
    className,
    activeOnExact,
  ]);

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
