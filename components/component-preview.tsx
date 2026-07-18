import type { ReactNode } from "react";

import { ComponentPreviewFrame } from "@/components/component-preview-frame";
import { ComponentSource } from "@/components/component-source";
import { ExamplesIndex } from "@/examples/__index__";

export const ComponentPreview = ({
  className,
  name,
  showcase = false,
  src,
  title,
  showCode = false,
  children,
}: {
  className?: string;
  name?: string;
  showcase?: boolean;
  src?: string;
  title?: string;
  showCode?: boolean;
  children?: ReactNode;
}) => {
  const example = name ? ExamplesIndex[name] : undefined;
  const Demo = example?.component;

  if (!(children || Demo)) {
    return null;
  }

  return (
    <>
      <ComponentPreviewFrame
        className={className}
        showcase={showcase}
        title={title}
      >
        {children ?? (Demo ? <Demo /> : null)}
      </ComponentPreviewFrame>
      {showCode && src ? (
        <ComponentSource src={src} title={title ?? src.split("/").at(-1)} />
      ) : null}
    </>
  );
};
