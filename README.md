# validity-validate-duplicate-property

A validity style module for validating property duplication across collections, using [save](https://github.com/serby/save).

## Installation

```
npm install validity-validate-duplicate-property --save
```

```
yarn add validity-validate-duplicate-property
```

## Usage

This module is designed to be used with [schemata](https://github.com/serby/schemata).

```javascript
const duplicatePropertyValidator = require('validity-validate-duplicate-property')
constschemata = require('schemata')

const schema = schemata({
  _id: {
    type: String
  },
  emailAddress: {
    type: String,
    validators: [ duplicatePropertyValidator(save) ]
  }
})
```

This will check, using the provided `save` object, if any other documents have an identical property to the one provided.
It will not raise a validation error if it finds the object under test during its search.


Since you don't _have_ to pass the save relating to the schema under validation, you can override the property name:

```javascript
const duplicatePropertyValidator = require('validity-validate-duplicate-property')
constschemata = require('schemata')

const schema = schemata({
  _id: {
    type: String
  },
  emailAddress: {
    type: String,
    validators: [ duplicatePropertyValidator(save, 'email') ]
  }
})
```

