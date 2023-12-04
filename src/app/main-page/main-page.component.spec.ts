import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { BudgetItem } from '../../../src/shared/models/budget-item.model';
import { UpdateEvent } from '../budget-item-list/budget-item-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
    });

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add an item and update total budget', () => {
    const newItem: BudgetItem = { description: 'Test Item', amount: 100 };
    component.addItem(newItem);
    expect(component.budgetItems.length).toBe(1);
    expect(component.totalBudget).toBe(100);
  });

  it('should delete an item and update total budget', () => {
    const itemToDelete: BudgetItem = { description: 'Test Item', amount: 100 };
    component.budgetItems = [itemToDelete];
    component.totalBudget = 100;

    component.deleteItem(itemToDelete);
    expect(component.budgetItems.length).toBe(0);
    expect(component.totalBudget).toBe(0);
  });

  it('should update an item and update total budget', () => {
    const oldItem: BudgetItem = { description: 'Old Item', amount: 50 };
    const newItem: BudgetItem = { description: 'New Item', amount: 75 };

    component.budgetItems = [oldItem];
    component.totalBudget = 50;

    const updateEvent: UpdateEvent = { old: oldItem, new: newItem };

    component.updateItem(updateEvent);
    expect(component.budgetItems.length).toBe(1);
    expect(component.budgetItems[0]).toEqual(newItem);
    expect(component.totalBudget).toBe(75);
  });
});