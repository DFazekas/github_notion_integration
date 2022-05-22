const { Client } = require('@notionhq/client')
const notion = new Client({ auth: process.env.NOTION_KEY })

/**
 * A singleton of the Notion service.
 */
class NotionService {
  constructor() {
    if (!NotionService.instance) {
      NotionService.instance = this
    }
    return NotionService.instance
  }

  async queryDatabase(filter) {
    const queryResult = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: filter
    })

    console.log({ queryResult: queryResult })
    if (queryResult.results.length === 0) {
      throw "No page found."
    }

    return queryResult.results
  }

  async updatePageProperties(config) {
    console.log("UpdatePageProperties()...")
    return await notion.pages.update(config)
  }

  async queryDatabaseByUrlProp(propName, propValue) {
    const filter = {
      property: propName,
      url: {
        equals: propValue
      }
    }

    return notionService.instance.queryDatabase(filter)
  }

  async createPage(config) {
    return await notion.pages.create(config)
  }
}

const instance = new NotionService()
Object.freeze(instance)

exports.default = instance