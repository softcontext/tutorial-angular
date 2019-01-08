# Workspace

https://nitayneeman.com/posts/understanding-the-angular-cli-workspace-file/

When it comes to managing multiple applications within a single directory - it’s indeed possible, but not ideal. We cannot share and reuse common code across the multiple applications easily. Beyond that, we cannot configure the build process for each application without the aid of npm scripts.

Both are possible now with the sixth version of Angular CLI! 😍

An Angular Workspace is a directory which is generated via Angular CLI and able to contain multiple projects or libraries that derive the configuration out of a single file.

In practice - the old and familiar output of an Angular CLI `project` is called an `Angular Workspace` from now on.

It’s noteworthy that it’s not just a `name change` but a significant step for refactoring the CLI’s core - which is `split` up now into `several projects`, `on top of Schematics`.

Inside the root of such a workspace, appears a new configuration file called `angular.json` (instead of .`angular-cli.json` that’s deprecated):

What we’re going to do now is to go through the new schema and understand it step by step.

Notice that all the practical information is available in the official documentation. However, the purpose of this article is to dive a little deeper into the schema and elaborate as necessary. 

On top of that, the following explanations are aligned with Angular Workspace schema v1.

# Exploring the Workspace File

Let’s generate a new sample workspace by running `ng new angular-cli-workspace-example`.

This is the initialized configuration file we’re supposed to get:

```
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": { 
    "angular-cli-workspace-example": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "schematics": {},
      "targets": {
        "build": {},
        "serve": {},
        "extract-i18n": {},
        "test": {},
        "lint": {}
      }
    },
    "angular-cli-workspace-example-e2e": {
      "root": "e2e/",
      "projectType": "application",
      "targets": {
        "e2e": {},
        "lint": {}
      }
    }
  },
  "defaultProject": "angular-cli-workspace-example"
}
```

Note: The content of architect targets is omitted in order to simplify the example above. 
The `schematics` and `cli properties` aren’t added by default but we’re going to explore them as well.

It’s about time to start explaining that schema! 🕵️

# $schema

JSON `Schema` is a tool that allows us to `annotate` and `validate` the `structure of JSON data`. It’s used by Angular CLI in order to enforce the `specification` of `Angular Workspace schema`:



Demonstrating JSON Schema autocomplete and validation inside the workspace configuration file

The $schema property `refers` to the Angular CLI implementation file for JSON Schema.

# version

The version property specifies what’s the Angular Workspace `schema version` which is currently in use.

# schematics

Most likely you’ve heard about `Schematics`, one way or another. In case you haven’t - it’s a `workflow tool`, as part of `Angular DevKit`, which lets us transform, generate or update our project development workflow. Just for the record - Angular CLI uses Schematics `under the hood` in order to perform its job and the truth is that Angular Schematics packages have been derived and created from the CLI’s core.

The schematics property `provides` us an ability `to configure the options of Schematics packages` in the root level of our workspace.

Let’s suppose we’d like to `guarantee` that `every component` will be `created with different default settings`. For instance - using “OnPush” as a `detection strategy` and exporting that component through the declaring module, by default.

That’s how we can make it work:

```
"schematics": {
  "@schematics/angular:component": {
    "changeDetection": "OnPush",
    "export": true
  }
}
```

Notice that enforcement will be applied on projects from any level within the workspace.

In case you want to explore `additional Schematics packages` which have been built for Angular CLI and are possible to be used - check this list out, pick a package and review its schema.json file.

https://github.com/angular/angular-cli/tree/master/packages/schematics/angular

```
"schematics": {
  "@schematics/angular:component": {
    "styleext": "scss"
  }
},
```

# cli

The cli property let us define the configuration for Angular CLI in our workspace.

These are the configurable properties:

1️⃣ - defaultCollection

The defaultCollection property specifies what’s the set of Schematics which in use. The `@nrwl/schematics` set is an excellent example of `another Schematics implementation` for the sake of development and maintenance of Angular applications - with an emphasis on `enterprises`.

2️⃣ - packageManager

The packageManager property specifies which package manager Angular CLI uses to perform the commands:

```
"cli": {
  "packageManager": "yarn"
}
```

3️⃣ - warnings

The warnings property controls in a manner of displaying console warnings due to Angular CLI’s commands. We can disable the “version mismatch” warning in case of version conflicts regarding the global and local Angular CLI version - and for TypeScript versions either.

# newProjectRoot

The newProjectRoot property specifies where’s the place that new internal applications and libraries (as long as these are generated by the CLI) will be placed:

```
ng g application sub-app
```

Generating a new internal application into the default `ProjectRoot` directory

Notice that the default value is `projects`.

# projects

The projects property includes the configuration for any project in our workspace.

By default, there is another project alongside our `main project` - a project with the `e2e` tests:

In fact - an e2e project is initialized every time an internal application is generated by Angular CLI.

`Each project` within our workspace able to be configured with the following properties:

1️⃣ - root

The root property specifies what’s the `main directory` with all project’s files. Probably will be an `empty value` for the `main project` of our workspace whereas it indicates for a specific directory for internal projects.

2️⃣ - sourceRoot

The sourceRoot property specifies where the `source files` are placed for the project.

3️⃣ - projectType

Using ng generate it’s possible now to create internal projects within our main project - which are configured as `part of the general configuration file`. Those projects could be generated as an `internal application` or `library`. That’s exactly the reason for the projectType property - a statement whether that project is an application or library.

4️⃣ - prefix

Written in the official Angular style guide that we should adopt a `custom prefix` for `components` and `directives` in order to identify them completely and prevent collisions. The prefix property specifies that custom prefix which will be applied when generating components or directives using Angular CLI.

5️⃣ - schematics

