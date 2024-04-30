let inputOne = document.querySelector('#fourOne')
let inputTwo = document.querySelector('#fourTwo')
let firstBtn = document.querySelector('#uploadOneBtn')
let secondBtn = document.querySelector('#uploadTwoBtn')
let fourImgOne = document.querySelectorAll('.fourImgOne img')
let fourImgTwo = document.querySelectorAll('.fourImgTwo img')


firstBtn.addEventListener('click', () => {
    inputOne.click()
})

secondBtn.addEventListener('click', () => {
    inputTwo.click()
})

// let storedCount = localStorage.getItem('count');
// count.innerHTML = storedCount ? parseInt(storedCount) : 50;

Array.from(fourImgOne).forEach((imgElement) => {
    imgElement.addEventListener('click', () => {
        inputOne.click();
    });
});

Array.from(fourImgTwo).forEach((imgElement) => {
    imgElement.addEventListener('click', () => {
        inputTwo.click();
    });
});

inputOne.addEventListener('change', (event) => {
    rightMain.disabled = true;
    inputOne.disabled = true;
    // eightFrame.disabled = true;

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const formData = new FormData();
            formData.append('image_file', file);
            let currentCount = parseInt(count.innerHTML);
            count.innerHTML = currentCount - 1;
            localStorage.setItem('count', parseInt(count.innerHTML));

            loader.style.display = 'block'

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
                    fourImgOne.forEach((img) => {
                        img.src = url;
                        loader.style.display = 'none'
                    });
                    rightMain.disabled = false;
                    fourImgOne.disabled = false;
                    // eightFrame.disabled = false;
                })
                .catch((error) => {
                    console.error('Error processing image:', error);
                    alert(error);
                    loader.style.display = 'none'
                    rightMain.disabled = false;
                    leftInput.disabled = false;
                    // eightFrame.disabled = false;
                });
            // imgs.forEach((img) => {
            //     img.src = e.target.result;
            // });
        };
        reader.readAsDataURL(file);
    }
});

inputTwo.addEventListener('change', (event) => {
    rightMain.disabled = true;
    inputOne.disabled = true;
    // eightFrame.disabled = true;

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const formData = new FormData();
            formData.append('image_file', file);
            let currentCount = parseInt(count.innerHTML);
            count.innerHTML = currentCount - 1;
            localStorage.setItem('count', parseInt(count.innerHTML));

            loader.style.display = 'block'

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
                    fourImgTwo.forEach((img) => {
                        img.src = url;
                        loader.style.display = 'none'
                    });
                    rightMain.disabled = false;
                    fourImgOne.disabled = false;
                    // eightFrame.disabled = false;
                })
                .catch((error) => {
                    console.error('Error processing image:', error);
                    alert(error);
                    loader.style.display = 'none'
                    rightMain.disabled = false;
                    leftInput.disabled = false;
                    // eightFrame.disabled = false;
                });
            // imgs.forEach((img) => {
            //     img.src = e.target.result;
            // });
        };
        reader.readAsDataURL(file);
    }
});
