module.exports = {
  preset: [
    [
      "@babel/preset-env",
      {
        corejs: "3.24.0",
        useBuiltIns: "entry",
      },
    ],
  ],
};