In a similar way, it’s possible to configure the options of `Schematics packages` in a level of an internal project - so these will be applied strictly on that project. In case that same option is defined on the root level and internal project’s level either, the `internal project’s level would be applied`. As you probably guess, that’s done through the schematics property.

6️⃣ - targets

Any project in a workspace able to contain and customize automatic `task` commands - such as `bundling`, `serving(개발서버)`, `testing`, `linting` and more. These are based on prebuilt `builders` and called `Architect Targets`.

Here’s an example for the targets of our main project:

```
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
    "options": {
      "outputPath": "dist/my-pipe-sort",
      "index": "src/index.html",
      "main": "src/main.ts",
      "polyfills": "src/polyfills.ts",
      "tsConfig": "src/tsconfig.app.json",
      "assets": [
        "src/favicon.ico",
        "src/assets"
      ],
      "styles": [
        "src/styles.scss"
      ],
      "scripts": []
    },
    "configurations": {
      "production": {
        "fileReplacements": [
          {
            "replace": "src/environments/environment.ts",
            "with": "src/environments/environment.prod.ts"
          }
        ],
        "optimization": true,
        "outputHashing": "all",
        "sourceMap": false,
        "extractCss": true,
        "namedChunks": false,
        "aot": true,
        "extractLicenses": true,
        "vendorChunk": false,
        "buildOptimizer": true,
        "budgets": [
          {
            "type": "initial",
            "maximumWarning": "2mb",
            "maximumError": "5mb"
          }
        ]
      }
    }
  },
  "serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "options": {
      "browserTarget": "my-pipe-sort:build"
    },
    "configurations": {
      "production": {
        "browserTarget": "my-pipe-sort:build:production"
      }
    }
  },
  "extract-i18n": {
    "builder": "@angular-devkit/build-angular:extract-i18n",
    "options": {
      "browserTarget": "my-pipe-sort:build"
    }
  },
  "test": {
    "builder": "@angular-devkit/build-angular:karma",
    "options": {
      "main": "src/test.ts",
      "polyfills": "src/polyfills.ts",
      "tsConfig": "src/tsconfig.spec.json",
      "karmaConfig": "src/karma.conf.js",
      "styles": [
        "src/styles.scss"
      ],
      "scripts": [],
      "assets": [
        "src/favicon.ico",
        "src/assets"
      ]
    }
  },
  "lint": {
    "builder": "@angular-devkit/build-angular:tslint",
    "options": {
      "tsConfig": [
        "src/tsconfig.app.json",
        "src/tsconfig.spec.json"
      ],
      "exclude": [
        "**/node_modules/**"
      ]
    }
  }
}
```

The property serve, for example, is the `architect target` whereas @angular-devkit/build-angular:dev-server is the `prebuilt Angular builder`. On top of that, we can run targets of a specific project directly using `ng run` - so that serve target is performed by running `ng run 프로젝트명:serve`:

The targets property lets us define targets for a project plus its options for various configurations.

# defaultProject

The defaultProject property represents the name which shows up while using some of Angular CLI’s commands.

```
  "defaultProject": "my-pipe-sort",
```

# Conclusions

In this article we explained what’s an `Angular Workspace` and went `through the configuration schema` for such a workspace (v1).

Let’s recap:

The .angular-cli.json file has been replaced by `angular.json` since `Angular CLI v6-RC2`.
An Angular `Workspace` is `a project` which is produced by the ng new command.
An Angular `Workspace` able to `consist` the sources of `multiple internal applications` and `libraries`, alongside `one configuration file`.
Angular CLI uses `JSON Schema` `to enforce the configuration schema`.
The Angular team created `Schematics packages` which are used by the CLI.
We can configure the `options` of Schematics packages, `as we please`, for the root project and internal projects as well.
We `can configure Angular CLI` to use `another set of Schematics` and `package manager` easily.
The Angular team created `prebuilt Angular builders` based on the CLI’s core in context of `automatic task` commands.
We can use Angular builders in order to attach `runnable commands`, which are called `Architect Targets`, to the `root project` and `internal projects` as well.
Architect Targets are `customizable` in terms of options and various configurations.



*****************************************************

https://medium.com/@angularlicious/angular-6-workspace-test-drive-cfe24bbceeb3

When we use the new Angular 6 CLI, the default environment is now a `workspace` (well, maybe not — more later) that allows for the development of `multiple applications and libraries` `in a single workspace`. When you add `new applications` and/or `libraries`, you are creating project items. A project item has a specific type to indicate whether it is an application or a library.

`application`: is a `single-page` web `application`.
    `library`: is a `module` that is `shared by multiple applications`

The `workspace tooling` for Angular development was introduced awhile back by `NRWL`.io’s `Nx extensions`. A `set of schematics` that allow you to create a workspace using custom configuration provided by NRWL. If you use Nx, you create apps that are either a lib or an app (Angular Single Page Web application). It seems like I just started using NRWL's Nx Workspace 1.0 - on May 22, 2018 NRWL announced the release of version 6.0 built on top of Angular CLI 6.0. The tooling for creating and using libraries is moving pretty fast these days.

Being able to `reuse libraries` across `multiple applications` is a great feature. It was definitely possible before. However, the workflow was much more intensive and required lots of configuration of the libraries. It is now much easier with version 6 of the Angular CLI.

# Uses for an Angular Workspace

I am going to assume the default use of the new Angular Workspace is to support the ability to `share Angular libraries` amongst multiple web applications. The previous Angular CLI allows us to create an `@NgModule` within a web application with the following command.

```
ng generate module MyNewModule
```

The new Angular 6 CLI will you to create an Angular `library`, which is really an `@NgModule`, outside of the specified web application. Since we have this new capability, we have more options. Now we have to decide `which modules` are `candidates for reuse` and sharing verses which ones should be contained in the specified application. My opinion is that `modules` are great way to `organize your code` and applications. They provide encapsulation and support many good programming principles. Organizing related things into a single module provides many benefits. Now, if that module is a candidate for reuse by other applications - we can now create it `as a library` in the new workspace. Think of it as an additional `code organziation strategy`. Use the following to create a new library.

