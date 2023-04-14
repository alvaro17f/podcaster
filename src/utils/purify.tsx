import React from "react";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

type ParseContentProps = { content?: string | null };

export const ParseContent: React.FC<ParseContentProps> = ({ content }) => (
  <div>{content && parse(DOMPurify.sanitize(content))}</div>
);
