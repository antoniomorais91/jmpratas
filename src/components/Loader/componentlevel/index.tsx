"use client";

import { PulseLoader } from "react-spinners";

interface LoaderProps {
  id?: string,
  text?: string,
  color?:string,
  loading?: boolean,
  size?: number,
}

export default function ComponentLevelLoader(props: LoaderProps) {
  return (
    <span className="flex gap-1 items-center">
      {props.text}
      <PulseLoader
        color={props.color}
        loading={props.loading}
        size={props.size || 10}
        data-testid="loader"
      />
    </span>
  );
}
