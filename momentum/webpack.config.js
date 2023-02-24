const path = require('path');
const SRC = path.resolve(__dirname, 'node_modules');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
    hot: true
  },
  entry: [
    "@babel/polyfill",
    // "./app/js",
    path.resolve(__dirname, 'src/js', 'script.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    // filename: 'script.[contenthash].js'
    filename: 'script.js',
    assetModuleFilename: 'assets/[name][ext]'
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/js'),
          context: 'json',
          to: path.resolve(__dirname, 'dist/js'),
        },
        {
          from: path.resolve(__dirname, 'src/js/playList.js'),
          to: path.resolve(__dirname, 'dist/js/playList.js'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/sounds'),
          to: path.resolve(__dirname, 'dist/assets/sounds'),
        }
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    new MiniCssExtractPlugin({
      // filename: 'style.[contenthash].css'
      filename: 'style.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')]
              }
            }
          },
          "sass-loader"
        ],
        generator: {
          filename: 'styles/[name][ext]'
        }
      },
      {
        test: /\.(mp3?|wav|ogg|mpe?g)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/sounds/[name][hash][ext]',
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ],
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext]'
        }
      },
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ]
  }
}