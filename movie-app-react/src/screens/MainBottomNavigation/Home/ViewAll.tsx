import ViewAll from '../Generic/ViewAll'

export default (props: any) => {
  const { category, item } = props.route.params
  return <ViewAll category={category} item={item} />
}
