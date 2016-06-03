# react-bootstrap3-components
Some small and simple React components to reduce your bootstrap HTML

# Usage

```
var HorizontalFormCheckbox = require("react-bootstrap3-components").HorizontalFormCheckbox;
var HorizontalFormInput = require("react-bootstrap3-components").HorizontalFormInput;
var HorizontalFormRadioButton = require("react-bootstrap3-components").HorizontalFormRadioButton;

// and then

var options = [{label: "Male", value: "M"}, {label: "Female", value: "F"}];

<HorizontalFormRadioButton value="M" onChange={someFunc} label="Sex" labelWidth="3" inputWith="9" options={options} />
<HorizontalFormCheckbox value={true} onChange={someFunc} label="Is this true?" labelWidth="3" inputWith="9" />
<HorizontalFormInput type="text" label="Name" value="Peter" labelWidth="3" inputWith="9" onChange={someFunc} />

```

## HorizontalFormInputText

```
import { HorizontalFormInput } from "react-bootstrap3-components";

<HorizontalFormInputText object={person} field="name" label="Name" widths={[3, 9]} />
```

This will generate an *input* HTML element, of type text. It will set the defaultValue
of the input by taking the property *name* form the object *person*. The bootstrap HTML
code generated will use 3 for the label witdth, and the prop *label* for its content,
and 9 for the field width. And, finally, will set an onChange listener putting
the value of event.target.value on the property *name* of the object *person*.

# <select> component

```
var Select = require("react-bootstrap3-components").Select;

var options = [{label: "Male", value: "M"}, {label: "Female", value: "F"}];

var onChange = function (event) {
	// do your React stuff here
};

<Select options={options} onChange={onChange} nullValueLabel="- Sex -" selectedValue="F" />
```

Or you can just use an array of objects, and tell the component which fields you
want to use as key, and which as value.

```
var people = [{id: 3, name: "William", lastname: "Wallace"}, {...}, ...];

<Select options={people} valueField="id" labelField="name" onChange={onChange} />
```

This will render

```
<select class="form-control">
  <option>- Sex -</option>
  <option selected="selected" value="F">Female</option>
  <option value="M">Male</option>
</select>
```

The component will order the options by its label field by default (and you cannot change this for the moment)
It uses the React 'defaultValue' property for the select component.
