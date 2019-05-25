import { readdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import {
  IList,
  ListAction,
  ListContext,
  ListItem,
  workspace,
  Uri,
} from 'coc.nvim'
import { join } from 'path';

export default class Gitignore implements IList {
  public readonly name = 'gitignore'
  public readonly description = 'gitignore templates'
  public readonly defaultAction = 'append'
  public actions: ListAction[] = []
  private templateMap: Map<string, string[]> = new Map()
  private isInit: boolean = false

  constructor(private templatesPath: string) {
    this.actions.push({
      name: 'append',
      execute: async item => {
        const list: ListItem[] = ([] as ListItem[]).concat(item)
        const workdir = Uri.parse(workspace.workspaceFolder.uri).fsPath
        let gitignore = `# create by https://github.com/iamcco/coc-gitignore (${new Date().toString()})`
        list.forEach(item => {
          const typeName = item.filterText as string
          const data = this.templateMap.get(typeName)
          if (data) {
            data.forEach(name => {
              gitignore += `\n# ${name}:`
              const filePath = join(templatesPath, name)
              if (existsSync(filePath)) {
                gitignore += `\n${readFileSync(filePath).toString()}`
              }
            })
          }
        })
        const targetPath = join(workdir, '.gitignore')
        if (existsSync(targetPath)) {
          gitignore = `\n${gitignore}`
        }
        const isWrite = workspace.showPrompt(`Write gitignore rules to: ${targetPath}?`)
        if (isWrite) {
          writeFileSync(join(workdir, '.gitignore'), gitignore, { flag: 'a' })
        }
      }
    })
  }

  public async loadItems(_context: ListContext): Promise<ListItem[]> {
    const templates = readdirSync(this.templatesPath) || []
    if (!this.isInit) {
      this.templateMap = new Map()
      templates.forEach(name => {
        const typeName = name.split('.')[0]
        const data = this.templateMap.get(typeName) || []
        if (data) {
          data.push(name)
        }
        this.templateMap.set(typeName, data)
      })
    }
    const list: ListItem[] = []
    for (const key of this.templateMap.keys()) {
      list.push({
        label: `${key} ${(this.templateMap.get(key) || []).slice(1).join(', ')}`,
        filterText: key
      })
    }
    return list
  }
}
