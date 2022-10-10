const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@enums": path.resolve(__dirname, 'src/enums/index.ts'),
      "@hooks": path.resolve(__dirname, 'src/hooks/index.ts'),
      "@pages": path.resolve(__dirname, 'src/components/pages/index.ts'),
      '@molecules': path.resolve(__dirname, 'src/components/molecules/index.ts'),
    },
  },
}
