/* Trained Model created in Teachable Machine */

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/8_-qRJUd2/";

let model, webcam, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

// run the webcam image through the image model
async function predict() {
    $('.loading').show();
    // predict can take in an image, video or canvas html element
    var image = document.getElementById('dog-image');

    let resultNameAndMessage = {
        "강호동": '포동포동 사랑스러운 강아지 <br> 정말 든든한 당신의 반려견!',
        "규현": '당신의 강아지는 땡그란 눈의 소유자 <br> 혹시 짖을때 감미로운 보컬을 뽐내지 않나요?',
        "원빈": '남신급 외모를 갖춘 강아지군요! <br> 혹시 원빈이 강아지로 환생한거 아닌지..?',
        "박보검": '보기만해도 훈훈해지는 강아지 <br> 어디든지 나가면 모두에게 인기폭팔!',
        "백종원": '기분좋은 미소의 소유자군요! <br>  백종원 닮은 강아지 참 쉽쥬~?',
        "서장훈": '서장훈의 쳐진 눈을 닮았어요.  <br> 혹시 당신 강아지는 미래의 건물주?!',
        "김태희": '여신급 미모인 당신 강아지. <br>  청순의 대명사인 김태희를 닮았어요',
        "수지": '국민첫사랑 수지를 닮은 강아지. <br>  혹시 이성 강아지들에게 인기가 많은건 아닌지?',
        "아이유": '조그맣고 청순하고 귀여운 매력의 소유자 <br>  인기폭팔 누구에게나 사랑받는 강아지!',
        "양세형": '혹시 당신 강아지는 어디로 튈지모르는 장난꾸러기? <br> 장난스러운 미소의 소유자!',
        "유재석": '안경만 쓰면 유재석 판박이?! <br>  강아지 세계에서 어딜가나 국민MC로 활동할 강아지!',
        "전현무": '특유의 볼살과 미소가 정말 귀여운 당신 강아지 <br>  혹시몰라요 어딘가에 mc의 피가 흐르고 있을지!',
        "한지민": '너무나도 사랑스러운 미소 <br>  웃는상인 당신 강아지는 한지민을 닮았네요!',
        "박보영": '동글동글 뭐든게 다 동그란 강아지 <br>  눈도 동글 코도 동글 얼굴도 동글~',
        "백일섭": '백일섭 할아버지의 푸근한 미소를 닮았어요 <br> 동글동글 귀여운 당신 강아지!',
        "피오": '연예계 대표 강아지상 피오를 닮았죠 <br> 순둥한 외모로 모두를 사로잡는 귀여운 강아지!',
        "전지현": '차가운 도시의 댕댕이인 당신 강아지? <br> 세련된 미모가 전지현을 닮았어요',
        "강균성": '예쁜 커다란 눈망울의 당신 강아지 <br> 동글동글한 눈이 참 이뻐요!',
    }

    const prediction = await model.predict(image, false);
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));

    var resultName = prediction[0].className
    var resultMessage = resultNameAndMessage[prediction[0].className]
    var resultImage;
    var displayResultNum = 5;
    $('.result-name').html(resultName);
    $('.result-message').html(resultMessage);
    $('#celeb-image').attr('src', resultImage);
    $('.loading').hide();

    for (let i = 0; i < displayResultNum; i++) {
        const classPrediction =
            prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
        var width = prediction[i].probability.toFixed(2) * 100;
        $('#progressbar' + i).attr('style', 'width:' + width + '%;');
        $('#progressbar' + i).attr('aria-valuenow', width);
        $('#progressbar' + i).html(width + '%');
        $('#progressbar' + i + '-name').html(prediction[i].className);
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.image-upload-wrap').hide();

            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);
        };
        reader.readAsDataURL(input.files[0]);
        init().then(function () {
            predict();
        });
    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('#celeb-image').attr('src', 'anonymous-image.png');
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});