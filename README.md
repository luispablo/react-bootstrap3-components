# react-bootstrap3-components

**IMPORTANT: This docs apply to version 2.0.0 forward, as this version was a major change and doesn't get backwards compatibility. If you upgrade from 1.x to 2.x you have some work to do.**

## Description

Some small and simple React components to reduce your bootstrap HTML

## Available components

```javascript
import {
	Input, Select, RadioButtons, CheckBox, Static
} from "react-bootstrap3-components";
```

### Input

```javascript
var person = { name: "Tom", age: 50 };

<Input object={person} field="name" type="text" ...any other React prop />
```

This will generate an *input* HTML element, of type text. It will behave as a controlled input, using its own state to preserve the input value. After the first three mandatory fields, you can provide any of the other React valid props.

#### onChange

You can either use ```onChangeObject``` or ```onChangeValue``` to get the whole person object with its value changed, or only the new value set.

```javascript
var personChanged = function (newPerson) {
	// You have the whole person with the new name already set
};

<Input object={person} field="name" type="text" onChangeObject={personChanged} />
```

```javascript
var nameChanged = function (newName) {
	// Here you only get the new typed value
};

<Input object={person} field="name" type="text" onChangeValue={nameChanged} />
```

#### debounce!!!

If you have performance issues like me, you may _debounce_ the onChange event. Preventing each keystroke to fire the onChange listener (any of them) You only have to provide the wait time to use as debounce parameter.
Bare in mind that only the **last** changing event will get fired. If you type too fast and enter 10 letters before the onChange gets fired, it will get fired only once, with that last value set.

```javascript
<Input object={person} field="name" type="text" onChangeObject={onChangeHandler} wait={300} />
// The onChangeHandler will be debounced 300 milliseconds here
```

### Generic debounce

You can use the **debounce** function when you want to delay any action. For instance, you don't want to re-render a form until the user stops typing, but you want to do it for the entire form instead of applying it to each UI component (which could end up in a race condition between them)

```javascript
import { debounce } from "react-bootstrap3-components";

...

const onChangeObject = function (obj) {
	// your code here
};

// To delay onChange 300 milliseconds do:
<input type="text" onChange={debounce(onChangeObject, 300)} />
```

### Select

```javascript
const person = { name: "John", gender: "MALE" };
const genders = [ "FEMALE", "MALE" ];

<Select object={person} field="gender" options={genders} null="- Gender -" />
```

Or, to use some more funcy labels in the UI and ugly values stored in the database
you may do this:

```javascript
const person = { name: "John", gender: "M" };
const genders = [{label: "Male", value: "M"}, {label: "Female", value: "F"}];

<Select object={person} field="gender" options={genders} null="- Gender -" />
```

The default value will be taken from *person.gender*. The options are built with
the options array provided, and onChange the component will set *person.gender*
with the value from *event.target.value*. The *null* property is the label to be
used if you want to add a first option with null value.

If you want to provide an array of objects, and use certain fields as value and
label, do this:

```javascript
const titles = [{id: 1, name: "Mr."}, {id: 2, name: "Mrs."}, ...];
const person = {name: "Tom", titleId: 1};

<Select 	object={person} field="titleId" options={titles} null="- Title -"
			optionsFields={{value: "id", label: "name"}} />
```

#### onChangeObject

Same as in Input component.

```javascript
const titles = [{id: 1, name: "Mr."}, {id: 2, name: "Mrs."}, ...];
const person = {name: "Tom", titleId: 1};

const onChangeObject = function (newPerson) {
	// newPerson is a new object with titleId field updated to new value
};

<Select 	object={person} field="titleId" options={titles} null="- Title -"
			optionsFields={{value: "id", label: "name"}}
			onChangeObject={onChangeObject} />
```

#### onChangeValue

Same as in Input component.

```javascript
const titles = [{id: 1, name: "Mr."}, {id: 2, name: "Mrs."}, ...];
const person = {name: "Tom", titleId: 1};

const onChangeValue = function (newTileId) {
	// Pretty obvious...
};

<Select 	object={person} field="titleId" options={titles} null="- Title -"
			optionsFields={{value: "id", label: "name"}}
			onChangeValue={onChangeValue} />
```

### RadioButtons

```javascript
const person = { name: "John", gender: "M" };
const genders = [{label: "Male", value: "M"}, {label: "Female", value: "F"}];

<RadioButton object={person} field="gender" options={genders} />
```

or, with custom fields for options labels and values

```javascript
const titles = [{id: 1, name: "Mr."}, {id: 2, name: "Mrs."}, ...];
const person = {name: "Tom", titleId: 1};

<RadioButton	object={person} field="titleId" options={titles}
					optionsFields={{value: "id", label: "name"}} />
```

The radio by default is not inline, if you want it to be inline, use the _inline_
property.

```javascript
<RadioButton object={person} field="gender" options={genders} inline={true} />
```

#### onChangeObject

You can get the object with the field alread updated with this property. It will set the **value** property of the selected object, or the specified field in the **optionsFields** property.

```javascript
const titles = [{id: 1, name: "Mr."}, {id: 2, name: "Mrs."}, ...];
const person = {name: "Tom", titleId: 1};
const onChangeObject = function (newPerson) {
	// You get a new person object with the title updated
};

<RadioButton	object={person} field="titleId" options={titles}
					optionsFields={{value: "id", label: "name"}}
					onChangeObject={onChangeObject} />
```

#### onChangeValue

Or just get the new value

