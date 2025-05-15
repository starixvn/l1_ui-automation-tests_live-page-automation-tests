/**
 * Interface định nghĩa cấu trúc locator cơ bản cho tất cả các game
 */
export interface IBaseLocator {
    /**
     * Định nghĩa các xpath cho các lựa chọn đặt cược
     * Key: tên của bet choice (VD: 'odd', 'even', 'player', 'banker')
     * Value: xpath để tìm element tương ứng
     */
    betChoices: {
        [key: string]: string;
    };

    /**
     * Xpath để lấy odds của từng lựa chọn
     * Key: tên của bet choice
     * Value: xpath để lấy odds tương ứng
     */
    oddsLocators: {
        [key: string]: string;
    };

    /**
     * Xpath để check timer/new round
     * Dùng chung cho tất cả game: //div[text()='${gameTab}']//following::div[contains(@class,'in-play')][1]//div[2]/div[1]/div[2]/span[1]
     */
    timerLocator: string;

    /**
     * Xpath để verify game đã load xong
     * VD: element hiển thị "Phiên" hoặc element đặc trưng của game
     */
    gameLoadedLocator: string;

    /**
     * Các locator bổ sung nếu game có thêm tính năng đặc biệt
     * Key: tên của tính năng
     * Value: xpath tương ứng
     */
    additionalLocators?: {
        [key: string]: string;
    };
}

/**
 * Type cho phép chỉ định các bet choice hợp lệ
 * Mỗi game sẽ extend type này để định nghĩa các bet choice riêng
 */
export type BetChoice = string;

/**
 * Enum định nghĩa các trạng thái có thể có của game
 */
export enum GameState {
    WAITING_NEW_ROUND = 'WAITING_NEW_ROUND',
    BETTING = 'BETTING',
    RESULT = 'RESULT'
}

// Factory type để tạo locator theo environment
export type LocatorFactory = (env: string) => IBaseLocator;