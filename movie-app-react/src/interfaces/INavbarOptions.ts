// Description: Interface for navbar options

export interface INavbarOptions {
  left?: string
  leftTitle?: string
  right?: string
  clearSearch?: () => void
  searchValue?: string
  setSearchValue?: (value: string) => void
}
