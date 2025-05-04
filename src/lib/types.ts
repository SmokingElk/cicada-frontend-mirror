import { ReactNode } from "react";

export interface Styleable {
  className?: string;
}

export interface WithChildren {
  children: ReactNode;
}
