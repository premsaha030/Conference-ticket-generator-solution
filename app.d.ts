declare const form: HTMLFormElement;
declare const errorsMessage: NodeListOf<Element>;
declare const inputUpload: HTMLDivElement;
declare const imgProfile: HTMLImageElement;
declare const avatar: HTMLDivElement;
declare const buttonRemoveUpload: HTMLButtonElement;
declare const inputUploadImg: HTMLInputElement;
declare const messageInput: HTMLParagraphElement;
declare const avatarImage: HTMLInputElement;
declare const ticket: HTMLDivElement;
declare const nameProfile: HTMLHeadingElement;
declare const githubProfile: HTMLSpanElement;
declare const avatarIcon: HTMLImageElement;
declare const ticketNumber: HTMLSpanElement;
declare const title: HTMLHeadingElement;
declare const description: HTMLParagraphElement;
declare const emailRegex: RegExp;
interface ProfileDataType {
    name: string;
    email: string;
    github: string;
    avatar: string;
}
declare let profileData: ProfileDataType;
declare function loadImage(file: File): void;
declare function createTicket(data: ProfileDataType): void;
declare function generateTicket(): number;
