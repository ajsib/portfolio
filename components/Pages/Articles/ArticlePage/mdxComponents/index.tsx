import { useMDXComponents } from "@mdx-js/react";
import React from "react";

import Admonition from "./Admonition";
import Blockquote from "./Blockquote";
import CodeBlock from "./CodeBlock";
import InlineCode from "./InlineCode";
import Table from "./Tables";
import { UnorderedList, OrderedList } from "./List";
import TOC from "./TOC/";

const customComponents = {
  Admonition,
  blockquote: Blockquote,
  pre: (props: React.HTMLProps<HTMLPreElement>) => {
    if (
      props.children &&
      React.isValidElement(props.children) &&
      props.children.props
    ) {
      const childProps = props.children.props;
      return <CodeBlock>{childProps.children}</CodeBlock>;
    }
    return <pre {...props} />;
  },
  code: (props: React.HTMLProps<HTMLElement>) => {
    const { children, className, ...rest } = props;
    return <InlineCode {...rest}>{children}</InlineCode>;
  },
  table: Table,
  ul: UnorderedList,
  ol: OrderedList,
  TOC,
};

export const useCustomComponents = () => {
  const defaultComponents = useMDXComponents();
  return React.useMemo(
    () => ({ ...defaultComponents, ...customComponents }),
    [defaultComponents]
  );
};

export default useCustomComponents;
