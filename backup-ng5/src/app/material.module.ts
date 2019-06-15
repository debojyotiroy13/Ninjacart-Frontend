import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule , MatInputModule, MatProgressSpinnerModule, MatCardModule, MatOptionModule} from '@angular/material';
import { MatSelectModule} from '@angular/material/select';
import { MatTableModule} from '@angular/material/table';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  imports: [ MatPaginatorModule, MatIconModule, MatSnackBarModule, MatTableModule, MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatSelectModule],
  exports: [ MatPaginatorModule, MatIconModule, MatSnackBarModule, MatTableModule, MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatSelectModule],
})
export class MaterialModule { }