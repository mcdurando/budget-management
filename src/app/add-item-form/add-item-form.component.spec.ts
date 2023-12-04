import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemFormComponent } from './add-item-form.component';
import { BudgetItem } from '../../shared/models/budget-item.model';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AddItemFormComponent', () => {
  let component: AddItemFormComponent;
  let fixture: ComponentFixture<AddItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [ReactiveFormsModule, FormsModule],
      declarations: [ AddItemFormComponent ],
      providers : [FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    spyOn(component, 'setup');
    component.ngOnInit();
    expect(component.setup).toHaveBeenCalled();
  });

  it('should setup form with default values', () => {
    component.setup();
    const expectedFormValue = {
      description: '',
      amount: 0,
    };
    expect(component.itemForm.value).toEqual(expectedFormValue);
  });

  it('should patch form values when item is provided', () => {
    const mockItem = new BudgetItem('Test Description', 100);
    component.item = mockItem;
    component.setup();
    expect(component.itemForm.value).toEqual({
      description: 'Test Description',
      amount: 100,
    });
  });

  it('should emit form value on form submission', () => {
    spyOn(component.formSubmit, 'emit');
    const mockFormValue = {
      description: 'Test Description',
      amount: 100,
    };
    component.itemForm.setValue(mockFormValue);
    component.onSubmit();
    expect(component.formSubmit.emit).toHaveBeenCalledWith(mockFormValue);
  });

  it('should reset form on form submission', () => {
    component.setup();
    component.itemForm.controls['description'].setValue('test');
    component.itemForm.controls['amount'].setValue(500);
    component.itemForm.markAsDirty();
    component.onSubmit();
    expect(component.itemForm.dirty).toBeFalse();
  });
});
