export interface IText {
  numberPhone: string
  text: string
}

interface IRowList {
  title: string
  description: string
}

interface IList {
  title: string
  rows: IRowList[]
}

export interface ISendList {
  numberPhone: string
  title: string
  subTitle: string
  description: string
  menuName: string
  list: IList[]
}

interface IButtonText {
  displayText: string
}

interface IButton {
  buttonText: IButtonText
}

export interface ISendButton {
  numberPhone: string
  title: string
  description: string
  buttons: IButton[]
}
