# Quick Create

Create files and folders from templates to speed up development and scaffolding.

## Run without install

```
npx quick-create --template=./templates/component --destination=./src/components -a componentname=TestComponent
```

## Install in a npm based project

```
npm i -D quick-create
```

Then add a script to make creation of components easier

```json
"scripts" : {
    "create-component": "quick-create --template=./.templates/ComponentTemplate --destination=./src/components -a component=$npm_config_name"
}
```

Then to create the component

```
npm run create-component --name=TestComponent
```

## Templating

Templating uses lodash templating to execute and replace `{{component}}`. The template uses handlebars style strings. JS functions are also availbale to do transformations on the data like `{{name.toLowerCase()}}`. The templating can be applied for filenames as well (Put {{}} in filename).
