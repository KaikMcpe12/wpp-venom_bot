export interface IAiService {
    context: string;
    chat: (message: string) => Promise<{ message: string }>
}