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
