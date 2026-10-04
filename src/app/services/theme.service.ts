import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = false;

  constructor() {
    // Check saved preference or system theme
    const savedTheme = localStorage.getItem('simobile_dark_mode');
    if (savedTheme !== null) {
      this.isDarkMode = savedTheme === 'true';
    } else {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyTheme();
  }

  isDark(): boolean {
    return this.isDarkMode;
  }

  toggleTheme(): boolean {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('simobile_dark_mode', this.isDarkMode.toString());
    this.applyTheme();
    return this.isDarkMode;
  }

  setDarkMode(isDark: boolean): void {
    this.isDarkMode = isDark;
    localStorage.setItem('simobile_dark_mode', this.isDarkMode.toString());
    this.applyTheme();
  }

  private applyTheme(): void {
    document.body.classList.toggle('dark', this.isDarkMode);
  }
}
