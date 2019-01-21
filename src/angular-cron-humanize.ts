import * as angular from 'angular';

// @ts-ignore
import cronstrue from 'cronstrue/i18n';

interface CronOptions {
  throwExceptionOnParseError?: boolean;
  verbose?: boolean;
  dayOfWeekStartIndexZero?: boolean;
  use24HourTimeFormat?: boolean;
  locale?: string;
}

class CronHumanizeController implements angular.IController {

  public cron: string;
  public options: CronOptions

  public cronHumanized: string;

  $onChanges = (changes: any) => {
    if (changes.cron && changes.cron.currentValue) {
      this.cron = changes.cron.currentValue;
    }

    if (changes.options && changes.options.currentValue) {
      this.options = changes.options.currentValue;
    }

    if (this.cron) {
      try {
        this.cronHumanized = this.humanize(this.cron, this.options);
      } catch (e) {
        this.cronHumanized = 'Invalid cron expression'
      }
    }
  }

  private humanize(expression: string, options?: CronOptions) {
      return cronstrue.toString(expression, options);
  }
}

export const CronHumanizeComponent: angular.IComponentOptions = {
  bindings: {
    'cron': '<',
    'options': '<'
  },
  controller: CronHumanizeController,
  template: `<span>{{ $ctrl.cronHumanized }}</span>`,
}

angular
  .module('ngCronHumanize', [])
  .component('cronHumanize', CronHumanizeComponent);