```
ng generate library MyNewLibrary
```

So, what is the `difference` `between a module and a library`? If the module can be used by `more than one consumer` (i.e., Angular web applications or other modules) it can be considered a library. A `module` describes the ability or mechanism to `group related things`. And a `library` indicates that it contains things that are useful to consumers of the library - think of a real physical library where you can visit and checkout items for your enjoyment. Now your `library` can be `shared by many consumers` - kind of `like a book in the library`.

So, what is the `difference` `between a library and a package`? I'll assume if the `module` is `published to a repository` for consumption `via a package manager` (think NPM) that it is a `package`. However, many recent blog posts and community-speak is `referring` to these `as libraries`. The remainder of this article will refer to published or non-published items as libraries.

# Non-Published Libraries

The current implementation of the Angular Workspace is for developing `multiple web appications` `sharing libraries` `in a single development environment`. The current implementation of the the Angular Workspace is NOT a development environment (by default) for creating libraries to be published on NPM. Although the environment can use ng-packagr to build and output a library project to a dist folder completely ready for publishing - it is not the default use of the workspace environment. In fact, when `you run the default build` script, `only the default application is output to the dist folder`. The build strategy is application-centric. It will build the applications and include any other modules referenced and used by the specified application.

`Publishing packages` is a very `different workflow`. If you want to compile and `publish one of the libraries` in the `new workspace`, you can use the Angular CLI command `ng build --project=lib-one`. The new project configuration in the `angular.json` knows that this type of project is `library` it can now use different build strategies for different project types - library projects will use `ng-packagr` to build and create `distributable` output ready for `publishing`. NPM requires additional management of the peerDependencies in the library's `package.json` file. This is not done by default during the build process of libraries or applications in the new workspace. You will need to manually set these peer dependencies. Additionally, NPM requires semantic versioning of the published libraries. Before publishing packages to NPM, you will need to update the semantic version of the library. The web applications in the workspace are not concerned with the package notion of the library - they are not referenced in the package.json by name/version; and they are not installed in the `node_modules` folder of the workspace. Applications in the worksapce reference libraries `by file path` as we shall see.

There is no build or output of the library projects in the dist folder when you build an application project. To accomplish a `distribution` build of the `libraries`, you will need to `add a new build script` to the `package.json` file. You will also want to update the version of your package before creating a distribution build for publishing. The following script below shows how to build (2) libraries - this specific build process will use `ng-packagr` to create distribution version of the library for: UMD, esm5, esm2015, fesm5, and fesm2015. This special build process follows the Angular Package Format. Nice!

```
"package": "ng build --project=libOne && ng build --project=libTwo",
```

Run the script to build the libraries with the output going to the dist folder.

```
npm run package
```

Building and outputting the libraries to the dist folder is really only for `publishing packages (libraries)` to NPM. None of the applications are using or importing these packages from the local dist folder.

# workspace-demo

I’m creating a workspace-demo workspace available on Github to show the basic usage of a development workflow for `multiple libraries` and applications. The default workspace contains a `default web application`. Therefore, to demonstrate the multiple libraries, I'll add (2) new library projects to the workspace uskng the CLI.

```
ng generate library libOne
ng generate library libTwo
```

# Using a Library

As I add the service to the constructor of the AppComponent, `the editor will add the import statement to the LibOneService`. Notice that the right-side of the import is using a `filepath reference` to the public_api of the specified library - there is no package name usage here.

A simplified developer workflow here does not require us to add an entry in the dependencies section of the package.json. The library is not published and is not contained in the node_modules folder as most packages are. Remember that these are shared libraries in a workspace environment.

```
import { Component } from '@angular/core';
import { LibOneService } from 'projects/lib-one/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(
    private oneService: LibOneService
  ) {
    this.title = this.oneService.SayHello("Angular 6 Workspace")
  }
}
```

The service will have a simple SayHello method - we just want to see how things work here.

```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibOneService {
  constructor() { }
  SayHello(message: string): string {
    return `${message}`;
  }
}
```

I’ll update the `launch.json` to add a configuration to use localhost and port 4200.

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:4200",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

Now we can run `ng serve` and then `press F5` to run the application.

That was easy. Now let’s try something a little more real world.

# Application-to-ServiceOne-to-ServiceTwo

In the real-world, it is not uncommon for a `library` to `use other libraries`. `It is all about reuse`. Our `packages` that we `install from NPM` have `dependencies` on `other packages`. We can also do the same with our shared libraries.

We’ll just extend the implementation of the services so that `LibOneService` has a dependency on the `LibTwoService` which is contained in the `lib-two library`. We'll inject the service into the constructor of the LibOneService and update the SayHellomethod to use the LibTwoService instance. Note that the `import statement` is a `file path reference` to the public_api of the LibTwoService.

```
import { Injectable } from '@angular/core';
import { LibTwoService } from '../../../lib-two/src/public_api';

@Injectable({
  providedIn: 'root'
})
export class LibOneService {
  constructor(
    private serviceTwo: LibTwoService
  ) { }
  SayHello(message: string): string {
    // return `${message}`;
    return this.serviceTwo.SayHello(message);
  }
}
```

Create and implement a SayHello method in the LibTwoService.

```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibTwoService {
  serviceName = 'LibTwoService';
  constructor() { }
  SayHello(message: string): string {
    return `${message} from ${this.serviceName}`;
  }
}
```

Serve and launch the application to view the usage of multiple services by a single application.

As you can see, the development workflow is much different and really efficient. There is no need to `publish` the libraries and then `install/update` them for use in an application.

- more efficient development workflow
- ability to share libraries from application consumers
- ability for libraries to consume other libraries in the workspace

