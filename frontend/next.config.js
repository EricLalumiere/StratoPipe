/** @type {import('next').NextConfig} */
const nextConfig = {
  // Completely disable source maps
  productionBrowserSourceMaps: false,
  
  // Configure webpack to aggressively disable source maps and fix HMR
  webpack: (config, { dev, isServer }) => {
    // Completely disable source maps for all environments
    config.devtool = false;
    
    // Remove all source map related plugins and loaders
    config.plugins = config.plugins.filter(plugin => {
      return !plugin.constructor.name.includes('SourceMap') && 
             !plugin.constructor.name.includes('SourceMapDevTool') &&
             !plugin.constructor.name.includes('EvalSourceMapDevTool');
    });
    
    // Disable source map generation in all loaders
    config.module.rules.forEach(rule => {
      if (rule.use) {
        if (Array.isArray(rule.use)) {
          rule.use.forEach(use => {
            if (typeof use === 'object' && use.options) {
              use.options.sourceMap = false;
            }
          });
        } else if (typeof rule.use === 'object' && use.options) {
          rule.use.options.sourceMap = false;
        }
      }
    });
    
        if (dev && !isServer) {
          // Enhanced HMR configuration
          config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
            ignored: /node_modules/,
          };
          
          // Fix WebSocket HMR issues
          config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            net: false,
            tls: false,
            ws: false,
            'ws': false,
            'websocket': false,
            'socket.io-client': false,
          };
          
          // Completely disable HMR and WebSocket
          config.devServer = {
            ...config.devServer,
            hot: false,
            liveReload: false,
            webSocketServer: false,
            client: {
              webSocketURL: false,
              webSocketTransport: false,
            },
            webSocketServer: false,
          };
          
          // Disable webpack HMR
          config.optimization = {
            ...config.optimization,
            splitChunks: false,
          };
          
          // Disable HMR plugins
          config.plugins = config.plugins.filter(plugin => {
            return !plugin.constructor.name.includes('HotModuleReplacement') &&
                   !plugin.constructor.name.includes('HMR') &&
                   !plugin.constructor.name.includes('WebSocket');
          });
          
          // Provide module.hot as undefined to prevent errors
          config.resolve.alias = {
            ...config.resolve.alias,
            'module.hot': false,
          };
          
          // Add webpack plugin to handle module.hot
          const webpack = require('webpack');
          config.plugins.push(
            new webpack.DefinePlugin({
              'module.hot': 'undefined',
              'typeof module.hot': '"undefined"',
            })
          );
          
          // Add ProvidePlugin to provide module.hot as undefined
          config.plugins.push(
            new webpack.ProvidePlugin({
              'module.hot': [false],
            })
          );
        }
    
    // Completely ignore all source map related warnings and errors
    config.ignoreWarnings = [
      /Failed to parse source map/,
      /Can't resolve .*\.map/,
      /Source map error/,
      /JSON.parse.*unterminated string/,
      /installHook\.js\.map/,
      /react_devtools_backend_compact\.js\.map/,
      /webpack-hmr/,
      /Source map/,
      /\.map/,
      /Invalid source map/,
      /ERR_INVALID_ARG_TYPE.*payload/,
      /webpack.*hmr/,
      /WebSocket/,
      /ws:/,
      /websocket/,
      /socket\.io/,
      /hmr/,
      /hot.*reload/,
      /module\.hot/,
      /can't access property.*module\.hot/,
    ];
    
    return config;
  },

  // Configure experimental features
  experimental: {
    esmExternals: true,
  },

  // Configure headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },

  // Configure rewrites for API calls
  async rewrites() {
    return [
      {
        source: '/api/projects/:path*',
        destination: 'http://localhost:8001/api/projects/:path*',
      },
      {
        source: '/api/assets/:path*',
        destination: 'http://localhost:8001/api/assets/:path*',
      },
      {
        source: '/api/auth/:path*',
        destination: 'http://localhost:8001/api/auth/:path*',
      },
      {
        source: '/api/collaboration/:path*',
        destination: 'http://localhost:8001/api/collaboration/:path*',
      },
      {
        source: '/api/versions/:path*',
        destination: 'http://localhost:8001/api/versions/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
