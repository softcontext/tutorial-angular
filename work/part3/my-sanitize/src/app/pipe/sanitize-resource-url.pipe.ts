import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Pipe({
  name: 'sanitizeResourceUrl'
})
export class SanitizeResourceUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(resourceUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(resourceUrl);
  }

}
