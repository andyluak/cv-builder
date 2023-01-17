// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as Accordion from "@radix-ui/react-accordion";
import React from "react";

import ChevronDown from "public/chevron-down.svg";

type Props = {
  type: "single" | "multiple";
  collapsible: boolean;
  value: string;
  isOpened?: boolean;
  defaultValue?: string;
  title: string;
  children?: React.ReactNode;
};

const AccordionComponent = ({
  title,
  type,
  collapsible,
  defaultValue,
  isOpened,
  children,
}: Props) => (
  <Accordion.Root
    className="AccordionRoot"
    type={type}
    collapsible={collapsible}
    defaultValue={isOpened ? defaultValue : undefined}
  >
    <Accordion.Item className="AccordionItem" value="item-1">
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </Accordion.Item>
  </Accordion.Root>
);

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Accordion.Header className="AccordionHeader">
        <Accordion.Trigger
          className="AccordionTrigger group/trigger flex w-full flex-row justify-between"
          {...props}
          ref={forwardedRef}
        >
          {children}
          <ChevronDown
            className="AccordionChevron w-4 fill-secondary transition-transform group-data-[state=open]/trigger:rotate-180"
            aria-hidden
          />
        </Accordion.Trigger>
      </Accordion.Header>
    );
  }
);

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={"AccordionContent"}
      {...props}
      ref={forwardedRef}
    >
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  )
);

AccordionContent.displayName = "AccordionContent";
AccordionTrigger.displayName = "AccordionTrigger";

export default AccordionComponent;
