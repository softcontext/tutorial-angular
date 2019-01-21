# TypeScript Essence

TypeScript는 Microsoft에서 개발하여 2012년에 발표한 오픈 소스 프로그래밍 언어입니다. 대규모 JavaScript Application 개발을 목표로 만들어졌습니다. Angular가 기본 언어로 채택하여 인지도가 많이 상승했습니다.

## 특징

* TypeScript는 JavaScript의 Superset입니다. TypeScript는 JavaScript의 모든 기능을 포함하고 그 외 추가적인 기능들을 가지고 있습니다.

* TypeScript는 컴파일 언어이지만 컴파일 결과가 Machine Code가 아닌 JavaScript 코드입니다. 이런 프로그래밍을 `메타프로그래밍` 이라고 합니다.

* TypeScript는 컴파일 시점에 Type Checking을 수행하는 정적 타입 언어입니다.

## 개발환경

### Step 1

적당한 위치에 type-script라는 이름으로 폴더를 하나 생성합니다. 그리고 타입스크립트 환경설정 파일을 다음과 같이 작성합니다.

**tsconfig.json**

```JSON
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "sourceMap": false,
    "suppressImplicitAnyIndexErrors": true
  },
  "compileOnSave": true,
  "buildOnSave": false,
  "exclude": [
    "node_modules"
  ],
  "filesGlob": [
    "app/**/*.ts",
    "typings/index.d.ts"
  ],
  "atom": {
    "rewriteTsconfig": false
  }
}
```

`npm install -g typescript` 명령으로 타입스크립트 CLI 도구를 설치하고 `tsc --init` 명령으로 `tsconfig.json` 파일을 생성할 수 있습니다. 참고로 어떠한 항목을 설정할 수 있는지는 다음 소스를 참고하시기 바랍니다.

```JSON
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5",                          
    /* Specify ECMAScript target version: 'ES3' (default), 
    'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'. */
    "module": "commonjs",                     
    /* Specify module code generation: 'none', 'commonjs', 
    'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    // "lib": [],                             
    /* Specify library files to be included in the compilation:  */
    // "allowJs": true,                       
    /* Allow javascript files to be compiled. */
    // "checkJs": true,                       
    /* Report errors in .js files. */
    // "jsx": "preserve",                     
    /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   
    /* Generates corresponding '.d.ts' file. */
    // "sourceMap": true,                     
    /* Generates corresponding '.map' file. */
    // "outFile": "./",                       
    /* Concatenate and emit output to single file. */
    // "outDir": "./",                        
    /* Redirect output structure to the directory. */
    // "rootDir": "./",                       
    /* Specify the root directory of input files. 
    Use to control the output directory structure with --outDir. */
    // "removeComments": true,                
    /* Do not emit comments to output. */
    // "noEmit": true,                        
    /* Do not emit outputs. */
    // "importHelpers": true,                 
    /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            
    /* Provide full support for iterables in 'for-of', spread, 
    and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               
    /* Transpile each file as a separate module (similar to 
      'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true                            
    /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                 
    /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              
    /* Enable strict null checks. */
    // "strictFunctionTypes": true,           
    /* Enable strict checking of function types. */
    // "noImplicitThis": true,                
    /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  
    /* Parse in strict mode and emit "use strict" 
    for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                
    /* Report errors on unused locals. */
    // "noUnusedParameters": true,            
    /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             
    /* Report error when not all code paths 
    in function return a value. */
    // "noFallthroughCasesInSwitch": true,    
    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    // "moduleResolution": "node",            
    /* Specify module resolution strategy: 'node' (Node.js) 
    or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       
    /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           
    /* A series of entries which re-map imports 
      to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        
    /* List of root folders whose combined content represents 
    the structure of the project at runtime. */
    // "typeRoots": [],                       
    /* List of folders to include type definitions from. */
    // "types": [],                           
    /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  
    /* Allow default imports from modules with no default export. 
    This does not affect code emit, just typechecking. */
    // "preserveSymlinks": true,              
    /* Do not resolve the real path of symlinks. */

    /* Source Map Options */
    // "sourceRoot": "./",                    
    /* Specify the location where debugger should locate 
    TypeScript files instead of source locations. */
    // "mapRoot": "./",                       
    /* Specify the location where debugger should locate 
    map files instead of generated locations. */
    // "inlineSourceMap": true,               
    /* Emit a single file with source maps instead of 
    having a separate file. */
    // "inlineSources": true,                 
    /* Emit the source alongside the sourcemaps within a single file; 
    requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        
    /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         
    /* Enables experimental support for emitting type metadata 
    for decorators. */
  }
}
```

### Step 2

Atom 에디터에 `atom-typescript` 패키지를 설치합니다.

`"app/**/*.ts"` 설정에 따라서 타입스크립트 파일은 app 폴더 밑에 배치해야 하고 확장자는 `.ts`로 끝나도록 작성해야 합니다. `"compileOnSave": true` 옵션으로 타입스크립트 파일을 저장할 때 자동으로 트랜스파일링 작업이 처리됩니다.

### Step 3

**sample.ts**

```TypeScript
console.log('Hello World!');
// Transpiling : ctrl+s or F6
```

코드를 작성하고 저장하면 다음 파일이 생성됩니다.

**sample.js**

```
console.log('Hello World!');
// Transpiling : ctrl+s or F6
```

이제부터 개발 및 수정 작업은 `~.ts` 파일로 하고 실행은 `~.js` 파일로 수행하면 됩니다. 마치 자바에서 `~.java` 파일로 개발 및 수정을 하고 `~.class` 파일은 건드리지 않는 것과 비슷합니다.

### Step 4

코딩 스타일 가이드에 맞추어 개발하고 이를 감시해 주는 역할을 수행하는 `linter-eslint` 패키지를 설치합니다. 필수는 아니지만 발생할 수 있는 오류를 미리 감지하고 `Coding Convention`을 따르기 위해서 사용하는 것이 일반적입니다.

다음 장에서 배우실 Angular CLI 도구를 사용하면 번거로운 환경설정 작업을 하지 않고도 바로 개발을 시작할 수 있습니다. 기대하세요!
