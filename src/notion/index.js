const notionService = require("./notion.service").default

const DATABASE_ID = "61f99111a07a498ba4f0990538cd933a"


async function createIssuePage(issue) {
  const pageConfig = {
    parent: {
      database_id: DATABASE_ID
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: issue.title
            }
          }
        ]
      },
      Status: {
        "select": {
          name: issue.state
        }
      },
      Labels: {
        "multi_select": issue.labels.map(label => ({ name: label.name }), [])
      },
      Issue: {
        "url": issue.html_url
      }
    },
    children: [
      {
        "object": "block",
        "type": "callout",
        "callout": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Note: Changes here won't reflect the Github Issue.",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Note: Changes here won't reflect the Github Issue.",
              "href": null
            }
          ],
          "icon": {
            "type": "emoji",
            "emoji": "📌"
          },
          "color": "yellow_background"
        }
      },
      {
        "object": "block",
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": issue.html_url,
                "link": { "url": issue.html_url },
              },
              "plain_text": issue.html_url,
              "href": issue.html_url
            }
          ],
          "color": "default"
        }
      },
    ]
  }

  return await notionService.createPage(pageConfig)
}



module.exports = { createIssuePage }