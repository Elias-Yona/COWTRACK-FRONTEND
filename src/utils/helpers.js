export function flattenData(data) {
  let outputData = {}

  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'object') {
      Object.assign(outputData, data[key]);
    } else {
      outputData[key] = data[key];
    }
  })

  return outputData
}
