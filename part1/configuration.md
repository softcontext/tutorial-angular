# 개발환경 설정

## Node 설치
Node는 Chrome의 V8 자바 스크립트 엔진에 기반한 자바 스크립트 런타임입니다. 노드는 자바스크립트의 단독 실행환경을 제공합니다. 필수적인 라이브러리(fs, http 모듈 등)를 제공하며 NPM 도구가 같이 설치됩니다. NPM 도구로 추가적으로 필요한 써드파티 라이브러리를 쉽게 설치할 수 있습니다.

1. 브라우저에서 `node download` 키워드로 검색합니다. 
2. 사이트에서 OS에 맞는 노드를 다운받고 설치합니다.
3. 콘솔에서 다음 명령으로 정상 설치여부를 확인합니다.

```console
$ node -v
v10.14.1
```

## IDE Tool 설치
IDE 도구로써 Atom 에디터를 사용합니다. Atom은 현대적이고 사용자 친화적이며 개발대상에 맞추어 사용할 수있는 텍스트 편집기입니다. 커스터마이징을 통해 생산적으로 사용할 수 있습니다. Atom은 HTML, JavaScript, CSS 및 Node.js 통합으로 구축 된 데스크탑 응용 프로그램입니다.

1. 브라우저에서 `atom download` 키워드로 검색합니다. 
2. 사이트에서 OS에 맞게 제안합니다. 다운받고 설치합니다.
3. 설치는 자동으로 이루어지고 설치가 완료되면 아톰 에디터가 기동합니다.
4. 노드를 인식시키기 위해서 아톰 에디터의 재 시작이 필요합니다.

다음 사이트에서 기본적인 사용법을 확인하세요.  
`https://flight-manual.atom.io/getting-started/sections/atom-basics/`

## 패키지 설치

패키지 설치를 위해서 아톰에서 `File > Settings > Install` 순으로 접근합니다. 검색박스에 패키지명의 전체 이름 또는 일부 이름을 넣고 `Packages` 버튼을 클릭합니다. 원하는 패키지 리스트에서 `Install` 버튼을 클릭하면 다운로드 및 설치가 진행됩니다. 

테마를 검색하고자 할 때는 `Packages` 버튼 대신 `Themes` 버튼을 클릭하세요. `https://atom.io/themes` 사이트를 참고해서 마음에 드는 테마를 추가하세요.

패키지 소개정보를 살펴보고 쓸만한 패키지들을 설치하세요.  
`https://atom.io/packages`

### 필수 패키지

#### atom-runner
Runs scripts inside of Atom.

#### file-icons
Assign file extension icons and colours for improved visual grepping.

#### highlight-selected
Highlights the current word selected when double clicking.

#### atom-beautify
Beautify HTML, CSS, JavaScript, PHP, Python, Ruby, Java, C, C++, C#, Objective-C, CoffeeScript, TypeScript, Coldfusion, SQL, and more in Atom.

#### autoclose-html
Automates closing of HTML Tags.

#### open-in-browsers
Open in IE/Chrome/Firefox/Opera.

#### docblockr
A helper package for writing documentation.

#### emmet
It provides abbreviations for HTML auto-completion and intellisense inspired in CSS selectors, which makes the coding of HTML code much faster and comfortable.

#### atom-typescript
The only TypeScript plugin you will ever need.

#### linter
You can visualize errors and other types of messages with ease.

#### linter-eslint
Lint JavaScript on the fly, using ESLint.

#### autocomplete-modules
Autocomplete for require/import statements.

#### autocomplete-paths
Adds path autocompletion to autocomplete+.

### 추천 패키지

#### pigments
A package to display colors in project and files.

#### editorconfig
Helps developers maintain consistent coding styles between different editors.

#### minimap
A preview of the full source code.

#### git-plus
Do git things without the terminal.

또는 이미 설치되어 있는 github 패키지를 이용한다.  
`https://flight-manual.atom.io/using-atom/sections/github-package/`

#### hyperclick
Pluggable text-clicking UI for Atom.

#### js-hyperclick
A hyperclick provider that lets you jump to where variables are defined.

#### markdown-pdf
Convert markdown to pdf, png or jpeg on the fly.

#### markdown-preview-enhanced
One of the 'BEST' markdown preview extensions for Atom editor!

#### markdown-table-editor
Markdown table editor/formatter.

#### pdf-view
Atom PDF viewer based on PDF.js.

#### todo-show
Finds all the TODOs, FIXMEs, CHANGEDs, etc. in your project.

#### javascript-snippets
JavaScript & NodeJS Snippets for Atom
