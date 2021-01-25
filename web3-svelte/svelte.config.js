const sass = require('sass');

module.exports = {
  preprocess: {
    style: async ({ content, attributes, filename }) => {
      if (attributes.lang !== 'scss') {
        return;
      }
      try {
        const { css, map, imports } = await sass.render(content, {
          filename,
          sourceMap: {},
        });

        return { code: css, map, dependencies: imports };
      } catch (e) {
        return e;
      }
    },
  },
};