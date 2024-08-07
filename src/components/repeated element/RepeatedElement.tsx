import React from "react";

interface RepeatedElementProps {
  count: number;
  children: React.ReactNode;
}

const RepeatedElement: React.FC<RepeatedElementProps> = ({ count, children }) => {
  return Array.from({ length: count }, (_, index) => (
    <React.Fragment key={index}>
      {React.isValidElement(children)
        ? React.cloneElement(children, { key: index })
        : children}
    </React.Fragment>
  ));
};

export default RepeatedElement;