// Description: Interface for navbar options

export interface INavbarOptions {
  left?: string
  leftTitle?: string
  right?: string
  searchValue?: string
  setSearchValue?: (value: string) => void
}
