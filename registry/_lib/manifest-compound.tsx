"use client";

import { createContext, createElement, useContext } from "react";
import type { ComponentType, ImgHTMLAttributes, ReactNode } from "react";

export const RegistryImage = (props: ImgHTMLAttributes<HTMLImageElement>) =>
  createElement("img", props);

export const createManifestCompound = <Props extends object>(
  View: ComponentType<Props>,
  displayName: string
) => {
  const Context = createContext<Props | null>(null);

  const Content = (overrides: Partial<Props>) => {
    const value = useContext(Context);

    if (!value) {
      throw new Error(
        `${displayName}.Content must be used within ${displayName}`
      );
    }

    return <View {...value} {...overrides} />;
  };

  const Root = ({
    children,
    ...props
  }: Props & {
    children?: ReactNode;
  }) => (
    <Context.Provider value={props as Props}>
      {children ?? <Content />}
    </Context.Provider>
  );

  Root.displayName = displayName;
  Content.displayName = `${displayName}.Content`;

  return Object.assign(Root, { Content });
};
