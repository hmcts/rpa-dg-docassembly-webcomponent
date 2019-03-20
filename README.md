# @hmcts/dg-docassembly-webcomponent 
[![Coverage Status](https://coveralls.io/repos/github/hmcts/dg-docassembly-webcomponent/badge.svg?branch=master)](https://coveralls.io/github/hmcts/dg-docassembly-webcomponent?branch=upload-npm-in-pipeline)
[![Build Status](https://travis-ci.com/hmcts/dg-docassembly-webcomponent.svg?branch=master)](https://travis-ci.com/hmcts/dg-docassembly-webcomponent)

The docassembly webcomponent is an angular library that provides components to generate a document based on a predefined template customised with user input.
The library is made up of 3 main components:
- assembly-viewer, which is the parent component that acts as a wrapper that wires the other components together
- form-viwer, which retrieves and displays the input form that allows the user to cutomise the generated document
- document-viewer, which enables the user to preview the generated document

### Integration options
- default setup, wiring between internal components already done
- service-driven setup, more control to the service to define the styling of the component, but also requires the service
  to do the wiring between the form-viewer and the document-viewer (more details below) 

### Building document assembly web component
- npm run package
- distributable will be created under dist/dg-docassembly-webcomponent

### Add as a dependency in your angular app
- add @hmcts/dg-docassembly-webcomponent as a dependency in package.json
- import AssemblyModule and declare it in your NgModule imports.

  For example:
  ```
  import { AssemblyModule } from 'dg-docassembly-webcomponent';

  @NgModule({
    imports: [
      ...,
      AssemblyModule,
    ]
  })
  ```
- import assets to your angular.json
  ```
    {
        "glob": "**/*",
        "input": "projects/dg-docassembly-webcomponent/node_modules/@hmcts/document-viewer-webcomponent/assets",
        "output": "/assets"
    }
  ```
- and styles
  ```
  "styles": [
    "projects/dg-docassembly-webcomponent/node_modules/@hmcts/document-viewer-webcomponent/assets/aui-styles.scss",
    ...
  ],
  ```
- import JS dependencies as scripts within angular.json
  ```
  "scripts": [
      "projects/dg-docassembly-webcomponent/node_modules/@hmcts/document-viewer-webcomponent/assets/js/pdf.combined.min.js",
      "projects/dg-docassembly-webcomponent/node_modules/@hmcts/document-viewer-webcomponent/assets/js/pdf_viewer.min.js",
      "projects/dg-docassembly-webcomponent/node_modules/@hmcts/document-viewer-webcomponent/assets/js/pdf-annotate.min.js"
      ...
  ]
  ```
- component entry point:

  - using the default setup, the service needs to set: templateName, ouputFormats, templateData 
    ```
    <app-assembly-viewer *ngIf="selectedTemplate"
                         [templateName]="selectedTemplate"
                         [outputFormats]="['PDF']"
                         [templateData]="templateData"></app-assembly-viewer>
    ```
  
  - using the service-driven setup, the service needs to:
    - set the templateName, outputFormats, templateData on the form-viewer
    - listen to the previewDocument event to retrieve the selected outputFormat, and documentUrl
      these need to be set on the document-viewer
    ```
    <app-form-viewer *ngIf="selectedTemplate"
                     [templateName]="selectedTemplate"
                     [outputFormats]="['PDF', 'DOC']"
                     [templateData]="templateData"
                     (previewDocument)="setPreviewData($event)"></app-form-viewer>
    <app-document-viewer *ngIf="documentUrl"
                         [baseUrl]="'api'"
                         [isDM]="true"
                         [contentType]="outputFormat | lowercase"
                         [url]="documentUrl"></app-document-viewer>
    ```  
### Backend requirements
The docassembly component requies access to a number of API endpoints, some of which need to be proxied
- rpa-dg-docassembly, which depends on dg-template-management and DOCMOSIS
- proxy access to document store through 'document/' endpoint
- access to template store (still to be finalised)
