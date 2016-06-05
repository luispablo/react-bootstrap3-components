# react-bootstrap3-components

| **IMPORTANT**: This docs apply to version 2.0.0 forward, as this version was a major change and doesn't get backwards compatibility. If you upgrade from 1.x to 2.x you have some work to do. |

Some small and simple React components to reduce your bootstrap HTML

# Available components

```javascript
import { InputText, Select, RadioButtons, CheckBox, Static } from "react-bootstrap3-components";
```

## InputText

```javascript
<InputText object={person} field="name" placeholder="Name" />
```

This will generate an *input* HTML element, of type text. It will set the defaultValue
of the input by taking the property *name* form the object *person*. And it will
set an onChange listener putting the value of event.target.value on the property
*name* of the object *person*.

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
	<InputText object={person} field="name" />
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
	<InputText object={person} field="name" />
</HorizontalFormItem>
```

The state can be any of **success**, **warning** or **error**, and the message anything you like.