# Angular 6 Workspace for Publishing Libraries

Now we understand how to use the default workspace environment for `sharing libraries` with applications. The next scenario we want to explore is how can we use the new Angular workspace to `publish libraries to NPM`.

I want to test-drive the new Angular project workspace and kick the tires a little. And, also compare it to `NRWL.io`’s Nx workspace. The following are my expectations:

Use a `@scope` for libraries — to help manage and organize the libraries. For example, `@buildmotion/security` where my scope is `@buildmotion`
Use the scope name if there are any library candidates for publishing to NPM.
Consumers (i.e., application components or other modules) of the library should be able to import the library using its scope and name: `@buildmotion/security`.
Easy configuration of library and application projects.

`Angular 6` has a new angular.json configuration that replaces the old .angular-cli.json file. This new configuration contains `a list of projects` to allow for `individual configuration` of multiple projects.

In order to be able to use these new features, you should:

Update your global development environment to use Angular 6.

`npm install -g @angular/cli@latest`

Create a new workspace for development.

`ng new buildmotion`

If you created the new workspace, you will note that there is a `src` folder in the `root of the workspac`e with a `default web application`. `This is the same` for previsous version of the Angular CLI.

The configuration of the default web application is contained in the angular.json projects section. If you use the CLI to create additional projects (`library or application`), the CLI will `create a new folder` in the projects folder for each new project.

I would prefer to have `all of my projects`, including the default application, in the projects folder. Is the default application in the root’s src folder different or more special? It is a little confusing to have applications in (2) different locations - `I prefer consistency`. It feels like that the new environment supports workspace, but the default project setup is `still` using the `previous folder structure` `for a single web application`. And by the way, if you want to add more projects to the workspace that is supported too.

# New Configurations using angular.json

You can review the `schema` to see all of the available configuration settings allowed. You can view a more detailed description at https://github.com/angular/angular-cli/wiki/angular-workspace.

```
"$schema": "./node_modules/@angular/cli/lib/config/schema.json",
```

$schema: references the `specified schema.json` file used by the cli.
version (integer): File format version. This is currently “1”.
newProjectRoot (string): Path `where new projects will be created`.
projects: A list of project items.
defaultProject (string): `Default project` name used in commands.
`cli`: Workspace configuration options for Angular CLI.
schematics (object): Workspace configuration options `for Schematics`.
projects: Configuration options for `each project` in the workspace.

# Application Project

When a new project of type application is created, the projects section in angular.json adds configuration for the following items.

`root`: Root of the project files.
`sourceRoot`: The root of the source files, assets and index.html file structure.
projectType: An enum to specify the project type: `application`, `library`
`prefix`: The prefix to apply to generated selectors.
`schematics`: Project configuration options for Schematics. Has the same format as top level Schematics configuration).
`architect`: Project configuration for `Architect targets`.
build
serve
extract-i18n
test
lint

There are (2) project types that are allowed by the angular.json schema. The projectType and root properties are required for a projects item. The enum values are show below.

```
"projectType": {
    "type": "string",
    "description": "Project type.",
    "enum": [
      "application",
      "library"
    ]
}
```

# Library Project

When a new project of type library is created, the projects section in angular.json adds configuration for the following items. Libraries are consumed and not served - therefore, there is no serve architect configuration.

root: Root of the project files.
sourceRoot: The root of the source files, assets and index.html file structure.
projectType: An enum to specify the project type: application, library
prefix: The prefix to apply to generated selectors.
architect: Project configuration for Architect targets.
build
test
lint

```
"libOne": {
      "root": "projects/buildmotion/lib-one",
      "sourceRoot": "projects/buildmotion/lib-one/src",
      "projectType": "library",
      "prefix": "lib",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-ng-packagr:build",
          "options": {
            "tsConfig": "projects/buildmotion/lib-one/tsconfig.lib.json",
            "project": "projects/buildmotion/lib-one/ng-package.json"
          },
          "configurations": {
            "production": {
              "project": "projects/buildmotion/lib-one/ng-package.prod.json"
            }
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "projects/buildmotion/lib-one/src/test.ts",
            "tsConfig": "projects/buildmotion/lib-one/tsconfig.spec.json",
            "karmaConfig": "projects/buildmotion/lib-one/karma.conf.js"
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": [
              "projects/buildmotion/lib-one/tsconfig.lib.json",
              "projects/buildmotion/lib-one/tsconfig.spec.json"
            ],
            "exclude": [
              "**/node_modules/**"
            ]
          }
        }
      }
    }
```

# Create Workspace Items

I will use the CLI to generate `additional web applications` and new `libraries` in the workspace. We will use this application to consume our libraries.

# Web Application

Create a new application (web) called `webOne`. A new project folder will be created for the application.

`ng generate application webOne`

Build the application using the CLI command:

`ng build --project=webOne`

Run the application using the CLI command:

`ng serve webOne`

# Library

It is a good practice to `scope` your libraries that you are responsible for. In this example, I would like to have all of libraries scoped using `@buildmotion`. This is a convenient way to organize your libraries. `Scopes` are a way of `grouping related packages` together. I'm not sure how practical this is for a development workflow where libraries are shared by applications, but not published or distributed to NPM (for use by other applications not contained in the workspace).

npm-scope
How to work with scoped packages.
Publishing an Organization scoped package.

Create a new library project `with` the `@scope` name along with the name of the library. This will actually create a folder called `buildmotion` in projects `with a new library folder` of lib-one.

`Ex: ng generate library @SCOPE-NAME-HERE/LIBRARY-NAME-HERE`

`ng generate library @buildmotion/libOne`

The name of the package is `@buildmotion/lib-one` - note, that it also contains the scope name of `@buildmotion`. The name value in the project root package.json of the library contains the correct value if you want to publish the package to NPM.

