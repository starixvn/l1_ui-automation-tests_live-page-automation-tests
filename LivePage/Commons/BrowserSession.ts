import { Browser, BrowserContext, Page } from "playwright";
import Login from "./Login";

export class BrowserSession {
    private static instance: BrowserSession;
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;

    private constructor() {}

    public static getInstance(): BrowserSession {
        if (!BrowserSession.instance) {
            BrowserSession.instance = new BrowserSession();
        }
        return BrowserSession.instance;
    }

    public async initialize() {
        if (!this.browser || !this.context || !this.page) {
            console.log('🔄 Khởi tạo browser session mới...');
            const { browser, context, page } = await Login(true);
            this.browser = browser;
            this.context = context;
            this.page = page;
            console.log('✅ Khởi tạo browser session thành công');
        }
        return {
            browser: this.browser,
            context: this.context,
            page: this.page
        };
    }

    public getPage(): Page {
        if (!this.page) {
            throw new Error('Browser session chưa được khởi tạo');
        }
        return this.page;
    }

    public async cleanup() {
        console.log('🧹 Bắt đầu dọn dẹp browser session...');
        try {
            if (this.page) {
                await this.page.close();
                this.page = null;
            }
            if (this.context) {
                await this.context.close();
                this.context = null;
            }
            if (this.browser) {
                await this.browser.close();
                this.browser = null;
            }
            console.log('✅ Dọn dẹp browser session thành công');
        } catch (error: any) {
            console.error('❌ Lỗi khi dọn dẹp browser session:', error.message);
            throw error;
        }
    }
} 