import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameComponent } from './newgame.component';

describe('ListaComponent', () => {
  let component: NewGameComponent;
  let fixture: ComponentFixture<NewGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
