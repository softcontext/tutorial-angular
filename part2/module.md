# Module

앵귤러 앱은 모듈로 구성되며 앵귤러는 NgModules 이라는 자체 모듈 시스템을 사용합니다. 모든 앵귤러 앱에는 적어도 하나의 NgModule 클래스가 있습니다. 루트 모듈은 작은 응용 프로그램에서 유일한 모듈 일 수 있지만 대부분의 응용 프로그램은 많은 기능 모듈을 사용합니다. NgModule 클래스는 `@NgModule` 데코레이터가있는 클래스입니다. `@NgModule`은 모듈을 설정하는 정보를 가진 메타 데이터 객체를 취하는 데코레이터 함수입니다. 가장 중요한 속성은 다음과 같습니다.

* `declarations`  
이 모듈에 속한 뷰 클래스를 정의합니다. 앵귤러에는 세 가지 뷰 클래스가 있습니다. Component, Directive 및 Pipe가 그것 입니다.

* `exports`  
다른 모듈의 구성 요소 템플릿에서 볼 수 있고 사용할 수 있어야 하는 뷰 클래스를 정의합니다. 

* `imports`  
다른 모듈이 제공하는 자원을 사용하기 위해서 해당 모듈을 정의합니다.

* `providers`  
서비스 생성자 함수를 정의합니다. 앱의 모든 부분에서 액세스 할 수 있게 됩니다.

* `bootstrap`  
루트 컴포넌트라고 부르는 다른 모든 뷰를 호스팅하는 기본 뷰 컴포넌트를 정의합니다. 루트 모듈만이 부트 스트랩 속성을 설정해야 합니다.

루트 모듈은 최초로 기동하는 모듈이므로 아무 것도 exports 할 필요가 없습니다.

## 앵귤러가 제공하는 모듈

* `@angular/animations` : 애니메이션 모듈
* `@angular/common` : 빌트인 파이프, 속성 디렉티브, 구조 디렉티브(ngIf, ngFor, ngSwitch)
* `@angualr/core` : 핵심 모듈
* `@angular/forms` : 폼처리, 데이터 검증 모듈
* `@angular/http` : HTTP 통신 모듈
* `@angular/platform-browser` : 브라우저 모듈, 새니타이저 제공
* `@angular/router` : 라우팅 처리 모듈

## 루트 모듈: AppModule

앵귤러는 루트모듈이라는 최상위 모듈을 통해 앱을 구성합니다. 앱 영역에서 사용하는 컴포넌트, 지시자, 파이프, 서비스 등과 사용하는 모듈을 등록하고 관리합니다. 관심사에 따라 모듈을 분리하여 사용하는 것이 좋습니다.

* `핵심 모듈: Core Module`  
항상 사용하는 기능을 정의하는 모듈입니다.

* `특징 모듈: Feature Module`  
특정 기능을 처리하는 모듈입니다. 일반적으로 관심사에 따라 모듈을 따로 구성합니다. 주로 핵심 모듈에서 임포트해서 사용합니다.

* `공유 모듈: Share Module`  
여러 모듈에서 반복적으로 사용되는 기능을 모은 모듈입니다. 주로 특징 모듈에서 임포트해서 사용합니다. 공유 모듈은 일종의 유틸리티 라이브러리 같은 모듈입니다.


## 모듈 연습을 위한 프로젝트 생성

```bash
$ ng new my-module
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS   [ http://sass-lang.com   ]
```

프로젝트가 만들어질 때 루트 모듈은 자동으로 생성됩니다.

## 새 모듈 생성

기본적으로 컴포넌트와 모듈은 해당 이름의 폴더가 생성되고 폴더 밑으로 필요한 파일이 생성됩니다. 

```bash
$ ng g m core --module=app
CREATE src/app/core/core.module.ts (188 bytes)
```

핵심 모듈을 생성했습니다. 새 모듈을 만들 때 `--module=app` 옵션을 사용하면 루트 모듈에서 core 모듈을 임포트하는 설정이 추가됩니다.

```bash
$ ng g m member --module=app --routing=true
CREATE src/app/member/member.module.ts (190 bytes)
```

특징 모듈을 생성했습니다. `--routing=true` 옵션을 사용하면 라우팅 설정을 위한 `member-routing.module.ts` 파일이 추가적으로 생생성됩니다. 

```bash
$ ng g m share --module=member
CREATE src/app/share/share.module.ts (189 bytes)
```

