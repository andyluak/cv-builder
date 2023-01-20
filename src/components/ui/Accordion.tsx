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
  triggerComponent: string | React.ReactNode;
  children?: React.ReactNode;
  hasChevron?: boolean;
};

const AccordionComponent = ({
  type,
  collapsible,
  defaultValue,
  isOpened,
  children,
  triggerComponent,
  hasChevron,
}: Props) => (
  <Accordion.Root
    className="AccordionRoot"
    type={type}
    collapsible={collapsible}
    defaultValue={isOpened ? defaultValue : undefined}
  >
    <Accordion.Item className="AccordionItem" value="item-1">
      <AccordionTrigger hasChevron={hasChevron}>
        {typeof triggerComponent === "string"
          ? triggerComponent.toUpperCase()
          : triggerComponent}
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </Accordion.Item>
  </Accordion.Root>
);

const AccordionTrigger = React.forwardRef(
  ({ children, className, hasChevron, ...props }, forwardedRef) => {
    return (
      <Accordion.Header className="AccordionHeader">
        <Accordion.Trigger
          className="AccordionTrigger group/trigger mb-2 flex w-full flex-row justify-between"
          {...props}
          ref={forwardedRef}
        >
          {children}
          {hasChevron && (
            <ChevronDown
              className="AccordionChevron w-4 fill-secondary transition-transform group-data-[state=open]/trigger:rotate-180"
              aria-hidden
            />
          )}
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
