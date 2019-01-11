# Workspace

다음 사이트를 참조했습니다.  
* https://github.com/angular/angular-cli/wiki/angular-workspace
* https://nitayneeman.com/posts/understanding-the-angular-cli-workspace-file/
* https://medium.com/@angularlicious/angular-6-workspace-test-drive-cfe24bbceeb3
* https://blog.angularindepth.com/angular-workspace-no-application-for-you-4b451afcc2ba

앵귤러 애플리케이션은 기본적으로 SPA입니다. 규모가 큰 프로젝트를 개발할 때 어떻게 구성하는 것이 좋을까요? 큰 하나의 덩어리로 구성하면 초기에 만들기는 쉽지만 관리하기 어렵게 되고 처리속도도 느리게 됩니다. 구성방안을 고민해 볼 필요가 있다 하겠습니다.

## 프로젝트의 구성

### 1. 한 개의 SPA 애플리케이션 프로젝트로 개발

애플리케이션 프로젝트를 한 개만 사용합니다. 프로젝트 내부에서 여러 개의 모듈로 구성합니다. 루트 모듈이 초기에 모든 모듈을 인스턴스하면 느리게 되므로 모듈의 인스턴스는 Lazy Loading 방식을 채택하여 실제로 사용하게 될 때 처리합니다. 공통로직은 Share 모듈을 두는 것으로 중복을 제거하면서 사용할 수 있습니다.

### 2. 여러 개의 SPA 애플리케이션 프로젝트로 나누어서 개발

여러개의 SPA 프로젝트로 나누어서 개발하게 되면 각 프로젝트 마다 index.html이 존재합니다. 경계의 구분을 명확히 나눌 수 있을 때 적용할 만한 방법입니다. 하나의 프로젝트에서 다른 프로젝트로 전환될 때 href 속성을 통해 URL이 변경되고 해당 프로젝트의 index.html을 다운로드 받는 것으로부터 화면의 전화작업이 시작됩니다.

이 방식을 채택하면 애플리케이션 프로젝트 다수가 생기게 됩니다. 만약 프로젝트마다 사용되는 공통 로직이 존재한다면 중복이 발생하게 됩니다. 공통 로직의 변경 시 이를 다루기가 어렵게 됩니다. 이렇게 존재하는 공통 로직은 독립적으로 서비스되는 것이 아니라 라이브러리로써 다른 프로젝트가 사용하는 자원입니다. 

이런 생각을 통해 우리는 다수의 애플리케이션 프로젝트에게 제공할 공통 로직을 별도로 분리하여 라이브러리화 하고 이를 제공할 수 있는 방법이 필요하다는 것을 알 수 있습니다. 이러한 필요성에 의해서 앵귤러는 워크스페이스라는 개념을 앵귤러 6 버전에서 도입했습니다.

## 앵귤러 프로젝트 설정파일의 변화

라이브러리는 앵귤러 CLI 도구를 사용하면 쉽게 생성하고 관리할 수 있습니다. 앵귤러 버전과의 일치를 위하여 앵귤러 CLI는 1.7 버전에서 6 버전으로 높여서 사용합니다. 더불어서, 프로젝트 스캐폴딩 작업의 변화를 명확하게 구분하기 위해서 앵귤러 5 버전까지 사용하던 angular-cli.json 환경설정 파일명을 angular.json으로 변경하였습니다.

따라서, angular-cli.json 파일을 사용하는 프로젝트는 그대로 프로젝트로 취급하면 되고 angular.json 파일을 사용하는 최신 프로젝트는 워크스페이스로 구분하여 취급하면 됩니다. 워크스페이스는 하나의 단일 환경설정을 공유하는 다수의 애플리케이션 프로젝트와 다수의 라이브러리를 가질 수 있습니다.

`ng new 프로젝트명`

프로젝트 스캐폴딩을 수행하는 명령은 바뀌지 않았습니다. 소스를 배치하는 `src/app` 폴더도 변경되지 않았습니다. 이는 기존과 동일합니다. 바뀐 부분은 앵귤러 프로젝트 환경설정 파일입니다. angular.json 파일의 구성방식도 변경되었습니다. 

