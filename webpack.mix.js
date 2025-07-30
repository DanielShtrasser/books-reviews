import mix from 'laravel-mix';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

mix.js('resources/js/app.js', 'public/js').react()
   .postCss('resources/css/app.css', 'public/css', [
       tailwindcss,
       autoprefixer
   ])
   .version()
   .webpackConfig({
       plugins: [
           new ReactRefreshWebpackPlugin({
               overlay: false
           })
       ],
       optimization: {
           splitChunks: {
               chunks: 'all'
           }
       }
   })
   .options({
       hmrOptions: {
           host: 'localhost',
           port: 3000,
           hot: true,
           proxy: 'http://127.0.0.1:8000',
           injectClient: true,
       }
   });