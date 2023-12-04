import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { EditItemModalComponent } from './edit-item-modal.component';
import { BudgetItem } from '../../../src/shared/models/budget-item.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EditItemModalComponent', () => {
  let component: EditItemModalComponent;
  let fixture: ComponentFixture<EditItemModalComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<EditItemModalComponent>>;


  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    TestBed.configureTestingModule({
      declarations: [EditItemModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef  },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      imports: [MatDialogModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
    });
    fixture = TestBed.createComponent(EditItemModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with the updated item on onSubmitted', () => {
    const mockUpdatedItem: BudgetItem = {
      description: '',
      amount: 0
    };
    component.onSubmitted(mockUpdatedItem);
    expect(mockDialogRef.close).toHaveBeenCalledWith(mockUpdatedItem);
  });
});