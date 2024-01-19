import { useState } from "react";

export const useForceUpdate = () => {
    const [, setState] = useState<any>();
    return () => setState({});
  }