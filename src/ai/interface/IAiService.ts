import { Ollama } from "ollama";

interface IFunctionParameter {
    type: string;
    description: string;
}

interface IFunctionParameters {
    type: string;
    required: string[];
    properties: {
        [key: string]: IFunctionParameter;
    };
}

interface IFunctionDefinition {
    name: string;
    description: string;
    parameters: IFunctionParameters;
}

interface ITool {
    type: string;
    function: IFunctionDefinition;
}

export interface IAiRequest {
    function: ITool;
    functionImplementation: (request: any) => Promise<any>;
}

export interface AvailableFunctions {
    [key: string]: (args: any) => Promise<void>;
}

export interface IArgsMessage {
    role: string, 
    content: any,
}

export interface IAiService {
    context: string;
    chat: (message: string, argsMessages?: IArgsMessage[]) => Promise<{ message: string }>
}