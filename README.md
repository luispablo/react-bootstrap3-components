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

<Select options={options} onChange={onChange} nullValueLabel="- Sex -" />
```

This will render

```
<select class="form-control">
  <option>- Sex -</option>
  <option value="M">Male</option>
  <option value="F">Female</option>
</select>
```
