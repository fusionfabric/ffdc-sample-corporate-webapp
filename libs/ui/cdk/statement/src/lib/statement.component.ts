import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { AccountStatement } from '@ffdc/api_corporate-accounts/interfaces';
import { UxgColumn, UxgColumnType } from '@ffdc/uxg-angular-components/table';

@Component({
  selector: 'fcbs-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss'],
})
export class StatementComponent implements OnInit {
  @Input() transactions: AccountStatement[];

  @ViewChild('tableCellAmount', { static: true }) tableCellAmount: TemplateRef<
    any
  >;
  @ViewChild('tableCellDate', { static: true }) tableCelldate: TemplateRef<any>;

  columns: UxgColumn[];

  columnsToDisplay = ['amount', 'postingDate'];

  constructor() {}

  ngOnInit(): void {
    this.columns = [
      {
        name: 'amount',
        type: UxgColumnType.cellTemplate,
        cellTemplate: this.tableCellAmount,
        displayName: 'Amount',
        align: 'left',
      },
      {
        name: 'postingDate',
        type: UxgColumnType.cellTemplate,
        cellTemplate: this.tableCelldate,
        displayName: 'Posting Date',
      },
    ];
  }
}

// Skeleton

@Component({
  selector: 'fcbs-statement-skeleton',
  templateUrl: './statement.skeleton.html',
  styleUrls: ['./statement.component.scss'],
})
export class StatementSkeletonComponent {}
