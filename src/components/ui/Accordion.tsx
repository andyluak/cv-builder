// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as Accordion from "@radix-ui/react-accordion";
import React from "react";

type Props = {
  type: "single" | "multiple";
  collapsible: boolean;
  value: string;
  isOpened?: boolean;
  defaultValue?: string;
  title: string;
  content: string | React.FC;
};


const AccordionComponent = ({
  title, content, type, collapsible, defaultValue, isOpened
} : Props) => (
  <Accordion.Root
    className="AccordionRoot"
    type={type}
    collapsible={collapsible}
    defaultValue={isOpened ? defaultValue : undefined}
  >
    <Accordion.Item className="AccordionItem" value="item-1">
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        {content}
      </AccordionContent>
    </Accordion.Item>
  </Accordion.Root>
);

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger
        className="AccordionTrigger"
        {...props}
        ref={forwardedRef}
      >
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  )
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
