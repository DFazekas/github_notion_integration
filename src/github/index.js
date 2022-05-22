function extractLabels(data) {
  const labelObjs = data.issue.labels
  console.log(labelObjs)
  if (labelObjs.length === 0) {
    return []
  }
  const newLabels = labelObjs.map(label => label.name, [])
  return newLabels
}

module.exports = { extractLabels }