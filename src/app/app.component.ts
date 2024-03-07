import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'css-loops';

   public courseAppointmentStatus = CouseAppointmentStatusHelper.getLookups().map(cA =>{
    return new CourseAppointmentStatusModel(cA.text, 
      CouseAppointmentStatusHelper.getButtonClass(cA.value as number),
      CouseAppointmentStatusHelper.getBadgeClass(cA.value as number));
    } 
   );
}

export class CourseAppointmentStatusModel{
  constructor(public displayText: string, public buttonClass: string, public badgeClass: string){}
}

export enum CourseAppointmentStatus {
  draft = 0,
  ready = 1,
  active = 2,
  finished = 3,
  completed = 4,
  canceled = 5
}

type Values = {
  displayText: string;
  iconClass: string;
  cssClassPostFix: string;
};

type Enum = { [k: string]: number | string; };

export class CouseAppointmentStatusHelper {

  protected static enum: Enum = CourseAppointmentStatus;
  protected static data: Record<CourseAppointmentStatus, Values> = {
    [CourseAppointmentStatus.draft]: {
      displayText: 'Entwurf',
      iconClass: 'fas fa-venus',
      cssClassPostFix: 'draft'
    },
    [CourseAppointmentStatus.ready]: {
      displayText: 'Bereit',
      iconClass: 'fas fa-mars',
      cssClassPostFix: 'ready'
    },
    [CourseAppointmentStatus.active]: {
      displayText: 'Aktiv',
      iconClass: 'fas fa-transgender-alt',
      cssClassPostFix: 'active'
    },
    [CourseAppointmentStatus.finished]: {
      displayText: 'Beendet',
      iconClass: 'fa-question-circle',
      cssClassPostFix: 'finished'
    },
    [CourseAppointmentStatus.completed]: {
      displayText: 'Abgeschlossen',
      iconClass: 'fa-question-circle',
      cssClassPostFix: 'completed'
    },
    [CourseAppointmentStatus.canceled]: {
      displayText: 'Abgebrochen',
      iconClass: 'fa-question-circle',
      cssClassPostFix: 'canceled'
    },
  };

  public static getDisplayText(value: CourseAppointmentStatus) {
    return CouseAppointmentStatusHelper.data[value].displayText;
  }

  public static getIconClass(value: CourseAppointmentStatus, prefix = '') {
    return prefix + CouseAppointmentStatusHelper.data[value].iconClass;
  }


  public static getLookups(ignore: number[] = []): SelectItem[] {
    return this.getEnumValues()
      .map(value => ({ value, text: this.getDisplayText(value) }))
      .filter(item => !ignore.includes(item.value));
  }

  private static isEnumValueName(key: string): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return isNaN(key);
  }

  protected static getEnumValues() {
    return Object.keys(this.enum).filter(this.isEnumValueName).map(name => this.enum[name] as number);
  }

  public static getButtonClass(value: CourseAppointmentStatus){
    return `btn-${CouseAppointmentStatusHelper.data[value].cssClassPostFix}`;
  }

  public static getBadgeClass(value: CourseAppointmentStatus){
    return `badge bg-${CouseAppointmentStatusHelper.data[value].cssClassPostFix}`;
  }
}

interface SelectItem {
  value: string | number;
  text: string;
}