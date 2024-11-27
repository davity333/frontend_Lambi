import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string, format: string = '12h'): string {
    if (!value) return '';

    const [time, modifier] = value.split(' ');
    const [hours, minutes, seconds] = time.split(':').map(Number);

    if (format === '24h') {
      if (modifier?.toLowerCase() === 'p.m.' && hours !== 12) {
        return `${hours + 12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
      if (modifier?.toLowerCase() === 'a.m.' && hours === 12) {
        return `00:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    const hour = hours % 12 || 12;
    const suffix = hours >= 12 ? 'p.m.' : 'a.m.';
    return `${hour}:${minutes.toString().padStart(2, '0')} ${suffix}`;
  }
}