`ng new 프로젝트명 --createApplication=false`

앵귤러 CLI 7 버전부터 지원하는 `--createApplication` 옵션을 사용하면 새로 만들어지는 프로젝트는 기본 애플리케이션 프로젝트와 관련한 폴더 및 파일이 존재하지 않게 됩니다. 즉, `src/app` 폴더가 존재하지 않게 됩니다.

### 환경설정 파일 angular.json 파일의 구성

```bash
$ ng new my-transclusion
```

위 명령으로 만들어진 프로젝트의 설정파일 내용입니다.

**angular.json**

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "my-transclusion": {
      ...
    },
    "my-transclusion-e2e": {
      ...
    }
  },
  "defaultProject": "my-transclusion"
}
```

`defaultProject` 속성의 값으로 `projects` 밑에 선언 된 `my-transclusion`이 지정되어 있습니다. `ng serve` 명령을 수행할 때 타겟 프로젝트를 지정하지 않으면 `defaultProject`가 사용됩니다. 이는 필요에 따라서 변경하여 사용할 수 있습니다.

**\$schema (string)**  
`$schema` 속성은 사용되는 schema.json을 값으로 갖고 있습니다. 스키마는 환경설정 파일의 구성을 평가하고 제안하기위해서 사용됩니다.

**version (integer)**  
File format version. This is currently "1".

**newProjectRoot (string)**  
Path where new projects will be created.  
추가적으로 만들어지는 애플리케이션 프로젝트, 라이브러리 프로젝트를 배치할 폴더명입니다.

**defaultProject (string)**  
Default project name used in commands.  
`ng serve` 명령처럼 타겟 프로젝트를 생략하면 여기에 설정된 프로젝트가 사용됩니다.

**projects**  
Configuration options for each project in the workspace.

* `root` (string): Root of the project files.  
단일 SPA 프로젝트인 경우 빈 문자열로 설정됩니다.

* `sourceRoot` (string): The root of the source files, assets and index.html file structure.

* `projectType` (string): the type of this project, application or library.  
현재 프로젝트 타입은 `application`, `library` 2개 뿐 입니다.

* `prefix` (string): The prefix to apply to generated selectors.

* `schematics` (object): Project configuration options for Schematics. Has the same format as top level Schematics configuration).  
스키마틱의 상세 설명은 아랫부분을 참고하세요.

* `architect` (string): Project configuration for Architect targets.

  - `targetName` (string): Name of this target.  
  타겟은 Ant, Maven에서 얘기하는 Task에 해당합니다.
  
    * `builder` (string): Builder for this target, in the format `package-name`:`builder-name`.
    
    * `options` (string): Options for this builder. JSON Schema for default schematics:
    
      - `@angular-devkit/build-angular:app-shell`
      - `@angular-devkit/build-angular:browser`
      - `@angular-devkit/build-angular:dev-server`
      - `@angular-devkit/build-angular:extract-i18n`
      - `@angular-devkit/build-angular:karma`
      - `@angular-devkit/build-angular:protractor`
      - `@angular-devkit/build-angular:server`
      - `@angular-devkit/build-angular:tslint`
      
    * `configurations` (object): A map of alternative target options.
    
      - `configurationName` (object): Partial options override for this builder.

상세 설정 정보는 node_modules/@angular/cli/lib/config/schema.json 파일에서 찾을 수 있습니다. `app-shell` 대신 `appShell`로 검색하십시오.

```json
{
  "projects": {
    "small-project": {
      "architect": {
        "build": {
          ...
        },
        "serve": {
          ...
        },
        "extract-i18n": {
          ...
        },
        "test": {
          ...
        },
        "lint": {
          ...
        }
      }
    }
  },
}
```

`architect` 항목에 아키텍트 타겟을 설정합니다. 프로젝트 별로 Linting, Testing, Serving, Building 작업과 관련한 설정을 하는 부분입니다. 

**schematics (object)**  
Workspace configuration options for Schematics.  
스키마틱은 개발 중 구성요소를 다루는 방법을 사전에 간략하게 정의한 도식입니다. schematics 속성으로 구성요소의 처리 방식과 관련한 정보를 설정합니다. 구성요소별로 앵귤러가 미리 정의해 놓았습니다.

* `schematic-package:schematic-name` (object): Object containing options for this schematic. JSON Schema for default schematics:

  - `@schematics/angular:component`
  - `@schematics/angular:directive`
  - `@schematics/angular:module`
  - `@schematics/angular:service`
  - `@schematics/angular:pipe`
  - `@schematics/angular:class`

스키마틱은 프로젝트별로 설정합니다. 

상세 설정 정보는 node_modules/@angular/cli/lib/config/schema.json 파일에서 찾을 수 있습니다. 

또는 다음 사이트에서 대상폴더를 클릭하고 들어가면 존재하는 schema.json 파일을 참고하셔도 됩니다.  
https://github.com/angular/angular-cli/tree/master/packages/schematics/angular

```json
{
  "projects": {
    "my-component-comm": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "schematics": {
        "@schematics/angular:component": {
          "styleext": "scss"
        }
      },
    },
  },
}
```

`@schematics/angular:component` 항목 객체의 `"styleext": "scss"` 설정으로 새로 만들어지는 컴포넌트는 CSS가 아닌 SASS를 사용하도록 처리됩니다.

```json
{
  "projects": {
    "small-project": {
      "schematics": {
        "@schematics/angular:component": {
          "inlineTemplate": true,
          "inlineStyle": true,
          "styleext": "scss",
          "spec": false
        },
        "@schematics/angular:class": {
          "spec": false
        },
        "@schematics/angular:directive": {
          "spec": false
        },
        "@schematics/angular:guard": {
          "spec": false
        },
        "@schematics/angular:module": {
          "spec": false
        },
        "@schematics/angular:pipe": {
          "spec": false
        },
        "@schematics/angular:service": {
          "spec": false
        }
      },
    }
  },
}
```

`"spec": false` 설정으로 테스트 파일은 생성되지 않습니다.  
`"inlineTemplate": true` 설정으로 컴포넌트의 템플릿은 인라인 방식으로 처리됩니다.  
`"inlineStyle": true` 설정으로 컴포넌트의 스타일은 인라인 방식으로 처리됩니다.  

**cli**  
Workspace configuration options for Angular CLI.  
워크스페이스에서 CLI와 관련한 설정을 추가하는 항목입니다.

* `defaultCollection` (string): The default schematics collection to use.  
사용하는 스키마틱의 집합을 정의합니다. 예를 들어 엔터프라이즈 급 프로젝트의 스키마틱 콜렉션으로써 `@nrwl/schematics`이 있습니다.  
https://blog.nrwl.io/introduction-to-nrwl-bazel-schematics-c391911a5e9f

* `packageManager` (string): Specify which package manager tool to use.  
사용하는 패키지 매너저를 정의합니다. 예를 들어 npm 대신 yarn을 사용할 수 있습니다.

* `warnings` (object): Warning configuration.  
앵귤러 CLI를 사용할 때 발생하는 경고와 관련한 설정 항목입니다.

  - `versionMismatch` (boolean): Show a warning when the global version is newer than the local one.

  - `typescriptMismatch` (boolean): The name of the project.

## 정리

* 앵귤러 CLI v6-RC2 이후로 angular-cli.json 파일 대신 angular.json 설정파일을 사용합니다.
* 앵귤러 워크스페이스는 기존처럼 `ng new` 명령으로 생성합니다.
* 워크스페이스는 단일 환경설정을 사용하는 다수의 라이브러리들과 다수의 애플리케이션 프로젝트들로 구성됩니다.
* 앵귤러 CLI는 JSON Schema를 사용하여 angular.json 파일의 구성을 평가하고 조언합니다.
* 앵귤러 팀은 개발자의 편의를 위해서 Schematics 항목으로 개발 중 CLI와 관련한 처리 흐름을 제어할 수 있도록 제공합니다. 원한다면 써드파티 Schematics 패키지를 사용할 수도 있습니다.
* 개발자는 `ng run` 명령으로 수행하고자 하는 명령을 추가로 등록할 수 있습니다. 이렇게 처리되는 대상을 Architect Target이라고 부릅니다. Architect Target은 원하는대로 변경해서 설정할 수 있습니다.
