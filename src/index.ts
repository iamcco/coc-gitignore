import { ExtensionContext, workspace, listManager } from 'coc.nvim'

import Gitignore from './sources/gitignore';

export async function activate(context: ExtensionContext): Promise<void> {
  let { subscriptions } = context
  let config = workspace.getConfiguration('gitignore')
  let enable = config.get<boolean>('enable', true)

  if (!enable) {
    return
  }

  const templatesPath = context.asAbsolutePath('templates')

  subscriptions.push(
    listManager.registerList(new Gitignore(templatesPath))
  )
}
