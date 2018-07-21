![Logo](images/logo.png)

# Angular Follow Selector

This extension for Visual Studio code enables you to click on Angular selectors in HTML files and be redirected to their definition in the respective component. It can also open the template and styling files directly from the component with a simple click.

## Demo

![Demo](images/demo.gif)

## Requirements

You need Visual Studio Code with a minimum version of 1.10 and, to be a useful extension, an Angular 2+ project that follows the naming conventions and utilizes Typescript.

## Known Issues

None found so far but feel free to log an issue if you encounter something unexpected! 😊

## Release Notes

### 1.2.0
Added the possibility to navigate to directives in the project.

### 1.1.1
Fixed an issue where a resource specified in `templateUrl` or `styleUrls` would not be found when the file name contains a slash.

### 1.1.0
Added a new feature that lets you open the template and styling files directly from the component.
_(Thanks Jeremy Flowers for the suggestion!)_

### 1.0.0
Initial release of Angular Follow Selector.
