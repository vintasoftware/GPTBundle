import imageSize from 'rehype-img-size';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import bundleAnalyzer from '@next/bundle-analyzer';
import createMdx from '@next/mdx';

const rehypePrettyCodeOptions = {
  theme: 'github-dark-dimmed',
};

const withMDX = createMdx({
  options: {
    providerImportSource: '@mdx-js/react',
    remarkPlugins: [],
    rehypePlugins: [[imageSize, { dir: 'public' }], [rehypePrettyCode, rehypePrettyCodeOptions], rehypeSlug],
  },
});

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material', '@mui/lab'],
    mdxRs: false,
  },
};

export default withBundleAnalyzer(withMDX(nextConfig));