```
{
  "name": "@buildmotion/lib-one",
  "version": "0.0.1",
  "peerDependencies": {
    "@angular/common": "^6.0.0-rc.0 || ^6.0.0",
    "@angular/core": "^6.0.0-rc.0 || ^6.0.0"
  }
}
```

You will `need` to `modify` the name of the project in the `angular.json` file to remove the `@buildmotion/ scope`. A name value of `@buildmotion/libOne` contains `invalid characters` as defined by the schema `for the angular.json`.

```
"libOne": {
      "root": "projects/buildmotion/lib-one",
      "sourceRoot": "projects/buildmotion/lib-one/src",
      "projectType": "library",
      "prefix": "lib",
      ...
    }
```

# Add a Service to the Library

Use the CLI to create a service in the new library. We want to be able to reference the library and service using the `@buildmotion/libOne`.

`ng generate service hello  --project=libOne`

Interestingly, the schematic that generates a new library also creates a `default service` for each library. Are assuming that all libraries require a service to act `as an API` `for module`?

```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibOneService {
  constructor() { }
}
```

Additionally, the `schematic` generates a `default component` for the library as well. I would prefer to add services and components to my libraries as needed for the desired implementation and purpose of the library. Not all libraries will need/use services and components. But it is a good start.

```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-libOne',
  template: `
    <p>
      lib-one works!
    </p>
  `,
  styles: []
})
export class LibOneComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
}
```

# Use the Library in the Application

Now that we have some components and services in our `library` we are ready to use them in the `application`. I can `inject` the service into the constructor. `Visual Studio Code` will create the import statement for the component. However, notice that we are not using the `@buildmotion/lib-one` scope and `library name`. This is `disappointing`. The `NRWL.io` Nx workspace does this by default. It is not recommended to `publish` libraries with `file path references/imports` - the dependency will need to be installed from NPM and will not be in the specified file path.

```
import { LibOneService } from 'dist/@buildmotion/lib-one/public_api';
```

I would prefer to see what is below. Because the `context` of this exercise is to `publish` libraries that can be `consumed` by other applications. The consumers of your library may not be applications in the same project workspace. It may be a `different team` or company if the libraries are `public`. Keep in mind that we are extending the default use of the Angular 6 workspace environment to allow for `publishing` libraries for `general consumption`. You may not need to do this.

```
import { LibOneService } from '@buildmotion/lib-one';
```

However, we get a `path reference` to the LibOneService. `Update the path value` to use the `scope name` value: `@buildmotion/lib-one`. We'll provide a work-around(돌아가서 처리하기:다른 해결책) to make this happen.

```
import { Component, OnInit } from '@angular/core';
import { LibOneService } from '@buildmotion/lib-one';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(
    private oneService: LibOneService
  ) {
  }
  ngOnInit(): void {
    this.title = this.oneService.SayHello("Angular 6 Workspace");
  }
}
```

# Import Reference Fix

Update the workspace’s root `tsconfig.json` file to include (2) new items for each of our libraries. Basically, we are telling the compilers where to look for the module when it imports `@buildmotion/lib-one` or `@buildmotion/lib-two`.

```
"paths": {
      "@buildmotion/lib-two":["dist/@buildmotion/lib-two"],
      "@buildmotion/lib-one":["dist/@buildmotion/lib-one"]
    }
```

Note that the folder is the `dist` folder. This means that if want the consuming applications to get the latest changes to any library project, you will `need to build` the libraries. I created a new script item in the workspace package.json file to do this.

```
"package": "ng build --project=libTwo && ng build --project=libOne",
```

Execute the script to build and output the libraries into the dist folder - ready for consumption. Although this is an extra step, it is much more efficient than going through the publishing process when they are separate projects. Set the `order precendence` `based` on the dependencies of the libraries. In our example, `libOne` `depends` on `libTwo`. Therefore, libTwo is compiled `before` libOne. Got it?

`npm run package`

However, if you `publish` one or more of your `custom libraries` to `NPM` and one of them has a dependency on an existing library in the same scope (i.e., `@buildmotion`), it will need the dependency defined using `import` statements that use the `correct scope` and name of the package. This will be the case when you publish package groups using the same scope name.

`ng generate library @buildmotion/libTwo`

You can now build the new library in the workspace by indicating which library `by name` using the `--project` switch.

`ng build --project=libTwo`

We’ll `modify` the `SayHello` method in the `LibOneService` to use and `call` a method on the LibTwoService.

```
SayHello(message: string): string {
  if(message) {
      this.libTwoService.SayHello(message);
  }
  return 'Next time send in a message.';
}
```

Implement the SayHello method on the service. This service is `consumed` by `another library/module`. This should be supported, right?

```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibTwoService {
  constructor() { }
  SayHello(message: any): any {
   return `Hello ${message}.`;
  }
}
```

Build the new libaries. You should see the output in the `dist` folder under the `@buildmotion folder`.

`npm run package`

# Library Peer Dependencies

If you are going to `publish` your libraries created in the Angular 6 workspace, you will need to `update` the `peerDependenciesin` the library's `package.json` file. This is what gets published to `NPM`. When consumers of your library install the package, the peerDependencies are listed for the developer to manually install.

We should be able to consume the library that consumes another library from the webOne application.

`ng serve --project=webOne`

# Wrapping Up

The new Angular 6 `Workspace` is really intended as an enhanced developer `workflow` to allow `multiple applications` and `libraries` to be developed together more efficiently. It is not intended for `publishing` libraries for general consumption.

The workspace environment supports `sharing` multiple libraries by multiple consuming applications.
It is application-centric in the build process. There is `no` build or output of libraries `by default`.
The workspace environment does not appear to support `@scope` names and `references` from consumers of libraries.
May not be a good choice for developing libraries that have a primary destination of a package manager repository (think NPM).
The default application is created in the root `src` folder when a new workspace is created.

