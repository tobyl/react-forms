# Pure React Forms

This repo exists to demonstrate forms built with pure React.

## Project Goals

The project has extremely simple goals:

1. Use pure React, with no dependencies (only 2 dependencies are currently required, React Router to handle routing and classnames to handle easy building of classes for components).
2. Follow React best practices.
3. Allow for maximum flexibility with the least possible repetition or complexity.
4. Multi-page forms by default.
5. Local and server-side validation.
6. Build with "combo" forms (dynamic chaining of fieldsets) in mind for the future.

## Install

1. Clone repo.
2. Install Yarn if not already installed `brew install yarn`.
3. cd into folder and install dependencies `yarn install`.
4. Run with `yarn start`.
5. Run tests with `yarn test`.

**Note**: Currently the form uses a dummy API to provide fake validation. To use:

1. Install json-server `npm install -g json-server`.
2. cd into project folder and run `json-server --watch db.json --port 3001`.

## Outline

The forms rely on two basic premises for most of their functionality:

1. [Higher order components](https://reactjs.org/docs/higher-order-components.html) to handle props and keep repetition low.
2. [React Context](https://reactjs.org/docs/context.html) for passing props and functions, to avoid [prop drilling](https://blog.kentcdodds.com/prop-drilling-bb62e02cb691) and prop spreading.

With a general understanding of React and the two concepts above, anyone should be able to work with the forms.

## Structure

There are three levels to every service request form, the form, the fieldsets in each form and the fields within each fieldset.

### Form

Each form pulls in the [base Form component](base/Form.js) which is a higher order component. The base Form is where the formContext is created and updated.The base Form controls three main areas of functionality:

1. Handling form-wide actions such as submit.
2. Storing and handling form data (the goal is that in Form.js `this.state.formData` is always the single source of truth for form data).
3. Setting up the React Router route for fieldsets and handling fieldset navigation.

**Note**: You can only add fieldsets as children to the form. All headers, titles, subtitles and other components must be added to either the form's parent component or to a fieldset.

### Fieldset

Each fieldset is a page in the form. You cannot add fields to a form, only to a fieldset. **Pages and fieldsets are synonomous**.

Fieldsets are all standalone components that are wrapped in the [base Fieldset component](base/Fieldset.js) which is a higher order component. The Fieldset HOC has only two jobs:

1. To render a fieldset if it's name matches the current fieldset route slug.
2. To pass down props from the form via context. This is so that fieldsets can make logical decisions about whether to render fields. For example, in the [Licence Dates](LicenceDates.js) fieldset, the fieldset is aware of form data and renders fields based on that data.

### Fields

Every field manages it's own state via the [base Field component](base/Field.js) which is a higher order component. Fields have a variety of differences and a number of different possible states. The goal is to keep field state within fields, and only elevate state required to populate or manage the rest of the form.
