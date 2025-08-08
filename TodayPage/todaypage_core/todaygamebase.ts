import { Page } from '@playwright/test';

export class TodayGameBase {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    // Có thể thêm các hàm tiện ích cho TodayPage ở đây sau
} 