If you want to have the advantage of a workspace environment that provides enhanced configuration of projects and dependencies, along with full-support for publishing libraries; I would suggest using `NRWL.io` `Nx extensions` versions `1.0 or 6.0`. If you are not publishing your libraries for `general consumption`, you would do well to use either the Angular or NRWL workspace environments. Both environments provide excellent opportunities to organize your code using modules and this is a good thing!

*******************************************************

https://blog.angularindepth.com/creating-a-library-in-angular-6-87799552e7e5

# Goals

Use Angular CLI to create a `workspace` with the same name as our intended Angular library: `example-ng6-lib`
We will have a `test application` for our example-ng6-lib library named:
`example-ng6-lib-app`
In our example-ng6-lib workspace generate an Angular library named:
`example-ng6-lib`
Our Angular library will have the `prefix` of `enl` to remind us of Example Ng6 Library.
We will test our example-ng6-lib by importing it as a library into our `example-ng6-lib-app` application.

# Angular 6

At the time of this writing Angular 6 is still quite new. So, there are a couple of the changes that will affect this tutorial.

The Angular CLI version number has been synchronized with Angular: `jumping` from version `1.7` to version `6.0.0`.

The Angular CLI configuration file angular-cli.json has been replaced with `angular.json`.

Angular CLI now generates a `workspace` that directly `supports` `multiple projects`.

# Creating an Angular Workspace

Our first goal was to create an Angular workspace named `example-ng6-lib`.

## For Angular 7

Angular 7 added the very useful flag `--createApplication`. If you are using Angular 7, you should follow the approach I describe in my article:
Angular Workspace: No Application for You!
and not the approach below for Angular 6 where we rename the Workspace.

## For Angular 6

Because of how the projects work in Angular 6, we need to create the Angular Workspace in a bit of a `round-about` way. We need to `create` a workspace named `example-ng6-lib-app` and then `rename` it to `example-ng6-lib`:

```
ng new example-ng6-lib-app
rename example-ng6-lib-app example-ng6-lib
cd example-ng6-lib
ng serve
```

If you need to support IE, see my article: Angular and Internet Explorer.

When we point our browser at:
http://localhost:4200/

we see the starter Angular application that we all know and love.

# Angular 6 Configuration: angular.json

Before we move on to creating our library let’s take a quick look at the new Angular configuration file: `angular.json`.

The old angular-cli.json has been replaced by angular.json. Also, the contents have somewhat changed.

The main thing to see is the projects object. It has one `entry` `for each project`.

```
"projects": {
  "example-ng6-lib-app": {
    ...
  },
  "example-ng6-lib-app-e2e": {
    ...
  }
},
```

Currently, we have two projects:

example-ng6-lib-app: This is our `application` that we use as a test harness for our library.
example-ng6-lib-app-e2e: This is the default project for end to end testing. During this article, you can safely ignore this project.

`Remember`, we told the Angular CLI to create the workspace named as:
`example-ng6-lib-app`

It then created the default application for us named `example-ng6-lib-app`. This leaves us `room` to name our library project: `example-ng6-lib`. Once we create our library we will see another project added to the projects object.

> ALWAYS: Create your workspace `using` the name of your `library-app`. Then `rename` it to the name of your `library`.

# Generating a Library Module

Now we can `generate` a new library called `example-ng6-lib` in our workspace.

`ng generate library example-ng6-lib --prefix=enl`

Notice we used the `--prefix` flag because we want our library components to be `distinct`. If we don’t, Angular CLI will use lib by default.

> ALWAYS: Use a prefix when generating a library.

One of the great things about the Angular CLI generate command is that it always tells you what files it affects:

```
$ ng generate library example-ng6-lib --prefix=enl
CREATE projects/example-ng6-lib/karma.conf.js (968 bytes)
CREATE projects/example-ng6-lib/ng-package.json (191 bytes)
CREATE projects/example-ng6-lib/ng-package.prod.json (164 bytes)
CREATE projects/example-ng6-lib/package.json (175 bytes)
CREATE projects/example-ng6-lib/src/test.ts (700 bytes)
CREATE projects/example-ng6-lib/src/public_api.ts (191 bytes)
CREATE projects/example-ng6-lib/tsconfig.lib.json (769 bytes)
CREATE projects/example-ng6-lib/tsconfig.spec.json (246 bytes)
CREATE projects/example-ng6-lib/tslint.json (317 bytes)
CREATE projects/example-ng6-lib/src/lib/example-ng6-lib.module.ts (261 bytes)
CREATE projects/example-ng6-lib/src/lib/example-ng6-lib.component.spec.ts (679 bytes)
CREATE projects/example-ng6-lib/src/lib/example-ng6-lib.component.ts (281 bytes)
CREATE projects/example-ng6-lib/src/lib/example-ng6-lib.service.spec.ts (418 bytes)
CREATE projects/example-ng6-lib/src/lib/example-ng6-lib.service.ts (142 bytes)
UPDATE angular.json (4818 bytes)
UPDATE package.json (1724 bytes)
UPDATE tsconfig.json (471 bytes)
```

Here is a quick summary of what the generate library command does:

Adds a new `example-ng6-lib` `project` for our library in `angular.json`
Adds `dependencies` `for ng-packagr` to our `package.json`
Adds a `reference` to the example-ng6-lib `build path` in `tsconfig.json`
Creates `sources` for our library in `projects/example-ng6-lib`

Because this is Angular in Depth let’s actually take an in depth look at each of these items.

**example-ng6-lib project in angular.json**

Take a look at angular.json. Especially notice that in the `projects` object we have a new project: example-ng6-lib.

