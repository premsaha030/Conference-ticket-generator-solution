const form = document.querySelector<HTMLFormElement>('#form');
const errorsMessage = document.querySelectorAll('.form__error')
const inputUpload = document.querySelector<HTMLDivElement>('.form__upload')
const imgProfile = document.querySelector<HTMLImageElement>('.form__upload-img')
const avatar = document.querySelector<HTMLDivElement>('.form__upload-avatar');
const buttonRemoveUpload = document.querySelector<HTMLButtonElement>('#btn-upload-remove');
const inputUploadImg = document.querySelector<HTMLInputElement>('#file-upload');
const messageInput = document.querySelector<HTMLParagraphElement>('.form__upload-message')
const avatarImage = document.querySelector<HTMLInputElement>('#avatar-img')
const ticket = document.querySelector<HTMLDivElement>('.ticket');

const nameProfile = document.querySelector<HTMLHeadingElement>('#name');
const githubProfile = document.querySelector<HTMLSpanElement>('#github');
const avatarIcon = document.querySelector<HTMLImageElement>('#avatar');
const ticketNumber = document.querySelector<HTMLSpanElement>('.ticket__number');
const title = document.querySelector<HTMLHeadingElement>('.main__title');
const description = document.querySelector<HTMLParagraphElement>('.main__description');

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

interface ProfileDataType {
    name: string,
    email: string,
    github: string,
    avatar: string
}
let profileData:ProfileDataType = {
    name: '',
    email: '',    
    github: '',
    avatar: ''
}

form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement) as unknown as Iterable<[string, FormDataEntryValue]>
    const data = Object.fromEntries(formData) as unknown as ProfileDataType;

    let errors = 0

    Object.entries(data).forEach(([key, value],index) => {
        if (!value) {
            const messageDragAndDrop = key === 'avatar' ? 'File to large. Pleace upload to photo under 500KB' : 'Upload your photo (JPG or PNG, max size: 500KB).';
            messageInput.textContent = messageDragAndDrop;
            errorsMessage[index].classList.add('error');
            errors++;
            return
        }

        if (key === 'email' && !emailRegex.test(value as string)) {    
            errorsMessage[index].classList.add('error');
            errors++;
            return
        }
        errorsMessage[index].classList.remove('error');

    });

    
    if(errors != 0) return;

    form.classList.add('hidden');
    ticket.classList.add('active');

    createTicket(data);

    const { name, email } = data

    title.innerHTML = `  Congrats, <span class="main__title--name">${name}</span>! Your ticket is ready.`;
    description.innerHTML = ` We've emailed your ticket to <span class="main__description--name">${email}</span> and will send updates in the run up to the event.`;


});

inputUpload.addEventListener('dragover', (e) => {
    e.preventDefault();
    
})

inputUpload.addEventListener('drop', (e) => {
    e.preventDefault();  // for default the browser save the file or open this
    if (e.dataTransfer.files.length == 0) return
    
    const file = e.dataTransfer.files[0];
    loadImage(file)

})

inputUpload.addEventListener('dragleave', (e) => {
    console.log('leave');
})

buttonRemoveUpload.addEventListener('click', (e) => {
    e.stopPropagation()
    inputUpload.classList.remove('disabled')
    avatar?.classList.remove('active');
    imgProfile.src = '';
    avatarImage.value = ''
})

inputUploadImg.addEventListener('change', () => {
   
    if(inputUploadImg.files.length == 0) return;
    const file = inputUploadImg.files[0];
    inputUpload.classList.add('disabled')
    loadImage(file)

})

inputUpload.addEventListener('click', (e) => {
    
    if(avatar.classList.contains('active')) return
    inputUploadImg.click();
})

function loadImage(file: File) {
    const reader = new FileReader();

    reader.onload = (e) => {
        imgProfile.src = e.target?.result as string;
        avatarImage.value = e.target?.result as string;
        avatar?.classList.add('active');
    }
    reader.readAsDataURL(file);
    
}

function createTicket(data:ProfileDataType) {
    console.log(avatarIcon);
    
    const { name, github, avatar } = data;
    nameProfile.textContent = name;
    githubProfile.textContent = github;
    avatarIcon.src = avatar;
    ticketNumber.textContent = `#${generateTicket()}`;

}
    


function generateTicket() {
    return Math.floor(Math.random() * 100000) + 100000;
}
