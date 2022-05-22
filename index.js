// Payload URL: https://us-central1-github-notion-integration.cloudfunctions.net/github_webhook
const notion = require('./src/notion')

exports.github_webhook = async (req, res) => {
  try {
    const data = req.body
    const action = data.action
    const issue = data.issue

    if (action === "opened") {

      const res = await notion.createIssuePage(issue)
      console.log({ res })

    }
    else if (action === "unlabeled") {
      console.log(data)
      const labels = extractLabels(data)
      console.log({ labels })
      const issueUrl = data.issue.html_url
      const pages = await queryDatabaseByUrlProp("Issue", issueUrl)
      const config = {
        page_id: pages[0].id,
        properties: {
          "Labels": {
            "multi_select": labels.map(label => ({ name: label.name }), [])
          }
        }
      }
      console.log({ config })
      const res = await updatePageProperties(config)
      console.log(res)
    }

    res.sendStatus(200);
  }
  catch (err) {
    console.error(err)
    res.status(400).send(err)
  }
}







