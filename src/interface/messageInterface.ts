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

export interface IList{
    title: string;
    rows: IRowList[];
}

export interface IRowList{
    title: string;
    description: string;
}