import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/Auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer: 'Unread';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    // tslint:disable-next-line: no-debugger
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }
  loadMessages() {
    // tslint:disable-next-line: no-debugger    ;
    this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.messageContainer
      )
      .subscribe(
        (res: PaginatedResult<Message[]>) => {
          // tslint:disable-next-line: no-debugger
          debugger;
          this.messages = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  deleteMessage(messageId: number) {
    this.alertify.confirm('Are you sure you want to delete this message?', () => {
      this.userService.deleteMessage(messageId, this.authService.decodedToken.nameid)
      .subscribe(() => {
        this.messages.splice(this.messages.findIndex(prm => prm.id === messageId), 1);
        this.alertify.success('Message has been deleted');
      }, () => {
        this.alertify.error('Failed to delete the message');
      });
    });
  }

  pageChanged(event: any): void {
    // tslint:disable-next-line: no-debugger
    this.pagination.currentPage = event.page;

    this.loadMessages();
  }
}
