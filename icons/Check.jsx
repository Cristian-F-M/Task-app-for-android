import Svg, { Path } from 'react-native-svg'
const Check = props => (
  <Svg
    width={15}
    height={15}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={5}
    className="icon icon-tabler icons-tabler-outline icon-tabler-check"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="none"
      d="M0 0h24v24H0z"
    />
    <Path d="m5 12 5 5L20 7" />
  </Svg>
)
export default Check
