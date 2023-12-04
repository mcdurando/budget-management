import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { BudgetItemListComponent, UpdateEvent } from './budget-item-list.component';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';
import { BudgetItem } from '../../../src/shared/models/budget-item.model';

describe('BudgetItemListComponent', () => {
  let component: BudgetItemListComponent;
  let fixture: ComponentFixture<BudgetItemListComponent>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    TestBed.configureTestingModule({
      declarations: [BudgetItemListComponent],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog }
      ],
      imports: [BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA], // This is used to ignore unknown elements and attributes in your components' templates
    });

    fixture = TestBed.createComponent(BudgetItemListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete event when onDeleteButtonClicked is called', () => {
    const mockBudgetItem: BudgetItem = {
      description: '',
      amount: 0
    };
    spyOn(component.delete, 'emit');
    component.onDeleteButtonClicked(mockBudgetItem);
    expect(component.delete.emit).toHaveBeenCalledWith(mockBudgetItem);
  });

  it('should open EditItemModalComponent and emit update event when onCardClicked is called', () => {
    const mockBudgetItem: BudgetItem = {
      description: '',
      amount: 0
    };
    const mockDialogRef = {
      afterClosed: () => of({ /* your mock data for result */ })
    };
    mockMatDialog.open.and.returnValue(mockDialogRef as any);
    spyOn(component.update, 'emit');
    component.onCardClicked(mockBudgetItem);
    expect(mockMatDialog.open).toHaveBeenCalledWith(EditItemModalComponent, {
      width: '580px',
      data: mockBudgetItem
    });
    // Simulate the modal being closed with a result
    mockDialogRef.afterClosed().subscribe((result: any) => {
      expect(component.update.emit).toHaveBeenCalledWith({
        old: mockBudgetItem,
        new: result
      });
    });
  });
});