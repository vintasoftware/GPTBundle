'use client';

import { HTMLAttributes, ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Typography } from '@mui/material';

const MDXProviderWrapper = ({ children }: { children: ReactNode }) => {
  const components = {
    h1: (props: HTMLAttributes<HTMLElement>) => <Typography component="h1" variant="h4" marginY={2} {...props} />,
    h2: (props: HTMLAttributes<HTMLElement>) => <Typography component="h2" variant="h5" marginY={2} {...props} />,
    h3: (props: HTMLAttributes<HTMLElement>) => <Typography component="h3" variant="h6" marginY={2} {...props} />,
    p: (props: HTMLAttributes<HTMLElement>) => <Typography component="p" variant="body1" marginY={2} {...props} />,
  };

  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default MDXProviderWrapper;