```
"projects": {
  "example-ng6-lib-app": {

  },
  "example-ng6-lib-app-e2e": {

  },
  "example-ng6-lib": {
    "root": "projects/example-ng6-lib",
    "sourceRoot": "projects/example-ng6-lib/src",
    "projectType": "library",
    "prefix": "enl",
    "architect": {
      "build": {
        "builder": "@angular-devkit/build-ng-packagr:build",
        "options": {
          "tsConfig": "projects/example-ng6-lib/tsconfig.lib.json",
          "project": "projects/example-ng6-lib/ng-package.json"
        },
        "configurations": {
          "production": {
            "project": "projects/example-ng6-lib/ng-package.prod.json"
          }
        }
      },
      "test": {
        "builder": "@angular-devkit/build-angular:karma",
        "options": {
          "main": "projects/example-ng6-lib/src/test.ts",
          "tsConfig": "projects/example-ng6-lib/tsconfig.spec.json",
          "karmaConfig": "projects/example-ng6-lib/karma.conf.js"
        }
      },
      "lint": {
        "builder": "@angular-devkit/build-angular:tslint",
        "options": {
          "tsConfig": [
            "projects/example-ng6-lib/tsconfig.lib.json",
            "projects/example-ng6-lib/tsconfig.spec.json"
          ],
          "exclude": [
            "**/node_modules/**"
          ]
        }
      }
    }
  }
},
```

Some of the key elements to notice are:

**root**  
This points to our library project’s root folder.

**sourceRoot**  
This points to root of our library’s actual source code.

**projectType**   
This specifies this is a library as opposed to our other two projects which are of type: application.

**prefix**   
This is the prefix identifier that we will use in the selectors of our components. Remember, we specified enl when we generated the library. You are probably familiar with the app prefix that tells us which components belong to our main application.

**architect**   
This object has sections that specify `how` Angular CLI `handles` `build, test, and lint` for our project. Notice that in the `build section` the `builder` makes use of `ng-packagr`.

# ng-packagr dependency in package.json

When `generating` our `library` Angular CLI realizes that it `needs` `ng-packagr`. So, it `adds` it to our `devDependencies` in our workspace `package.json`:

"ng-packagr": "^3.0.0-rc.2",

# build path in tsconfig.json

When `testing` example-ng6-lib we want to be able to `import` it like a `library` and `not` just `another` set of files that are part of our application. Typically, when we `use` a `3rd party library` we use `npm install` and the library gets `deployed` to our `node-modules` folder.

Although, `example-ng6-lib` `won’t` be `in node-modules`, it will `be` built to a `sub-folder` `in` our workspace’s `dist folder`. Angular CLI adds this folder to our `tsconfig.json` which makes it `available` for `import as a library`.

Here is the path that it adds:

```
"paths": {
  "example-ng6-lib": [
    "dist/example-ng6-lib"
  ]
}
```

# example-ng6-lib sources

The src folder for our library is contained `in projects/example-ng6-lib`. In our library Angular CLI created a new `module` with a `service` and a `component`. Also, looking there we see a few more files:

**package.json**

This is the package.json file specifically for our library. This is the one that gets `published` with our library as an npm package. When people install our library using npm this `specifies` its `dependencies`.

**public_api.ts**

This is known as the `entry` file. It `specifies` what parts of our library are `visible` externally. Now you may be asking “But Todd, isn’t that what export does in our modules?” Well yes, but it’s a little more complicated than that. We will look at this in more detail later.

**ng-package.json**

This is the configuration file for `ng-packagr`. In the “`old days`” we needed to be familiar with its contents. Now, thanks to the new Angular CLI, it’s enough to know that it `tells` `ng-packagr` `where` to find our `entry file` and where to `build` our library.

# Building the Library

Before we can use our newly generated library we need to build it:

`ng build example-ng6-lib`

This `builds` our `library` to the folder: 

`example-ng6-lib-app\dist\example-ng6-lib`

Beginning with `version 6.1`, Angular `always` does a `production build` of our `library`. If you are still using `version 6.0.x` you will want to use the `--prod` flag when building your library.

# Using the Library in Our Application

One of the central ideas of `building` a `library` is that we typically `have` an `application` we build along with our library in order `to test` it.

In our case we have our `example-ng6-lib-app` that will use our library.

Let’s try a simple test using our library in our example-ng6-lib-app. To do this we will `import` our `example-ng6-lib’s module`. Then we’ll display the default component that Angular CLI created for us in the library.

## Importing the example-ng6-lib Module

Let’s modify our AppModule in: `src\app\app.module.ts`

Add the `ExampleNg6LibModule` to the imports array. Your `IDE` might think it is `helping` `you` out by trying to import the file directly. `Don’t trust it`. You `want` to `import` the module in the application using the library by name like this:

```
import { ExampleNg6LibModule } from 'example-ng6-lib';
```

This `works` because when `importing` a `library` `by name`, Angular CLI `looks` first in the `tsconfig.json` `paths` and then in `node_modules`.

> ALWAYS: In your test application import using your library by name and NOT the individual files.

Your `app.module.ts` file should look like this:

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExampleNg6LibModule } from 'example-ng6-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ExampleNg6LibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Displaying the example-ng6-lib Component

`To keep things simple` let’s just add the `default` `generated component` `from our library` to our AppComponent template in: `src\app\app.component.html`

You can just replace the bottom half of the AppComponent template with:

```
<enl-example-ng6-lib></enl-example-ng6-lib>
```

Your src\app\app.component.html should look like this:

```
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
</div>
<h2>Example</h2>
<enl-example-ng6-lib></enl-example-ng6-lib>
```

# Running Our Application

As always we can run our application using:

`ng serve`

And now when we point our browser at:
http://localhost:4200/

we should see the test for our component from our library.

# Expanding Our Library

Now we know `how to build` our `library` and `run` our `application` `using a component from the library`. Let’s expand our library and see what we need to do to add another component.

Here are the steps we will go through:

