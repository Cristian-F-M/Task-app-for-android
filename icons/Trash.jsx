import Svg, { Path } from 'react-native-svg'
const Trash = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    stroke="red"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.25}
    className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="none"
      d="M0 0h24v24H0z"
    />
    <Path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
  </Svg>
)
export default Trash
