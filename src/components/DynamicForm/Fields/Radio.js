import initjson from "../Data/initjson";
import KEYS from "../KEYS";

export default function RadioComp(props) {
  // const [focused, setFocused] = React.useState(false);
  const { field, updateData } = props;
  const {
    value = false,
    iserr = () => {},
    placeholder = "",
    label = "",
    helperText = "",
    labelclass = "",
    iconclass = "",
    disabled = false
  } = field;

  function handleChange() {
    !disabled && updateData({ id: field.id, value: value == true ? false : true });
  }
  return null;
  // return (
  //   <div>
  //     <span onClick={handleChange}>
  //       <Radio
  //         className={`dynamic-form-checkbox cursour-pointer`}
  //         placeholder={placeholder}
  //         error={iserr({ fielddata: field })}
  //         // value={false}
  //         // value={!value}
  //         // onChange={handleChange}
  //         checked={value}
  //         {...props}
  //       />
  //     </span>
  //     <span onClick={handleChange}>
  //       <p className={`${labelclass || "input-label margin-top-4"} floatleft margin-left-4 width80 cursour-pointer`}>{label}</p>
  //     </span>
  //   </div>
  // );
}

export const radioinputconverter = field => [
  {
    ...initjson,
    ...field,
    typeid: KEYS.Radio
  }
];
