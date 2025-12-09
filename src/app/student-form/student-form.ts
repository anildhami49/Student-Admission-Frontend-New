import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import { environment } from '../environments/environments';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="header">
        <h2>Student Admission</h2>
        <button (click)="logout()" class="logout-btn">Logout</button>
      </div>
      
      <form (ngSubmit)="onSubmit()">
        <input [(ngModel)]="student.name" name="name" placeholder="Name" required>
        <input [(ngModel)]="student.email" name="email" type="email" placeholder="Email" required>
        <input [(ngModel)]="student.course" name="course" placeholder="Course" required>
        <button type="submit">Submit</button>
      </form>

      <h3>Course Details</h3>
      <div *ngFor="let s of students" class="student-card">
        <p><strong>{{s.name}}</strong> - {{s.email}} - {{s.course}}</p>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 600px; margin: 50px auto; padding: 20px; }
    .header { display: flex; justify-content: space-between; align-items: center; }
    .logout-btn { padding: 8px 15px; background: #dc3545; color: white; border: none; cursor: pointer; }
    input { width: 100%; padding: 10px; margin: 10px 0; }
    button[type="submit"] { width: 100%; padding: 10px; background: #007bff; color: white; border: none; cursor: pointer; }
    .student-card { border: 1px solid #ddd; padding: 10px; margin: 10px 0; }
  `]
})
export class StudentFormComponent implements OnInit {
  student = { name: '', email: '', course: '' };
  students: any[] = [];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.http.get<any[]>(`${environment.apiUrl}/student`).subscribe(
      data => this.students = data
    );
  }

  onSubmit() {
    this.http.post(`${environment.apiUrl}/student`, this.student).subscribe(() => {
      this.student = { name: '', email: '', course: '' };
      this.loadStudents();
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}