// webpackeの設定ファイル

var dist = './dist/js';   // 出力先ディレクトリ
var src = './src/js';     // ソースディレクトリ

module.exports = {

  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'production',

  // 出力先の指定
  dist: dist,

  // jsのビルド設定
  js: {
    src: src + '/js/**',
    dist: dist + '/module/',
    uglify: true
  },
  // webpackの設定
  webpack: {
    entry: src + '/lib_rs.js',
    output: {
      filename: 'build.js'
    }
  }
}