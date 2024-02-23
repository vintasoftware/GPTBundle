'use client';

import { Theme } from '@mui/material/styles';

const docsMarkdownStyles = (theme: Theme) => ({
  figure: {
    margin: 0,
  },
  pre: {
    overflowX: 'auto',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#12111a!important',
    padding: `${theme.spacing(1)} ${theme.spacing(0.5)}`,
  },
  'span[data-highlighted-line]': {
    borderBottomColor: '#9333EA',
    backgroundColor: '#6B21A880',
    fontWeight: 700,
    color: '#E9D5FF',
  },
  // TODO: Use CodeBlock component instead. Configure it on MDXProviderWrapper.
  code: {
    counterReset: 'line',
    fontSize: '0.8125rem',
  },
  'code > [data-line]::before': {
    counterIncrement: 'line',
    content: 'counter(line)',
    display: 'inline-block',
    width: theme.spacing(1),
    marginRight: theme.spacing(1.5),
    textAlign: 'right',
    color: 'gray',
  },
  'code[data-line-numbers-max-digits="2"] > [data-line]::before': {
    width: theme.spacing(2),
  },
  'code[data-line-numbers-max-digits="3"] > [data-line]::before': {
    width: theme.spacing(3),
  },
  img: {
    width: '100%',
    height: 'auto',
    border: `2px solid ${theme.palette.grey[200]}`,
  },
});

export default docsMarkdownStyles;
