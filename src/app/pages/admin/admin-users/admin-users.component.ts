import { Component } from '@angular/core';
import { UserRequestService } from '../../../services/user-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
  users: any[] = [];
  page: number = 1;
  totalPages: number = 0;
  pagesArray: number[] = [];
  currentPage: number = 1;
  limit: number = 15;
  
  constructor(private userRequestService: UserRequestService) { }

  ngOnInit(): void {
    this.userRequestService.getUserData(this.page, this.limit).subscribe((data) => {
      this.users = data.data;
      this.totalPages = data.totalPages;
      this.pagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);
    });
    this.pagenumber(this.currentPage);
  }

  approve(userId: string): void {
    this.userRequestService.updateUser(userId, 'approved').subscribe(() => {
      this.users = this.users.map(user => user._id === userId ? { ...user, AdministrativeStatus: 'approved' } : user);
      this.ngOnInit();
    });
  }

  reject(userId: string): void {
    this.userRequestService.updateUser(userId, 'restrict').subscribe(() => {
      this.users = this.users.map(user => user._id === userId ? { ...user, AdministrativeStatus: 'restrict' } : user);
      this.ngOnInit();
    });
  }

  pagenumber(page: number): void {
    console.log(page);
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.userRequestService.getUserData(page, this.limit).subscribe((data) => {
      this.users = data.data;
    });
  }

}
