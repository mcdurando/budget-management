import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BudgetItem } from '../../../../budget-app/src/shared/models/budget-item.model';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss'],
})
export class AddItemFormComponent implements OnInit {
  @Input() item!: BudgetItem;
  @Output() formSubmit: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();

  itemForm!: FormGroup;
  isNewItem: boolean = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setup();
  }

  setup() : void {
    this.itemForm = this.fb.group({
      description: ['', Validators.required],
      amount: [0, [Validators.required]],
    });
    if (this.item) {
      this.isNewItem = false;
      this.itemForm.patchValue(this.item);
    } else {
      this.item = new BudgetItem('', 0);
    }
  }

  onSubmit(): void {
    if (this.itemForm.invalid) return;
    this.formSubmit.emit(this.itemForm.value);
    this.itemForm.reset();
  }
} 