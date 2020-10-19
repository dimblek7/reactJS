// MyComponent.test.js
import { ts_str } from "../dates";

it("should take timestamp and return respective date in given format", () => {
    const expected = "01/01/2020";
    const functionResult = ts_str({ ts: 1577873192000, format: "MM/DD/YYYY" });
    expect(functionResult).toBe(expected);
});


// it("should create an entry in component state", () => {
//     // given
//     const component = shallow(<MyComponent />);
//     const form = component.find('input');
//     // when
//     form.props().onChange({target: {
//        name: 'myName',
//        value: 'myValue'
//     }});
//     // then
//     expect(component.state('input')).toBeDefined();
// });
