import get from "lodash/get";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KEYS from "./KEYS";
import { setDynamicForm, addDynamicForm } from "./Functions/setters.js";
import TextComp from "./Fields/Text";
import TextAreaComp from "./Fields/Textarea";
import IntegerComp from "./Fields/Integer";
import FloatComp from "./Fields/Float";
import DateComp from "./Fields/Date";
import TimeComp from "./Fields/Time";
import DateTimeComp from "./Fields/DateTime";
import SelectComp from "./Fields/Select";
import MultiSelectComp from "./Fields/MultiSelect";
import CheckBoxComp from "./Fields/CheckBox";
import RadioComp from "./Fields/Radio";
import ImageInput from "./Fields/ImageInput";
import GroupSelect from "./Fields/GroupSelect";
import {
  showAllErrorsFunction,
  fetchMyFormFunction,
  deleteMyFormFunction,
  validateMyFormFunction,
  fetchAllFormsFunction
} from "./Functions/getters.js";

/**
 * these are the functions to control dynamic form
 */
export const fetchMyForm = fetchMyFormFunction;
export const deleteMyForm = deleteMyFormFunction;
export const showAllErrors = showAllErrorsFunction;
export const validateMyForm = validateMyFormFunction;
export const fetchAllForms = fetchAllFormsFunction;

/**
 * @class Dynamic Form Details
 * @param { function } onChange - if this function present, using dynamic form for single field
 * @param {array} fields - this is array of fields, which needs to be rendered in our form
 * @param {string} formKey - this is unique identifier for our form
 * @param {function} fetchMyForm - you can access our form from anywhere by passing 'formKey' identifier
 * @param {function} deleteMyForm - you can delete the dynamic form uding this function
 */
class DynamicForm extends Component {
  constructor(props) {
    super(props);
    this.getField = this.getField.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    const { fields, formKey, onChange } = this.props;
    if (!fetchMyForm(formKey) && !onChange) {
      // form doesn't present, so create new form
      
      this.props.addDynamicForm({ forms: [{ fields, formKey }] });
    }
  }

  updateData({ id, value }) {
    
    const { formKey, onChange, continuosChange } = this.props;
    continuosChange && continuosChange(id, value);
    if (onChange) {
      onChange(value);
    } else {
      const RESULT = get(this.props, "dynamicformReducer.forms", []).map(form => ({
        ...form,
        fields:
          form.formKey === formKey
            ? form.fields.map(field => ({
                ...field,
                [id]: value,
                value: field.id === id ? value : field.value
              }))
            : form.fields
      }));
      this.props.setDynamicForm({ forms: RESULT });
    }
  }

  componentWillUnmount() {
    const { formKey, onChange } = this.props;
    if (!onChange) deleteMyForm(formKey);
  }

  getField({ field, showAllErr }) {
    const PROPS = {
      field,
      updateData: this.updateData,
      showAllErr
    };
    switch (field.typeid) {
      case KEYS.Text:
        return <TextComp {...PROPS} />;
      case KEYS.TextArea:
        return <TextAreaComp {...PROPS} />;
      case KEYS.Integer:
        return <IntegerComp {...PROPS} />;
      case KEYS.Float:
        return <FloatComp {...PROPS} />;
      case KEYS.Date:
        return <DateComp {...PROPS} />;
      case KEYS.Time:
        return <TimeComp {...PROPS} />;
      case KEYS.DateTime:
        return <DateTimeComp {...PROPS} />;
      case KEYS.Select:
        return <SelectComp {...PROPS} />;
      case KEYS.CheckBox:
        return <CheckBoxComp {...PROPS} />;
      case KEYS.Radio:
        return <RadioComp {...PROPS} />;
      case KEYS.MultiSelect:
        return <MultiSelectComp {...PROPS} />;
      case KEYS.ImageInput:
        return <ImageInput {...PROPS} />;
      case KEYS.GroupSelect:
        return <GroupSelect {...PROPS} />;
      default:
        return null;
    }
  }

  render() {
    const { formKey, onChange, fields, numberOfColumns = 1 } = this.props;
    const form = onChange ? { fields } : fetchMyForm(formKey);
    const fieldClass = numberOfColumnsClass[numberOfColumns];
    return (
      <div className="row">
        {get(form, "fields", []).map(field => (
          <div className={fieldClass}>
            <div className="w-100">{this.getField({ field, showAllErr: get(form, "shoAllErr", "") })}</div>
          </div>
        ))}
      </div>
    );
  }
}

const numberOfColumnsClass = {
  1: "col-md-12 mt-3",
  2: "col-md-6 mt-3",
  3: "col-md-4 mt-3"
};

function mapStateToProps(state) {
  return {
    dynamicformReducer: state.dynamicformReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setDynamicForm, addDynamicForm }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DynamicForm);
