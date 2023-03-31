import Category from '../Generic/Category'

export default (props: any) => {
  const { category, item } = props.route.params
  return <Category category={category} item={item} />
}
