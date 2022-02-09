import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  records: Array<any> = [];
  isDesc: boolean = false;
  column: string = '"product"';

  constructor() { }
  aref = () => {
   return 'TXN' + Math.random().toString(36).substring(2, 9);
  }

  randomDate(start:Date, end:Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toDateString();
  }

  ngOnInit(): void {
    
    this.records= [
      { "tranRef": "TRN2022020001", "status":"pending",    "amount":"18.9","date": this.randomDate(new Date(2022, 1, 1), new Date()) },
      { "tranRef": "TRN2022020002", "status":"completed",  "amount":"198.90","date": this.randomDate(new Date(2022, 1, 1), new Date()) },
      { "tranRef": "TRN2022020003", "status":"completed",  "amount":"59.2","date": this.randomDate(new Date(2022, 1, 1), new Date()) },
      { "tranRef": "TRN2022020004", "status":"completed",  "amount":"9,765", "date": this.randomDate(new Date(2022, 1, 1), new Date()) },
      { "tranRef": "TRN2022020005", "status":"pending",    "amount":"97.9", "date": this.randomDate(new Date(2022, 1, 1), new Date()) },
      { "tranRef": "TRN2022020006", "status":"pending",    "amount":"12.90","date": this.randomDate(new Date(2022, 1, 1), new Date()) }
     ];
  }

}