공유 모듈을 생성했습니다. share 모듈을 member 모듈이 임포트하여 사용할 예정입니다. member 모듈을 app 모듈이 임포트 하고 있으므로 루트 모듈인 app 모듈에서 share 모듈이 제공하는 자원을 사용할 수 있게 됩니다.

```bash
$ ng g m player
CREATE src/app/player/player.module.ts (190 bytes)
```

특징 모듈을 하나 더 생성했습니다. player 모듈은 루트 모듈에서 정적으로 임포트하지 않고 라우팅 설정으로 사용자가 해당 모듈의 컴포넌트를 요구할 때 모듈을 인스턴스하는 방식으로 사용할 것입니다. 이를 Lazy Loading Module 이라고 부릅니다.

## 컴포넌트를 생성하면서 특정 모듈에 등록하기

```bash
$ ng g c home
CREATE src/app/home/home.component.html (23 bytes)
CREATE src/app/home/home.component.spec.ts (614 bytes)
CREATE src/app/home/home.component.ts (262 bytes)
CREATE src/app/home/home.component.scss (0 bytes)
UPDATE src/app/app.module.ts (467 bytes)
```

컴포넌트를 만들 때 모듈을 지정하지 않으면 루트 모듈에 컴포넌트가 등록됩니다.

```bash
$ ng g c core/title --export=true
CREATE src/app/core/title/title.component.html (24 bytes)
CREATE src/app/core/title/title.component.spec.ts (621 bytes)
CREATE src/app/core/title/title.component.ts (266 bytes)
CREATE src/app/core/title/title.component.scss (0 bytes)
UPDATE src/app/core/core.module.ts (260 bytes)
```

컴포넌트를 만들 때 core 폴더를 지정하고 core 폴더 밑에 `core.module.ts` 모듈 파일이 있으므로 CoreModule 모듈에 컴포넌트가 등록됩니다. `--export=true` 옵션을 사용하면 title 컴포넌트를 익스포트하는 설정이 core 모듈에 추가됩니다. 익스포트된 컴포넌트는 core 모듈을 임포트한 모듈의 컴포넌트에서 셀렉터를 사용할 수 있게 됩니다.

```bash
$ ng g c member --module=member
CREATE src/app/member/member.component.html (25 bytes)
CREATE src/app/member/member.component.spec.ts (628 bytes)
CREATE src/app/member/member.component.ts (270 bytes)
CREATE src/app/member/member.component.scss (0 bytes)
UPDATE src/app/member/member.module.ts (259 bytes)
```

컴포넌트를 만들 때 옵션으로 `member`를 지정했으므로 MemberModule 모듈에 컴포넌트가 등록됩니다. 이미 member 폴더가 존재하므로 컴포넌트를 위한 폴더는 추가적으로 생성되지 않습니다.

```bash
$ ng g c player --module=player
CREATE src/app/player/player.component.html (25 bytes)
CREATE src/app/player/player.component.spec.ts (628 bytes)
CREATE src/app/player/player.component.ts (270 bytes)
CREATE src/app/player/player.component.scss (0 bytes)
UPDATE src/app/player/player.module.ts (259 bytes)
```

컴포넌트를 만들 때 옵션으로 `player`를 지정했으므로 PlayerModule 모듈에 컴포넌트가 등록됩니다. 이미 player 폴더가 존재하므로 컴포넌트를 위한 폴더는 추가적으로 생성되지 않습니다.

## 서비스를 특정 모듈에 등록하기

```bash
$ ng g s share/data-share
CREATE src/app/share/data-share.service.spec.ts (349 bytes)
CREATE src/app/share/data-share.service.ts (138 bytes)
```

이미 share 폴더가 존재하므로 폴더는 추가적으로 생성되지 않습니다. 서비스를 만들 때 share 폴더를 지정하더라도 등록은 루트 모듈에 등록되도록 설정됩니다. 다음 설정이 기본적으로 적용되기 때문입니다.

`@Injectable({ providedIn: 'root' })`

서비스를 share 모듈에 등록하려면 위 설정 객체를 생략하고 share 모듈에 다음 설정을 추가하시면 됩니다.

**share.module.ts**

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataShareService } from './data-share.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [DataShareService]
})
export class ShareModule { }
```

컴포넌트와 달리 서비스는 명시적으로 익스포트 하지 않아도 다른 모듈에게 제공됩니다. 임포트 된 다수의 모듈이 갖고 있는 서비스는 모두 루트 모듈의 컨테이너에 싱글톤으로 관리됩니다.

```bash
$ ng g s core/user
```