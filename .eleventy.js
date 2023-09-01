const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy `assets/` to `_site/assets`
  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("vid");
  eleventyConfig.addPassthroughCopy("css");

  eleventyConfig.addFilter("customDate", (dateObj) => {
    const dateTime = DateTime.fromJSDate(dateObj, {zone: 'utc'});
    return `${dateTime.toFormat('LLL d, yyyy · h:mm a')}`;
  });

  eleventyConfig.addCollection("postsOnly", function(collectionApi) {
    return collectionApi.getAll().filter(item => {
      return item.inputPath.startsWith('./posts/');
    });
  });
};
