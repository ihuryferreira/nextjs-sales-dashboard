"use client";

import { AppProgressProvider as ProgressProvider } from '@bprogress/next';

const ProgressProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="6px"
      color="#03cffc"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}

export default ProgressProviderWrapper;