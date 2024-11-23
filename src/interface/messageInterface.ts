export interface IText{
    numberPhone: string;
    text: string;
}

export interface ISendList{
    numberPhone: string;
    title: string;
    subTitle: string;
    description: string;
    menuName: string;
    list: IList[];
}

interface IList{
    title: string;
    rows: IRowList[];
}

interface IRowList{
    title: string;
    description: string;
}

export interface ISendButton{
    numberPhone: string;
    title: string;
    description: string;
    buttons: IButton[];
}

interface IButton{
    buttonText: IButtonText;
}

interface IButtonText{
    displayText: string;
}