import { createContactTool } from '../ai-tools/create-contact-controller'
import { createPreferenceTool } from '../ai-tools/create-preference-controller'
import { listContactsTool } from '../ai-tools/list-contact-controller'
import { IAiRequest } from '../interface/IAiService'
import {
  createContactToolConfig,
  createPreferenceToolConfig,
  listContactsToolConfig,
} from './aiToolsConfig'

export const tools: IAiRequest[] = [
  {
    function: listContactsToolConfig,
    functionImplementation: listContactsTool,
  },
  {
    function: createContactToolConfig,
    functionImplementation: createContactTool,
  },
  {
    function: createPreferenceToolConfig,
    functionImplementation: createPreferenceTool,
  },
]
