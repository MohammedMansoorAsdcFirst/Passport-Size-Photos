let leftInput = document.querySelector('#leftInput');
let imgs = document.querySelectorAll('.img');
let uploadBtn = document.querySelector('#uploadPhotoBtn');
let eightFrame = document.querySelector('#eightFrame');
let downloadBtn = document.querySelector('#download');
let rightMain = document.querySelector('.rightMain');
let printBtn = document.querySelector('#printBtn');
let count = document.querySelector('#count');
let apiKey = prompt("Enter Your API Key for Validation")

let storedCount = localStorage.getItem('count');
count.innerHTML = storedCount ? parseInt(storedCount) : 50;

Array.from(imgs).forEach((imgElement) => {
    imgElement.addEventListener('click', () => {
        leftInput.click();
    });
});

uploadBtn.addEventListener('click', () => {
    leftInput.click();
});

eightFrame.addEventListener('click', () => {
    leftInput.click();
});

leftInput.addEventListener('change', (event) => {
    rightMain.disabled = true;
    leftInput.disabled = true;
    eightFrame.disabled = true;

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const formData = new FormData();
            formData.append('image_file', file);

            fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: {
                    'X-Api-Key': apiKey,
                    // 'X-Api-Key': 'DGVCf36AwZcc9Zur7dhtSBuW',
                },
                body: formData,
            })
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('HTTP error ' + response.status);
                    }
                    return response.blob();
                })
                .then(function (blob) {
                    console.log(blob);
                    const url = URL.createObjectURL(blob);
                    imgs.forEach((img) => {
                        img.src = url;
                        
                        let currentCount = parseInt(count.innerHTML);
                        count.innerHTML = currentCount - 1;
                        localStorage.setItem('count', parseInt(count.innerHTML));
                    });
                    rightMain.disabled = false;
                    leftInput.disabled = false;
                    eightFrame.disabled = false;
                })
                .catch((error) => {
                    console.error('Error processing image:', error);
                    alert(error);

                    rightMain.disabled = false;
                    leftInput.disabled = false;
                    eightFrame.disabled = false;
                });
            // imgs.forEach((img) => {
            //     img.src = e.target.result;
            // });
        };
        reader.readAsDataURL(file);
    }
});

downloadBtn.addEventListener('click', async () => {
    let rightMain = document.querySelector('.rightMain');
    domtoimage.toPng(rightMain)
        .then(function (dataUrl) {
            const downloadLink = document.createElement('a');
            downloadLink.href = dataUrl;
            downloadLink.download = 'passport_photos.png';
            downloadLink.click();
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
});

printBtn.addEventListener('click', () => {
    window.print();
});
