/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['passkey-kit', 'passkey-kit-sdk', 'sac-sdk'],
  webpack: (config) => {
    // Add support for importing .ts files from node_modules
    config.resolve.extensions.push('.ts', '.tsx');
    
    // Add rule to handle type-only imports
    config.module.rules.push({
      test: /\.ts$/,
      include: [
        /node_modules\/passkey-kit/,
        /node_modules\/passkey-kit-sdk/,
        /node_modules\/sac-sdk/
      ],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['next/babel'],
              ['@babel/preset-typescript', { allowDeclareFields: true }]
            ],
            plugins: [['@babel/plugin-syntax-typescript', { isTSX: true, allowDeclareFields: true }]]
          }
        }
      ]
    });

    return config;
  }
};

module.exports = nextConfig; 