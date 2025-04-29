import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  searchQuery = '';
  private router = inject(Router);
  ngOnInit() {
    const urlTree = this.router.parseUrl(this.router.url);
    const query = urlTree.queryParams['query'];
    this.searchQuery = query || '';
    console.log('Search query from URL:', query);
  }

  onSearch() {
    console.log('clicked with query:', this.searchQuery);
    this.router
      .navigate(['/'], {
        queryParams: { query: this.searchQuery },
      })
      .then(() => {
        this.searchQuery = '';
      });
  }
}
