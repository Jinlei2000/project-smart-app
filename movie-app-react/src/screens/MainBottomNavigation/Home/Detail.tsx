import { useEffect } from 'react'
import IMovie from '../../../interfaces/IMovie'
import Detail from '../Generic/Detail'

export default (props: any) => {
  const { movie } = props.route.params



  return <Detail movie={movie} />
}
