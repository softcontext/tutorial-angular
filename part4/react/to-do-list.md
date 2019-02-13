# Todo App by React

앵귤러로 작성해 본 Todo 앱을 리액트 기술로 작성해 보겠습니다. 이를 통해 기술의 차이를 이해하고 앵귤러를 보다 깊게 이해할 수 있는 기회가 될 것입니다. 더불어서, 기술의 장담점을 판단하는 계기로 삼고자 합니다.

## 소스코드

```
work\part4\todo-react
```

## 아톰 에디터에 리액트 관련 패키지를 설치

```
apm install react atom-react-autocomplete
```

## 리액트 프로젝트 제너레이터 설치

```
npm i -g create-react-app
```

## 새 프로젝트 만들기

```
create-react-app todo-react
cd todo-react
yarn start
```

## SASS 모듈 추가하기

이전에는 설정을 eject 해서 커스터마이징을 해야 했지만 최근에는 간단히 SASS 컴파일러 모듈만 추가하면 바로 .scss 확장자로 SASS 기술을 사용할 수 있게 되어 편리해졌습니다.

```
yarn add node-sass
```

## 컴포넌트 구성

* src\components\todo\TodoComponent.js
* src\components\todo\todo-header\TodoHeader.js
* src\components\todo\todo-input\TodoInput.js
* src\components\todo\todo-list\TodoList.js
* src\components\todo\model\todo.js

## 정리

리액트 기술은 데이터 처리흐름이 단방향이라서 코드 가독성이 좋습니다. 다만, 양방향 바인딩, 폼 모듈 등을 지원하는 앵귤러에 비해서 개발자가 엘리먼트를 모두 통제해야하므로 상대적으로 복잡한 UI를 구성할 때 더 많은 노력이 필요합니다.

Angular CLI라는 걸출한 기술을 리액트는 지원하지 않으므로 Copy & Paste 해야하는 일이 많다는 점은 아쉽습니다. 써드 파티에서 만든 CLI를 살펴보았으나 쓸만한 기술을 발견하지 못했습니다.

반복적인 작업은 Node CLI 프로그래밍으로 직접 만들어서 사용하면 좋을 듯 합니다.
