import { Component, NgModule } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { EventsService } from '../../../services/dashboard/events.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimeFormatPipe } from '../../../time-format.pipe';

@Component({
  selector: 'app-view-event',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, CommonModule, TimeFormatPipe, RouterLink],
  templateUrl: './view-event.component.html',
  styleUrl: './view-event.component.css'
})
export class ViewEventComponent {
  event: any;

  constructor(
    private eventService: EventsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.eventService.getEventDetails(+id).subscribe((data) => {
        this.event = data;
      });
    }
  }
}
