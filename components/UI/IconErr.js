import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
  } from 'react-native-svg';
import * as React from "react"

function SvgComponent(props) {
  return (
        <Svg
        width={53}
        height={53}
        viewBox="0 0 53 53"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        >
        <Path
            d="M26.5.25c14.498 0 26.25 11.752 26.25 26.25 0 1.908-.202 3.767-.59 5.56l-4.678-4.68a21 21 0 10-11.485 17.852 10.493 10.493 0 004.082 3.735A26.134 26.134 0 0126.5 52.75C12.002 52.75.25 40.998.25 26.5S12.002.25 26.5.25zm18.375 31.952l3.712 3.711a5.25 5.25 0 11-7.692.289l.268-.289 3.712-3.711zM26.5 34.375c3.848 0 7.31 1.656 9.712 4.297l-2.48 2.258c-2.074-.827-4.56-1.305-7.232-1.305-2.672 0-5.158.48-7.232 1.302l-2.48-2.258a13.091 13.091 0 019.712-4.294zM17.312 21.25a3.937 3.937 0 110 7.874 3.937 3.937 0 010-7.874zm18.375 0a3.937 3.937 0 110 7.874 3.937 3.937 0 010-7.874z"
            fill="#CDCDCD"
        />
         </Svg>
        
  )
}

export default SvgComponent