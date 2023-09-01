const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy `assets/` to `_site/assets`
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("css");

  eleventyConfig.addFilter("customDate", (dateObj) => {
    const dateTime = DateTime.fromJSDate(dateObj, {zone: 'utc'});
    return `${dateTime.toFormat('LLL d, yyyy · h:mm a')}`;
  });
};