`Generate` a `new component in our library.`
`Add` the component to our library `module’s exports.`
`Add` the component to our `entry file.`
`Rebuild` our `library` after we make changes to it.
`Use` the new `component` `in our application`

# Generating a library component

When generating a component for our library we use the `--project` flag to tell Angular CLI that we want it to generate the component in our library project. Let’s generate a simple component in our library and call it foo:

`ng generate component foo --project=example-ng6-lib`

True to form, Angular CLI tells us exactly what it did:

```
CREATE projects/example-ng6-lib/src/lib/foo/foo.component.html (22 bytes)
CREATE projects/example-ng6-lib/src/lib/foo/foo.component.spec.ts (607 bytes)
CREATE projects/example-ng6-lib/src/lib/foo/foo.component.ts (257 bytes)
CREATE projects/example-ng6-lib/src/lib/foo/foo.component.css (0 bytes)
UPDATE projects/example-ng6-lib/src/lib/example-ng6-lib.module.ts (347 bytes)
```

Now we have a new component in our library and Angular CLI also `added` it to the `declarations` array of our library’s `module` in the file:

`projects\example-ng6-lib\src\lib\example-ng6-lib.module.ts`

# Exporting the component from our library’s module

We need to add the Foo Component to the `exports` of our `library module`. If we don’t, we will get a template parse error telling us "enl-foo" is not a known element when we try to include the component in our application.

So in the `example-ng6-lib.module.ts` file add FooComponent to the exports array. Your ExampleNg6LibModule should now look like this:

```
import { NgModule } from '@angular/core';
import { ExampleNg6LibComponent } from './example-ng6-lib.component';
import { FooComponent } from './foo/foo.component';

@NgModule({
  imports: [
  ],
  declarations: [
    ExampleNg6LibComponent,
    FooComponent
  ],
  exports: [
    ExampleNg6LibComponent,
    FooComponent
  ]
})
export class ExampleNg6LibModule { }
```

# Adding the component to the entry file

As we noted before our library project has an entry file that defines its `public API`: 
`projects\example-ng6-lib\src\public_api.ts`

We need to add the following line to our `entry file` t`o tell` `ng-packagr` that this component class `should be exposed` to the users of our library:

`export * from './lib/foo/foo.component';`

You’re probably thinking this is a bit `redundant` because we `already` `added` our `component` to the `exports` in the `module`. OK, it is true that the `<enl-foo></enl-foo>` element is usable in our application’s template even without adding it to our entry file. 

> However, the FooComponent class itself won’t be exported.

I ran the following test so you don’t have to: I added a `reference` to my `FooComponent` class like `fooComponent: FooComponent;` in my `app.component.ts` `without adding` the `foo.component file` `to my entry file`. I then `re-built` the `library`. When I ran `ng serve`, it did the right thing and `failed fast` with a `Module has no exported member` '`FooComponent`' error.

So the rule is:

FOR COMPONENTS:
Using `export` makes the `element` `visible`.
Adding it to the `entry` file makes the `class` `visible`.
So after adding the line for the new component, your `public_api.ts` entry file should look like this:

```
/*
 * Public API Surface of example-ng6-lib
 */

export * from './lib/example-ng6-lib.service';
export * from './lib/example-ng6-lib.component';
export * from './lib/example-ng6-lib.module';
export * from './lib/foo/foo.component';
```

# Rebuilding our library

After making the changes, we need to rebuild our library with:

`ng build example-ng6-lib`

We are doing this `manually`. However, Angular CLI version 6.2 added an incremental build functionality. Every time a file changes Angular CLI performs a `partial build` that emits the amended files. To use the new `watch` functionality you can use:

`ng build example-ng6-lib --watch`

# Using our new library component

Finally, add the element `<enl-foo></enl-foo>` as the last line of your `app.component.html` file. It should look something like this:

```
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
</div>
<h2>Example</h2>
<enl-example-ng6-lib></enl-example-ng6-lib>
<enl-foo></enl-foo>
```

# Looking Ahead

In Part 2 of this series we discuss `building`, `packaging`, and actually using our generated `library` in another application.

**************************************************************

https://blog.angularindepth.com/angular-workspace-no-application-for-you-4b451afcc2ba


# Using --createApplication

The --createApplication flag is used with the ng new command. 

Setting this to `false` tells ng new `not` to `create` the initial Angular application in the Workspace. 

By `default` this flag is set to `true` to `match` the behavior of the `previous` versions of Angular CLI.

To create an Angular Workspace `with no initial application` we use:

`ng new foo --createApplication=false`

Doing this `creates` an Angular `Workspace` that seems rather `empty` compared to what we have been used to in the past. Although, it `does` have some `important things`:

`package.json`
Includes all the usual dependencies we need for Angular

`angular.json`
The Angular config file but `with no projects`

As for README.md, tsconfig.json, tslint.json, and node_modules, it’s basically the same as it ever was.

You will notice that there is `no src directory`. Later, a `projects directory` will be added `when` we `generate a library or application`.

Since we set the --createApplication flag to false, there is no initial application. And hence, if we try to do something like ng build or ng serve, we get an error:

Could not determine a single project for the ‘build’ target.

# When would I use this?

OK, that’s a valid question. After all, the initial application created by Angular CLI is a great starting point. I mean hey! It even has Unit Tests!

One great reason to set `--createApplication=false` is so we can use `ng generate` to `create` an `Angular Library`.

For example, typically when creating an Angular Library you want the following:

An Angular Library `in your projects directory`
An Angular `Workspace` with the `same name` `as your Angular Library`
A `test application` that `provides` `example uses` of our Angular Library

As I mentioned at the beginning of this article: previously creating a Workspace with the name of our library resulted in the initial application being created with the same name. This prevented us from using that name for our Angular Library, which was the main reason we created the Workspace in the first place.














