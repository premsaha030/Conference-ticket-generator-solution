const form = document.querySelector('#form');
const errorsMessage = document.querySelectorAll('.form__error');
const inputUpload = document.querySelector('.form__upload');
const imgProfile = document.querySelector('.form__upload-img');
const avatar = document.querySelector('.form__upload-avatar');
const buttonRemoveUpload = document.querySelector('#btn-upload-remove');
const inputUploadImg = document.querySelector('#file-upload');
const messageInput = document.querySelector('.form__upload-message');
const avatarImage = document.querySelector('#avatar-img');
const ticket = document.querySelector('.ticket');
const nameProfile = document.querySelector('#name');
const githubProfile = document.querySelector('#github');
const avatarIcon = document.querySelector('#avatar');
const ticketNumber = document.querySelector('.ticket__number');
const title = document.querySelector('.main__title');
const description = document.querySelector('.main__description');
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
let profileData = {
    name: '',
    email: '',
    github: '',
    avatar: ''
};
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    let errors = 0;
    Object.entries(data).forEach(([key, value], index) => {
        if (!value) {
            const messageDragAndDrop = key === 'avatar' ? 'File to large. Pleace upload to photo under 500KB' : 'Upload your photo (JPG or PNG, max size: 500KB).';
            messageInput.textContent = messageDragAndDrop;
            errorsMessage[index].classList.add('error');
            errors++;
            return;
        }
        if (key === 'email' && !emailRegex.test(value)) {
            errorsMessage[index].classList.add('error');
            errors++;
            return;
        }
        errorsMessage[index].classList.remove('error');
    });
    if (errors != 0)
        return;
    form.classList.add('hidden');
    ticket.classList.add('active');
    createTicket(data);
    const { name, email } = data;
    title.innerHTML = `  Congrats, <span class="main__title--name">${name}</span>! Your ticket is ready.`;
    description.innerHTML = ` We've emailed your ticket to <span class="main__description--name">${email}</span> and will send updates in the run up to the event.`;
});
inputUpload.addEventListener('dragover', (e) => {
    e.preventDefault();
});
inputUpload.addEventListener('drop', (e) => {
    e.preventDefault(); // for default the browser save the file or open this
    if (e.dataTransfer.files.length == 0)
        return;
    const file = e.dataTransfer.files[0];
    loadImage(file);
});
inputUpload.addEventListener('dragleave', (e) => {
    console.log('leave');
});
buttonRemoveUpload.addEventListener('click', (e) => {
    e.stopPropagation();
    inputUpload.classList.remove('disabled');
    avatar === null || avatar === void 0 ? void 0 : avatar.classList.remove('active');
    imgProfile.src = '';
    avatarImage.value = '';
});
inputUploadImg.addEventListener('change', () => {
    if (inputUploadImg.files.length == 0)
        return;
    const file = inputUploadImg.files[0];
    inputUpload.classList.add('disabled');
    loadImage(file);
});
inputUpload.addEventListener('click', (e) => {
    if (avatar.classList.contains('active'))
        return;
    inputUploadImg.click();
});
function loadImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        var _a, _b;
        imgProfile.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        avatarImage.value = (_b = e.target) === null || _b === void 0 ? void 0 : _b.result;
        avatar === null || avatar === void 0 ? void 0 : avatar.classList.add('active');
    };
    reader.readAsDataURL(file);
}
function createTicket(data) {
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
