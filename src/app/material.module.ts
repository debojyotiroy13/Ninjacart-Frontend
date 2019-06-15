import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule , MatInputModule, MatProgressSpinnerModule, MatCardModule, MatOptionModule} from '@angular/material';
import { MatSelectModule} from '@angular/material/select';
import { MatTableModule} from '@angular/material/table';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatChipsModule} from '@angular/material/chips';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material';
import { MatMenuModule} from '@angular/material/menu';
import { MatBadgeModule} from '@angular/material/badge';

@NgModule({
  imports: [ MatBadgeModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatGridListModule, MatExpansionModule, MatSidenavModule, MatPaginatorModule, MatIconModule, MatSnackBarModule, MatTableModule, MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatSelectModule],
  exports: [ MatBadgeModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatGridListModule, MatExpansionModule, MatSidenavModule, MatPaginatorModule, MatIconModule, MatSnackBarModule, MatTableModule, MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatSelectModule],
})
export class MaterialModule { }