```javascript
const titles = [{id: 1, name: "Mr."}, {id: 2, name: "Mrs."}, ...];
const person = {name: "Tom", titleId: 1};
const onChangeValue = function (newValue) {
	// You get the new value selected
};

<RadioButton	object={person} field="titleId" options={titles}
					optionsFields={{value: "id", label: "name"}}
					onChangeValue={onChangeValue} />
```

You get the whole option, not just the **value** field (or its **optionsFields** counterpart)

### CheckBox

```javascript
const person = { name: "Tom", hasId: true };

<CheckBox object={person} field="hasId" label="Has ID?" />
```

It's like the others, but with a checkbox...
And, like the radio buttons you can set it as inline:

```javascript
<CheckBox object={person} field="hasId" label="Has ID?" inline={true} />
```

#### Mappings (true / false values)

If the field has values instead of a boolean, i.e.: "t" or "f" strings, or 0 or 1 numbers, you can map those values to use them.

```javascript
const person = { name: "Tom", hasId: "t" };

<CheckBox object={person} field="hasId" label="Has ID?" mappings={{true: "t", false: "f"}} />
```

#### onChange

Like the **Input** component, you have two observable events:

##### onChangeObject

```javascript
const person = { name: "Tom", hasId: true };

const onChangeObject = function (newPerson) {
	// You have the person object with the field hasId already updated
};

<CheckBox object={person} field="hasId" label="Has ID?" onChangeObject={onChangeObject}/>
```

##### onChangeValue

If you have mappings, you can use this or the previous case with them

```javascript
const person = { name: "Tom", hasId: "t" };

const onChangeValue = function (newHasId) {
	// You will get either "t" or "f"
};

<CheckBox object={person} field="hasId" label="Has ID?" mappings={{true: "t", false: "f"}} onChangeValue={onChangeValue} />
```

### HorizontalFormItem

If you are building a Bootstrap form with CSS class *form-horizontal*
(http://getbootstrap.com/css/#forms-horizontal), then you have the HorizontalForm
wrapper. It will add a label to the components that need it (all except CheckBox)
and the divs needed. You just set the widths.
For example,

```javascript
import { HorizontalFormItem, InputText } from "react-bootstrap3-components";

<HorizontalFormItem label="Name" labelWidth={3} inputWidth={9}>
	<Input type="text" object={person} field="name" />
</HorizontalFormItem>
```

In this case you can ommit the _placeholder_ property for the InputText, and it
will use the _label_ property of the HorizontalForm.

You can use the _static_ property to generate a static input component
(http://getbootstrap.com/css/#forms-controls-static) for the horizontal form.

```javascript
<HorizontalFormItem label="Name" staticValue="Tom" labelWidth={3} inputWidth={9} />
```

#### Show required condition (asterisk)

If you want to add an asterisk to show which fields are required, use the _showRequired_
property.

```javascript
<HorizontalFormItem label="Name" staticValue="Tom" labelWidth={3} inputWidth={9} showRequired={true}>
  ...
</HorizontalFormItem>
```

this will generate

```html
<label class="control-label col-sm-4"><span class="required-asterisk">*</span>Name</label>
```

and then is up to you how you define the ```span.required-asterisk { } ``` CSS.

#### Validation state

You can provide validation info to build the Bootstrap validation state properties of this component (http://getbootstrap.com/css/#forms-control-validation)
For example, with the InputText you should do:

```javascript
const validation = { state: "error", message: "Use only numbers and letters" };
<HorizontalFormItem label="Name" labelWidth={3} inputWidth={9} validation={validation}>
	<Input type="text" object={person} field="name" />
</HorizontalFormItem>
```

The state can be any of **success**, **warning** or **error**, and the message anything you like.

### Icon

This is to simplify the use of Bootstrap Glyphicons.

```javascript
import { Icon } from "react-bootstrap3-components";

<Icon name="search" />
```

The **name** is used to generate the CSS class, using the prefix _glyphicon glyphicon-_ and then the name you provided. So, in the example, it would generate:

```html
<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
```

and you have a **visible** helper, where you can pass a boolean condition, and it will return the component if true, or null otherwise.

```javascript
const condition = year < 2000;
<Icon name="ok" visible={condition} />
```

### SortableTH

If you have a table, this component builds a custom TH, with the CSS class **sortable**, or any other that you can specify with the **className** property. It's clickable (you should add ```cursor: pointer``` in its CSS, it doesn't do it for you) and it adds the Bootstrap glyphicon-triangle-top or glyphicon-triangle-bottom when it's order by this field.

```javascript
import { SortableTH } from "react-bootstrap3-components";

var currentOrderBy = "name DESC";

var changeOrder = function (newOrderBy) {
	currentOrderBy = newOrderBy;
	// and to whatever you want with it...
};

<SortableTH label="Last Name" field="lastName" orderBy={currentOrderBy} onClick={changeOrder} />
// The TH will have 'sortable' as CSS class

// or use a custom one
<SortableTH className="customSortable" label="Last Name" field="lastName" orderBy={currentOrderBy} onClick={changeOrder} />

```

The **label** is what the TH is going to have as text inside. The **field** property is the value it's going to use to build the new order by criteria in the **onClick** function, watching the value in its **orderBy** property. If the **orderBy** has the field in it 'lastName ASC' or 'lastName DESC' has 'lastName' in it, the component will change the direction. If it's 'lastName ASC', it will call **changeOrder** with 'lastName DESC' and viceversa. If it's not the current order by it will use ASC the first time.

#### enabled / disabled

You can specify the boolean property **enabled** to apply the styling and add the onClick event or not.

```javascript
var enableOrdering = items && items.length > 0;

<SortableTH label="Last Name" field="lastName" orderBy={currentOrderBy} onClick={changeOrder} enabled={enableOrdering} />
```
