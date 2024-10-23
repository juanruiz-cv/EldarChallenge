import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { MainService } from '@services/main.service';
import { Articule } from '@models/main.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    DialogModule,
    AvatarModule,
    InputTextModule,
    InputTextareaModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [MainService],
})
export class HomePageComponent implements OnInit {
  articuleList!: Articule[];
  articuleEdit: Articule | undefined;

  visible: boolean = false;

  articuleEditForm: FormGroup;
  isEeadOnly: boolean = true;

  constructor(private _mainService: MainService, private fb: FormBuilder) {
    this.articuleEditForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  private getAllPosts() {
    this._mainService.getAllPosts().subscribe({
      next: (response: Articule[]) => {
        this.articuleList = response;
      },
    });
  }

  showDialog(articule: Articule) {
    this.articuleEdit = articule;
    this.articuleEditForm.patchValue({
      title: articule.title,
      body: articule.body,
    });
    this.visible = true;
  }

  onSubmit(): void {
    if (this.articuleEditForm.valid && this.articuleEdit) {
      const { title, body } = this.articuleEditForm.value;

      const index = this.articuleList.findIndex(
        (a) => a.id === this.articuleEdit!.id
      );

      if (index !== -1) {
        this.articuleList[index] = {
          ...this.articuleEdit,
          title: title,
          body: body,
        };
      }

      this.visible = false;
    }
  }
}
