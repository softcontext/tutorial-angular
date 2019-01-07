import { Pipe, PipeTransform } from '@angular/core';
import { Company } from '../model/company';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(companies: Company[], path: string[], order: number): Company[] {
    // 로직처리를 위한 제어 값이 하나라도 없다면 처리할 수 없으므로 받은 것 그대로 반환한다.
    if (!companies || !path || !order) {
      return companies;
    }

    // 배열의 sort 함수에게 건네주는 콜백함수는
    // 오름차순이라면 1을 리턴하고
    // 내림차순이라면 -1을 리턴하고
    // 두 값이 같다면 0을 리턴해야 한다.
    return companies.sort((a: Company, b: Company) => {
      // 정렬기준이 되는 객체의 프로퍼티명(들)을 보관하는 배열(path)의 값을
      // 사용하여 객체안으로 진입해 들어간다. 멋진 처리방법이다.
      path.forEach(property => {
        a = a[property];
        b = b[property];
      })

      // 두 값이 같은 경우, 순서를 바꿀 필요가 없다.
      if (a === b) {
        return 0;
      }
      // 앞 값이 큰 경우,
      //    order가 1이라면 오름차순을 의미하고 순서를 바꿔야 하므로 1을 리턴한다.
      //    order가 -1이라면 내림차순을 의미하고 그대로 유지해야 하므로 -1을 리턴한다.
      // 앞 값이 작은 경우,
      //    order가 1이라면 오름차순을 의미하고 그대로 유지해야 하므로 -1을 리턴한다.
      //    order가 -1이라면 내림차순을 의미하고 순서를 바꿔야 하므로 1을 리턴한다.
      return a > b ? order : order * (- 1);
    })
  }

}
