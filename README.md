# react-bootstrap3-components

| **IMPORTANT**: This docs apply to version 2.0.0 forward, as this version was a major change and doesn't get backwards compatibility. If you upgrade from 1.x to 2.x you have some work to do. |

Some small and simple React components to reduce your bootstrap HTML

# Available components

```javascript
import { Input, Select, RadioButtons, CheckBox, Static } from "react-bootstrap3-components";
```

## Input

```javascript
<Input object={person} field="name" type="text" placeholder="Name" />
```

This will generate an *input* HTML element, of type text. It will set the defaultValue of the input by taking the property *name* form the object *person*. And it will set an onChange listener putting the value of event.target.value on the property *name* of the object *person*. The **type** property is the HTML input element type property, so any value valida there is valid here.

## Select

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
			optionsFields={{value: "id", label: "name"}}
			onChange={e => person.titleId = parseInt(e.target.value)} />
```

Here you provide your own *onChange* because you need to do something custom, parseInt.

## RadioButtons

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
					optionsFields={{value: "id", label: "name"}}
					onChange={e => person.titleId = parseInt(e.target.value)} />
```

As in the Select, here you needed a custom _onChange_.

The radio by default is not inline, if you want it to be inline, use the _inline_
property.

```javascript
<RadioButton object={person} field="gender" options={genders} inline={true} />
```

## CheckBox

```javascript
const person = { name: "Tom", hasId: true };

<CheckBox object={person} field="hasId" label="Has ID?" />

```
It's like the others, but with a checkbox...
And, like the radio buttons you can set it as inline:

```javascript
<CheckBox object={person} field="hasId" label="Has ID?" inline={true} />
```

and you can override the _onChange_ event:

```javascript
<CheckBox object={person} field="hasId" label="Has ID?" onChange={e => person.hasId = e.target.checked} />
```

## HorizontalFormItem

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

### Validation state

You can provide validation info to build the Bootstrap validation state properties of this component (http://getbootstrap.com/css/#forms-control-validation)
For example, with the InputText you should do:

```javascript
const validation = { state: "error", message: "Use only numbers and letters" };
<HorizontalFormItem label="Name" labelWidth={3} inputWidth={9} validation={validation}>
	<Input type="text" object={person} field="name" />
</HorizontalFormItem>
```

The state can be any of **success**, **warning** or **error**, and the message anything you like.

## Icon

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

## SortableTH

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
