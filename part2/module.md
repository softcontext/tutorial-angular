# Module Example

```bash
$ ng new my-module
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS   [ http://sass-lang.com   ]
```

## 새 모듈 생성

기본적으로 컴포넌트와 모듈은 해당 이름의 폴더가 생성되고 폴더 밑으로 필요한 파일이 생성됩니다.

```bash
$ ng g m core --module=app
CREATE src/app/core/core.module.ts (188 bytes)
```

새 모듈을 만들 때 `--module=app` 옵션을 사용하면 루트 모듈에서 core 모듈을 임포트하는 설정이 추가됩니다.

```bash
$ ng g m member --module=app --routing=true
CREATE src/app/member/member.module.ts (190 bytes)
```

`--routing=true` 옵션을 사용하면 라우팅 설정을 위한 `member-routing.module.ts` 파일이 추가적으로 생생성됩니다.

```bash
$ ng g m share --module=member
CREATE src/app/share/share.module.ts (189 bytes)
```

share 모듈을 member 모듈이 임포트하여 사용할 예정입니다. member 모듈을 app 모듈이 임포트 하고 있으므로 루트 모듈인 app 모듈에서 share 모듈이 제공하는 자원을 사용할 수 있게 됩니다.

```bash
$ ng g m player
CREATE src/app/player/player.module.ts (190 bytes)
```

player 모듈은 루트 모듈에서 정적으로 임포트하지 않고 라우팅 설정으로 사용자가 해당 모듈의 컴포넌트를 요구할 때 모듈을 인스턴스하는 방식으로 사용할 것입니다. 이를 Lazy Loading Module 이라고 부릅니다.

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
