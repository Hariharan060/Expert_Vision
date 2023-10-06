import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value:any[], filterString:string,postName:string):any[]{
    const result:any=[];
    if(!value||filterString===''||postName===''){
      return value;
    }
    value.forEach((a:any)=>{
      if(a[postName].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(a);
      }
    });
    return result;
  }

}
