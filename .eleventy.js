const { DateTime } = require("luxon");

function getOrdinalSuffix(num) {
    const j = num % 10, k = num % 100;
    if (j == 1 && k != 11) {
        return "st";
    }
    if (j == 2 && k != 12) {
        return "nd";
    }
    if (j == 3 && k != 13) {
        return "rd";
    }
    return "th";
}


module.exports = function(eleventyConfig) {
  // Copy `assets/` to `_site/assets`
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("css");

  eleventyConfig.addFilter("customDate", (dateObj) => {
    const dateTime = DateTime.fromJSDate(dateObj, {zone: 'utc'});
    const daySuffix = getOrdinalSuffix(dateTime.day);
    return `${dateTime.toFormat('MMMM')} ${dateTime.day}${daySuffix}, ${dateTime.toFormat('yyyy @ h:mm a')}`;
});
};
  