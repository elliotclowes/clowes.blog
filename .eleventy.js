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

  eleventyConfig.addCollection("sortedPosts", function(collection) {
    return collection.getFilteredByGlob("posts/*.md").sort(function(a, b) {
      return b.date - a.date;
    });
  });

  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });
    return [...tagSet];
  });
};
