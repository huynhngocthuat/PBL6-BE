// eslint-disable-next-line func-names
export default String.prototype.format = function () {
  // eslint-disable-next-line no-var, prefer-rest-params
  var args = arguments;
  // eslint-disable-next-line prefer-arrow-callback, func-names
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    // eslint-disable-next-line eqeqeq
    return typeof args[index] == 'undefined' ? match : args[index];
  });
};
